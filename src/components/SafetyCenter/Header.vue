<template>
  <div class="container">
    <div class="contant">
      <div class="logo" @click="goHome()">
        <img src="@/assets/images/home/logo.png" alt />
        <p>安全中心</p>
      </div>
      <div class="title">
        <p>找回密码</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods:{
      goHome(){
          this.$router.push('/');
      }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;

  .contant {
    background:rgba(255,255,255,0.3);
    display: flex;
    flex-direction: row;
    padding:12px 0;

    .logo {
      display: flex;
      flex-direction: column;
      border-right: solid 1px yellow;
      margin-left: 100px;
      padding-right: 30px;
      img {
        width: 250px;
      }
      p {
        color: white;
        width: 250px;
        text-align: center;
      }
    }
    .title {
      height: 55px;
      line-height: 55px;
      color: white;
      margin-left: 30px;
      font-size: 18px;
    }
  }
}
</style>