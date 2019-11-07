<template>
    <div class="ranking-list">
        <topNav></topNav>
        <div class="ranking">
            <div class="ranking-nav" :style="{backgroundColor:rankingNavColor[rankingFlag.leftRank2 == 0 ? rankingFlag.rightRank2 : rankingFlag.leftRank2]}">
                <p class="nav-title">{{ rankingName }} <span class="info" @click="showRankingInfo"></span></p>
                <div class="ranking-tab">
                    <p
                            v-for="item in 3"
                            :class="{active: rankingFlag.leftRank2 == 0 ? rankingFlag.rightRank2 == item : rankingFlag.leftRank2 == item}"
                            @click="tabChangeRank(item)"
                    ></p>
                </div>
            </div>
            <div class="ranking-box">
                <div class="ranking-left" @click="rankingLeft">
                    <img src="../assets/images/rankingList/ranking-left.png" alt="">
                </div>
                <div class="ranking-card"
                     :class="{
                    leftRank1: rankingFlag.leftRank1 == (index+1),
                    leftRank2: rankingFlag.leftRank2 == (index+1),
                    leftRank3: rankingFlag.leftRank3 == (index+1),
                    rightRank1: rankingFlag.rightRank1 == (index+1),
                    rightRank2: rankingFlag.rightRank2 == (index+1),
                    rightRank3: rankingFlag.rightRank3 == (index+1),
                }"
                     v-for="(item, index) in rankingArray" @click="rankingCardChange(index)">
                    <!--游戏榜单-->
                    <div class="list-item game-rank" v-for="(li, index) in item.data">
                        <div class="list-index">
                            <p>{{ index + 1 }}</p>
                            <img class="user-icon" :src="li.url" alt="">
                            <p>{{ li.name }}</p>
                        </div>
                        <div class="list-data">{{ li.value }}</div>
                    </div>
                </div>
                <div class="ranking-right" @click="rankingRight">
                    <img src="../assets/images/rankingList/ranking-right.png" alt="">
                </div>
            </div>
        </div>
        <div v-show="rankingInfo" class="ranking-info" @click="hideRankingInfo">
            <div class="content">
                <div class="title">榜单介绍</div>
                <div>
                    <span class="icon star-ranking-icon"></span>游戏肝帝榜：<p>根据用户三十天内在站内游玩次数进行排行</p>
                </div>
                <div>
                    <span class="icon score-ranking-icon"></span>游戏评分榜：<p>根据用户对游戏评分的平均值进行游戏排行，榜单上仅显示一位小数，可能存在同分排名不同，实际排名按照实际小数排名</p>
                </div>
                <div>
                    <span class="icon hot-ranking-icon"></span>游戏热度榜：<p>根据游戏被游玩总数进行游戏排行，但是只有上传得分后才能被计算进游玩次数</p>
                </div>
            </div>
        </div>
        <div class="divider">
            <p>————————</p>
            <div class="title">为您推荐</div>
            <p>————————</p>
        </div>
        <div class="more-games">
            <div class="title">热门游戏</div>
            <div class="game-box">
                <div class="game" v-for="item in hotGameArray" @click="toGameInfo(item.gameId)">
                    <img :src="item.url" alt="">
                    <p>{{ item.name }}</p>
                </div>
            </div>
            <div class="divide-line"></div>
            <div class="title">最新游戏</div>
            <div class="game-box">
                <div class="game" v-for="item in newGameArray" @click="toGameInfo(item.gameId)">
                    <img :src="item.gameLogo" alt="">
                    <p>{{ item.gameName }}</p>
                </div>
            </div>
        </div>
        <div class="toTop">
            <div class="content" @click="scrollToTop">
                <div class="icon"></div>
                <div class="tips">返回顶部</div>
            </div>
        </div>
    </div>
</template>

