<template>
    <div class="gameInfo">
        <div class="headBg">
            <div class="logo" @click="goHome" :plain="true">
            </div>
            <div class="back" @click="toGameCenter">
                <span>回游戏库</span>
            </div>
        </div>
        <div class="content">
            <div class="game-content">
                <div class="swiper1">
                    <swiper class="swiper" :swiperImage="gameImg"></swiper>
                </div>
                <div class="content-func">
                    <div class="name">
                        <p>{{ gameName }}</p>
                    </div>
                    <div class="star" @click="gameStar">
                        <el-rate
                                v-model="value"
                                show-text>
                        </el-rate>
                    </div>
                    <div class="love">
                        <div class="setLove" @click="addToLove">
                            <img v-if="imgFlag" src="../assets/images/gameInfo/love.png" alt="">
                            <img v-else src="../assets/images/gameInfo/loveActive.png" alt="">
                            <span v-if="imgFlag">设为喜欢</span>
                            <span v-else>取消喜欢</span>
                        </div>
                        <div class="searchCode">
                            <span>查看代码</span>
                        </div>
                    </div>
                    <div class="share">
                        <span>分享游戏到：</span>
                        <a
                                :href="'https://connect.qq.com/widget/shareqq/index.html?url='+url+'&pics='+pics+'&desc='+desc+'&summary='+summary+'&flash=&site=&style=201&width=50&height=32'"
                                target="_blank"
                                @mouseenter='qqFlag=false'
                                @mouseleave="qqFlag=true">
                            <img v-if="qqFlag" src="@/assets/images/gameInfo/qq.png" alt="">
                            <img v-else src="@/assets/images/gameInfo/qqAlive.png" alt="">
                        </a>
                    </div>
                    <div class="game-start">
                        <el-row>
                            <el-button round type="primary" @click="toPlaying">开始游戏</el-button>
                        </el-row>
                    </div>
                </div>
                <div class="content-info">
                    <div class="game-info">
                        <div class="info-content">
                            <p>游戏简介：</p>
                            <p>{{gameDetail}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="comment">
                <div class="commit-comment">
                    <p>发表评论</p>
                    <div class="textarea">
                        <form action="" method="post">
                            <div class="userImg">
                                <img :src="userImg" alt="用户头像">
                            </div>
                            <div class="publish">
                                <textarea v-model="comment" maxlength="200" placeholder="请输入您的评论：" name="comment-text"
                                          id="" cols="65" rows="7"></textarea>
                                <input type="button" value="发布" @click="publish">
                                <div class="countInput">{{comment.length}}/200</div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="comment-item">
                    <div class="hot-comment">
                        <p class="hot-comment-title">精彩评论</p>
                        <div class="item" v-for="(item,index) in hotCommentList" :key="item.id">
                            <div class="item-userInfo">
                                <img :src="item.picture" alt="用户头像">
                            </div>
                            <div class="item-content">
                                <div class="item-comment">
                                    <span class="user-span">{{item.nickName}}:</span><span class="comment-span">{{item.comDetail}}</span>
                                </div>
                                <div class="item-bottom">
                                    <div class="time">
                                        {{item.comTime}}
                                    </div>
                                    <div class="like">
                                        <div class="good" @click="goodIncrease1(index)">
                                            <img v-if="item.goodImgFlag" src="../assets/images/gameInfo/good.png"
                                                 alt="点赞数">
                                            <img v-else src="../assets/images/gameInfo/goodActive.png" alt="点赞数">
                                            {{item.goodNum}}
                                        </div>
                                        <div class="bad" @click="badIncrease1(index)">
                                            <img v-if="item.badImgFlag" src="../assets/images/gameInfo/good.png"
                                                 alt="点赞数">
                                            <img v-else src="../assets/images/gameInfo/goodActive.png" alt="点赞数">
                                            {{item.badNum}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="commentFlag">
                        暂无评论~
                    </div>
                    <div class="normal-comment">
                        <p class="normal-comment-title">最新评论({{commentList.length}})</p>
                        <div class="item" v-for="(item,index) in commentList" :key="item.id">
                            <div class="item-userInfo">
                                <img :src="item.picture" alt="用户头像">
                            </div>
                            <div class="item-content">
                                <div class="item-comment">
                                    <span class="user-span">{{item.nickName}}:</span><span class="comment-span">{{item.comDetail}}</span>
                                </div>
                                <div class="item-bottom">
                                    <div class="time">
                                        {{item.comTime}}
                                    </div>
                                    <div class="like">
                                        <div class="good" @click="goodIncrease(index)">
                                            <img v-if="item.goodImgFlag" src="../assets/images/gameInfo/good.png"
                                                 alt="点赞数">
                                            <img v-else src="../assets/images/gameInfo/goodActive.png" alt="点赞数">
                                            {{item.goodNum}}
                                        </div>
                                        <div class="bad" @click="badIncrease(index)">
                                            <img v-if="item.badImgFlag" src="../assets/images/gameInfo/good.png"
                                                 alt="点赞数">
                                            <img v-else src="../assets/images/gameInfo/goodActive.png" alt="点赞数">
                                            {{item.badNum}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="commentFlag">
                        暂无评论~
                    </div>
                    <div v-if='loadingMore' class="loadingMore">点击加载更多~</div>
                </div>
            </div>
            <div class="ranking-list">
                <p>排行榜</p>
                <ul>
                    <li v-for="(item,index) in rankingList" :key='index'>
                        <span>{{index+1}}</span>
                        <span><img :src="item.picture" alt=""></span>
                        <span>{{item.score}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import Swiper from '../components/GameInfo/Swiper'

    export default {
        data() {
            return {
                value: null,
                imgFlag: true,
                goodImgFlag: false,
                commentFlag: false,
                qqFlag: true,
                loadingMore: false,
                gameImg: [],
                loginName: this.$store.state.token.loginName,
                // 游戏简介
                gameDetail: '',
                // 游戏名称
                gameName: '',
                // 当前评论
                comment: '',
                //分享功能动态传参
                url: 'https://http://121.40.245.126/',
                pics: "https://goss1.veer.com/creative/vcg/veer/612/veer-104218671.jpg",
                summary: "是兄弟就来砍我",
                desc: '快来跟我一起玩游戏吧',
                userImg: require('../assets/images/home/user.png'),
                //给请求来的数据加两个标识符，用来判断每个是否在点击状态
                hotCommentList: [
                    {
                        img: require('../assets/images/home/user.png'),
                        name: '江小白',
                        comment: '大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                        date: '2019-01-03',
                        good: 10,
                        goodImgFlag: true,
                        badImgFlag: true,
                        bad: 1
                    },
                    {
                        img: require('../assets/images/home/user.png'),
                        name: '江小白',
                        comment: '大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                        date: '2019-01-03',
                        good: 10,
                        goodImgFlag: true,
                        badImgFlag: true,
                        bad: 1
                    },
                    {
                        img: require('../assets/images/home/user.png'),
                        name: '江小白',
                        comment: '大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                        date: '2019-01-03',
                        good: 10,
                        goodImgFlag: true,
                        badImgFlag: true,
                        bad: 1
                    },
                    {
                        img: require('../assets/images/home/user.png'),
                        name: '江小白',
                        comment: '大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！',
                        date: '2019-01-03',
                        good: 10,
                        goodImgFlag: true,
                        badImgFlag: true,
                        bad: 1
                    }
                ],
                commentList: [],
                rankingList: [
                    {num: 1, img: require('../assets/images/home/user.png'), grade: 100},
                    {num: 2, img: require('../assets/images/home/user.png'), grade: 98},
                    {num: 3, img: require('../assets/images/home/user.png'), grade: 97},
                    {num: 4, img: require('../assets/images/home/user.png'), grade: 96},
                    {num: 5, img: require('../assets/images/home/user.png'), grade: 89},
                    {num: 6, img: require('../assets/images/home/user.png'), grade: 86},
                    {num: 7, img: require('../assets/images/home/user.png'), grade: 73},
                ],
                id: '',
                ceshi: [],
            }
        },
        created() {
            this.id = this.$route.query.id
            const name = this.$store.state.token.loginName
            //进入页面判段用户是否喜欢过改游戏
            this.$api.gameInfo.loveJudge({name: name, id: this.id}).then(res => {
                if (res == true) {
                    this.imgFlag = false
                }
            })
            //请求到游戏详情页的相关数据
            this.$api.gameInfo.gameInfoApi({id: this.id, loginName: this.$store.state.token.loginName}).then(res => {
                this.gameName = res.gameInfo[0].gameName;
                console.log(this.gameName);
                this.gameImg = res.gameInfo[0].gamePic.split('|')
                this.gameDetail = res.gameInfo[0].gameDetail
                this.hotCommentList = res.hotCommentList
                this.rankingList = res.rankList
                this.commentList = res.newCommentList
                if (res.userMsg) {
                    this.userImg = res.userMsg[0].picture
                }
                if (this.hotCommentList.length == 0) {
                    this.commentFlag = true
                }
            })
        },
        methods: {
            //返回首页
            goHome() {
                this.$router.push('/')
            },
            //返回游戏库
            toGameCenter() {
                this.$router.push('/GameCenter');
            },
            //获取url游戏id
            getGameId() {
                const query = window.location.hash;
                const pair = query.split("=");
                return pair[1];
            },
            //上传游戏star
            gameStar(){
                console.log("走了上传游戏分数")
                if(this.loginName){
                    var value={
                        loginName: this.loginName,
                        gameId: this.id,
                        star:this.value
                    }
                    this.$api.gameInfo.gameStar(value).then(res=>{
                        this.$message({
                            message:'评分成功',
                            type:'success'
                        })
                    })
                }
                else{
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }
            },
            //开始游戏
            toPlaying() {
                const gameId = this.getGameId();
                this.$router.push(`/Game/${gameId}`);
            },
            // 添加到喜欢
            addToLove() {
                if (this.loginName) {
                    var love = {
                        userLoginName: this.loginName,
                        gameId: this.id
                    }
                    this.imgFlag = !this.imgFlag
                    if (this.imgFlag == true) {
                        this.$api.gameInfo.removeLove(love).then(() => {
                            this.$message({
                                message: '取消喜欢成功',
                                type: 'success'
                            });
                        })
                    }
                    else {
                        this.$api.gameInfo.addToLove(love).then(() => {
                            this.$message({
                                message: '加入喜欢成功',
                                type: 'success'
                            });
                        })
                    }
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }
            },
            //发表评论
            async publish() {
                if (this.loginName) {
                    if (this.comment == '') {
                        this.$message.error("请先输入内容")
                        return
                    }
                    const date = new Date();
                    const now = date.getFullYear() + "年" +
                        (date.getMonth() + 1).toString().padStart(2, '0') + "月" +
                        date.getDate().toString().padStart(2, '0') + "日 " +
                        date.getHours().toString().padStart(2, '0') + ":" +
                        date.getMinutes().toString().padStart(2, '0');
                    const obj = {
                        picture: this.userImg,
                        userLoginName: this.loginName,
                        gameId: this.id,
                        comTime: now,
                        goodNum: 0,
                        badNum: 0,
                        goodImgFlag: true,
                        badImgFlag: true,
                        comDetail: this.comment,
                    }
                    this.commentList.unshift(obj)
                    await this.$api.gameInfo.comPublish(obj).then(() => {
                        this.$message({
                            message: '评论成功',
                            type: 'success'
                        });
                    }).catch(() => {
                        this.$message.error("评论失败")
                    })
                    this.comment = ''
                    //再次发送请求
                    await this.$api.gameInfo.gameInfoApi({id: this.id, loginName: this.loginName}).then(res => {
                        console.log(res)
                        this.commentList = res.newCommentList
                    })
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }
            },
            //点赞
            goodIncrease(index) {
                if (this.loginName) {
                    if (this.commentList[index].goodImgFlag == false) {
                        this.commentList[index].goodImgFlag = true
                        this.commentList[index].goodNum -= 1
                        //发表评论，第一个参数是第几条评论，第二个参数是评论的个数
                        this.$api.gameInfo.goodIncrease(this.commentList[index].comId, this.commentList[index].goodNum)
                    }
                    else {
                        this.commentList[index].goodImgFlag = false
                        this.commentList[index].goodNum += 1
                        this.$api.gameInfo.goodIncrease(this.commentList[index].comId, this.commentList[index].goodNum)
                        //判断点赞和差评，不能同时存在，并且数量上要相应的变化
                        if (this.commentList[index].badImgFlag == false) {
                            this.commentList[index].badImgFlag = true
                            this.commentList[index].badNum -= 1
                            this.$api.gameInfo.badIncrease(this.commentList[index].comId, this.commentList[index].badNum)
                        }
                    }
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }

            },
            //差评
            badIncrease(index) {
                if (this.loginName) {
                    if (this.commentList[index].badImgFlag == false) {
                        this.commentList[index].badImgFlag = true
                        this.commentList[index].badNum -= 1
                        this.$api.gameInfo.badIncrease(this.commentList[index].comId, this.commentList[index].badNum)
                    } else {
                        this.commentList[index].badImgFlag = false
                        this.commentList[index].badNum += 1
                        this.$api.gameInfo.badIncrease(this.commentList[index].comId, this.commentList[index].badNum)
                        if (this.commentList[index].goodImgFlag == false) {
                            this.commentList[index].goodImgFlag = true
                            this.commentList[index].goodNum -= 1
                            this.$api.gameInfo.goodIncrease(this.commentList[index].comId, this.commentList[index].goodNum)
                        }
                    }
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }

            },
            //热评点赞
            goodIncrease1(index) {
                if (this.loginName) {
                    if (this.hotCommentList[index].goodImgFlag == false) {
                        this.hotCommentList[index].goodImgFlag = true
                        this.hotCommentList[index].goodNum -= 1
                        //发表评论，第一个参数是第几条评论，第二个参数是评论的个数
                        this.$api.gameInfo.goodIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].goodNum)
                    }
                    else {
                        this.hotCommentList[index].goodImgFlag = false
                        this.hotCommentList[index].goodNum += 1
                        this.$api.gameInfo.goodIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].goodNum)
                        //判断点赞和差评，不能同时存在，并且数量上要相应的变化
                        if (this.hotCommentList[index].badImgFlag == false) {
                            this.hotCommentList[index].badImgFlag = true
                            this.hotCommentList[index].badNum -= 1
                            this.$api.gameInfo.badIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].badNum)
                        }
                    }
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }

            },
            //热评差评
            badIncrease1(index) {
                if (this.loginName) {
                    if (this.hotCommentList[index].badImgFlag == false) {
                        this.hotCommentList[index].badImgFlag = true
                        this.hotCommentList[index].badNum -= 1
                        this.$api.gameInfo.badIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].badNum)
                    } else {
                        this.hotCommentList[index].badImgFlag = false
                        this.hotCommentList[index].badNum += 1
                        this.$api.gameInfo.badIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].badNum)
                        if (this.hotCommentList[index].goodImgFlag == false) {
                            this.hotCommentList[index].goodImgFlag = true
                            this.hotCommentList[index].goodNum -= 1
                            this.$api.gameInfo.goodIncrease(this.hotCommentList[index].comId, this.hotCommentList[index].goodNum)
                        }
                    }
                }
                else {
                    alert("您即将前往登录页")
                    this.$store.commit('getRouter', this.$router.history.current.fullPath)
                    this.$router.push('/Login')
                }

            }
        },
        components: {
            Swiper
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/scss/base.scss';

    .gameInfo {
        width: 100%;
        text-align: center;
        background-image: url("../assets/images/gameInfo/infoHeadBg.jpg");
        background-size: 100% 100%;
        .headBg {
            width: 100%;
            height: 300px;
            background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
            position: relative;
            overflow: hidden;
            .logo {
                width: 400px;
                height: 50px;
                background-image: url("../assets/images/home/logo.png");
                background-size: 100% 100%;
                opacity: 0.8;
                margin: 30px 50px;
                cursor: pointer;
            }
            .back {
                width: 100px;
                height: 50px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #ececec;
                border-radius: 0 0 10px 10px;
                position: absolute;
                top: 0;
                right: 15%;
                cursor: pointer;
            }
        }
        // 游戏详情主体部分
        .content {
            width: 70%;
            position: relative;
            background-color: white;
            top: -180px;
            left: 15%;
            display: flex;
            box-shadow: 0 0 10px 0 #737373;
            .game-content {
                width: 100%;
                display: flex;
                flex-direction: column;
                background-color: white;
                .swiper1 {
                    height: 450px;
                    width: 100%;
                    border-radius: 15px;
                    .swiper {
                        height: 100%;
                    }
                }
                .content-func {
                    height: 60px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    border-right: 1px solid #ddd;
                    .name {
                        width: 200px;
                        p {
                            margin: 0 20px;
                            font-size: 25px;
                        }
                    }
                    .star {
                        width: 200px;
                    }
                    .love {
                        width: 200px;
                        height: 25px;
                        display: flex;
                        justify-content: space-between;
                        line-height: 25px;
                        margin-left: 160px;
                        .setLove {
                            width: 90px;
                            border: 1px solid #ccc;
                            border-radius: 3px;
                            display: flex;
                            justify-content: space-around;
                            align-items: center;
                            cursor: pointer;
                            img {
                                width: 20px;
                                height: 20px;
                            }
                        }
                        .searchCode {
                            width: 80px;
                            border: 1px solid #ccc;
                            border-radius: 3px;
                            cursor: pointer;
                        }

                    }
                    .share {
                        width: 150px;
                        height: 25px;
                        margin-left: 50px;
                        display: flex;
                        align-items: center;
                        img {
                            width: 20px;
                            height: 20px;
                            cursor: pointer;
                        }
                    }
                    .game-start {
                        margin-right: 20px;
                    }
                }
                .content-info {
                    width: 100%;
                    display: flex;
                    font-size: 14px;
                    border-top: 1px solid #ddd;
                    box-sizing: border-box;
                    padding: 10px;
                    .game-info {
                        display: flex;
                        overflow: hidden;
                        .info-content {
                            display: flex;
                            align-items: center;
                            p:nth-of-type(1) {
                                white-space: nowrap;
                                font-size: 18px;
                            }
                            p {
                                text-align: left;
                            }
                        }
                    }
                }
            }
        }
        // 评论排行部分
        .main {
            width: 70%;
            background-color: rgba(255, 255, 255, 0.8);
            /*background-image: url("../assets/images/gameInfo/commentBg.jpg");*/
            margin: -130px auto;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            opacity: 0.95;
            .comment {
                width: 70%;
                margin: 10px;
                .commit-comment {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 220px;
                    padding: 10px 20px 0 0;
                    background-color: white;
                    border: 1px solid #eee;
                    .textarea {
                        width: 90%;
                        margin-top: 10px;
                        position: relative;
                        form {
                            display: flex;
                            .userImg {
                                img {
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                }
                            }
                            .publish {
                                position: relative;
                                width: 100%;
                                margin-left: 10px;
                                text-align: right;
                                textarea {
                                    width: 100%;
                                    outline: none;
                                    box-sizing: border-box;
                                    padding: 10px;
                                    resize: none;
                                }
                                input {
                                    width: 80px;
                                    height: 25px;
                                    border-radius: 5px;
                                    border: 1px solid #ccc;
                                    background-color: #37a2ff;
                                    cursor: pointer;
                                    color: #ffffff;
                                    margin-top: 10px;
                                }
                                .countInput {
                                    position: absolute;
                                    bottom: 45px;
                                    right: 10px;
                                    color: #c8c8c8;
                                }
                            }
                        }
                    }
                }
                .comment-item {
                    width: 100%;
                    margin-top: 20px;
                    background-color: #ffffff;
                    .hot-comment,
                    .normal-comment {
                        .item {
                            display: flex;
                            text-align: left;
                            position: relative;
                            width: 90%;
                            border-bottom: 1px solid #eee;
                            margin: 10px auto;
                            box-sizing: border-box;
                            padding: 10px 0 20px;
                            color: rgb(51, 51, 51);
                            // 评论区头像
                            .item-userInfo {
                                display: flex;
                                justify-content: center;
                                img {
                                    width: 45px;
                                    height: 45px;
                                    border-radius: 50%;
                                }
                            }
                            .item-content {
                                width: 100%;
                                display: flex;
                                flex-direction: column;
                                margin-left: 15px;
                                .item-comment {
                                    .user-span {
                                        color: rgb(19, 119, 196);
                                    }
                                    .comment-span {
                                        margin-left: 10px;
                                    }
                                }
                                .item-bottom {
                                    width: 100%;
                                    display: flex;
                                    justify-content: space-between;
                                    align-items: center;
                                    color: rgb(168, 168, 168);
                                    margin-top: 15px;
                                    img {
                                        width: 15px;
                                        height: 15px;
                                    }
                                    .like {
                                        display: flex;
                                        .good {
                                            cursor: pointer;
                                            margin-right: 10px;
                                        }
                                        .bad {
                                            cursor: pointer;
                                            img {
                                                transform: rotate(180deg)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .hot-comment {
                        margin-bottom: 40px;
                        .hot-comment-title {
                            width: 90%;
                            padding: 10px 0;
                            text-align: left;
                            margin: 0 auto;
                            border-bottom: 1px solid #eee;
                            color: rgb(51, 51, 51);
                        }
                    }
                    .normal-comment {
                        .normal-comment-title {
                            width: 90%;
                            padding: 10px 0;
                            text-align: left;
                            margin: 0 auto;
                            border-bottom: 1px solid #eee;
                            color: rgb(51, 51, 51);
                        }
                    }

                }
                .loadingMore {
                    cursor: pointer;
                    font-weight: 600
                }
            }
            .ranking-list {
                width: 25%;
                height: 500px;
                border: 1px solid #eee;
                background-color: #ffffff;
                margin: 10px;
                p {
                    padding: 10px;
                    font-size: 20px;
                }
                img {
                    width: 25px;
                    height: 25px;
                    border-radius: 50%;
                }
                ul {
                    list-style: none;
                    font-size: 18px;
                    li {
                        display: flex;
                        position: relative;
                        justify-content: space-around;
                        margin-top: 10px;
                        color: #ccc;
                        span:nth-of-type(1) {
                            position: absolute;
                            left: 30px;
                        }
                        span:nth-of-type(2) {
                            position: absolute;
                            left: 60px;
                        }
                        span:nth-of-type(3) {
                            margin-left: 100px;
                        }
                        &:nth-of-type(1) {
                            color: rgb(255, 97, 97)
                        }
                        &:nth-of-type(2) {
                            color: rgb(255, 192, 98)
                        }
                        &:nth-of-type(3) {
                            color: rgb(255, 233, 5)
                        }
                    }
                }
            }
        }
    }
</style>