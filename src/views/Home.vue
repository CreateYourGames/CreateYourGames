<template>
    <div class="home">
        <div class="header">
            <div class="logo"></div>
            <div class="personal">
                <div class="login" @click="login">
                    前往登录
                </div>
                <div class="user-img" @click="toPersonal">
                    <img src="@/assets/images/home/01.png" alt="">
                </div>
                <div class="user-name">YugiAsuna</div>
            </div>
        </div>
        <div class="content">
            <div class="banner">
                <div class="main-msg">
                    <h6 class="text-color">来尝试几款游戏，</h6>
                    <h3 class="text-color">或者，</h3>
                    <h1 class="text-color">自己做一款游戏？</h1>
                </div>
                <div class="slider">
                    <img src="@/assets/images/home/el.gif" alt="">
                </div>
            </div>
            <div class="nav">
                <div class="nav-item game" @click="toGameCenter">
                    <img src="@/assets/images/home/icon-game.png" alt="">
                    游戏库
                </div>
                <div class="nav-item rank" @click="toRankingList">
                    <img src="@/assets/images/home/icon-rank.png" alt="">
                    排行榜
                </div>
                <div class="nav-item suggest" @click="toSuggest">
                    <img src="@/assets/images/home/icon-suggest.png" alt="">
                    提交建议
                </div>
                <div class="nav-item upload" @click="toPublishGame">
                    <img src="@/assets/images/home/icon-upload1.png" alt="">
                    发布游戏
                </div>
            </div>
            <div class="new-games">
                <p class="title">新游预告</p>
                <div class="progress-bar">
                    <div class="progress-now"></div>
                </div>
                <div class="new-game-list">
                    <div class="game-card" v-for="item in newGameArr">
                        <img :src="item.url" alt="">
                        <div class="game-info">
                            <p class="game-name">{{ item.name }}</p>
                            <p class="game-desc">{{ item.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="feature">
                <div class="feature-card" v-for="item in featureArr">
                    <img :src="item.url" alt="">
                    <div class="feature-desc">
                        <p>{{ item.desc1 }}</p>
                        <p>{{ item.desc2 }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="tips">
                抵制不良游戏，拒绝盗版游戏，注意自我保护，谨防上当受骗，适度游戏益脑，沉迷游戏伤身，合理安排时间，享受健康生活。
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "home",
        data() {
            return {
                active1: false,
                active2: false,
                active3: false,
                active4: false,
                newGameArr: [
                    {
                        name: '妖刀姬',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame01.jpg'),
                    },
                    {
                        name: '不知火',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame02.jpg'),
                    },
                    {
                        name: '阴阳师',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame03.jpg'),
                    },
                    {
                        name: '御馔津',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame04.jpg'),
                    }
                ],
                featureArr: [
                    {
                        url: require('../assets/images/home/feature01.jpg'),
                        desc1: '怀旧游戏',
                        desc2: '一网打尽'
                    },
                    {
                        url: require('../assets/images/home/feature02.jpg'),
                        desc1: '乐趣有限',
                        desc2: '创造无限'
                    },
                    {
                        url: require('../assets/images/home/feature01.jpg'),
                        desc1: '边玩边学',
                        desc2: '你上你行'
                    },
                    {
                        url: require('../assets/images/home/feature02.jpg'),
                        desc1: '不够满足',
                        desc2: '自己创造'
                    },
                ]
            }
        },
        methods: {
            login() {
                this.$router.push('/Login');
            },
            toGameCenter() {
                this.$router.push('/GameCenter')
            },
            toRankingList() {
                this.$router.push('/RankingList')
            },
            toSuggest() {
                this.$router.push('/Suggest')
            },
            toPublishGame() {
                this.$router.push('/PublishGameTips')
            },
            toPersonal() {
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
        padding: 50px 50px 0;
        box-sizing: border-box;
        color: #ffffff;
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logo {
                width: 400px;
                height: 50px;
                background-image: url("../assets/images/home/logo.png");
                background-size: 100% 100%;
                opacity: 0.8;
            }
            .personal {
                display: flex;
                align-items: center;
                margin-right: 100px;
                .login {
                    font-size: 16px;
                    color: #ffffff;
                    margin-right: 20px;
                }
                .user-img {
                    img {
                        display: block;
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
                .user-name {
                    color: #ffffff;
                    font-size: 0.3rem;
                }
            }
        }
        .content {
            display: flex;
            justify-content: center;
            flex-direction: column;
            padding: 0 50px;
            .banner {
                display: flex;
                margin: 70px 0 50px 40px;
                padding: 0 70px;
                /*justify-content: center;*/
                align-items: center;
                .main-msg {
                    display: flex;
                    flex-direction: column;
                    margin-left: 105px;
                    opacity: 0.95;
                    h6 {
                        margin-left: -120px;
                        margin-bottom: 15px;
                        opacity: 0.8;
                    }
                    h3 {
                        margin-left: -60px;
                        margin-bottom: 15px;
                        font-size: 32px;
                        opacity: 0.9;
                    }
                    h1 {
                        font-size: 48px;
                    }
                }
                .slider {
                    margin-left: 40px;
                    img {
                        border-radius: 15px;
                        box-shadow: 0 0 10px 5px #313131;
                        opacity: 0.9;
                    }
                }
            }
            .nav {
                display: flex;
                justify-content: center;
                .nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #ffffff;
                    font-size: 16px;
                    opacity: 0.8;
                    cursor: pointer;
                    margin: 20px 60px 40px;
                    img {
                        width: 50px;
                    }
                    &:hover {
                        opacity: 1;
                        transform: scale(1.3, 1.3) rotateZ(360deg);
                        transition: all 0.3s;
                        /*animation: navItem 1s ease;*/
                    }
                }
            }
            .new-games {
                .title {
                    margin-left: 130px;
                }
                .progress-bar {
                    width: 85%;
                    height: 4px;
                    /*border: 1px solid #696969;*/
                    background-color: #696969;
                    margin: 20px auto 0;
                    border-radius: 2px;
                    box-shadow: inset 0 0 0 0 #ffffff;
                    .progress-now {
                        width: 20%;
                        height: 100%;
                        background-color: #2285ff;
                        border-radius: 2px;
                    }
                }
                .new-game-list {
                    display: flex;
                    justify-content: center;
                    margin-top: 30px;
                    .game-card {
                        display: flex;
                        flex-direction: column;
                        width: 180px;
                        height: 320px;
                        margin: 0 30px;
                        border-radius: 7px;
                        img {
                            width: 100%;
                            height: 250px;
                            border-radius: 7px 7px 0 0;
                        }
                        .game-info {
                            flex: 1;
                            background-color: #eaeaea;
                            color: #000;
                            border-radius: 0 0 7px 7px;
                            box-sizing: border-box;
                            padding: 5px 7px;
                            .game-name {
                                font-size: 18px;
                            }
                            .game-desc {
                                font-size: 14px;
                                opacity: 0.75;
                                overflow: hidden;
                                text-indent: 1em;
                            }
                        }
                        &:hover {
                            transform: scale(1.05);
                            transition: all 0.3s;
                            box-shadow: 0 0 20px 1px #dedede;
                        }
                    }
                }
            }
            .feature{
                display: flex;
                justify-content: center;
                margin-top: 90px;
                .feature-card {
                    display: flex;
                    flex-direction: column;
                    width: 200px;
                    height: 200px;
                    margin: 0 30px;
                    border-radius: 7px;
                    img {
                        width: 100%;
                        border-radius: 7px;
                    }
                    .feature-desc{
                        text-align: center;
                        line-height: 25px;
                        margin-top: 10px;
                    }
                }
            }
        }
        .footer{
            height: 100px;
            background-color: rgba(0, 0, 0, 0.4);
            margin-top: 50px;
            .tips{
                line-height: 40px;
                text-align: center;
                opacity: 0.5;
            }
        }
    }
</style>
