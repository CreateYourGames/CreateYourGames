<template>
    <div class="register">
        <div @click="backHome">返回主页</div>
    </div>
</template>

<script>
    export default {
        name: "register",
        methods:{
            backHome(){
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>