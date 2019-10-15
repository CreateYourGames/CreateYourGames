<template>
    <div class="game-publish-point">
        <div class="logo">
            <img src="../assets/images/home/logo.png" alt="">
        </div>
        <div class="content">
            <div class="info">
                <p>
                    这位开发者,我看你骨骼惊奇,必是百年难得一遇的代码奇才,如果有一天让你打通任督二脉,那还不天下无敌,将来维护宇宙和平的重任就交给你了,<span class="span1">我这有本秘籍,看与你有缘,这本《如来神掌》就10块卖给你了</span>。
                </p>
                <p>
                    欢迎来到游戏发布页,在发布您的游戏之前,请确保已经阅读<span @click="goSomeWhere" class="span2">游戏上传代码规范</span>,如果您已经阅读代码规范并按照内,容开发好了您的游戏,单击以下按钮将游戏与大家分享吧。
                </p>
            </div>
            <input type="button" value="开始发布" @click="next">
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        goSomeWhere(){
            this.$router.push("/")
        },
        next(){
            this.$router.push('/PublishGame')
        }
    }
}
</script>
<style lang="scss" scoped>
    .game-publish-point{
        .logo{
            width: 100%;height: 150px;
            background-color: rgb(26, 26, 28);
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .content{
            width: 500px;
            margin: 50px auto;
            text-align: center;
            p{
                font-size: 18px;
                letter-spacing: 4px;
                text-indent: 2.5em;
                .span1{
                    text-decoration: line-through;
                }
                .span2{
                    color: blue;
                    cursor: pointer;
                }
            }
            input{
                width: 200px;height: 40px;
                border: 1px solid #ccc;
                border-radius: 40px;
                background-color: white;
                margin-top: 20px;
                cursor: pointer;
            }
        }
    }
</style>