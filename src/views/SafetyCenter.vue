<template>
  <div class="container">
    <div class="top">
      <Header></Header>
    </div>
    <div class="content">
      <el-steps :active="active" process-status="wait" align-center>
        <el-step title="填写账号" style="font-size:10px"></el-step>
        <el-step title="身份验证"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- 填写账号 -->
      <div class="personal-Name" v-if="active===1">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName" label-width="31px">
            <span>手机号</span>
            <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>

        <el-button @click="next('ruleForm')">下一步</el-button>
      </div>

      <!-- 邮箱/短信验证 -->
      <div class="personal-Info" v-if="active===2">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
        >
          <div class="Verification">
            <span v-bind:class="{active:tabType==1}" @click="tab(1)">邮箱验证</span>
            <span v-bind:class="{active:tabType==2}" @click="tab(2)">手机验证</span>
          </div>

          <el-form-item label="邮箱" prop="Email" v-if="tabType===1" class="Verification-info">
            <el-input type="text" v-model="ruleForm.Email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" v-if="tabType===1" class="Verification-info">
            <div class="buttonItem">
              <input v-model="vercode" type="text" placeholder="输入验证码" />
              <div class="red sendCode" @click="sendMessage">{{btnText}}</div>
            </div>
          </el-form-item>

          <el-form-item label="手机" prop="Phone" v-if="tabType===2" class="Verification-info">
            <el-input type="text" v-model="ruleForm.Phone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="验证码" v-if="tabType===2" class="Verification-info">
            <div class="buttonItem">
              <input v-model="vercode" type="text" placeholder="输入验证码" />
              <div class="red sendCode" @click="sendMessage">{{btnText}}</div>
            </div>
          </el-form-item>
        </el-form>
        <el-button @click="next('ruleForm')">下一步</el-button>
      </div>

      <!-- 设置新密码 -->
      <div class="personal-Pwd" v-if="active===3">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="Pass">
            <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="next('ruleForm')">下一步</el-button>
      </div>

      <!-- 设置成功 -->
      <div class="personal-Finish" v-if="active===4">
        <el-button @click="submitForm()">设置成功</el-button>
      </div>
    </div>
  </div>

  <!-- <div class="find-password1">
        <div @click="next">下一步 => 2</div>
  </div>-->
</template>

