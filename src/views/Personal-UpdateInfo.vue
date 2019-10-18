<template>
  <div class="info">
    <!-- 顶部 -->
    <div class="info-nav" ref="style">
      <input type="file" ref="input" name id style="display:none;" />
      <div>
        <img src="@/assets/images/personal/01.png" alt width="100" height="100" />
        <div
          class="origin"
          v-bind:class="{style:enable}"
          @click="fileClick"
          @mouseover="addStyle"
          @mouseout="removeStyle"
        ></div>
      </div>
      <div class="butt">
        <button @click="save()">保存</button>
        <button @click="cancel()">取消</button>
      </div>
    </div>

    <!-- 内容 -->
    <div class="info-out">
      <div class="content">
        <form action>
          <div>
            <label for>用户名：</label>
            <input type="text" v-model="personalInfo[0].name" readonly style="border:none;" />
          </div>
          <div>
            <label for>邮箱：</label>
            <input type="text" v-model="personalInfo[0].emil" />
            <p @click="jumpEmil()">修改绑定邮箱</p>
          </div>
          <div>
            <label for>手机号：</label>
            <input type="text" v-model="personalInfo[0].phone" />
            <p @click="jumpTel()">修改绑定手机</p>
          </div>
          <div>
            <label for class="special">个人简介：</label>
            <textarea cols="30" rows="10" v-model="personalInfo[0].intro"></textarea>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
      personalInfo: [
        {
          name: "孙永祥是憨批",
          emil: "1461523882@qq.com",
          phone: "1461523882",
          intro: "东方不亮西方亮，憨批啥样祥哥啥样"
        }
      ]
    };
  },
  methods: {
    jumpEmil() {
      this.$router.push("/Personal/ChangeMail").catch(err => console.log(err));
    },
    jumpTel() {
      this.$router.push("/Personal/ChangeTel").catch(err => console.log(err));
    },
    fileClick() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    addStyle() {
      this.enable = true;
    },
    removeStyle() {
      this.enable = false;
    },
    save() {
      this.$router.push("/Personal");
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
  img {
    width: 150px;
    height: 150px;
    border-radius: 100px;
    margin-top: 30px;
  }
  .origin {
    width: 150px;
    height: 150px;
    border-radius: 100px;
    position: absolute;
    top: 30px;
    left: 45%;
    cursor: pointer;
    color: #fff;
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
    top: 30px;
    left: 45%;
    cursor: pointer;
  }
  .butt {
    position: absolute;
    right: 150px;
    bottom: 20px;
    button {
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
  width: 800px;
  height: 600px;
  text-align: right;
  // border: 1px solid red;
  form {
    div {
      margin-top: 20px;
      display: flex;
      align-items: center;
      p{
        cursor: pointer;
        height: 40px;
        vertical-align: middle;
        line-height: 45px;
        margin-left: 20px;
      }
    }
  }
  .special {
    margin-top: -150px;
    width: 250px;
    text-align: right;
  }
  label {
    font-size: 20px;
    width: 250px;
    text-align: right;
  }
  input {
    width: 290px;
    height: 40px;
    margin-top: 10px;
    outline: none;
    background-color: #eeeeee;
    border: 1px solid gray;
    border-radius: 20px;
    padding-left: 10px;
  }
  textarea {
    width: 290px;
    height: 200px;
    margin-top: 10px;
    font-size: 16px;
    font-family: 微软雅黑;
    background-color: #eeeeee;
    outline: none;
    border-radius: 20px;
    padding-left: 10px;
  }
}
</style>