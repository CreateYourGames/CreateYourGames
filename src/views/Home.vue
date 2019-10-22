<template>
    <div class="home">
        <div class="header">
            <div class="logo"></div>
            <div class="personal">
                <div class="a">
                    <div v-if="!loginFlag" class="unlogin" @click="login">
                        前往登录
                    </div>
                    <div v-if="loginFlag" class="login" @click="toPersonal">
                        <div class="user-img">
                            <img :src="userInfo.userIcon" alt="">
                        </div>
                        <div class="user-name">{{ userInfo.userName}}</div>
                    </div>
                    <div v-if="loginFlag" class="list-btn" @click="listFlag = !listFlag">
                        <img v-if="!listFlag" src="../assets/images/home/list-down.png" alt="">
                        <img v-else src="../assets/images/home/list-up.png" alt="">
                    </div>
                </div>
                <ul v-show="listFlag" class="list">
                    <li @click="toPersonal">个人信息</li>
                    <li @click="exitLogin">退出</li>
                </ul>
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
                <div class="nav-item upload" @click="toPublishGame" v-if="userInfo.isDeveloper">
                    <img src="@/assets/images/home/icon-upload.png" alt="">
                    发布游戏
                </div>
                <div class="nav-item test" @click="toDeveloperTest" v-if="!userInfo.isDeveloper">
                    <img src="@/assets/images/home/icon-develop.png" alt="">
                    成为开发者
                </div>
            </div>
            <div class="new-games">
                <p class="title">新游预告</p>
                <div class="progress-bar">
                    <div class="progress-now"></div>
                </div>
                <div class="new-game-list">
                    <div class="game-card" v-for="(item, index) in newGameArr" @click="inverseCard(index)"
                         :class="{inverse: item.inverseFlag}">
                        <div class="front-info">
                            <img :src="item.url" alt="" v-show="!item.inverseFlag">
                            <div class="game-info" v-show="!item.inverseFlag">
                                <p class="game-name">{{ item.name }}</p>
                                <p class="game-desc">{{ item.description }}</p>
                            </div>
                        </div>
                        <div class="inverse-info">
                            <img :src="item.url" alt="">
                            <div class="inverse-game-info">
                                {{ item.inverseInfo}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="feature">
                <div class="finger"></div>
                <div class="feature-card" v-for="(item, index) in featureArr">
                    <img :src="item.url" alt="" :class="{'feature-jump': item.jumpFlag}" @click="cardJump(index)">
                    <div class="feature-desc">
                        <p>{{ item.desc1 }}</p>
                        <p>{{ item.desc2 }}</p>
                    </div>
                    <img class="jump-img" :src="item.jumpImg" alt="" :class="{'icon-jump': item.jumpFlag}"
                         @click="cardJump(index)">
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
                loginFlag: false,
                userInfo: {
                    userIcon: require('../assets/images/home/user.png'),
                    userName: 'YugiAsuna',
                    isDeveloper: false
                },
                listFlag: false,
                active1: false,
                active2: false,
                active3: false,
                active4: false,
                newGameArr: [
                    {
                        name: '妖刀姬',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame01.jpg'),
                        inverseFlag: false,
                        inverseInfo: '人类和我完全不一样，他们很弱。但我却觉得有些熟悉。我平时很少说话，也不知道要怎么诉说。可是我想试着和他们交谈，也想试着靠近他们，还想试着去理解他们。也许那么做之后，我就能知道为什么我会觉得那么熟悉了。'
                    },
                    {
                        name: '不知火',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame02.jpg'),
                        inverseFlag: false,
                        inverseInfo: '原本黑寂的海面上，突然出现了一束火光。火光分裂，滋生，最终成百上千，沿着海面直达天际。这便是大妖怪不知火的传说，它深深地烙印在每一个杏原人的脑海里。每过数十年，不知火便会降临在杏原的海面，带来福祉抑或灾难。'
                    },
                    {
                        name: '阴阳师',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame03.jpg'),
                        inverseFlag: false,
                        inverseInfo: '原本黑寂的海面上，突然出现了一束火光。火光分裂，滋生，最终成百上千，沿着海面直达天际。这便是大妖怪不知火的传说，它深深地烙印在每一个杏原人的脑海里。每过数十年，不知火便会降临在杏原的海面，带来福祉抑或灾难。不知火便会降临在杏原的海面，带来福祉抑或灾难。不知火便会降临在杏原的海面，带来福祉抑或灾难。'
                    },
                    {
                        name: '御馔津',
                        description: '12月10日震撼上线',
                        url: require('../assets/images/home/newGame04.jpg'),
                        inverseFlag: false,
                        inverseInfo: '在出发前，那位大人曾问我，平和美好的京都已经不在了，你所要前往的地方是人间地狱，你做好准备了吗 ？。我看着他威严而冷酷的面庞，坚定地答道，我明白。可我的手心却忍不住出了汗、连弓箭也差一点滑落。'
                    }
                ],
                featureArr: [
                    {
                        url: require('../assets/images/home/feature01.jpg'),
                        desc1: '怀旧游戏',
                        desc2: '一网打尽',
                        jumpFlag: false,
                        jumpImg: require('../assets/images/home/coin.png'),
                    },
                    {
                        url: require('../assets/images/home/feature02.jpg'),
                        desc1: '乐趣有限',
                        desc2: '创造无限',
                        jumpFlag: false,
                        jumpImg: require('../assets/images/home/coin.png'),
                    },
                    {
                        url: require('../assets/images/home/feature01.jpg'),
                        desc1: '边玩边学',
                        desc2: '你上你行',
                        jumpFlag: false,
                        jumpImg: require('../assets/images/home/coin.png'),
                    },
                    {
                        url: require('../assets/images/home/feature02.jpg'),
                        desc1: '不够满足',
                        desc2: '自己创造',
                        jumpFlag: false,
                        jumpImg: require('../assets/images/home/coin.png'),
                    },
                ],
                jumpCount: 0,
                defaultIcon: require('../assets/images/home/icon-default.jpg')
            }
        },
        created() {
            console.log('退出登录');
            // 进入首页判断当前是否登录（Vuex中是否存在loginName）
            if (this.$store.state.token.loginName) {
                this.loginFlag = true;
                console.log(this.$store.state.token.loginName, '当前登录用户账号');
                this.$api.loginInfo.getLoginInfo(this.$store.state.token.loginName).then(res => {
                    console.log(res.userMsg);
                    const info = res.userMsg[0];
                    this.userInfo.userIcon = info.picture;
                    this.userInfo.userName = info.nickName;
                    this.userInfo.isDeveloper = info.flag;
                    console.log(this.userInfo.isDeveloper, '当前用户是否为开发者');
                    console.log(res.userMsg[0]);
                }).catch(err => console.log(err));
            }
            else{
                this.loginFlag = false;
            }
        },
        methods: {
            //登录跳转
            login() {
                this.$router.push('/Login');
            },
            exitLogin() {
                this.$store.state.token = {};
                // console.log(this.$store.state.token);
                // this.$router.go(0);
                this.$router.push('/Login');
            },
            // 游戏库跳转
            toGameCenter() {
                this.$router.push('/Game')
            },
            // 排行榜跳转
            toRankingList() {
                this.$router.push('/RankingList')
            },
            // 提交建议跳转
            toSuggest() {
                this.$router.push('/Suggest')
            },
            // 发布游戏跳转
            toPublishGame() {
                this.$router.push('/PublishGameTips')
            },
            // 开发者测试跳转
            toDeveloperTest() {
                this.$router.push('/Developer')
            },
            // 个人信息跳转
            toPersonal() {
                this.$router.push('/Personal')
            },
            // 新游预告卡片翻转
            inverseCard(index) {
                this.newGameArr[index].inverseFlag = !this.newGameArr[index].inverseFlag;
            },
            // 特色卡片弹跳
            cardJump(index) {
                this.jumpCount++;
                console.log(this.jumpCount);
                if (this.jumpCount % 5 != 0) {
                    this.featureArr[index].jumpImg = require('../assets/images/home/coin.png');
                }
                else if (this.jumpCount % 10 == 0) {
                    this.featureArr[index].jumpImg = require('../assets/images/home/star.png');
                }
                else {
                    this.featureArr[index].jumpImg = require('../assets/images/home/mushroom.png');
                }
                this.featureArr[index].jumpFlag = !this.featureArr[index].jumpFlag;
                setTimeout(() => {
                    this.featureArr[index].jumpFlag = !this.featureArr[index].jumpFlag;
                }, 600)
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        background-image: url("../assets/images/home/bg.png");
        background-attachment: fixed;
        background-size: 100% 100%;
        padding: 30px 50px 0;
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
                position: relative;
                margin-right: 100px;
                .a {
                    display: flex;
                    align-items: center;
                    .unlogin {
                        font-size: 16px;
                        color: #ffffff;
                        margin-right: 20px;
                        cursor: pointer;
                    }
                    .login {
                        display: flex;
                        align-items: center;
                        cursor: pointer;
                        margin-right: 10px;
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
                            font-size: 14px;
                        }
                    }
                    .list-btn {
                        position: relative;
                        display: flex;
                        align-items: center;
                        img {
                            width: 12px;
                            height: 12px;
                        }
                    }
                }
                .list {
                    position: absolute;
                    right: 0;
                    margin-top: 10px;
                    background-color: rgba(32, 39, 77, 0.8);
                    color: #ffffff;
                    li {
                        width: 130px;
                        padding: 5px 10px;
                        text-align: center;
                        cursor: pointer;
                        border-left: 2px solid #ddd;
                        margin-bottom: 3px;
                        &:last-of-type {
                            /*border-bottom: 1px solid #ddd;*/
                        }
                        &:hover {
                            background-color: #dddddd;
                            color: #000;
                        }
                    }
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
                margin: 70px 0 50px 0;
                justify-content: center;
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
                        text-shadow: 2px 2px 5px 0 #67c23a;
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
                    margin: 20px 60px 50px;
                    img {
                        width: 40px;
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
                    perspective: 1000px;
                    transform-style: preserve-3d;
                    .game-card {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        width: 180px;
                        height: 320px;
                        margin: 30px 30px;
                        border-radius: 7px;
                        transform-style: preserve-3d;
                        cursor: pointer;
                        .front-info {
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            z-index: 2;
                            backface-visibility: hidden;
                            img {
                                width: 100%;
                                height: 250px;
                                border-radius: 7px 7px 0 0;
                                /*backface-visibility: hidden;*/
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
                        }
                        .inverse-info {
                            height: 100%;
                            width: 100%;
                            transform: rotateY(180deg);
                            position: absolute;
                            backface-visibility: hidden;
                            background-color: rgba(0, 0, 0, 0.5);
                            border-radius: 7px;
                            box-sizing: border-box;
                            img {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                z-index: -1;
                                border-radius: 7px;
                                opacity: 0.4;
                            }
                            .inverse-game-info {
                                height: 100%;
                                box-sizing: border-box;
                                padding: 20px 0 20px 10px;
                                line-height: 1.5rem;
                                overflow: auto;
                                &::-webkit-scrollbar {
                                    width: 1px;
                                }
                                &::-webkit-scrollbar-thumb {
                                    border-radius: 10px;
                                    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
                                    background: rgba(0, 0, 0, 0.2);
                                }
                                &::-webkit-scrollbar-track {
                                    background: rgba(0, 0, 0, 0.1);
                                }
                            }
                        }
                        &:hover {
                            transform: scale(1.05);
                            transition: all 0.3s;
                            box-shadow: 0 0 20px 1px #dedede;
                        }
                        &.inverse {
                            transform: rotateY(-180deg);
                            transition: all 0.3s;
                        }
                    }
                }
            }
            .feature {
                position: relative;
                display: flex;
                justify-content: center;
                margin-top: 120px;
                .finger {
                    position: absolute;
                    left: 50px;
                    top: 25px;
                    width: 64px;
                    height: 64px;
                    background: url("../assets/images/home/finger.png");
                    background-size: 100% 100%;
                }
                .feature-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 200px;
                    height: 200px;
                    margin: 0 30px;
                    border-radius: 7px;
                    img {
                        width: 100%;
                        border-radius: 7px;
                        cursor: pointer;
                        z-index: 2;
                        @keyframes featureJump {
                            0% {
                                transform: translateY(0px);
                            }
                            50% {
                                transform: translateY(-40px);
                            }
                            100% {
                                transform: translateY(0px);
                            }
                        }
                        @keyframes jumpImgJump {
                            0% {
                                transform: translateY(0px);
                            }
                            10% {
                                transform: translateY(-100px) rotateY(0);
                            }
                            90% {
                                transform: translateY(-100px) rotateY(360deg);
                            }
                            100% {
                                transform: translateY(0px);
                            }
                        }
                        &.feature-jump {
                            animation: featureJump 0.6s linear forwards;
                        }
                        &.jump-img {
                            position: absolute;
                            width: 50px;
                            height: 50px;
                            z-index: 1;
                            &.icon-jump {
                                animation: jumpImgJump 0.6s linear forwards;
                            }
                        }
                    }
                    .feature-desc {
                        text-align: center;
                        line-height: 25px;
                        margin-top: 10px;
                    }
                }
            }
        }
        .footer {
            height: 100px;
            background-color: rgba(0, 0, 0, 0.4);
            margin-top: 70px;
            .tips {
                line-height: 40px;
                text-align: center;
                opacity: 0.5;
            }
        }
    }
</style>
