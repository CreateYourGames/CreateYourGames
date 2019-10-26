<template>
  <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in swiperImage.length" :key="item" :style="{background:imgUrl[item - 1],backgroundSize:'cover'}">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  props:['swiperImage'],
  computed:{
    imgUrl(){
      const urlArr = [];
      for(let i = 0; i < this.swiperImage.length; i++){
          const urlStr = `url('${this.swiperImage[i]}')`;
          urlArr.push(urlStr);
      }
      return urlArr;
    }
  },
  mounted(){
    console.log(this.$attrs.swiperImage);
  }
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
</style>