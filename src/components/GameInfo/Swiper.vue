<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
    
}
</script>
<style>
.el-carousel__container{
    height: 100%;
    border-radius: 15px;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-of-type(1) {
    background:url('http://00.minipic.eastday.com/20170815/20170815145451_d41d8cd98f00b204e9800998ecf8427e_10.jpeg');
    height:100%;
  }
  .el-carousel__item:nth-of-type(2) {
    background:url('http://bpic.588ku.com/back_pic/17/05/15/91f9419e062608c137a7ce9a4e797671.jpg');
    height:100%;
  }
  .el-carousel__item:nth-of-type(3) {
    background:url('../../assets/images/publishGame/publish-bg10.jpg');
    height:100%;
  }.el-carousel__item:nth-of-type(4) {
    background:url('http://00.minipic.eastday.com/20170815/20170815145451_d41d8cd98f00b204e9800998ecf8427e_10.jpeg');
    height:100%;
  }
</style>