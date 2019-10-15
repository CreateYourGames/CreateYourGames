<template>
    <div class="change-mail">
        <div @click="toUpdateInfo">确认修改邮箱</div>
    </div>
</template>

<script>
    export default {
        name: "personal-change-mail",
        methods: {
            toUpdateInfo(){
                this.$router.push('/Personal/UpdateInfo')
            }
        }
    }
</script>

<style scoped>

</style>