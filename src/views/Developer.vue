<template>
  <div class="container">
    <!-- <el-page-header @back="goBack" content="开发者测试页"></el-page-header> -->
    <div class="content">
      <div class="test">
        <div class="title">欢迎！即将成为开发者的你！</div>
        <div class="nav">考试前的注意事项xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
        <el-button @click="goTo()">我准备好了！</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goTo() {
      this.$router.push("/DeveloperTest");
    }
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login/tp.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;

  .el-page-header {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .content {
    width: 100%;
    height: 600px;
    position: relative;

    .test {
      width: 800px;
      height: 500px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 60%;
      transform: translate(-50%, -60%);

      .title {
        width: 800px;
        text-align: center;
        font-size: 24px;
        line-height: 100px;
      }

      .nav {
        width: 80%;
        height: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: solid 1px red;
      }

      .el-button {
        position: absolute;
        left: 50%;
        top: 90%;
        transform: translate(-50%, -90%);
        width: 300px;
        margin: 10px;
      }
    }
  }
}
</style>
