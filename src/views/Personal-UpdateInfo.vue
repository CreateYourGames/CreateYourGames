<template>
    <div>
        <div class="nav">
            <img src="../assets/images/personal/01.png" alt="">
            <div class="but">
            </div>
            <div @click="toPersonal">保存</div>
            <div @click="toPersonal">取消</div>
            <div @click="toChangeMail">修改绑定邮箱</div>
            <div @click="toChangeTel">修改绑定手机</div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        console.log("aaaa")
    },
    methods: {
        toPersonal(){
            this.$router.push('/Personal');
        },
        toChangeMail(){
            this.$router.push('/Personal/ChangeMail');
        },
        toChangeTel(){
            this.$router.push('/Personal/ChangeTel');
        },
    }
}
</script>

<style lang="scss" scoped>
// top
.nav{
    width: 100%;
    height: 250px;
    background-color: gray;
    text-align: center;
    img{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin-top: 30px;
    }
}
</style>