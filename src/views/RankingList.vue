<template>
    <div class="ranking-list">
        <div class="logo" @click="backHome">
            <img src="../assets/images/home/logo.png" alt="Logo">
        </div>
        <div @click="toGameCenter">回游戏库</div>
    </div>
</template>

<script>
    export default {
        name: "ranking-list",
        methods: {
            backHome(){
                this.$router.push('/')
            },
            toGameCenter(){
                this.$router.push('/GameInfo')
            }
        }
    }
</script>

<style scoped>

</style>