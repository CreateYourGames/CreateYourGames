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
        div{
            cursor: pointer;
        }
    }
</style>