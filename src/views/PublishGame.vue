<template>
    <div class="publish-game">
        <div @click="backHome">确认发布</div>
    </div>
</template>

<script>
    export default {
        name: "publish-game",
        methods: {
            backHome(){
                this.$router.push('/')
            },
        },
    }
</script>

<style scoped>

</style>