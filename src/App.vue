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
* {
  padding: 0;
  margin: 0;
}
:root,
body {
  height: 100%;
}
#app {
  height: 100%;
}
</style>
