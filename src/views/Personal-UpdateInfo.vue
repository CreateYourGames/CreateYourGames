<template>
  <div class="info">
    <!-- 顶部 --> 
    <div class="info-nav" ref="style">
      <input type="file" ref="input" name id style="display:none;" />
      <div>
        <img src="@/assets/images/personal/01.png" alt width="100" height="100" />
        <div class="origin" v-bind:class="{style:enable}" @click="fileClick" @mouseover="addStyle" @mouseout="removeStyle"></div>
      </div>
      <div class="butt">
        <button @click="save()">保存</button>
        <button @click="cancel()">取消</button>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <form action="">
        <label for>用户名：</label>
        <input type="text" v-model="personalInfo[0].name" readonly style="border:none;"/>
        <br />
        <label for>邮箱：</label>
        <input type="text" v-model="personalInfo[0].emil" />
        <br />
        <label for>手机号：</label>
        <input type="text" v-model="personalInfo[0].phone" />
        <br />
        <label for class="special">个人简介：</label>
        <textarea cols="30" rows="10" v-model="personalInfo[0].intro"></textarea>
      </form>
      <p class="upEmil" @click="jumpEmil()">修改绑定邮箱</p>
      <p class="upTel" @click="jumpTel()">修改绑定手机</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
      personalInfo:[
          {
              name:'孙永祥是憨批',
              emil:'1461523882@qq.com',
              phone:'1461523882',
              intro:'东方不亮西方亮，憨批啥样祥哥啥样'
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
.info{
    background-image: url('../assets/images/personal/texture.png');
    background-color: #eeeeee;
    background-size: cover;

}

// top
.info-nav {
//   width: 100%;
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
  .origin{
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

// content
.content {
  width: 400px;
  height: 600px;
  margin: 50px 34%;
  text-align: right;
//   form{
//       background-color:rgba(42,37,37, 0.1);
//   }
  .special {
    display: block;
    margin-left: 10px;
    margin-top: 20px;
    float: left;
  }
  .upEmil {
    position: absolute;
    right: 30%;
    margin-top: -310px;
    cursor: pointer;
  }
  .upTel {
    position: absolute;
    right: 30%;
    margin-top: -260px;
    cursor: pointer;
  }
  label {
    font-size: 20px;
  }
  input {
    width: 290px;
    height: 40px;
    margin-top: 20px;
    top: -50px;
    outline: none;
    background-color:#eeeeee;
    border: 1px solid gray;
    border-radius: 15px;
  }
  textarea {
    width: 290px;
    margin-top: 20px;
    font-size: 16px;
    font-family: 微软雅黑;
    background-color:#eeeeee;
    outline: none;
  }
}
</style>