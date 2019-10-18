<template>
  <div class="change-tel">
    <div class="nav-tel">
      <form action>
        <div>
          <label for>原手机号码：</label>
          <input v-model="oldPhone" @blur="oldBlur" type="text" name id placeholder="请输入您原先绑定的手机号" />
          <span v-if="!regFlag">手机号格式不正确</span>
        </div>
        <div>
          <label for>现手机号码：</label>
          <input type="text"  name id placeholder="请输入您现在需要绑定的手机号" />
          <button class="code">获取验证码</button>
        </div>
        <div>
          <label for>验证码：</label>
          <input type="text" name id placeholder="请输入您的验证码" />
          <img src="@/assets/images/personal/dagou.png" alt />
          <span>验证通过</span>
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
      oldPhone:'',
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
    oldBlur(){
      var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      this.regFlag = telReg.test(this.oldPhone);

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
  width: 800px;
  margin-top: 200px;
  text-align: right;
  form {
    div {
      margin-top: 20px;
      display: flex;
      align-items: center;
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