<script>
    import topNav from '../components/topNav';
    export default {
        name: "ranking-list",
        data() {
            return {
                // 排行榜数据列表
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
                                name: '消灭星星',
                                value: 21
                            },
                            {
                                url: require('../assets/images/rankingList/game02.jpg'),
                                name: '2048',
                                value: 15
                            },
                            {
                                url: require('../assets/images/rankingList/game03.jpg'),
                                name: '打地鼠',
                                value: 10
                            },
                            {
                                url: require('../assets/images/rankingList/game04.jpg'),
                                name: '飞机大战',
                                value: 4
                            },
                        ]
                    },
                    {
                        name: '游戏肝帝榜',
                        data: [
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                            {
                                url: require('../assets/images/rankingList/user-icon.png'),
                                name: 'Asuna',
                                value: 20
                            },
                        ]
                    },
                ],
                // 排行榜卡片标记
                rankingFlag: {
                    leftRank1: 1,
                    leftRank2: 2,
                    leftRank3: 3,
                    rightRank1: 1,
                    rightRank2: 2,
                    rightRank3: 3
                },
                // 排行榜卡片背景色
                rankingNavColor: {
                    1: '#0B4C37',
                    2: '#3a7385',
                    3: '#123c7e',
                },
                // 热门游戏列表
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
                // 最新游戏列表
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
                // 榜单介绍信息显示
                rankingInfo: false,
            }
        },
        created(){
          this.$api.rankingList.getRankingList().then(res =>{
              res.scoreList.forEach(item => {
                  item.value = item.value.toFixed(1);
              })
              this.rankingArray[0].data = res.scoreList;
              this.rankingArray[1].data = res.hotList;
              this.rankingArray[2].data = res.bestPersonList;
              // 存放热门游戏前四位
              const hotArray = [];
              // 存放最新游戏前四位
              const newArray = [];
              for(let i = 0; i < 4; i++){
                  hotArray.push(res.hotList[i]);
              }
              for(let i = 0; i < 4; i++){
                  newArray.push(res.newGame[i]);
              }
              this.hotGameArray = hotArray;
              this.newGameArray = newArray;
              console.log(res);
          }).catch(err => console.log(err))
        },
        methods: {
            // 返回主页
            backHome() {
                this.$router.push('/')
            },
            // 跳转游戏库页
            toGameInfo(id) {
                this.$router.push('/GameInfo?id=' + id);
            },
            // 点击排行榜导航块切换排行榜卡片
            tabChangeRank(item) {
                const now = this.rankingFlag.leftRank2 == 0 ? this.rankingFlag.rightRank2 : this.rankingFlag.leftRank2
                const direction = item - now;
                switch (direction) {
                    case -1 :
                    case 2 :
                        this.rankingLeft();
                        break;
                    case 1 :
                    case -2 :
                        this.rankingRight();
                        break;
                }
            },
            // 封装切换左侧排行榜卡片方法
            rankingLeft() {
                if (this.rankingFlag.leftRank1 == 0) {
                    this.rankingFlag.leftRank1 = this.rankingFlag.rightRank1;
                }
                if (this.rankingFlag.leftRank2 == 0) {
                    this.rankingFlag.leftRank2 = this.rankingFlag.rightRank2;
                }
                if (this.rankingFlag.leftRank3 == 0) {
                    this.rankingFlag.leftRank3 = this.rankingFlag.rightRank3;
                }
                this.rankingFlag.rightRank1 = 0;
                this.rankingFlag.rightRank2 = 0;
                this.rankingFlag.rightRank3 = 0;
                // this.rankingFlag.leftRank1 == 0 ? this.rankingFlag.leftRank1 = 1 :
                this.rankingFlag.leftRank1 == 1 ? this.rankingFlag.leftRank1 = 3 : this.rankingFlag.leftRank1--;
                // this.rankingFlag.leftRank2 == 0 ? this.rankingFlag.leftRank2 = 2 :
                this.rankingFlag.leftRank2 == 1 ? this.rankingFlag.leftRank2 = 3 : this.rankingFlag.leftRank2--;
                // this.rankingFlag.leftRank3 == 0 ? this.rankingFlag.leftRank3 = 3 :
                this.rankingFlag.leftRank3 == 1 ? this.rankingFlag.leftRank3 = 3 : this.rankingFlag.leftRank3--;
                console.log(this.rankingFlag);
            },
            // 封装切换右侧排行榜卡片方法
            rankingRight() {
                if (this.rankingFlag.rightRank1 == 0) {
                    this.rankingFlag.rightRank1 = this.rankingFlag.leftRank1;
                }
                if (this.rankingFlag.rightRank2 == 0) {
                    this.rankingFlag.rightRank2 = this.rankingFlag.leftRank2;
                }
                if (this.rankingFlag.rightRank3 == 0) {
                    this.rankingFlag.rightRank3 = this.rankingFlag.leftRank3;
                }
                this.rankingFlag.leftRank1 = 0;
                this.rankingFlag.leftRank2 = 0;
                this.rankingFlag.leftRank3 = 0;
                // this.rankingFlag.leftRank1 == 0 ? this.rankingFlag.leftRank1 = 1 :
                this.rankingFlag.rightRank1 == 3 ? this.rankingFlag.rightRank1 = 1 : this.rankingFlag.rightRank1++;
                // this.rankingFlag.leftRank2 == 0 ? this.rankingFlag.leftRank2 = 2 :
                this.rankingFlag.rightRank2 == 3 ? this.rankingFlag.rightRank2 = 1 : this.rankingFlag.rightRank2++;
                // this.rankingFlag.leftRank3 == 0 ? this.rankingFlag.leftRank3 = 3 :
                this.rankingFlag.rightRank3 == 3 ? this.rankingFlag.rightRank3 = 1 : this.rankingFlag.rightRank3++;
                console.log(this.rankingFlag);
            },
            // 左右切换排行榜卡片
            rankingCardChange(index) {
                if (this.rankingFlag.leftRank1 == (index + 1) || this.rankingFlag.rightRank1 == (index + 1)) {
                    this.rankingLeft();
                }
                if (this.rankingFlag.leftRank3 == (index + 1) || this.rankingFlag.rightRank3 == (index + 1)) {
                    this.rankingRight();
                }
            },
            // 返回顶部
            scrollToTop() {
                window.scrollTo(0, 0)
            },
            // 显示榜单介绍信息
            showRankingInfo(){
                this.rankingInfo = true;
            },
            hideRankingInfo(){
                this.rankingInfo = false;
            }
        },
        computed: {
            rankingName() {
                let index = 1;
                if (this.rankingFlag.leftRank2 == 0) {
                    index = this.rankingFlag.rightRank2 - 1;
                }
                else if (this.rankingFlag.rightRank2 == 0) {
                    index = this.rankingFlag.leftRank2 - 1;
                }

                const rankName = this.rankingArray[index].name;
                return rankName;
            }
        },
        components: {
            topNav
        }
    }
