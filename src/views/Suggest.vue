<template>
  <div class="suggest">
    <div></div>

    <div class="contant">
      <img src="../assets/images/home/logo.png" alt="logo" />
      <br />
      <label>建议类型</label>
      <select v-model="selected" name="type">
        <option value="one">1</option>
        <option value="two">2</option>
        <option value="three">3</option>
      </select>
      <br />
      <textarea cols="60" rows="10" placeholder="此处填写建议" v-model="textMessage"></textarea>
      <br />
      <button class="submit" @click="goTo()">提交建议</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "one",
      textMessage: "",
      MessageList: [
        {
          selected: "one",
          textMessage: "建议是one啥啥啥"
        },
        {
          selected: "two",
          textMessage: "建议是two啥啥啥"
        },
        {
          selected: "three",
          textMessage: "建议是three啥啥啥"
        }
      ]
    };
  },

  methods: {
    goTo() {
      // 点击最后一个"下一步”，弹出确认提交按钮
      this.$confirm("确认提交?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!"
          });
          this.$router.push("/");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交"
          });
        });
    }
  }
};
</script>

<style  lang="scss" scoped>
.suggest {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/home/bg.png");
  display: flex;
  align-items: center;
  justify-content: center;
  .contant {
    width: 500px;
    height: 500px;

    img {
      height: 45px;
      margin: 60px 0;
      margin-left: 90px;
    }
    label {
      color: white;
      margin-right: 20px;
      margin-left: 70px;
    }
    select {
      width: 100px;
    }
    textarea {
      width: 370px;
      margin-top: 30px;
      margin-left: 70px;
    }
    button {
      width: 150px;
      height: 30px;
      border-radius: 30px;
      border: none;
      background-color: #fec003;
      margin-top: 45px;
      margin-left: 180px;
    }
  }
}
</style>