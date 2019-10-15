<template>
  <div class="container">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      ref="ruleForm"
      class="demo-ruleForm"
    >
      <p>欢迎注册Create Your Games</p>
      <el-form-item label="用户名" prop="userName">
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="Pass">
        <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
  <!-- <div class="register">
        <div @click="backHome">返回主页</div>
  </div>-->
</template>

<script>
export default {
//   name: "register",
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
    return {
      ruleForm: {
        userName: "",
        Pass: "",
        checkPass: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 7, message: "账号长度为3-7个字符", trigger: "blur" }
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
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$router.push("/RegisterPerfect").catch(err => console.log(err));
        } else {
          alert("error submit!!");
          return false;
        }
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
  background-image: url("../assets/images/home/bg.png");

  .el-form {
    width: 500px;
    padding: 20px 70px;
    background-color: #fff;
    position: absolute;
    margin-top: 30px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    .el-form-item:first-of-type {
      margin-top: 30px;
    }

    p {
      width: 100%;
      height: 42px;
      line-height: 42px;
      text-align: center;
      font-size: 24px;
      color: black;
      font-weight: bold;
    }

    .el-button {
      width: 200px;
      border-radius: 50px;
      margin-top: 10px;
      // margin-left: 90px;
    }
  }
}
</style>