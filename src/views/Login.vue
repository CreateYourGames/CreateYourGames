<template>
  <div class="container">
    <div class="left">
      <div class="txt">
        <p>Welcome Back!</p>
        <p>To keep connected with please login with your presonal ifon</p>
      </div>
    </div>

    <div class="right">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="75px"
        class="demo-ruleForm"
      >
        <p class="title">Create Your Games</p>
        <el-form-item prop="userPhone" class="form" label-width="24px">
          <span>手机号</span>
          <el-input type="text" v-model="ruleForm.userPhone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="form" label-width="38px">
          <span>密码</span>
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <p class="check">
          <input type="checkbox" id="check-pwd" v-model="ruleForm.rem" />
          <span>记住密码</span>
          <span @click="Password">找回密码</span>
        </p>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button type="primary" @click="Register()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var PhoneValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      setTimeout(() => {
        //   判断条件
        if (!value) {
          return callback(new Error("手机号不能为空！"));
        } else {
          const reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      }, 1000);
    };
    return {
      ruleForm: {
        userPhone: "",
        checkPass: "",
        rem: false
      },
      rules: {
        userPhone: { required: true, trigger: "blur", validator: PhoneValue },
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // console.log(this.$store.state.rememberPwd);
    this.ruleForm.rem = this.$store.state.rememberPwd;
    // 记住密码
    if (this.$store.state.token.loginName) {
      console.log("走了token");
      this.ruleForm.userPhone = this.$store.state.token.loginName;
      this.ruleForm.checkPass = this.$store.state.token.pwd;
    } else {
      console.log("走了cookie");
      this.getCookie();
    }
  },
  methods: {
    submitForm(formName) {
      // this.$api.login
      //   .login({ Id: this.ruleForm.userPhone, Pwd: this.ruleForm.checkPass })
      //   .then(res => {
      //     if (res == true) {
      //       var obj = {
      //         loginName: this.ruleForm.userPhone,
      //         pwd: this.ruleForm.checkPass
      //       };
      //       this.$store.commit("getToken", obj);
      //       this.$message({
      //         message: "登录成功",
      //         type: "success"
      //       });
      //       this.$router.push("/").catch(err => console.log(err));
      //     } else {
      //       this.$message.error("该用户不存在或密码错误");
      //     }
      //   });

      // 记住密码
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 判断复选框是否被勾选 勾选则调用配置cookie方法
          if (this.ruleForm.rem == true) {
            this.$store.state.rememberPwd = true;
            console.log("checked == true");
            // 传入账号名，密码，和保存天数3个参数
            this.setCookie(
              this.ruleForm.userPhone,
              this.ruleForm.checkPass,
              this.ruleForm.rem,
              7
            );

            this.$api.login
              .login({
                Id: this.ruleForm.userPhone,
                Pwd: this.ruleForm.checkPass
              })
              .then(res => {
                if (res == true) {
                  var obj = {
                    loginName: this.ruleForm.userPhone,
                    pwd: this.ruleForm.checkPass
                  };
                  this.$store.commit("getToken", obj);
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  if (this.$store.state.newRouter) {
                    this.$router.push(`${this.$store.state.newRouter}`);
                  } else {
                    this.$router.push("/").catch(err => console.log(err));
                  }
                } else {
                  this.$message.error("该用户不存在或密码错误");
                }
              });
          } else {
            console.log("未保存密码");
            this.$store.state.rememberPwd = false;

            this.$api.login
              .login({
                Id: this.ruleForm.userPhone,
                Pwd: this.ruleForm.checkPass
              })
              .then(res => {
                if (res == true) {
                  var obj = {
                    loginName: this.ruleForm.userPhone,
                    pwd: this.ruleForm.checkPass
                  };
                  this.$store.commit("getToken", obj);
                  this.$message({
                    message: "登录成功",
                    type: "success"
                  });
                  if (this.$store.state.newRouter) {
                    this.$router.push(`${this.$store.state.newRouter}`);
                  } else {
                    this.$router.push("/").catch(err => console.log(err));
                  }
                } else {
                  this.$message.error("该用户不存在或密码错误");
                }
              });

            // this.$router.push("/").catch(err => console.log(err));
            console.log("清空Cookie");
            // 清空Cookie
            this.clearCookie();
            console.log("清空Tookie");
            // 清空token
            var obj = {
              loginName: this.ruleForm.userPhone,
              pwd: null
            };
            this.$store.commit("getToken", obj);
          }
        } else {
          return false;
        }
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, c_status, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie`
      window.document.cookie =
        "userPhone=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwdStatus=" + c_status + ";path/;expires=" + exdate.toGMTString();
    },
    //读取cookie
    getCookie() {
      if (document.cookie.length > 0) {
        // 先获取cookie字符串，再将字符串切割
        var arr = document.cookie.split("; "); //这里显示的格式需要切割// console.log(arr)
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割 //判断查找相对应的值
          // console.log(arr, arr2);
          if (arr2[0] == "userPhone") {
            this.ruleForm.userPhone = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.checkPass = arr2[1];
          } else if (arr2[0] == "userPwdStatus") {
            if (arr2[1] == "true") {
              this.ruleForm.rem = true;
            } else {
              this.ruleForm.rem = false;
            }
          }
        }
      }
    },
    //清除cookie
    clearCookie() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    Register() {
      this.$router.push("/Register");
    },
    Password() {
      this.$router.push("/Login/SafetyCenter");
    }
  },
  created() {}
};
</script>

<style scoped lang="scss">
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

  .left {
    background: rgba(255, 255, 255, 0.6);
    width: 380px;
    height: 480px;
    // background-color: white;
    border-right: solid 0.2px #d1d1d1;
    // margin-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .txt {
      width: 300px;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p:first-of-type {
        color: #c8a080;
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 75px;
      }
      p:last-of-type {
        color: #a7856b;
        font-size: 14px;
        text-align: center;
        line-height: 28px;
      }
    }
  }
  .right {
    .el-form {
      width: 380px;
      height: 480px;
      padding: 20px 20px 20px 0;
      background: rgba(255, 255, 255, 0.6);
      // background-color: #fff;

      //文字：createyourgames
      p:first-of-type {
        width: 100%;
        margin-top: 10px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        color: black;
        font-weight: bold;
        margin-left: 10px;
      }

      //input的设置:账号距离上面的距离
      .el-form-item:first-of-type {
        margin-top: 35px;
      }
      //   .el-form-item__error {
      //     margin-left: 125px !important;
      //   }

      //input的设置:账号、密码
      .form {
        span {
          margin-right: 25px;
        }
        .el-input {
          width: 240px;
          height: 30px;
        }
      }

      //文字：记住密码，找回密码的设置
      p.check {
        margin-top: 30px;
        width: 100%;
        height: 42px;
        line-height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          margin-left: 15px;
          margin-right: 5px;
          width: 16px;
          height: 16px;
        }
        span:first-of-type {
          margin-right: 60px;
        }
        span {
          line-height: 42px;
          font-size: 14px;
          color: black;
        }
      }

      //button按钮的设置,signin register
      .el-form-item:last-of-type {
        margin-top: 30px;
        margin-left: -20px;
      }
      .el-button {
        width: 120px;
        margin-right: 20px;
      }
    }
  }
}
</style>