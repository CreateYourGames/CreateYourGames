<template>
    <div class="ranking-list">
        <div class="logo" @click="backHome">
        </div>
        <div class="toGameCenter" @click="toGameCenter">
            <i class="left"></i>去玩游戏
        </div>
        <div class="ranking">
            <div class="ranking-nav" :style="{backgroundColor:rankingNavColor[rankingFlag.rank2]}">
                <p class="nav-title">{{ rankingName }}</p>
                <div class="ranking-tab">
                    <p v-for="item in 3"></p>
                </div>
            </div>
            <div class="ranking-box">
                <div class="ranking-left" @click="rankingLeft">
                    <img src="../assets/images/rankingList/ranking-left.png" alt="">
                </div>
                <div class="ranking-card"
                     :class="{rank1: rankingFlag.rank1 == (index+1), rank2: rankingFlag.rank2 == (index+1), rank3: rankingFlag.rank3 == (index+1)}"
                     v-for="(item, index) in rankingArray" @click="rankingCardChange(index)">
                    <div class="ranking-title">
                        {{ item.name }}
                    </div>
                    <!--游戏榜单-->
                    <div class="list-item game-rank" v-if="li.value" v-for="(li, index) in item.data">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img class="user-icon" :src="li.url" alt="">
                            <p>{{ li.name }}</p>
                        </div>
                        <div class="list-data">{{ li.value }}</div>
                    </div>
                    <!--达人榜单-->
                    <div class="list-item user-top" v-if="li.gameList" v-for="(li, index) in item.data">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img class="user-icon" :src="li.url" alt="">
                            <p>{{ li.name }}</p>
                        </div>
                        <div class="list-data">
                            <img class="top-game" v-for="game in li.gameList" :src="game" alt="">
                        </div>
                    </div>
                </div>
                <div class="ranking-right" @click="rankingRight">
                    <img src="../assets/images/rankingList/ranking-right.png" alt="">
                </div>
            </div>
        </div>
        <div class="divider">
            <p>————————</p>
            <div class="title">为您推荐</div>
            <p>————————</p>
        </div>
        <div class="hot-games">
            <div class="title">热门游戏</div>
            <div class="game-box">
                <div class="game" v-for="item in hotGameArray">
                    <img :src="item.url" alt="">
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>
        <div class="new-games">
            <div class="title">最新游戏</div>
            <div class="game-box">
                <div class="game" v-for="item in newGameArray">
                    <img :src="item.url" alt="">
                    <p>{{ item.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ranking-list",
        data() {
            return {
                rankingArray: [
                    {
                        name: '游戏评分榜',
                        data: [
                            {
                                url: require('../assets/images/rankingList/game01.jpg'),
                                name: '妖刀姬',
                                value: 10
                            },
                            {
                                url: require('../assets/images/rankingList/game02.jpg'),
                                name: '不知火',
                                value: 9.97
                            },
                            {
                                url: require('../assets/images/rankingList/game03.jpg'),
                                name: '御馔津',
                                value: 9.88
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 9.54
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 9.53
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 9.4
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 8.89
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 8.6
                            },
                        ]
                    },
                    {
                        name: '游戏热度榜',
                        data: [
                            {
                                url: require('../assets/images/rankingList/game01.jpg'),
                                name: '妖刀姬',
                                value: 53138
                            },
                            {
                                url: require('../assets/images/rankingList/game02.jpg'),
                                name: '不知火',
                                value: 45611
                            },
                            {
                                url: require('../assets/images/rankingList/game03.jpg'),
                                name: '御馔津',
                                value: 24683
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 21434
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 12054
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 5974
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 3454
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '阴阳师',
                                value: 945
                            },
                        ]
                    },
                    {
                        name: '游戏达人榜',
                        data: [
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                    require('../assets/images/rankingList/game02.jpg'),
                                    require('../assets/images/rankingList/game03.jpg')
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                    require('../assets/images/rankingList/game02.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                gameList: [
                                    require('../assets/images/rankingList/game01.jpg'),
                                ]
                            },
                        ]
                    },
                ],
                rankingFlag: {
                    rank1: 1,
                    rank2: 2,
                    rank3: 3
                },
                rankingNavColor: {
                    1: '#881362',
                    2: '#3a7385',
                    3: '#123c7e',

                },
                hotGameArray: [
                    {
                        url: require('../assets/images/rankingList/game01.jpg'),
                        name: '妖刀姬',
                    },
                    {
                        url: require('../assets/images/rankingList/game02.jpg'),
                        name: '不知火',
                    },
                    {
                        url: require('../assets/images/rankingList/game03.jpg'),
                        name: '阴阳师',
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        name: '御馔津',
                    },
                ],
                newGameArray: [
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        name: '御馔津',
                    },
                    {
                        url: require('../assets/images/rankingList/game03.jpg'),
                        name: '阴阳师',
                    },
                    {
                        url: require('../assets/images/rankingList/game02.jpg'),
                        name: '不知火',
                    },
                    {
                        url: require('../assets/images/rankingList/game01.jpg'),
                        name: '妖刀姬',
                    },
                ],

            }
        },
        methods: {
            backHome() {
                this.$router.push('/')
            },
            toGameCenter() {
                this.$router.push('/GameCenter')
            },
            rankingLeft() {
                // this.rankingFlag.rank1 == 0 ? this.rankingFlag.rank1 = 1 :
                    this.rankingFlag.rank1 == 1 ? this.rankingFlag.rank1 = 3 : this.rankingFlag.rank1--;
                // this.rankingFlag.rank2 == 0 ? this.rankingFlag.rank2 = 2 :
                    this.rankingFlag.rank2 == 1 ? this.rankingFlag.rank2 = 3 : this.rankingFlag.rank2--;
                // this.rankingFlag.rank3 == 0 ? this.rankingFlag.rank3 = 3 :
                    this.rankingFlag.rank3 == 1 ? this.rankingFlag.rank3 = 3 : this.rankingFlag.rank3--;
                console.log(this.rankingFlag);
            },
            rankingRight(){
                // this.rankingFlag.rank1 == 0 ? this.rankingFlag.rank1 = 1 :
                this.rankingFlag.rank1 == 3 ? this.rankingFlag.rank1 = 1 : this.rankingFlag.rank1++;
                // this.rankingFlag.rank2 == 0 ? this.rankingFlag.rank2 = 2 :
                this.rankingFlag.rank2 == 3 ? this.rankingFlag.rank2 = 1 : this.rankingFlag.rank2++;
                // this.rankingFlag.rank3 == 0 ? this.rankingFlag.rank3 = 3 :
                this.rankingFlag.rank3 == 3 ? this.rankingFlag.rank3 = 1 : this.rankingFlag.rank3++;
                console.log(this.rankingFlag);
            },
            rankingCardChange(index){
                if(this.rankingFlag.rank1 == (index+1)){
                    this.rankingLeft();
                }
                if(this.rankingFlag.rank3 == (index+1)){
                    this.rankingRight();
                }
            }
        },
        computed: {
            rankingName(){
                return this.rankingArray[this.rankingFlag.rank2 - 1].name;
            }
        }
    }
