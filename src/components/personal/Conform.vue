<template>
  <div class="nav-con">
    <div class="conform">
      <img src="@/assets/images/personal/close1.png" alt />
      <input type="text" placeholder="请输入用户密码">
      <p>此操作将永久删除该文件，是否删除</p>
      <input type="button" >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.nav-con {
  display: flex;
  justify-content: center;
  align-items: center;
  .conform {
    position: absolute;
    width: 400px;
    height: 200px;
    border-radius: 10px;
    background-color: white;
    z-index: 1000;
    img {
      width: 20px;
      height: 20px;
      margin-left: 95%;
    }
    input{
        width: 220px;
        height: 30px;
        border: 1px solid gray;
        border-radius: 10px;
        margin-left: 90px;
        margin-top: 30px;
    }
  }
}
</style>