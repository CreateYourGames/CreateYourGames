<template>
  <div class="container">
    <div class="register">
      <form action="/api/register" method="post" enctype="multipart/form-data">
        <p>个人信息完善</p>

        <div class="mid">
          <div class="title">
            <label for>头像：</label>
          </div>
          <div class="pic">
            <input type="text" name="Picture" style="display:none;" />
            <img class="img" name="picture" :src="pic" alt />
            <input type="file" ref="input" name="pic" style="display:none;" @change="changeImg()" />
            <div
              class="up-img"
              @click="fileClick"
              @mouseover="addStyle"
              v-bind:class="{style:enable}"
              @mouseout="removeStyle"
            ></div>
          </div>
        </div>

        <div class="mid">
          <div class="title">
            <label for>昵称:</label>
          </div>
          <div class="mid-em">
            <input
              type="text"
              name="name"
              v-model="Name"
              autocomplete="off"
              @blur="nameBlur"
              placeholder="请输入您的昵称"
            />
            <span class="emil-tips" v-if="!nameFlag">昵称不能为空,且在3-10个字符内</span>
          </div>
        </div>

        <div class="mid">
          <div class="title">
            <label for>性别:</label>
          </div>
          <div class="mid-em">
            <select v-model="radio" name="sex" style="display: inline;">
              <option value="男">男</option>
              <option value="女">女</option>
            </select>
          </div>
        </div>

        <div class="mid">
          <div class="title">
            <label for>出生年月:</label>
          </div>
          <div class="mid-em">
            <input type="date" name="birth" />
          </div>
        </div>

        <div class="mid">
          <div class="title">
            <label for>邮箱:</label>
          </div>
          <div class="mid-em">
            <input
              type="text"
              name="email"
              v-model="Email"
              id
              autocomplete="off"
              @blur="emailBlur"
              placeholder="请输入您的邮箱"
            />
            <span class="emil-tips" v-if="!regFlag">邮箱格式不对</span>
          </div>
        </div>

        <div class="mid">
          <input type="hidden" name="loginName" :value="this.$store.state.token.loginName" />
        </div>
        <div class="mid-btn">
          <input type="submit" value="注册" class="btn" @click="submitForm()" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regFlag: true, //判断邮箱的正确与否
      nameFlag: true, //判断昵称有没有输入
      enable: false,
      pic: "", //头像图片
      radio: "男", //性别
      loginName: this.$store.state.token.loginName
    };
  },

  methods: {
    // 头像
    changeImg() {
      let event = event || window.event;
      console.log("11" + event.target.files[0]);
      this.pic = this.getObjectURL(event.target.files[0]);
      console.log("22" + this.pic);
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    fileClick() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    // 鼠标移入移出
    addStyle() {
      this.enable = true;
    },
    removeStyle() {
      this.enable = false;
    },

    emailBlur() {
      var emilReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      this.regFlag = emilReg.test(this.Email);
    },
    nameBlur() {
      var nameReg =/^\S{3,10}$/;
      this.nameFlag = nameReg.test(this.Name);
    },

    submitForm() {}
  },
  created() {
    console.log(this.loginName);
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100% +100px);
  background-image: url("../assets/images/login/bg.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  .register {
    width: 560px;
    height: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.6);
    display: flex;
    flex-direction: columns;
    justify-content: center;

    p {
      margin-top: 45px;
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 36px;
      color: black;
      font-weight: bold;
      font-family: 楷体;
    }

    // 头像的设置
    .mid {
      // 头像的设置
      .pic {
        width: 120px;
        height: 110px;
        position: relative;
        .style {
          width: 120px;
          height: 110px;
          background-color: rgba(128, 128, 128, 0.4);
          background-image: url("../assets/images/personal/z.png");
          background-size: 50px 50px;
          background-repeat: no-repeat;
          background-position: 50% 50%;
          cursor: pointer;
        }
        .img {
          // margin-top: 20px;
          width: 120px;
          height: 120px;
          position: absolute;
          border-radius: 50%;
          margin-left: -10px;
          background-image: url("../assets/images/personal/z.png");
          background-size: 115px 115px;
          border: solid 1px rgb(153, 0, 255);
        }
        .up-img {
          margin-left: 50px;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 100px;
          position: absolute;
          cursor: pointer;
          img {
            width: 50px;
            height: 50px;
            vertical-align: middle;
          }
        }
      }
    }

    .mid {
      width: 350px;
      text-align: center;
      display: flex;
      align-items: center;
      margin: 30px 0;
      .title {
        width: 80px;
        float: left;
        text-align: right;
        margin-left: -20px;
        margin-right: 10px;
        margin-top: -28px;
      }
      input,
      select {
        width: 240px;
        height: 36px;
        margin-left: 20px;
        border-radius: 5px;
        padding-left: 15px;
        border: none;
      }

      // 邮箱信息
      .mid-em {
        height: 60px;
        display: flex;
        flex-direction: column;
        span {
          color: red;
          font-size: bold;
          margin-top: 5px;
          margin-left: -100px;
        }
      }
    }

    // 按钮的设置
    .mid-btn {
      margin-top: -30px;
      display: flex;
      align-items: center;
      justify-content: center;
      input {
        height: 36px;
        border: none;
        width: 160px;
        border-radius: 50px;
        color: #fff;
        text-align: center;
        background-color: #409eff;
        margin-bottom: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>