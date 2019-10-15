<template>
    <div class="game-center">
        <div @click="backHome">返回主页</div>
        <div @click="toGameInfo">游戏详情页</div>
    </div>
</template>
<script>
export default {
    methods: {
        backHome(){
            this.$router.push('/')
        },
        toGameInfo(){
            this.$router.push('/GameInfo')
        }
    },
}
</script>
<style lang="scss" scoped>
</style>