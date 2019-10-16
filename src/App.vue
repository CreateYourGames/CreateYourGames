<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<style lang="scss">
*{  
    padding: 0;
    margin: 0;
	-webkit-touch-callout:none;  /*系统默认菜单被禁用*/   
	-webkit-user-select:none; /*webkit浏览器*/   
	-khtml-user-select:none; /*早期浏览器*/   
	-moz-user-select:none;/*火狐*/   
	-ms-user-select:none; /*IE10*/   
	user-select:none;   
} 
input{  
	-webkit-user-select:auto; /*webkit浏览器*/     
}
textarea{
	-webkit-user-select:auto; /*webkit浏览器*/
}
</style>
