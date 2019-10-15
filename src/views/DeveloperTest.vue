<template>
    <div class="develop-test">
        <div @click="backHome">我不做了！</div>
        <div @click="backHome">提交试题</div>
    </div>
</template>

<script>
    export default {
        name: "developer-test",
        methods: {
            backHome(){
                this.$router.push('/');
            }
        }
    }
</script>

<style scoped>

</style>