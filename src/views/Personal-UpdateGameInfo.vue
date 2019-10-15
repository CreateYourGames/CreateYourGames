<template>
    <div class="update-game-info">
        <div @click="toPersonal">确认修改</div>
        <div @click="toPersonal">取消</div>
    </div>
</template>

<script>
    export default {
        name: "personal-update-game-info",
        methods: {
            toPersonal(){
                this.$router.push('/Personal')
            }
        }
    }
</script>

<style scoped>

</style>