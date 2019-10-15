<template>
    <div class="home">
        <div class="header">
            <div class="logo"></div>
            <div class="personal">
                <div class="user-img" @click="toPersonal">
                    <img src="@/assets/images/home/01.png" alt="">
                </div>
                <div class="user-name">YugiAsuna</div>
            </div>
        </div>
        <div class="content">
            <div class="main-msg">
                <h6 class="text-color">来尝试几款游戏，</h6>
                <h3 class="text-color">或者，</h3>
                <h1 class="text-color">自己做一款游戏？</h1>
            </div>
            <div class="slider">
                <img src="@/assets/images/home/el.gif" alt="">
            </div>
            <div class="nav">
                <div class="nav-item game" @click="toGameCenter" @mouseenter="active1 = true" @mouseleave="active1 = false" :class="{'active': active1}">
                    <img src="@/assets/images/home/game.png" alt="">
                    游戏库
                </div>
                <div class="nav-item rank" @click="toRankingList" @mouseenter="active2 = true" @mouseleave="active2 = false" :class="{'active': active2}">
                    <img src="@/assets/images/home/rank.png" alt="">
                    排行榜
                </div>
                <div class="nav-item suggest" @click="toSuggest" @mouseenter="active3 = true" @mouseleave="active3 = false" :class="{'active': active3}">
                    <img src="@/assets/images/home/suggest.png" alt="">
                    提交建议
                </div>
                <div class="nav-item upload" @click="toPublishGame" @mouseenter="active4 = true" @mouseleave="active4 = false" :class="{'active': active4}">
                    <img src="@/assets/images/home/upload.png" alt="">
                    发布游戏
                </div>
            </div>
        </div>
        <div class="login" @click="login">
            前往登录
        </div>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                active1: false,
                active2: false,
                active3: false,
                active4: false,
            }
        },
        methods: {
            login(){
                this.$router.push('/Login');
            },
            toGameCenter(){
                this.$router.push('/GameCenter')
            },
            toRankingList(){
                this.$router.push('/RankingList')
            },
            toSuggest(){
                this.$router.push('/Suggest')
            },
            toPublishGame(){
                this.$router.push('/PublishGameTips')
            },
            toPersonal(){
                this.$router.push('/Personal')
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        background-image: url("../assets/images/home/bg.png");
        background-attachment: fixed;
        background-size: 100% 100%;
        font-size: 32px;
        padding: 50px;
        box-sizing: border-box;
        .header {
            display: flex;
            justify-content: space-between;
            .logo {
                width: 400px;
                height: 50px;
                background-image: url("../assets/images/home/logo.png");
                background-size: 100% 100%;
                opacity: 0.8;
            }
            .personal{
                display: flex;
                align-items: center;
                margin-right:100px;
                .user-img{
                    img{
                        display: block;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
                .user-name{
                    color: #ffffff;
                    font-size: 0.3rem;
                }
            }
        }
        .content{
            display: flex;
            margin-top: 100px;
            justify-content: center;
            align-items: center;
            .main-msg{
                display: flex;
                flex-direction: column;
                margin-right: 40px;
                margin-left: 250px;
                opacity: 0.95;
                h6{
                    margin-left: -120px;
                    margin-bottom: 15px;
                    opacity: 0.8;
                }
                h3{
                    margin-left: -60px;
                    margin-bottom: 15px;
                    opacity: 0.9;
                }
            }
            .slider{
                img{
                    border-radius: 15px;
                    box-shadow: 0 0 10px 5px #313131;
                    opacity: 0.9;
                }
            }
            .nav{
                display: flex;
                flex-direction: column;
                margin-left: 100px;
                @keyframes navItem {
                    0%{
                        opacity: 0.8;
                    }
                    100%{
                        opacity: 1;
                        transform: scale(1.2, 1.2);
                    }
                }
                .nav-item{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #ffffff;
                    font-size: 0.3rem;
                    margin-bottom: 20px;
                    opacity: 0.8;
                    cursor: pointer;
                    img{
                        width: 40px;
                    }
                    &.active{
                        opacity: 1;
                        transform: scale(1.2, 1.2);
                        transition: all 0.6s;
                        /*animation: navItem 1s ease;*/
                    }
                }
            }
        }

        .text-color {
            color: #ffffff;
        }
    }
</style>
