<template>
  <div class="container">
    <div class="register">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <p>信息完善</p>

        <el-form-item label="头像" prop="userName">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="昵称" prop="Name">
          <el-input type="text" v-model="ruleForm.Name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="Sex">
          <el-radio v-model="radio" label="1" name="radio">男</el-radio>
          <el-radio v-model="radio" label="2" name="radio">女</el-radio>
        </el-form-item>

        <el-form-item label="出生年月" prop="Birth">
          <el-date-picker v-model="value" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号" prop="Phone">
          <el-input type="text" v-model.number="ruleForm.Phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="Email">
          <el-input type="text" v-model="ruleForm.Email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var NameValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        callback();
      }
      //   判断条件
      // if (!Number.isInteger(value)) {
      //   callback(new Error("请输入数字值"));
      // }
      // // else {
      // //   if (value < 18) {
      // //     callback(new Error("必须年满18岁"));
      // //   }
      //   else {
      //     callback();
      //   }
      // // }
    };
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
    var EmailValue = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (!value) {
          return callback(new Error("邮箱不能为空！"));
        } else {
          const reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      }, 1000);
    };

    return {
      radio: "1",
      value: "",
      param: "", //表单要提交的参数
      imageUrl: "", //图片地址
      // uploadeURL: base.dev + base.proxy + base.uploadeURL,
      ruleForm: {
        Name: "",
        Phone: "",
        Email: ""
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
          {
            validator: PhoneValue,
            required: true,
            trigger: "blur"
          }
        ],
        Email: [
          {
            validator: EmailValue,
            required: true,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$router.push("/login").catch(err => console.log(err));
        } else {
          return false;
        }
      });

      this.$api.registerPerfect.registerPerfect({
        pic: this.imageUrl,
        name: this.ruleForm.Name,
        sex: this.radio == 1 ? "男" : "女",
        birth: this.value,
        phone: this.ruleForm.Phone,
        email: this.ruleForm.Email,
        loginName: this.$store.state.token.loginName
      });
      console.log("pic是：" + this.imageUrl);
    
    },

    handleAvatarSuccess(res, file) {
      var windowURL = window.URL || window.webkitURL;
      // this.imageUrl=windowURL.createObjectURL(file.raw)
      // this.imageUrl=file.URL

      // this.imageUrl=res.data.url;
      this.imageUrl = windowURL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isIMG =
        file.type == "image/jpeg" ||
        file.type == "image/png" ||
        file.type == "image/jpeg" ||
        file.type == "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isIMG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/JPEG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isIMG && isLt2M;
    },
    // onchange(file,fileList){
    //   var _this=this;
    //   var event=event||window.event;
    //   var file=event.target.file;
    //   var reader=new FileReader();
    //   reader.onload=function(e){
    //     _this.imageUrl=e.target.result;
    //   }
    //   reader.readAsDataURL(file);

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

  .register {
    display: flex;
    justify-content: center;
    .el-form {
      width: 500px;
      height: 100%;
      padding: 20px 70px;
      background: rgba(255, 255, 255, 0.6);
      // background-color: #fff;
      margin-top: 15px;

      // 头像设置 start
      .el-form-item:first-of-type {
        margin-top: 30px;
      }
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        margin-left: 60px;
        font-size: 28px;
        color: #8c939d;
        width: 58px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        border: solid 1px #8c939d;
        border-radius: 50%;
      }
      .avatar {
        margin-left: 60px;
        border-radius: 50%;
        width: 58px;
        height: 58px;
        display: block;
        border: solid 1px #8c939d;
      }
      // 头像设置 end

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
}
</style>