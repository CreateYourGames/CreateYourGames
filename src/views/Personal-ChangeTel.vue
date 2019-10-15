<template>
    <div class="change-tel">
        <div @click="toUpdateInfo">确认修改手机</div>
    </div>
</template>

<script>
    export default {
        name: "personal-change-tel",
        methods: {
            toUpdateInfo(){
                this.$router.push('/Personal/UpdateInfo')
            }
        }
    }
</script>

<style scoped>

</style>