</script>

<style scoped lang="scss">
    .ranking-list {
        position: relative;
        display: flex;
        flex-direction: column;
        background-image: url("../assets/images/rankingList/bg.jpg");
        background-attachment: fixed;
        background-size: 100% 100%;
        /*padding: 30px 50px 0;*/
        box-sizing: border-box;
        .logo {
            width: 400px;
            height: 50px;
            background-image: url("../assets/images/home/logo.png");
            background-size: 100% 100%;
            opacity: 0.8;
            cursor: pointer;
        }
        /* 排行榜 */
        .ranking {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #ffffff;
            margin-top: 20px;
            .ranking-nav {
                width: 300px;
                height: 70px;
                display: flex;
                flex-direction: column;
                background-color: #3a7385;
                border-radius: 20px;
                .nav-title{
                    position: relative;
                    display: flex;
                    line-height: 55px;
                    font-size: 22px;
                    text-align: center;
                    justify-content: center;
                    align-items: center;
                    .info{
                        position: absolute;
                        right: 20%;
                        display: block;
                        width: 20px;
                        height: 20px;
                        background-image: url("../assets/images/rankingList/rangking-info.png");
                        background-size: 100% 100%;
                        cursor: pointer;
                    }
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
                        background-color: #898989;
                        cursor: pointer;
                        &.active{
                            background-color: #e4e4e4;
                        }
                    }
                }
            }
            .ranking-box {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 535px;
                margin-top: -10px;
                .ranking-card {
                    position: absolute;
                    width: 300px;
                    min-height: 455px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 20px;
                    box-sizing: border-box;
                    padding: 0 0 5px;
                    opacity: 0.7;
                    color: #d3d3d3;
                    .list-item {
                        height: 55px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        box-sizing: border-box;
                        padding: 15px 35px 5px 15px;
                        .list-index {
                            display: flex;
                            align-items: center;
                            p {
                                margin-right: 15px;
                                font-size: 17px;
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
                    }
                    @keyframes leftR1toR2 {
                        0% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(-260px);
                        }
                        100% {
                            opacity: 0.95;
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
                    @keyframes rightR1toR3 {
                        0% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(-260px);
                        }
                        100% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(260px);
                        }
                    }
                    @keyframes rightR2toR1 {
                        0% {
                            opacity: 1;
                            z-index: 999;
                            transform: scale(1, 1) translateX(0);
                        }
                        100% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(-260px);
                        }
                    }
                    @keyframes rightR3toR2 {
                        0% {
                            z-index: 0;
                            opacity: 0.7;
                            transform: scale(0.9, 0.9) translateX(260px);
                        }
                        100% {
                            opacity: 0.95;
                            z-index: 999;
                            transform: scale(1, 1) translateX(0);
                        }
                    }
                    &:nth-of-type(3n+1){
                        background-color: #123c7e;
                        background-size: 100% 100%;
                        transform: scale(0.9, 0.9) translateX(260px);
                    }
                    &:nth-of-type(3n+2){
                        background-color: #0B4C37;
                        transform: scale(0.9, 0.9) translateX(-260px);
                    }
                    &:nth-of-type(3n+3){
                        background-color: #3a7385;
                        z-index: 999;
                    }
                    &.leftRank1 {
                        cursor: pointer;
                        animation: leftR3toR1 1s linear forwards;
                    }
                    &.leftRank2 {
                        animation: leftR1toR2 1s linear forwards;
                    }
                    &.leftRank3 {
                        cursor: pointer;
                        animation: leftR2toR3 1s linear forwards;
                    }
                    &.rightRank1{
                        cursor: pointer;
                        animation: rightR2toR1 1s linear forwards;
                    }
                    &.rightRank2{
                        animation: rightR3toR2 1s linear forwards;
                    }
                    &.rightRank3{
                        cursor: pointer;
                        animation: rightR1toR3 1s linear forwards;
                    }
                    .list-item:nth-of-type(8n + 1) {
                        .list-index {
                            p {
                                color: #fffe02;
                            }
                        }
                    }
                }
                .ranking-left {
                    display: flex;
                    align-items: center;
                    height: 100px;
                    border-radius: 10px 0 0 10px;
                    margin-right: 450px;
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
                    margin-left: 450px;
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
        /* 排行榜介绍信息 */
        .ranking-info{
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            .content{
                display: flex;
                flex-direction: column;
                justify-content: center;
                width: 50%;
                height: 60%;
                background-color: #eff3fe;
                background-image: url("../assets/images/rankingList/bg06.jpg");
                background-size: cover;
                opacity: 0.9;
                box-sizing: border-box;
                padding: 6%;
                div{
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    margin: 4% 0;
                    &.title{
                        display: flex;
                        justify-content: center;
                        font-size: 25px;
                        margin-top: -3%;
                        margin-bottom: 4%;
                    }
                    .icon{
                        display: block;
                        width: 40px;
                        min-width: 40px;
                        height: 40px;
                        margin-right: 1%;
                    }
                    .hot-ranking-icon{
                        background-image: url("../assets/images/rankingList/ranking-icon1.png");
                        background-size: 100% 100%;
                    }
                    .score-ranking-icon{
                        background-image: url("../assets/images/rankingList/ranking-icon2.png");
                        background-size: 100% 100%;
                    }
                    .star-ranking-icon{
                        background-image: url("../assets/images/rankingList/ranking-icon3.png");
                        background-size: 100% 100%;
                    }
                    p{
                        white-space: normal;
                    }
                }
            }
        }
        /* 为您推荐分割线 */
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
        /* 更多游戏+热门游戏 */
        .more-games{
            width: 80%;
            background-color: rgba(255, 255, 255, 0.7);
            margin: 40px auto;
            box-sizing: border-box;
            padding: 15px;
            border-radius: 5px;
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
            .divide-line{
                height: 1px;
                width: 90%;
                background-color: #ababab;
                margin: 20px auto;
            }
        }
        /* 返回顶部 */
        .toTop{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
            .content{
                display: flex;
                flex-direction: column;
                align-items: center;
                cursor: pointer;
                .icon{
                    width: 60px;
                    height: 60px;
                    background-image: url("../assets/images/rankingList/toTop.png");
                    background-size: 100% 100%;
                }
                .tips{
                    color: #ffffff;
                    font-size: 20px;
                }
                @keyframes jump {
                    0%{
                        transform: translateY(0);
                    }
                    50%{
                        transform: translateY(-10px);
                    }
                    100%{
                        transform: translateY(0px);
                    }
                }
                &:hover{
                    animation: jump 0.3s linear forwards;
                }
            }
        }
    }
</style>