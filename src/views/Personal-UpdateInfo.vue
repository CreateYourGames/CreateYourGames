<template>
  <div class="info">
    <!-- 顶部 -->
    <div class="info-nav" ref="style">
      <!-- <input type="file" ref="input" name id style="display:none;" /> -->
      <div>
        <!-- 头像 -->
        <div class="upload-image">
          <form action="/api/updateInfo" method="post" ref="form" enctype="multipart/form-data">
            <input type="hidden" name="loginName" :value="$store.state.token.loginName">
            <input
                class="upload-btn"
                type="file"
                name="image"
                accept="image/*"
                ref="upload"
                @change="IconChange($event)"
                :class="{style:enable}"
                @mouseover="addStyle"
                @mouseout="removeStyle"
              />
            <div class="butt">
              <input type="button" @click="save()" value="保存">
              <input type="button" @click="cancel()" value="取消">
            </div>
          </form>
          <img class="img" :src="picture" alt />
        </div>
      </div> 
    </div>
    <!-- 内容 -->
    <div class="info-out">
      <div class="content">
        <div class="form">
        <!-- <form action> -->
          <div>
            <label for>昵称：</label>
            <input type="text" v-model="nickName" />
            <!-- <input type="text" v-model="this.nickName" readonly style="border:none;" /> -->
          </div>
          <div>
            <label for>性别：</label>
            <select v-model="sex">
              <option value="0">男</option>
              <option value="1">女</option>
            </select>
            <!-- <input type="text" v-model="this.nickName" readonly style="border:none;" /> -->
          </div>
          <el-form status-icon label-width="80px" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label prop="Birth" label-width="0">
              <label for style="float:left">出生年月：</label>
              <el-date-picker
                style="margin-top:5px;"
                v-model="birth"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <!-- <div>
              <label for>昵称：</label>
              <input type="text" v-model="nickName" /> -->
              <!-- <input type="text" v-model="this.nickName" readonly style="border:none;" /> -->
            <!-- </div>
            <div>
              <label for>性别：</label>
              <select name="sex" v-model="radio">
                <option value="男">男</option>
                <option value="女">女</option>
              </select>
            
            </div>
            <el-form status-icon label-width="80px" ref="ruleForm" class="demo-ruleForm">
              <el-form-item label prop="Birth" label-width="0">
                <label for style="float:left">出生年月：</label>
                <el-date-picker
                  style="margin-top:5px;"
                  v-model="birth"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-form> -->
            <div>
              <label for>邮箱：</label>
              <input type="text" v-model="email" readonly style="border:none;margin-top:5px;" />
              <button type="button" @click="jumpEmil()">修改邮箱</button>
            </div>
            <div>
              <label for>手机号：</label>
              <input type="text" v-model="this.tel" readonly style="border:none;margin-top:5px;" />
              <button type="button" @click="jumpTel()">修改手机</button>
            </div>
            <div>
              <label for class="special">个人简介：</label>
              <textarea cols="30" rows="10" v-model="personalInfo"></textarea>
            </div>
          </div>
        </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
      // 个人信息
      picture: "",
      nickName: "",
      sex: "", //性别
      value: "", //出生日期
      email: "",
      tel: "",
      birth: "",
      personalInfo: "",
      file:''
    };
  },
  created() {
    // 获取“个人信息”
    this.$api.loginInfo
      .getLoginInfo(this.$store.state.token.loginName)
      .then(res => {
        // console.log(res)
        this.picture = res.userMsg[0].picture; //头像
        this.nickName = res.userMsg[0].nickName; //个人昵称
        this.radio = res.userMsg[0].gender; //性别
        this.birth = res.userMsg[0].birthDate, //日期
        this.email = res.userMsg[0].email; //邮箱
        this.tel = res.userMsg[0].userLoginName; //联系方式
        this.personalInfo = res.userMsg[0].personalInfo; //个人简介
      })
      .catch(err => console.log(err));

  },
  mounted() {
    // console.log(this.$refs.upload.uploadFiles)
    // console.log(this.$refs.upload)
    // console.log(this.$refs.upload.value)
  },
  methods: {
    IconChange(e) {
      const file = e.target.files[0];
      console.log(file);
      this.file=file
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size;
      const _this = this; // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 5000 * 1024) {
        // 合格
        _this.errorStr = "";
        _this.picture = this.getObjectURL(file)
      } else {
        this.$message.error("图片大小不符，请重新上传大小5M以内的图片!");
      }
      this.$refs.form.submit();
    },
    getObjectURL (file) {
        let url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        }else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        }
        return url ;
    },
    jumpEmil() {
      this.$router.push("/Personal/ChangeMail").catch(err => console.log(err));
    },
    jumpTel() {
      this.$router.push("/Personal/ChangeTel").catch(err => console.log(err));
    },
    // fileClick() {
    //   this.$refs.input.dispatchEvent(new MouseEvent("click"));
    // },
    addStyle() {
      this.enable = true;
    },
    removeStyle() {
      this.enable = false;
    },
    save() {
      //修改个人信息
      this.$api.personal.PersonalInfo({
        loginName: this.$store.state.token.loginName,//旧手机号
        nickName: this.nickName,
        gender: this.gender,
        birthDate: this.birth,
        email: this.email,
        userLoginName: this.tel,//新手机号
        personalInfo: this.personalInfo
      }).then(res=>{
        if(res==true){
          this.$router.push("/Personal");
        }
      });
    },

    cancel() {
      this.$router.push("/Personal");
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  background-image: url("../assets/images/personal/texture.png");
  background-color: #eeeeee;
  background-size: cover;
}

