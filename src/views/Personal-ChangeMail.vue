<template>
  <div class="change-emil">
    <Header></Header>

    <div class="contant">
      <div class="nav-emil">
        <form action>
          <div>
            <label for>邮箱账号：</label>
            <div class="middle">
              <input
                v-model="Emil"
                @blur="emilBlur"
                type="text"
                name
                id
                placeholder="请输入您现在需要绑定的邮箱"
              />
              <span class="emil-tips" v-if="!regFlag">邮箱格式不正确</span>
            </div>

            <input
              type="button"
              class="code"
              v-model="codeMsg"
              @click="getCode"
              :disabled="codeDisabled"
            />
          </div>
          <div>
            <label for>验证码：</label>
            <div class="middle">
              <input type="text" v-model="YZM" @blur="JudgeYZM" name id placeholder="请输入您的验证码" />
            </div>

            <div v-if="codeFlag && Flag & YZM!=''" style="margin-top:-38px;">
              <img style="margin-right:5px;" src="@/assets/images/personal/dagou.png" alt />
              <span>验证通过</span>
            </div>
            <div v-if="!codeFlag && Flag" style="margin-top:-40px;">
              <img style="margin-right:5px;" src="@/assets/images/personal/cuowu.png" alt />
              <span class="false">验证失败</span>
            </div>
          </div>
          <div class="btn">
            <button class="define" @click="goPerson()">取消</button>
            <button class="define" @click="go()">确定</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/personal/Header";
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
      codeFlag: true,

      Flag: 0, //未书写时的状态

      YZM: "", //书写的验证码
      yzm: "", //发送的验证码

      Emil: "",
      regFlag: true,
      rules: {
        emil: [{ required: true, message: "请填写邮箱", trigger: "change" }]
      }
    };
  },
  methods: {
    go() {
      // if(this.codeFlag===true){
      //   // 如果正确，则发送给后台让其改数据
      //    this.$api.verify.personalEmail({
      //     loginName: this.$store.state.token.loginName,
      //     Email: this.Emil
      //   });
      //   this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
      // }
    },

    // 取消，回个人信息页
    goPerson() {
      this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
    },

    // 判断验证码是否正确
    JudgeYZM() {
      this.Flag = true;
      if (this.YZM === this.yzm) {
        this.codeFlag = true;
      } else {
        this.codeFlag = false;
      }
    },

    emilBlur() {
      var emilReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
      this.regFlag = emilReg.test(this.Emil);
    },
    // 获取验证码
    getCode() {
      // 给新邮箱发送验证码
      // this.$api.verify
      //   .PersonalEmail({email:this.Email})
      //   .then(res => {
      //     // 接收邮箱验证码
      //     this.yzm = res.randomNum;
      //     console.log(res.randomNum);
      //   });

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
.change-emil {
  background-image: url("../assets/images/personal/texture.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #eeeeee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.contant {
  width: 600px;
  display: flex;
  // height: 500px;
  justify-content: center;
  align-items: center;
  height: calc(100% - 60px);
  .nav-emil {
    form {
      width: 600px;
      div {
        // margin-top: 20px;
        display: flex;
        align-items: center;

        .false {
          color: #f44336;
        }
        &.btn {
          justify-content: center;
        }
      }

      label {
        width: 150px;
        text-align: right;
        font-size: 18px;
        margin-top: -45px;
      }

      // 修改信息内容
      .middle {
        display: flex;
        flex-direction: column;
        height: 80px;

        input {
          width: 290px;
          height: 38px;
          border: none;
          border: 0.5px solid gray;
          border-radius: 10px;
          padding-left: 20px;
          outline: none;
        }
        .emil-tips {
          color: red;
          font-size: 12px;
          margin-top: 5px;
          margin-left: -160px;
        }
      }

      .code {
        width: 100px;
        height: 36px;
        background-color: #fec003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size: 12px;
        margin-top: -40px;
        outline: none;
        cursor: pointer;
        margin-left: 20px;
      }
      span {
        color: #259b24;
        font-weight: 600;
      }
      .define:first-of-type {
        margin-right: 70px;
      }
      .define {
        width: 110px;
        height: 35px;

        background-color: #fec003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size:18px;
        font-weight: 300;
        margin-top: 20px;
        margin-left: -20px;
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
}
</style>