<template>
    <div class="find-password1">
        <div @click="next">下一步 => 2</div>
    </div>
</template>

<script>
    export default {
        name: "find-password1",
        methods: {
            next(){
                this.$router.push('/Login/FindPassword2')
            }
        }
    }
</script>

<style scoped>

</style>