// top
.info-nav {
  height: 200px;
  background-color: gray;
  text-align: center;
  position: relative;
  background-image: url("../assets/images/personal/info.jpg");
  //   background-repeat: no-repeat;
  //   background-size: 100% 100%;
  // img {
  //     width: 150px;
  //     height: 150px;
  //     border-radius: 100px;
  //     margin-top: 30px;
  //   }

  .upload-image {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .upload-btn {
      display: block;
      opacity: 0;
      width: 150px;
      height: 150px;
      border-radius: 100px;
      position: absolute;
      top: 25px;
      border: none;
      cursor: pointer;
      color: #fff;
    }
    .img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      // margin-top: 30px;
      border-radius: 100px;
    }
  }

  .style {
    width: 150px;
    height: 150px;
    border-radius: 100px;
    background-color: rgba(128, 128, 128, 0.4);
    background-image: url("../assets/images/personal/z.png");
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    position: absolute;
    cursor: pointer;
  }
  .butt {
    position: absolute;
    right: 150px;
    bottom: 20px;
    input {
      width: 100px;
      height: 30px;
      margin-left: 30px;
      color: #fff;
      border: none;
      background-color: rgba(128, 128, 128, 0.4);
      border-radius: 20px;
      outline: none;
      cursor: pointer;
    }
  }
}

//表单开始
.info-out {
  display: flex;
  justify-content: center;
  align-items: center;
}

// content
.content {
  height: 600px;
  text-align: right;
  // border: 1px solid red;
  .form {
    div {
      margin-top: 20px;
      display: flex;
      align-items: center;
      p {
        cursor: pointer;
        height: 40px;
        vertical-align: middle;
        line-height: 45px;
        margin-right: 20px;
      }
    }
  }
  .special {
    margin-top: -150px;
    text-align: right;
    width: 100px;
  }
  label {
    font-size: 18px;
    text-align: right;
    margin-right: 15px;
    width: 100px;
  }
  input {
    width: 270px;
    height: 40px;
    margin-top: 10px;
    outline: none;
    background-color: #eeeeee;
    border: 1px solid gray;
    border-radius: 10px;
    padding-left: 15px;
  }
  // .el-date-picker{
  //    width: 270px;
  //   height: 40px;
  //   margin-top: -10px;
  //   outline: none;
  //   background-color: #eeeeee;
  //   border: 1px solid gray;
  //   border-radius: 10px;
  //   padding-left: 15px;
  // }
  select {
    width: 270px;
    height: 40px;
    margin-top: 10px;
    background-color: #eeeeee;
    border: 1px solid gray;
    padding-left: 15px;
  }
  button {
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin-top: 5px;
    margin-left: -90px;
  }
  textarea {
    width: 270px;
    height: 200px;
    margin-top: 10px;
    font-size: 16px;
    font-family: 微软雅黑;
    background-color: #eeeeee;
    outline: none;
    border-radius: 10px;
    padding: 12px;
  }
}
</style>