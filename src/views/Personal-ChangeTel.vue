<template>
  <div class="change-tel">
    <div class="nav-tel">
      <form action>
        <div>
          <label for>原手机号码：</label>
          <input v-model="oldPhone" @blur="oldBlur" type="text" name id placeholder="请输入您原先绑定的手机号" />
          <span class="tel-tips" v-if="!regFlag">手机号格式不正确</span>
        </div>
        <div>
          <label for>现手机号码：</label>
          <input
            v-model="newPhone"
            @blur="newBlur"
            type="text"
            name
            id
            placeholder="请输入您现在需要绑定的手机号"
          />
          <input
            type="button"
            class="code"
            v-model="codeMsg"
            @click="getCode"
            :disabled="codeDisabled"
          />
          <span class="tel-tips" v-if="!regFlag">手机号格式不正确</span>
        </div>
        <div>
          <label for>验证码：</label>
          <input class="codeBtn" type="text" name id placeholder="请输入您的验证码" />
          <div v-if="codeFlag" style="margin-top:-3px;">
            <img style="margin-right:5px;" src="@/assets/images/personal/dagou.png" alt />
            <span>验证通过</span>
          </div>
          <div v-else style="margin-top:-3px;">
            <img style="margin-right:5px;" src="@/assets/images/personal/cuowu.png" alt />
            <span class="false">验证失败</span>
          </div>
        </div>
        <div class="btn">
          <button class="define" @click="go()">确定</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否禁用按钮
      codeDisabled: false,
      // 倒计时秒数
      countdown: 60,
      // 按钮上的文字
      codeMsg: "获取验证码",
      // 定时器
      timer: null,

      // 验证码是否正确
      codeFlag:true,

      oldPhone: "",
      newPhone: "",
      regFlag: true,
      rules: {
        phone: [
          { required: true, message: "请填写手机号码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    go() {
      this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
    },
    oldBlur() {
      var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      this.regFlag = telReg.test(this.oldPhone);
    },
    newBlur() {
      var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      this.regFlag = telReg.test(this.newPhone);
    },
    // 获取验证码
    getCode() {
      // 验证码60秒倒计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--;
            if (this.countdown !== 0) {
              this.codeMsg = "重新发送(" + this.countdown + ")";
            } else {
              clearInterval(this.timer);
              this.codeMsg = "获取验证码";
              this.countdown = 60;
              this.timer = null;
              this.codeDisabled = false;
            }
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.change-tel {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-tel {
  width: 820px;
  margin-top: 200px;
  text-align: right;
  form {
    div {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .tel-tips {
        color: red;
        font-size: 13px;
        margin-left: 20px;
      }
      .false{
        color: #F44336;
      }
      &.btn {
        justify-content: center;
      }
    }
    label {
      width: 250px;
      text-align: right;
      font-size: 20px;
    }
    input {
      width: 290px;
      height: 40px;
      border: 1px solid gray;
      border-radius: 20px;
      padding-left: 20px;
      outline: none;
    }
    .code {
      width: 120px;
      height: 40px;
      background-color: #fec003;
      border: none;
      border-radius: 20px;
      color: #fff;
      font-size: 15px;
      padding-right: 20px;
      outline: none;
      cursor: pointer;
      margin-left: 20px;
    }
    span {
      color: #259b24;
      font-weight: 600;
    }
    .define {
      width: 200px;
      height: 40px;
      background-color: #fec003;
      border: none;
      border-radius: 20px;
      color: #fff;
      font-size: 20px;
      font-weight: 300;
      outline: none;
      cursor: pointer;
    }
    img {
      width: 25px;
      height: 25px;
      margin-left: 30px;
    }
  }
  input::-webkit-input-placeholder {
    font-size: 14px; /* placeholder字体大小  */
  }
}
</style>