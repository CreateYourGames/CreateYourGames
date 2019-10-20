<template>
  <div class="container">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel trigger="click" height="500px">
        <el-carousel-item v-for="item in pictureList" :key="item.id">
          <img :src="item.img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <p>欢迎注册Create Your Games</p>
      <el-form-item prop="userPhone" label-width="0">
        <span>手机号</span>
        <el-input @blur="goRUN" type="text" v-model="ruleForm.userPhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="Verification-info" label-width="0px" style="margin-top:-15px;">
        <span>验证码</span>
        <div class="buttonItem">
          <input type="text" placeholder="输入验证码" />
          <div @click="sendMessage">{{btnText}}</div>
        </div>

        <!-- <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input> -->
      </el-form-item>
      <el-form-item prop="Pass" label-width="0" style="margin-top:-15px;">
        <span>密码</span>
        <el-input type="password" name="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label-width="0" style="margin-top:-10px;">
        <span>确认密码</span>
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  //   name:"register",
  data() {
    var CheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.Pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    var userPhone = (rule, value, callback) => {
      setTimeout(() => {
        //   判断条件
        if (!value) {
          return callback(new Error("手机号不能为空！"));
        } else {
          const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      }, 1000);
    };

    return {
      btnText: "获取验证码",
      pictureList: [
        { id: 1, img: require("@/assets/images/login/yx1.png") },
        { id: 2, img: require("@/assets/images/login/yx2.png") },
        { id: 3, img: require("@/assets/images/login/yx3.png") }
      ],
      ruleForm: {
        userPhone: "",
        Pass: "",
        checkPass: ""
      },
      rules: {
        userPhone: [
          {
            validator: userPhone,
            required: true,
            // message: "请输入手机号",
            trigger: "blur"
          }
          // { min: 10, max: 12, message: "账号长度为3-7个字符", trigger: "blur" },
          // { validator:userPhone}
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
    submitForm(formName) {
      this.$api.register.register({
        loginName: this.ruleForm.userPhone,
        pwd: this.ruleForm.Pass
      });
      var obj = {
        loginName: this.ruleForm.userPhone,
        pwd: this.ruleForm.Pass
      };
      this.$store.commit("getToken", obj);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/RegisterPerfect").catch(err => console.log(err));
        } else {
          return false;
        }
      });
    },
    // 验证码的点击事件
    sendMessage() {
      if (this.btnDisabled) {
        return;
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
    },
    goRUN() {
      return this.$api.register
        .registerJudge(this.ruleForm.userPhone)
        .then(res => {
          if (res == false) {
            this.$message.error("该用户已存在");
          }
          return res;
        });
    }
    // backHome(){
    //     this.$router.push('/')
    // }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/bg.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .block {
    width: 400px;
    margin-right: 30px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      //   line-height: 600px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
  }

  .el-form {
    width: 500px;
    padding: 20px 70px;
    border-radius: 10px;

    .el-form-item {
      span {
        color: white;
      }
    }
    .el-form-item:first-of-type {
      margin-top: 15px;
    }

    p {
      width: 100%;
      height: 80px;
      line-height: 80px;
      text-align: center;
      font-size: 24px;
      color: white;
      font-weight: bold;
    }

    .el-button {
      width: 200px;
      border-radius: 50px;
      margin-top: 24px;
    }
  }

  // 手机验证、邮箱验证-内容
  .Verification-info {
    width: 400px;
    // 验证码样式的设置 start
    .buttonItem {
      border-radius: 5px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      border: 1px solid #ddd;
      width: 360px;
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
  }
}
</style>