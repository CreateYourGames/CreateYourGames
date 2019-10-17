<template>
    <div class="details">
        <div class="headBg">
            <div class="logo" @click="goHome" :plain="true">
                <img src="@/assets/images/home/logo.png" alt="Logo"> 
            </div>
            <div class="back" @click="toGameCenter">
                <span>回游戏库</span>
            </div>
        </div>
        <div class="content">
            <div class="content-inner">
                <div class="swiper1">
                    <swiper class="swiper"></swiper>
                </div>
                <div class="game">
                    <div class="game-info">
                        <span>游戏简介</span>
                        <p>游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介游戏简介</p>
                    </div>
                    <div class="game-start">
                        <el-row>
                            <el-button round type="primary">开始游戏</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
            <div class="content-footer">
                <div class="star">
                   <el-rate
                    v-model="value"
                    show-text>
                    </el-rate>
                </div>
                <div class="love">
                    <div class="setLove" @click="addToLove">
                        <img v-if="imgFlag" src="../assets/images/details/love.png" alt="">
                        <img v-else src="../assets/images/details/loveActive.png" alt="">
                        <span>设为喜欢</span>
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
                    <img v-if="qqFlag" src="@/assets/images/details/qq.png" alt="">
                    <img v-else src="@/assets/images/details/qqAlive.png" alt="">
                    </a>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="comment">
                <div class="commit-comment">
                    <p>发表评论</p>
                    <div class="textarea">
                        <form class="form" action="" method="post">
                            <div class="userImg"><img :src="userImg" alt="用户头像"></div>
                            <textarea v-model="comment" placeholder="请输入您的评论：" name="comment-text" id="" cols="65" rows="7"></textarea>
                            <input type="button" value="发布" @click="publish">
                        </form>    
                    </div>
                </div>
                <div class="comment-item">
                    <p>评论区</p>
                    <div class="item" v-for="(item,index) in commentList" :key="index">
                        <div class="item-userInfo">
                            <img :src="item.img" alt="用户头像">
                            <span>{{item.name}}:</span>
                        </div>
                        <div class="item-comment">{{item.comment}}</div>
                        <div class="item-bottom">
                            <div class="good" @click="goodIncrease(index)">
                                <img v-if="item.goodImgFlag" src="../assets/images/details/good.png" alt="点赞数">
                                <img v-else src="../assets/images/details/goodActive.png" alt="点赞数">
                                {{item.good}}
                            </div>
                            <div class="bad" @click="badIncrease(index)">
                                <img v-if="item.badImgFlag" src="../assets/images/details/good.png" alt="点赞数">
                                <img v-else src="../assets/images/details/goodActive.png" alt="点赞数">
                                {{item.bad}}
                            </div>
                            <div class="time">
                                {{item.date}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ranking-list">
                <p>排行榜</p>
                <ul>
                    <li v-for="(item,index) in rankingList" :key='index'>
                        <span>{{item.num}}</span>
                        <span><img :src="item.img" alt=""></span>
                        <span>{{item.grade}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Swiper from '../components/GameInfo/Swiper'
// import {request} from '../network/request'
export default {
    data(){
        return {
            value: null,
            imgFlag:true,
            goodImgFlag:false,
            qqFlag:true,
            comment:'',
            //分享功能动态传参
            url:'https://blog.csdn.net/QPC908694753/article/details/81137975',
            pics:"https://goss1.veer.com/creative/vcg/veer/612/veer-104218671.jpg",
            summary:"是兄弟就来砍我",
            desc:'快来跟我一起玩游戏吧',
            userImg:require('../assets/images/home/01.png'),
            //给请求来的数据加两个标识符，用来判断每个是否在点击状态
            commentList:[
                {
                    img:require('../assets/images/home/01.png'),
                    name:'江小白',
                    comment:'大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                    date:'2019-01-03',
                    good:10,
                    goodImgFlag:true,
                    badImgFlag:true,
                    bad:1
                },
                {
                    img:require('../assets/images/home/01.png'),
                    name:'江小白',
                    comment:'大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                    date:'2019-01-03',
                    good:10,
                    goodImgFlag:true,
                    badImgFlag:true,
                    bad:1
                },
                {
                    img:require('../assets/images/home/01.png'),
                    name:'江小白',
                    comment:'大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我!',
                    date:'2019-01-03',
                    good:10,
                    goodImgFlag:true,
                    badImgFlag:true,
                    bad:1
                },
                {
                    img:require('../assets/images/home/01.png'),
                    name:'江小白',
                    comment:'大家好，我是渣渣辉，一起来贪玩蓝月，是兄弟！就来砍我！',
                    date:'2019-01-03',
                    good:10,
                    goodImgFlag:true,
                    badImgFlag:true,
                    bad:1
                }
            ],
            rankingList:[
                {num:1,img:require('../assets/images/home/01.png'),grade:100},
                {num:2,img:require('../assets/images/home/01.png'),grade:98},
                {num:3,img:require('../assets/images/home/01.png'),grade:97},
                {num:4,img:require('../assets/images/home/01.png'),grade:96},
                {num:5,img:require('../assets/images/home/01.png'),grade:89},
                {num:6,img:require('../assets/images/home/01.png'),grade:86},
                {num:7,img:require('../assets/images/home/01.png'),grade:73},
            ],
            id:'',
            ceshi:[]
        }
    },
    created(){
        this.id=this.$route.query.id
        axios.get('/double/showEnterpriseInfo').then(res=>{
            console.log(res)
        }).catch(err=>console.log(err))
    },
    methods:{
        //返回首页
        goHome(){
            this.$router.push('/')
        },
        //返回游戏库
        toGameCenter(){
            this.$router.push('/GameCenter')
        },
        //添加到喜欢
        addToLove(){
            this.imgFlag=!this.imgFlag
            if(this.imgFlag==true){
                this.$message('取消喜欢成功');
            }else{
                this.$message('加入喜欢成功');
            }
        },
        //发表评论
        publish(){
            const date=new Date()
            const now=date.getFullYear()+"-"+(date.getMonth()+1).toString().padStart(2,'0')+"-"+date.getDate().toString().padStart(2,'0')
            const obj={
                img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1338782153,119777043&fm=26&gp=0.jpg',
                name:'孙永祥',
                date:now,
                good:0,
                bad:0,
                goodImgFlag:true,
                badImgFlag:true,
                comment:this.comment,
            }
            this.commentList.unshift(obj)
            this.comment=''
        },
        //点赞
        goodIncrease(index){
            if(this.commentList[index].goodImgFlag==true){
                this.commentList[index].goodImgFlag=false
                this.commentList[index].good+=1
                //判断点赞和差评，不能同时存在，并且数量上要相应的变化
                if( this.commentList[index].badImgFlag==false){
                    this.commentList[index].badImgFlag=true
                    this.commentList[index].bad-=1
                }
            }
            else{
               this.commentList[index].goodImgFlag=true
                this.commentList[index].good-=1
            }
        },
        //差评
        badIncrease(index){
            if(this.commentList[index].badImgFlag==true){
                this.commentList[index].badImgFlag=false
                this.commentList[index].bad+=1
                if(this.commentList[index].goodImgFlag==false){
                    this.commentList[index].goodImgFlag=true
                    this.commentList[index].good-=1
                }

            }else{
                this.commentList[index].badImgFlag=true
                this.commentList[index].bad-=1

            }
        }
    },
    components:{
        Swiper
    }
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/base.scss';
.details{
    width: 100%;
    text-align: center;
    background-color: #333;
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
            cursor: pointer;
        }
    }
    .content{
        width:70%;height: 500px;
        border-radius: 5px;
        position: relative;
        background-color: white;
        top: -150px;
        left:15%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .content-inner{
            width: 92%;height: 400px;
            display: flex;
            margin: 0 auto;
            .swiper1{
                width: 70%;
                border-radius: 15px;
            }
            .game{
                width: 30%;
                background-color: white;
                border: 1px solid #eee;
                .game-info{
                    width: 90%;height: 300px;
                    overflow: hidden;
                    margin: 0 auto;
                    margin-top: 20px;
                    span:nth-of-type(1){
                        font-size: 18px;
                    }
                }
            }
        }
        .content-footer{
            width: 92%;height: 50px;
            padding-top: 10px;
            background-color: white;
            margin:0 auto;
            display: flex;
            font-size: 14px;
            .star{
                width: 200px;
            }
            .love{
                width: 200px;
                height: 25px;
                display: flex;
                justify-content: space-between;
                line-height: 25px;
                margin-left: 200px;
                .setLove{
                    width: 90px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    cursor: pointer;
                    img{
                        width: 20px;height: 20px;
                    }
                }
                .searchCode{
                    width: 80px;
                    border: 1px solid #ccc;
                    border-radius: 3px;
                    cursor: pointer;
                }
                
            }
            .share{
                width: 150px;height: 25px;
                margin-left: 100px;
                display: flex;
                align-items: center;
                img{
                    width: 20px;height: 20px;
                    cursor: pointer;
                }
            }
        }
    }
    .main{
        width: 70%;
        background-color: white;
        margin: 0 auto;
        position: relative;
        top: -100px;
        border-radius: 5px;
        display: flex;
        justify-content: space-around;
        .comment{
            width: 60%;
            .commit-comment{
                width: 100%;height: 190px;
                margin-top: 10px;
                padding: 5px 10px 10px 10px;
                background-color: white;
                border: 1px solid #eee;
                .textarea{
                    width:90%;height: 150px;
                    margin-top: 10px;
                    position: relative;
                    .form{
                        display: flex;
                        .userImg{
                            img{
                                width: 20px;height: 20px;
                                border-radius: 50%;
                            }   
                        }
                        textarea{
                            outline: none;
                            margin-left: 10px;
                        }
                        input{
                            width: 70px;height: 25px;
                            position: absolute;
                            border-radius: 5px;
                            border: 1px solid #ccc;
                            background-color:white;
                            bottom: 10px;
                            right: 0;
                            cursor: pointer;
                        }
                    }
                }
            }
            .comment-item{
                width: 100%;
                margin-top: 50px;
                border:1px solid #eee;
                p{
                    padding: 10px;
                    font-size: 18px;
                }
                .item{
                    text-align: left;
                    position: relative;
                    width: 85%;height: 150px;
                    border-bottom: 1px solid #eee;
                    margin: 10px auto;
                    .item-userInfo{
                        width: 150px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img{
                            width: 35px;height: 35px;
                            border-radius: 50%;
                        }
                        span{
                            margin-left: 10px;
                        }
                    }   
                    .item-comment{
                        width: 80%;
                        margin-left: 70px;
                        @include no-wrap-multi(2)
                    } 
                    .item-bottom{
                        width: 80%;
                        display: flex;
                        position: absolute;
                        left: 10%;
                        bottom: 5px;
                        justify-content: space-between;
                        align-items: center;
                        img{
                            width: 15px;height: 15px;
                        }
                        .good{
                            cursor: pointer;
                        }
                        .bad{
                            margin-left: -200px;
                            cursor: pointer;
                            img{
                                transform: rotate(180deg)
                            }
                        }

                    }
                }
               
            }
        }
        .ranking-list{
            width:25%;
            margin-top: 10px;
            height: 500px;
            border: 1px solid #eee;
            p{
                padding: 10px;
                font-size: 20px;
            }
            img{
                width: 25px;height: 25px;
                border-radius: 50%;
            }
            ul{
                list-style: none;
                font-size: 18px;
                li{
                    display: flex;
                    position: relative;
                    justify-content: space-around;
                    margin-top: 10px;
                    color: #ccc;
                    span:nth-of-type(1){
                       position: absolute;
                       left: 30px;
                    }
                    span:nth-of-type(2){
                       position: absolute;
                       left: 60px;
                    }
                    span:nth-of-type(3){
                       margin-left: 100px;
                    }
                    &:nth-of-type(1){
                        color: rgb(255, 97, 97)
                    }
                    &:nth-of-type(2){
                        color: rgb(255, 192, 98)
                    }
                    &:nth-of-type(3){
                        color: rgb(255, 233, 5)
                    }
                }
            }
        }
    }
}
</style>