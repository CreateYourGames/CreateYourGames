<template>
  <div class="change-emil">
    <Header></Header>


    <div class="nav-emil">
      <form action>
        <div>
          <label for>邮箱账号：</label>
          <input v-model="Emil" @blur="emilBlur" type="text" name id placeholder="请输入您现在需要绑定的手机号" />
          <input
            type="button"
            class="code"
            v-model="codeMsg"
            @click="getCode"
            :disabled="codeDisabled"
          />
          <span class="emil-tips" v-if="!regFlag">邮箱格式不正确</span>
        </div>
        <div>
          <label for>验证码：</label>
          <input type="text" name id placeholder="请输入您的验证码" />
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
import Header from "@/components/SafetyCenter/Header";
export default {
  data(){
    return{
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

      Emil: "",
      regFlag: true,
      rules: {
        emil: [
          { required: true, message: "请填写邮箱", trigger: "change" }
        ]
      }
    }
  },
  methods: {
    go() {
      this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
    },
    emilBlur(){
      var emilReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      this.regFlag = emilReg.test(this.Emil);
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
  }, 
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
.change-emil{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  Header{
    background-color: black;
  }
}
.nav-emil {
  width: 800px;
  margin-top: 200px;
  text-align: right;
  form{
      div {
      margin-top: 20px;
      display: flex;
      align-items: center;
      .emil-tips {
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