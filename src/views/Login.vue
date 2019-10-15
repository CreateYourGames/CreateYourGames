<template>
  <div class="login">
       <div class="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="75px"
      class="demo-ruleForm"
    >
      <p>Create Your Games</p>
      <el-form-item label="账号" prop="userName">
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <p class="check">
        <input type="checkbox" id="check-pwd" />
        <span>记住密码</span>
        <span @click="Password()">找回密码</span>
      </p>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">SIGN IN</el-button>
        <el-button type="primary" @click="Register()">REGISTER</el-button>
        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      </el-form-item>
    </el-form>

    <!-- <div class="login">
      <div @click="register">去注册</div>
      <div @click="findPass">找回密码</div>
      <div @click="backHome">返回主页</div> 
    </div> -->
  </div>
  </div>
</template>

<script>
export default {
//   name: "login",
  data() {
    return {
      ruleForm: {
        userName: "",
        checkPass: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 7, message: "账号长度为3-7个字符", trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 16, message: "密码长度为6-16个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push("/").catch(err => console.log(err));
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    Register() {
       this.$router.push("/Register");
    },
    Password() {
      this.$router.push("/Login/SafetyCenter");
    },


    // findPass() {
    //   this.$router.push("/Login/FindPassword1");
    // },
    // register() {
    //   this.$router.push("/Register");
    // },
    // backHome() {
    //   this.$router.push("/");
    // }
  }
};
</script>

<style scoped lang="scss">
.login{
    width: 100%;
  height: 100%;
  background-image: url("../assets/images/home/bg.png");
 .container {


  .el-form {
    width: 400px;
    padding: 20px 20px 20px 0;
    background-color: #fff;
    position: absolute;
    margin-top: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .el-form-item__label {
      margin-left: -60px;
    }
    .check {
      height: 42px;
      margin-top: -24px;
      margin-bottom: 14px;
      span {
        margin-top: -30px;
        line-height: 42px;
        font-size: 14px;
        margin-right: 75px;
      }
    }
    p {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      font-size: 32px;
      color: black;
      font-weight: bold;
    }
    .el-form-item:first-of-type {
      margin-top: 30px;
    }

    .el-input {
      height: 30px;
    }

    .el-button{
      width: 120px;
      margin-right: 10px;
    }
  }
}
}

// .login {
//   div {
//     cursor: pointer;
//   }
// }
</style>