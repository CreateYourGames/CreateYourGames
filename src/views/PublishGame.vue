<template>
    <div class="publish-game">
        <topNav></topNav>
        <div class="form-box">
            <form action="">
                <div class="step step1">
                    <div class="game-name">
                        <label for="">游戏名称：</label>
                        <input type="text" name="" id="" value="" placeholder="皮皮蛇">
                    </div>
                    <div class="game-icon">
                        <label for="" class="special">游戏图标：</label>
                        <div class="container">
                            <img class="game-img" src="@/assets/images/personal/104.jpg" alt="">
                            <div class="up-gm-img">
                                <img src="@/assets/images/personal/z.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="step step2"></div>
                <div class="step step3"></div>
                <!--<div class="game-icon">-->
                <!--<label for="" class="special">游戏图标：</label>-->
                <!--<div class="container">-->
                <!--<img class="game-img" src="@/assets/images/personal/104.jpg" alt="">-->
                <!--<div class="up-gm-img" >-->
                <!--<img src="@/assets/images/personal/z.png" alt="">-->
                <!--</div>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div class="game-name">-->
                <!--<label for="">游戏名称：</label>-->
                <!--<input type="text" name="" id="" value="" placeholder="皮皮蛇">-->
                <!--</div>-->
                <!--<div class="game-type">-->
                <!--<label for="">游戏分类：</label>-->
                <!--<input type="text" name="" id="" value="" placeholder="益智类">-->
                <!--</div>-->
                <!--<div class="game-info">-->
                <!--<label for=""  class="special">游戏简介：</label>-->
                <!--<textarea name="" id="" cols="30" rows="10" placeholder="皮皮蛇"></textarea>-->
                <!--</div>-->
                <!--<div class="game-img">-->
                <!--<label for="">游戏相关截图：</label>-->
                <!--<ul>-->
                <!--<li>-->
                <!--<img src="@/assets/images/personal/103.jpg" alt="">-->
                <!--</li>-->
                <!--<li><img src="@/assets/images/gamePublish/jiahao.png" alt="">-->
                <!--</li>-->
                <!--</ul>-->
                <!--</div>-->
                <!--<div class="game-file">-->
                <!--<label for="">游戏源码文件：</label>-->
                <!--<input type="file" name="" id="" style="border:none;">-->
                <!--</div>-->
                <!--<button class="gamePublish" @click="gamePublish()">确认发布</button>-->
            </form>
        </div>
    </div>
</template>

<script>
    import topNav from '../components/topNav';

    export default {
        methods: {
            gamePublish() {
                this.$router.push('/')
            }
        },
        components: {
            topNav
        }
    }
</script>

<style lang="scss" scoped>

    .publish-game {
        height: 100%;
        background-image: url('../assets/images/personal/bg.png');
        background-size: 100% 100%;
        border: 1px solid black;
        .form-box {
            height: calc(100% - 60px);
            form {
                height: 100%;
                display: flex;
                .step {
                    width: 33.333%;
                    height: 100%;
                }
                .step1 {
                    background-color: rgba(76, 156, 218, 0.4);
                    .container{
                        margin-bottom: 40px;
                        margin-left: 100px;
                        width: 120px;
                        height: 110px;
                        position: relative;
                        .game-img{
                            margin-top: 20px;
                            width: 120px;
                            height: 110px;
                            background-color: pink;
                            position: absolute;
                        }
                        .up-gm-img{
                            margin-top: 20px;
                            width: 120px;
                            height: 110px;
                            background-color: rgba(128,128,128,0.4);
                            color: #fff;
                            text-align: center;
                            line-height: 100px;
                            position: absolute;
                            cursor: pointer;
                            img{
                                width: 50px;
                                height: 50px;
                                vertical-align: middle;
                            }
                        }
                    }
                }
                .step2 {
                    /*background-color: rgba(9, 218, 65, 0.4);*/
                    background-color: rgba(0, 0, 0, 0.6);
                    &:hover{
                        transition: all 0.6s;
                        background-color: rgba(9, 218, 65, 0.4);
                    }
                }
                .step3 {
                    background-color: rgba(0, 0, 0, 0.6);
                    &:hover{
                        transition: all 0.6s;
                        background-color: rgba(199, 218, 47, 0.4);
                    }
                }
            }
        }
        /*.nav-game{
            width: 600px;
            height: 700px;
            margin: 0 auto;
            position: relative;
            label{
                font-size: 20px;
            }
            input{
                width: 290px;
                height: 40px;
                border: 1px solid gray;
                border-radius: 20px;
                margin-top: 20px;
                top: -50px;
                padding-left: 20px;
                outline: none;
            }
            textarea{
                width: 290px;
                height: 110px;
                margin-top: 20px;
                font-size: 16px;
                font-family: 微软雅黑;
            }
            .special{
                display:block;
                margin-top:60px;
                float:left;
            }
            .container{
                margin-bottom: 40px;
                margin-left: 100px;
                width: 120px;
                height: 110px;
                position: relative;
                .game-img{
                    margin-top: 20px;
                    width: 120px;
                    height: 110px;
                    background-color: pink;
                    position: absolute;
                }
                .up-gm-img{
                    margin-top: 20px;
                    width: 120px;
                    height: 110px;
                    background-color: rgba(128,128,128,0.4);
                    color: #fff;
                    text-align: center;
                    line-height: 100px;
                    position: absolute;
                    cursor: pointer;
                    img{
                        width: 50px;
                        height: 50px;
                        vertical-align: middle;
                    }
                }
            }
            ul{
                overflow: hidden;
                li{
                    width: 150px;
                    height: 100px;
                    float: left;
                    margin: 10px 15px;
                    border: 1px solid #ccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &:nth-of-type(1){
                        img{
                            width:150px;height: 100px;
                        }
                    }
                    &:nth-of-type(2){
                        img{
                            width:50px;height: 50px;
                        }
                    }
                    .del-img{
                        width: 20px;
                        height: 20px;
                        position: absolute;
                        top: 0;
                        right: -30px;
                        cursor: pointer;
                    }
                }
            }
            .gamePublish{
                width:150px;
                height: 40px;
                background-color: rgb(243, 73, 73);
                color: white;
                border: none;
                border-radius: 40px;
                margin-left: 90px;
                margin-top:15px;
                bottom: 45px;
                outline: none;
                cursor: pointer;
            }
        }*/
    }


</style>