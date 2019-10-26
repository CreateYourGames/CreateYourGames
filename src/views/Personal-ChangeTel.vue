<template>
  <div class="change-tel">
    <Header></Header>
    <div class="contant">
      <div class="nav-tel">
        <form action>
          <div>
            <label for>原手机号码：</label>
            <div class="middle">
              <input
                v-model="oldPhone"
                @blur="oldBlur"
                type="text"
                disabled
                placeholder="请输入您原先绑定的手机号"
              />
              <span class="tel-tips" v-if="!regFlag1">手机号格式不正确</span>
            </div>
          </div>
          <div>
            <label for>现手机号码：</label>
            <div class="middle">
              <input
                v-model="newPhone"
                @blur="newBlur"
                type="text"
                name
                id
                placeholder="请输入您现在需要绑定的手机号"
              />
              <span class="tel-tips" v-if="!regFlag2">手机号格式不正确</span>
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
              <input
                class="codeBtn"
                type="text"
                name
                id
                v-model="YZM"
                @blur="JudgeYZM"
                placeholder="请输入您的验证码"
              />
            </div>

            <div v-if="codeFlag && Flag && YZM!='' " style="margin-top:-38px;">
              <img style="margin-right:5px;" src="@/assets/images/personal/dagou.png" alt />
              <span>验证通过</span>
            </div>
            <div v-if="!codeFlag && Flag " style="margin-top:-38px;">
              <img style="margin-right:5px;" src="@/assets/images/personal/cuowu.png" alt />
              <span class="false">验证失败</span>
            </div>
          </div>
          <div class="btn">
            <button type="button" class="define" @click="goPerson()">取消</button>
            <button type="button" class="define" @click="go()">确定</button>
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
      codeFlag: false,
      Flag: 0, //未验证时

      oldPhone: this.$store.state.token.loginName,
      newPhone: "",
      yzm: "", //获得的验证码
      YZM: "", //输入的验证码

      regFlag1: true,
      regFlag2: true,
    };
  },
  methods: {
    go() {
      if (this.YZM && this.codeFlag == true) {
        this.$api.verify.updatePhone({
          newPhone: this.newPhone,
          oldPhone: this.oldPhone
        }).then(res=>{
          if(res==true){
            this.$message({
              message:'修改手机号成功',
              type:'success'
            })
            this.$router.push('/Personal/UpdateInfo')
          }
        });
      }
    },
    // 取消，回个人信息页
    goPerson() {
      this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
    },

    JudgeYZM() {
      this.Flag = true;
      if (this.YZM&&this.YZM == this.yzm) {
        this.codeFlag = true;
      } else {
        this.codeFlag = false;
      }
    },
    oldBlur() {
      var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      this.regFlag1 = telReg.test(this.oldPhone);
    },
    newBlur() {
      var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      this.regFlag2 = telReg.test(this.newPhone);
    },
    // 获取验证码
    getCode() {
      // 发送旧手机号
      this.$api.verify
        .sendToOldPhone({
          phone: this.oldPhone
        })
        .then(res => {
          this.yzm = res.randomNum;
          // yzm=res.randomNum;
        });
      // 验证码60秒倒计时
      if (!this.timer) {
        this.timer = setInterval(() => {
          if (this.countdown > 0 && this.countdown <= 60) {
            this.countdown--;
            this.codeDisabled = true;
            if (this.countdown !== 0) {
              this.codeMsg = "重新发送(" + this.countdown + ")";
              this.codeDisabled = true;
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
.change-tel {
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
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nav-tel {
    width: 600px;
    height: 300px;
    form {
      div {
        // height: 70px;
        display: flex;
        align-items: center;

        label {
          width: 150px;
          text-align: right;
          font-size: 18px;
          margin-top: -45px;
        }

        // 修改信息的内容
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
          .tel-tips {
            color: red;
            font-size: 12px;
            margin-top: 5px;
            margin-left: -160px;
          }
        }

        .false {
          color: #f44336;
        }
        &.btn {
          justify-content: center;
        }
      }

      input {
        width: 290px;
        height: 38px;
        border: none;
        border: 0.5px solid gray;
        border-radius: 10px;
        padding-left: 20px;
        outline: none;
      }
      .code {
        width: 100px;
        height: 36px;
        background-color: #fec003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size: 12px;
        padding-right: 20px;
        margin-top: -38px;
        outline: none;
        cursor: pointer;
        margin-left: 20px;
      }
      span {
        color: #259b24;
        font-weight: 600;
      }
      .define:first-of-type{
        margin-right: 70px;
      }
      .define {
        width: 110px;
        height: 35px;
        background-color: #fec003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size: 18px;
        font-weight: 300;
        margin-top: 20px;
        margin-left: -30px;
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