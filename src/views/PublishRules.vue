<template>
    <div class="publish-rules">
        <div @click="toPublishGame">我已了解，前往发布</div>
    </div>
</template>

<script>
    export default {
        name: "publish-rules",
        methods: {
            toPublishGame(){
                this.$router.push('/PublishGame')
            }
        }
    }
</script>

<style scoped>

</style>