</script>

<style scoped lang="scss">
    .ranking-list {
        display: flex;
        flex-direction: column;
        background-image: url("../assets/images/rankingList/bg.jpg");
        background-attachment: fixed;
        background-size: 100% 100%;
        padding: 30px 50px 0;
        box-sizing: border-box;
        .logo {
            width: 400px;
            height: 50px;
            background-image: url("../assets/images/home/logo.png");
            background-size: 100% 100%;
            opacity: 0.8;
        }
        .toGameCenter {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            line-height: 30px;
            color: #ffffff;
            margin: 40px 0 0 -50px;
            border: 1px solid #ffffff;
            border-left: none;
            text-align: center;
            border-radius: 0 10px 10px 0;
            .left {
                display: block;
                width: 15px;
                height: 15px;
                background-image: url("../assets/images/rankingList/left.png");
                background-size: 100% 100%;
                margin-right: 5px;
            }
        }
        .ranking {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #ffffff;
            margin-top: -90px;
            .ranking-nav {
                width: 300px;
                height: 70px;
                display: flex;
                flex-direction: column;
                background-color: #3a7385;
                border-radius: 20px;
                .nav-title{
                    line-height: 55px;
                    font-size: 22px;
                    text-align: center;
                }
                .ranking-tab{
                    display: flex;
                    justify-content: space-around;
                    box-sizing: border-box;
                    padding: 0 25px;
                    p{
                        width: 65px;
                        height: 5px;
                        border-radius: 5px;
                        background-color: #ababab;
                        cursor: pointer;
                    }
                }
            }
            .ranking-box {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 525px;
                .ranking-card {
                    position: absolute;
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 20px;
                    box-sizing: border-box;
                    padding: 0 0 5px;
                    opacity: 0.7;
                    .ranking-title {
                        line-height: 40px;
                        font-size: 22px;
                        text-align: center;
                    }
                    .list-item {
                        height: 55px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        box-sizing: border-box;
                        padding: 5px 35px 5px 15px;
                        .list-index {
                            display: flex;
                            align-items: center;
                            p {
                                margin-right: 15px;
                                font-size: 20px;
                            }
                            .user-icon {
                                width: 40px;
                                height: 40px;
                                object-fit: cover;
                                border-radius: 10px;
                                margin-right: 10px;
                            }
                        }
                        &.game-rank {
                            .list-data {
                                .top-game {
                                    width: 30px;
                                    height: 30px;
                                    object-fit: cover;
                                }
                            }
                        }
                        &.user-top {
                            .list-index {
                                img {
                                    border-radius: 50%;
                                }
                            }
                            .list-data {
                                display: flex;
                                align-items: center;
                                .top-game {
                                    width: 30px;
                                    height: 30px;
                                    object-fit: cover;
                                    border-radius: 5px;
                                    box-sizing: border-box;
                                    padding: 2px;
                                }
                            }
                        }
                    }
                    @keyframes leftR1toR2 {
                        0% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(-260px);
                        }
                        100% {
                            opacity: 1;
                            z-index: 999;
                            transform: scale(1, 1) translateX(0);
                        }
                    }
                    @keyframes leftR2toR3 {
                        0% {
                            opacity: 1;
                            z-index: 999;
                            transform: scale(1, 1) translateX(0);
                        }
                        100% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(260px);
                        }
                    }
                    @keyframes leftR3toR1 {
                        0% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(260px);
                        }
                        100% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(-260px);
                        }
                    }
                    &:nth-of-type(3n+1){
                        background-color: #123c7e;
                        transform: scale(0.9, 0.9) translateX(260px);
                    }
                    &:nth-of-type(3n+2){
                        background-color: #881362;
                        transform: scale(0.9, 0.9) translateX(-260px);
                    }
                    &:nth-of-type(3n+3){
                        background-color: #3a7385;
                        z-index: 999;
                    }
                    &.rank1 {
                        cursor: pointer;
                        animation: leftR3toR1 1s linear forwards;
                    }
                    &.rank2 {
                        animation: leftR1toR2 1s linear forwards;
                    }
                    &.rank3 {
                        cursor: pointer;
                        animation: leftR2toR3 1s linear forwards;
                    }
                    .list-item:nth-of-type(8n + 2) {
                        .list-index {
                            p {
                                color: #ff0004;
                            }
                        }
                    }
                    .list-item:nth-of-type(8n + 3) {
                        .list-index {
                            p {
                                color: #ff6c03;
                            }
                        }
                    }
                    .list-item:nth-of-type(8n + 4) {
                        .list-index {
                            p {
                                color: #ffd712;
                            }
                        }
                    }
                }
                .ranking-left {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border-radius: 10px 0 0 10px;
                    margin-right: 500px;
                    background-color: rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    img {
                        width: 50px;
                    }
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
                .ranking-right {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border-radius: 0 10px 10px 0;
                    margin-left: 500px;
                    background-color: rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    img {
                        width: 50px;
                    }
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
        .divider{
            display: flex;
            margin: 0 auto;
            color: #ffffff;
            font-size: 20px;
            margin-top: 30px;
            .title{
                margin: 0 20px;
            }
        }
        .hot-games,
        .new-games{
            width: 80%;
            /*height: 320px;*/
            background-color: rgba(255, 255, 255, 0.7);
            margin: 40px auto;
            box-sizing: border-box;
            padding: 15px;
            border-radius: 20px;
            .title{
                font-size: 20px;
                margin-bottom: 10px;
            }
            .game-box{
                display: flex;
                justify-content: space-around;
                .game{
                    cursor: pointer;
                    img{
                        width: 200px;
                        height: 200px;
                        object-fit: cover;
                        border-radius: 10px;
                    }
                    p{
                        text-align: center;
                        margin-top: 5px;
                        font-size: 18px;
                    }
                }
            }
        }
        .new-games{
            margin: 0 auto 80px;
        }
    }
</style>