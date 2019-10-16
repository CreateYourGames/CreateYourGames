<template>
    <div class="ranking-list">
        <div class="logo" @click="backHome">
        </div>
        <div class="toGameCenter" @click="toGameCenter">
            <i class="left"></i>去玩游戏
        </div>
        <div class="ranking">
            <div class="ranking-nav">
                <p>当前榜单名称</p>
                <div>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
            </div>
            <div class="ranking-box">
                <div class="ranking-left">
                    <img src="../assets/images/rankingList/ranking-left.png" alt="">
                </div>
                <div class="ranking-card rank-1 game-score" :class="{}">
                    <div class="ranking-title">
                        游戏得分榜
                    </div>
                    <div class="list-item" v-for="(item, index) in gameScoreArray">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img :src="item.url" alt="">
                        </div>
                        <div class="list-value">{{ item.value }}</div>
                    </div>
                </div>
                <div class="ranking-card rank-2 game-hot" :class="{}">
                    <div class="ranking-title">
                        游戏热度榜
                    </div>
                    <div class="list-item" v-for="(item, index) in gameHotArray">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img :src="item.url" alt="">
                        </div>
                        <div>{{ item.value }}</div>
                    </div>
                </div>
                <div class="ranking-card rank-3 user-top" :class="{}">
                    <div class="ranking-title">
                        游戏达人榜
                    </div>
                    <div class="list-item" v-for="(item, index) in userRankArray">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img class="user-icon" :src="item.url" alt="">
                        </div>
                        <div>
                            <img class="top-game" v-for="game in item.value" :src="game" alt="">
                        </div>
                    </div>
                </div>
                <div class="ranking-right">
                    <img src="../assets/images/rankingList/ranking-right.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ranking-list",
        data(){
            return {
                gameScoreArray: [
                    {
                        url: require('../assets/images/rankingList/game01.jpg'),
                        value: 10
                    },
                    {
                        url: require('../assets/images/rankingList/game02.jpg'),
                        value: 9.97
                    },
                    {
                        url: require('../assets/images/rankingList/game03.jpg'),
                        value: 9.88
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        value: 9.54
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        value: 9.53
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        value: 9.4
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        value: 8.89
                    },
                    {
                        url: require('../assets/images/rankingList/game04.jpg'),
                        value: 8.6
                    },
                ],
                gameHotArray: [
                        {
                            url: require('../assets/images/rankingList/game01.jpg'),
                            value: 53138
                        },
                        {
                            url: require('../assets/images/rankingList/game02.jpg'),
                            value: 45611
                        },
                        {
                            url: require('../assets/images/rankingList/game03.jpg'),
                            value: 24683
                        },
                        {
                            url: require('../assets/images/rankingList/game04.jpg'),
                            value: 21434
                        },
                        {
                            url: require('../assets/images/rankingList/game04.jpg'),
                            value: 12054
                        },
                        {
                            url: require('../assets/images/rankingList/game04.jpg'),
                            value: 5974
                        },
                        {
                            url: require('../assets/images/rankingList/game04.jpg'),
                            value: 3454
                        },
                        {
                            url: require('../assets/images/rankingList/game04.jpg'),
                            value: 945
                        },
                ],
                userRankArray: [
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                            require('../assets/images/rankingList/game02.jpg'),
                            require('../assets/images/rankingList/game03.jpg')
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                            require('../assets/images/rankingList/game02.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                    {
                        url: require('../assets/images/rankingList/user-icon.png'),
                        value: [
                            require('../assets/images/rankingList/game01.jpg'),
                        ]
                    },
                ]
            }
        },
        methods: {
            backHome(){
                this.$router.push('/')
            },
            toGameCenter(){
                this.$router.push('/GameCenter')
            }
        }
    }
</script>

<style scoped lang="scss">
    .ranking-list{
        height: 100%;
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
        .toGameCenter{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            line-height: 30px;
            color: #ffffff;
            margin: 20px 0 0 -50px;
            border: 1px solid #ffffff;
            border-left: none;
            text-align: center;
            border-radius: 0 10px 10px 0;
            .left{
                display: block;
                width: 15px;
                height: 15px;
                background-image: url("../assets/images/rankingList/left.png");
                background-size: 100% 100%;
                margin-right: 5px;
            }
        }
        .ranking{
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #ffffff;
            .ranking-mav{
                display: flex;
                flex-direction: column;
            }
            .ranking-box{
                display: flex;
                justify-content: center;
                align-items: center;
                .ranking-card{
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 20px;
                    box-sizing: border-box;
                    padding: 0 0 5px;
                    opacity: 0.7;
                    .ranking-title{
                        line-height: 40px;
                        font-size: 22px;
                        text-align: center;
                    }
                    .list-item{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        box-sizing: border-box;
                        padding: 5px 35px 5px 15px;
                        .list-index{
                            display: flex;
                            align-items: center;
                            p{
                                margin-right: 15px;
                                font-size: 20px;
                            }
                            img{
                                width: 50px;
                                height: 50px;
                                object-fit: cover;
                            }
                        }
                    }
                    &.game-score{
                        background-color: #123c7e;
                        transform: scale(0.9, 0.9) translateX(60px);
                        cursor: pointer;
                        img{
                            border-radius: 10px;
                        }
                        &:hover{
                            opacity: 1;
                        }
                    }
                    &.game-hot{
                        background-color: #3a7385;
                        img{
                            border-radius: 10px;
                        }
                        opacity: 1;
                        z-index: 999;
                    }
                    &.user-top{
                        background-color: #881362;
                        transform: scale(0.9, 0.9) translateX(-60px);
                        cursor: pointer;
                        .user-icon{
                            width: 50px;
                            height: 50px;
                            border-radius: 50%;
                        }
                        .top-game{
                            width: 40px;
                            height: 40px;
                            object-fit: cover;
                        }
                        &:hover{
                            opacity: 1;
                        }
                    }
                    .list-item:nth-of-type(8n+2){
                        .list-index{
                            p{
                                color: #ff0004;
                            }
                        }
                    }
                    .list-item:nth-of-type(8n+3){
                        .list-index{
                            p{
                                color: #ff6c03;
                            }
                        }
                    }
                    .list-item:nth-of-type(8n+4){
                        .list-index{
                            p{
                                color: #ffd712;
                            }
                        }
                    }
                }
                .ranking-left{
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border-radius: 10px 0 0 10px;
                    margin-right: 100px;
                    background-color: rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    img{
                        width: 50px;
                    }
                    &:hover{
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
                .ranking-right{
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border-radius: 0 10px 10px 0;
                    margin-left: 100px;
                    background-color: rgba(0, 0, 0, 0.2);
                    cursor: pointer;
                    img{
                        width: 50px;
                    }
                    &:hover{
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
</style>