<template>
    <div class="game-info">
        <div class="headBg">
            <div class="logo" @click="backHome">
                <img src="../assets/images/home/logo.png" alt="Logo">
            </div>
            <div class="back">
                <span @click="toGameCenter">回游戏库</span>
            </div>
        </div>
        <div class="content">
            <div class="content-inner">
                <div class="swiper">
                    <swiper class="swiper"></swiper>
                </div>
            </div>
            <div class="content-footer">
                footer
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from '../components/GameInfo/Swiper.vue'
    export default {
        methods: {
            backHome(){
                this.$router.push('/')
            },
            toGameCenter(){
                this.$router.push('/GameCenter')
            }
        },
        components:{
            name: 'game-info',
            Swiper
        }
    }
</script>
<style lang="scss" scoped>
    .game-info{
        width: 100%;
        text-align: center;
        .headBg{
            width:100%;height: 300px;
            background:url(../assets/images/home/bg.png)no-repeat;
            background-size: 100%;
            position:relative;
            overflow: hidden;
            .logo{
                width: 250px;height: 40px;
                position: absolute;
                left: 50px;top: 20px;
                img{
                    width: 100%;height: 100%;
                }
            }
            .back{
                width: 100px;height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                border-radius: 10px;
                position: absolute;
                top: -10px;
                right: 15%;
            }
        }
        .content{
            width:70%;height: 500px;
            border-radius: 15px;
            position: absolute;
            background-color: pink;
            top: 150px;
            left:15%;
            display: flex;
            justify-content: center;
            .content-inner{
                width: 90%;height: 400px;
                .swiper{
                    width: 80%;
                    border-radius: 15px;
                }
            }
            .content-footer{
                width: 90%;
            }
        }
    }
</style>