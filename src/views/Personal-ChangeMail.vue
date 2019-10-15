<template>
    <div>
        <div class="nav-emil">
            <form action="">
            <label for="">游戏账号：</label>
            <input type="text" name="" id="" placeholder="请输入您现在需要绑定的手机号">
            <br>
            <label for="">验证码：</label>
            <input type="text" name="" id="" placeholder="请输入您的验证码"><br>
        </form>
        <button class="code">获取验证码</button><br>
        <img src="@/assets/images/personal/dagou.png" alt=""><span>验证通过</span><br>
        <button class="define" @click="go()">确定</button>
        </div> 
    </div>
</template>

<script>
export default {
    methods:{
        go(){
            this.$router.push('/Personal/UpdateInfo').catch(err => console.log(err))
        }
    }
}
</script>

<style lang="scss" scoped>
.nav-emil{
    width: 420px;
    // border: 1px solid red;
    margin: 250px 30%;
    text-align: right;
    label{
        font-size: 20px;
    }
    input{
        width: 290px;
        height: 40px;
        border: 1px solid gray;
        border-radius: 20px;
        margin-top: 20px;
        top: -50px;
        padding-left: 20px;
        outline: none;
    }
    .code{
        position: absolute;
        width: 120px;
        height: 40px;
        right: 475px;
        top: 270px;
        background-color: #FEC003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size: 15px;
        outline: none;
        cursor: pointer;
    }
    span{
        display: block;
        position: absolute;
        right: 500px;
        top: 340px;
        color: #259B24;
        font-weight: 600;
    }
    .define{
        position: absolute;
        width: 200px;
        height: 40px;
        right: 47%;
        top: 430px;
        background-color: #FEC003;
        border: none;
        border-radius: 20px;
        color: #fff;
        font-size: 20px;
        font-weight: 300;
        outline: none;
        cursor: pointer;
    }
    img{
        width: 25px;
        height: 25px;
        position: absolute;
        margin-top: -55px;
        margin-left: 50px;
    }
}
input::-webkit-input-placeholder {
    font-size: 14px;/* placeholder字体大小  */
}
</style>