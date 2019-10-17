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
      <el-form-item prop="userName" label-width="0">
        <span>用户名</span>
        <el-input type="text" v-model="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="Pass" label-width="0">
        <span>密码</span>
        <el-input type="password" v-model="ruleForm.Pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass" label-width="0">
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
    return {
      pictureList: [
        { id: 1, img: require("@/assets/images/login/yx1.png") },
        { id: 2, img: require("@/assets/images/login/yx2.png") },
        { id: 3, img: require("@/assets/images/login/yx3.png") }
      ],
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
          this.$router.push("/RegisterPerfect").catch(err => console.log(err));
        } else {
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
      margin-top: 24px;
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
}
</style>