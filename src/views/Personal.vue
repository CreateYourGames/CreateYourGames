<template>
    <div>
        <!-- 顶部盒子 -->
        <div class="nav">
            <div @click="backHome">返回主页</div>
            <div class="nav-bottom">
                <img src="@/assets/images/personal/01.png" alt="">
                <div class="info">
                    <p style="font-size:22px;font-weight:100;margin-bottom:10px;">用户名字</p>
                    <p style="font-size:14px;">这个人很懒什么都没留下</p>
                </div>
                <button @click="go">编辑资料</button>
            </div>
        </div>

        <!-- content -->
        <div class="content">
            <div class="publish">
                <span>发布的游戏</span>
                <ul>
                    <li>
                        <img @click="toGameInfo" src="@/assets/images/personal/103.jpg" alt="">
                    <p class="details" @click="toGameInfo">查看详情</p>
                    <div class="ud">
                        <p class="update" @click="toUpdateGameInfo">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                    </div>
                    </li>
                   <li>
                        <img src="@/assets/images/personal/103.jpg" alt="">
                        <p class="details">查看详情</p>
                        <div class="ud">
                            <p class="update">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                        </div>
                    </li>
                    <li>
                        <img src="@/assets/images/personal/103.jpg" alt="">
                        <p class="details">查看详情</p>
                        <div class="ud">
                            <p class="update">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                        </div>
                    </li>
                    <li>
                        <img src="@/assets/images/personal/103.jpg" alt="">
                        <p class="details">查看详情</p>
                        <div class="ud">
                            <p class="update">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                        </div>
                    </li>
                    <li>
                        <img src="@/assets/images/personal/103.jpg" alt="">
                        <p class="details">查看详情</p>
                        <div class="ud">
                            <p class="update">修改信息&nbsp;</p><p class="delete">&nbsp;删除游戏</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="rl">
                <div class="recently">
                    <span>最近的游戏</span>
                    <ul>
                        <li>
                            <img src="@/assets/images/personal/104.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/104.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/104.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/104.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                    </ul>
                </div>
                <div class="like">
                    <span>喜欢的游戏</span>
                    <ul>
                        <li>
                            <img src="@/assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                        <li>
                            <img src="@/assets/images/personal/105.jpg" alt="">
                            <p class="gameName">游戏名称</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    methods:{
        go(){
            this.$router.push('/Personal/UpdateInfo');
            // location.href='personal/updateInfo'
        },
        backHome(){
            this.$router.push('/')
        },
        toGameInfo(){
            this.$router.push('/GameInfo')
        },
        toUpdateGameInfo(){
            this.$router.push('/Personal/UpdateGameInfo')
        }
    }
}
</script> 

<style lang="scss" scoped>

// 顶部
.nav{
    height: 250px;
    width: 100%;
    background-color: pink;
    background-image: url(../assets/images/personal/bg.png);
    background-repeat:no-repeat;
    position: relative;
    .nav-bottom{
        width: 100%;
        height: 90px;
        background-color: rgba(128,128,128,0.4);
        position: absolute;
        bottom: 0px;
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
        span{
            height: 23px;
            border-bottom: 2px solid #FEC003;
            display: block;
            width: 110px;
            text-align: center;
            line-height: 20px;
            font-size: 20px;
            position: absolute;
            left: 75px;
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
        width: 850px;
        display: flex;
        margin: 80px auto;
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