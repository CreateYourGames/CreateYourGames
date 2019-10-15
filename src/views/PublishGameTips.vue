<template>
    <div class="publish-game-tips">
        <div @click="backHome">回到主页</div>
        <div @click="toPublishRules">查看游戏代码发布规范</div>
        <div @click="toPublishGame">开始发布</div>
    </div>
</template>

<script>
    export default {
        name: "publish-game-tips",
        methods: {
            backHome(){
                this.$router.push('/')
            },
            toPublishRules(){
                this.$router.push('/PublishRules')
            },
            toPublishGame(){
                this.$router.push('/PublishGame')
            }
        }
    }
</script>

<style scoped>

</style>