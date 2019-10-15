<template>
    <div class="suggest">
        <div @click="backHome">回到主页</div>
        <div @click="backHome">提交建议</div>
    </div>
</template>

<script>
    export default {
        name: "suggest",
        methods: {
            backHome(){
                this.$router.push('/')
            },
        }
    }
</script>

<style scoped>

</style>