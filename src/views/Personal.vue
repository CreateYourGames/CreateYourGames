<template>
    <div>
        <!-- 顶部盒子 -->
        <div class="nav">
            <div class="nav-bottom">
                <div class="nav-bottom-img"></div>
                <img src="@/assets/images/personal/01.png" alt="">
                <div class="info">
                    <p style="font-size:22px;font-weight:100;margin-bottom:10px;">用户名字</p>
                    <p style="font-size:14px;">这个人很懒什么都没留下</p>
                </div>
                <button @click="go">编辑资料</button>
                <div class="return" @click="goHome">首页</div>
            </div>
        </div>
     
        <!-- content -->
        <div class="content">
            <div class="publish">
                <span>发布的游戏</span>
                <div class="block">
                        <el-carousel height="250px">
                        <el-carousel-item v-for="publish in publishList" :key="publish.id">
                             <ul>
                                <li>
                                    <!-- <img :src="publishList[id].img" alt=""> -->
                                    <img :src="publishList[1].img" alt="">
                                    <img :src="publishList[2].img" alt="">
                                    <p class="details">查看详情</p>
                                    <div class="ud">
                                        <p class="update" @click="jumpGame()">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                                    </div>
                                </li>
                             </ul>
                        </el-carousel-item>
                        </el-carousel>
                </div>
            </div>
            <div class="rl">
                <div class="recently">
                    <span>最近的游戏</span>
                    <ul>
                        <li>
                            <img :src="img104" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img :src="img104" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img :src="img104" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img :src="img104" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                    </ul>
                </div>
                <div class="like">
                    <span>喜欢的游戏</span>
                    <ul>
                        <li>
                            <img src="../assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="../assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="../assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="../assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

                    
                    
                  
    </div>
</template>

<script>
export default {
    data(){
        return {
            img104 : require("../assets/images/personal/104.jpg"),
            publishList:[
                {
                id:1,
                img:require('@/assets/images/personal/104.jpg')
                },
                {
                id:2,
                img:require('@/assets/images/personal/105.jpg')
                },
                {
                id:3,
                img:require('@/assets/images/personal/103.jpg')
                },
                {
                id:4,
                img:require('@/assets/images/personal/01.png')
                },
            ]
        }
    },
    methods:{
        go(){
            this.$router.push('/Personal/UpdateInfo').catch(err => console.log(err))
        },
        jumpGame(){
            this.$router.push('/Personal/UpdateGameInfo').catch(err => console.log(err))
        },
        goHome(){
            this.$router.push('/')
        }
    }
}
</script> 

<style lang="scss" scoped>
.block{
    width: 850px;
    margin-top: 40px;
}
 .el-carousel__item h3 {
    // color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

//   .el-carousel__item:nth-child(2n) {
//     //  background-color: #99a9bf;
//   }
  
//   .el-carousel__item:nth-child(2n+1) {
//     //  background-color: #d3dce6;
//   }




// 顶部
.nav{
    height: 250px;
    width: 100%;
    background-color: pink;
    background-image: url('../assets/images/personal/bg.png');
    background-repeat:no-repeat;
    position: relative;
    .nav-bottom{
        width: 100%;
        height: 90px;
        background-color: rgba(128,128,128,0.4);
        position: absolute;
        bottom: 0px;
        .return{
            color: #fff;
            left: 90%;
            cursor: pointer;
        }
    }
    .nav-bottom-img{
        width: 150px;
        height: 150px;
        border-radius: 10px;
        position: absolute;
        background-image: ('../assets/images/personal/01.png');
        bottom: 20px;
        left: 200px;
    }
    .nav-bottom>img{
        width: 150px;
        height: 150px;
        border-radius: 150px;
        position: absolute;
        bottom: 20px;
        left: 200px;
    }
    .nav-bottom>.info{
        position: absolute;
        left: 370px;
        top: 13px;
        color: #fff;
        opacity: 1 !important;
    }
    button{
        width: 90px;
        height: 40px;
        background-color: #FEC003;
        color: #fff;
        border: none;
        border-radius: 10px;
        position: absolute;
        right: 300px;
        top: 25px;
        outline: none;
        cursor: pointer;
    }
} 


// content
.content{
    width: 1100px;
    // border: 1px solid red;
    margin: 0px auto;
    // 发布游戏
    .publish{
        width: 1000px;
        height: 200px;
        margin: 40px auto;
        display: flex;
        justify-content: space-around;
        position: relative;
        // border: 1px solid red;
        span{
            height: 23px;
            border-bottom: 2px solid #FEC003;
            display: block;
            width: 110px;
            text-align: center;
            line-height: 20px;
            font-size: 20px;
            position: absolute;
            // left: 75px;
            left: 130px;
        }
        ul li{
            display: inline-block;
            // margin-right: 20px;
            margin-left: 100px;
            margin-top: 40px;
            img{
                width: 150px;
                height: 150px;
                border-radius: 30px;
            }
            .details{
                text-align: center;
                font-size: 14px;
                cursor: pointer;
            }
            .ud{
                text-align: center;
                .update{
                    display: inline-block;
                    font-size: 14px;
                    cursor: pointer;
                }
                .delete{
                    display: inline-block;
                    border-left: 1px solid #FEC003;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
            
        }
    }
    // 最近和喜欢
    .rl{
        // border: 1px solid red;
        width: 850px;
        display: flex;
        margin: 120px 16%;
        .recently{
            // border: 1px solid blue;
            width: 400px;
            height: 500px;
            position: relative;
            span{
                height: 23px;
                border-bottom: 2px solid #FEC003;
                display: block;
                width: 110px;
                text-align: center;
                line-height: 20px;
                font-size: 20px;
                position: absolute;
                left: 0px;
            }
            ul li{
                display: inline-block;
                margin-right: 20px;
                margin-top: 40px;
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 30px;
                }
                .gameName{
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
        .like{
            width: 400px;
            height: 500px;
            // border: 1px solid blue;
            position: relative;
            span{
                height: 23px;
                border-bottom: 2px solid #FEC003;
                display: block;
                width: 110px;
                text-align: center;
                line-height: 20px;
                font-size: 20px;
                position: absolute;
                left: 0px;
            }
            ul li{
                display: inline-block;
                margin-right: 20px;
                margin-top: 40px;
                img{
                    width: 150px;
                    height: 150px;
                    border-radius: 30px;
                }
                .gameName{
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>