<script>
import Header from "../components/SafetyCenter/Header";
export default {
  // name: "find-password1",
  data() {
    var NameValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
    };
    var CheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.Pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      vercode: "",
      btnDisabled: false,
      btnText: "获取验证码",
      yzm:'',
      active: 1,
      tabType: 1,
      ruleForm: {
        Name: "",
        Phone: "",
        Email: "",
        userName: "",
        Pass: "",
        checkPass: "",
        code: ""
      },
      rules: {
        Name: [
          {
            validator: NameValue,
            required: true,
            trigger: "blur"
          }
        ],
        Phone: [
          { required: true, trigger: "blur" },
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机格式不对"
          }
        ],
        Email: [
          { required: true, trigger: "blur" },
          {
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
            message: "请输入有效的邮箱"
          }
        ],
        userName: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: "手机格式不对"
          }
          
        ],
        Pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: CheckPass, message: "", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.active==1){
             this.$api.safety.judgeUser({loginName:this.ruleForm.userName}).then(res=>{
                if(res.success==true){
                  this.active++
                  console.log(this.active)
                }
                else if(res.success==false){
                  this.$message.error('您的验证码无效')
                }
              }).catch(err=>console.log(err))
          }
          else if(this.active==2){
            if(this.vercode&&this.yzm==this.vercode){
              this.active++
            }
            else{
              this.$message.error('您的验证码无效')
            }
          }
          else if(this.active==3){
            this.$api.safety.updatePwd({password:this.ruleForm.Pass,loginName:this.ruleForm.userName}).then(res=>{
              if(res.success==true){
                this.active++
              }
            })
          }
        } 
        else {
          return false;
        }
      });
    },
    submitForm() {
      this.$router.push("/login").catch(err => console.log(err));
    },
    tab(index) {
      this.tabType = index;
    },
    // 验证码的点击事件
    sendMessage() {
      if (this.btnDisabled) {
        return;
      }
      // alert("aaa")
      //判断是手机验证还是邮箱验证
      if(this.tabType==1){
        this.$api.safety.sendEmail({email:this.ruleForm.Email}).then(res=>{
          console.log(res.emailCode)
          this.yzm=res.emailCode
        })
      }
      else if(this.tabType==2){
        this.$api.safety.sendSms({phone:this.ruleForm.Phone}).then(res=>{
          console.log(res.randomNum)
          this.yzm=res.randomNum
        })
      }
      this.getSecond(60);
    },
    //发送验证码
    getSecond(wait) {
      let _this = this;
      let _wait = wait;
       
      if (wait == 0) {
        this.btnDisabled = false;
        this.btnText = "获取验证码";
        wait = _wait;
     
      } else {
        this.btnDisabled = true;
         
        this.btnText = "验证码(" + wait + "s)";
        wait--;
        setTimeout(function() {
          _this.getSecond(wait);
        }, 1000);
      }
    }
    // next() {
    //   this.$router.push("/Login/FindPassword2");
    // }
  },
  components: {
    Header
  }
};
</script>
<style>
.el-step__head {
  width: 150px;
}
/* 圆圈 */
.el-step__icon.is-text {
  /* background: green; */
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0);
}
.el-step__main {
  width: 150px;
}
.el-step__line {
  width: 100px;
  margin-top: 10px;
  line-height: 50px;
  margin-left: 25px;
  margin-right: 50px;
}
/* 文字 :填写账号*/
.el-step__title.is-finish {
  width: 150px;
  /* color: #FDC003; */
}
/* .el-step__icon.is-finish {
   background-color: yellow;
} */
.el-step__head.is-finish {
  /* color: #FDC003; */
  width: 150px;
  /* border-color: #FDC003; */
}
.el-step__icon {
  width: 100px;
}
.el-step__icon-inner {
  font-size: 36px;
}

.Verification-info .el-input__inner {
  width: 320px;
}
/* .Verification-info .el-input{ */
  /* width: 300px; */
/* } */
</style>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/pic2.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;

  .content {
    margin: 0 auto;
    width: 800px;
    height: 450px;
    position: relative;
    // 步骤条
    .el-steps {
      position: absolute;
      width: 50%;
      top: 15%;
      left: 28%;
      transform: translate(-28%, -10%);
      // margin-top: 30px;
    }

    .el-form {
      width: 400px;
      padding: 20px 20px 20px 0;
      background: rgba(255, 255, 255, 0.3);
      // background-color: #fff;
      position: absolute;
      margin-top: 30px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -40%);
      border-radius: 10px;

      // 手机验证、邮箱验证-标题
      .Verification {
        width: 100%;
        text-align: center;
        margin-top: 14px;
        margin-bottom: 18px;
        span {
          color: black;
          font-size: 20px;
        }
        span:first-of-type {
          border-right: solid 1px #fdc003;
          padding-right: 18px;
          margin-right: 18px;
        }
        .active {
          color: #fdc003;
        }
      }
      // 手机验证、邮箱验证-内容
      .Verification-info {
        width: 400px;
        .el-input {
          width: 30px;
        }
        // 验证码样式的设置 start
        .buttonItem {
          border-radius: 5px;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 10px;
          border: 1px solid #ddd;
          width: 320px;
          input {
            width: 210px;
            height: 40px;
            font-size: 1rem;
            padding-left: 10px;
            border: 0;
            outline: none;
          }
          .sendCode {
            width: 80px;
            border: 0;
            outline: none;
            background-color: #fff;
            cursor: pointer;
          }
        }
        // 验证码样式的设置 end

        .checkinfo {
          font-size: 5px;
          margin-left: 18px;
        }
      }

      .el-form-item {
        margin-top: 24px;
        span {
          color: black;
          font-size: 16px;
          margin-right: 20px;
        }
        .el-input {
          width: 280px;
          height: 30px;
        }
      }
    }

    // 下一步按钮、完成按钮
    .el-button {
      position: absolute;
      top: 98%;
      left: 50%;
      transform: translate(-50%, -20%);
      width: 200px;
      border-radius: 50px;
    }
  }
}
</style>
