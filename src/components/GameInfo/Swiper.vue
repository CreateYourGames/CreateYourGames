<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
    
}
</script>
<style>
.el-carousel__container{
    height: 400px;
    border-radius: 15px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
    height:100%;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
    height:100%;
  }
</style>