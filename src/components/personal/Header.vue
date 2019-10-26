<template>
  <div class="container">
    <div class="contant">
      <div class="logo" @click="goHome()">
        <img src="@/assets/images/home/logo.png" alt />
      </div>
      <div class="title">
        <p>修改绑定</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .contant {
    background-color: rgba(27, 27, 27, 0.7);
    display: flex;
    flex-direction: row;
    padding: 12px 0;
    height: 60px;

    .logo {
      display: flex;
      flex-direction: column;
      border-right: solid 1px yellow;
      margin-left: 100px;
      padding-right: 30px;
      img {
        width: 280px;
      }
    }
    .title {
      p {
        line-height: 35px;
        color: white;
        margin-left: 30px;
        font-size: 18px;
      }
    }
  }
}
</style>