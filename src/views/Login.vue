<template>
    <div class="login">
        <div @click="register">去注册</div>
        <div @click="findPass">找回密码</div>
        <div @click="backHome">返回主页</div>
    </div>
</template>

<script>
    export default {
        name: "login",
        methods: {
            findPass(){
                this.$router.push('/Login/FindPassword1')
            },
            register(){
                this.$router.push('/Register')
            },
            backHome(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    .login{
        width: 100%;height: 600px;
        background-image: url("../assets/images/home/bg.png");
        // background: url(../assets/images/home/bg.png)no-repeat
        div{
            cursor: pointer;
        }
    }
</style>