<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*{  
    padding: 0;
    margin: 0;
  
	user-select:none;   
} 
input{  
	-webkit-user-select:auto; /*webkit浏览器*/     
}
textarea{
	-webkit-user-select:auto; /*webkit浏览器*/
}
* {
  padding: 0;
  margin: 0;
  // 滚动条整体样式
  &::-webkit-scrollbar {
    width: 3px;
  }
  // 滚动条滚动块样式
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    /*-webkit-box-shadow: inset 0 0 7px rgb(255, 224, 30);*/
    background: #0c1c6a;
    background-image: url("./assets/images/home/scroll-bar.png");
    margin: 1px;
  }
  // 滚动条滚动槽样式
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
}
:root,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
