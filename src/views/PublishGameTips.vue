<template>
    <div class="game-publish-tips">
        <topNav></topNav>
        <div class="content">
            <div class="info">
                <p class="intro">
                    这位开发者,我看你骨骼惊奇,必是百年难得一遇的代码奇才,如果有一天让你打通任督二脉,那还不天下无敌,将来维护宇宙和平的重任就交给你了,<span class="span1">我这有本秘籍,看与你有缘,这本《如来神掌》就10块卖给你了</span>。
                </p>
                <p class="welcome">
                    欢迎来到游戏发布页,在发布您的游戏之前,请确保已经阅读<span @click="goPublishRules" class="span2">游戏上传代码规范</span>,如果您已经阅读代码规范并按照内容开发好了您的游戏,单击以下按钮将游戏与大家分享吧。
                </p>
            </div>
            <div class="start-publish">
                <input type="button" value="开始发布" @click="next">
            </div>
        </div>
    </div>
</template>
<script>
    import topNav from '../components/topNav';
    export default {
        methods: {
            goSomeWhere() {
                this.$router.push("/PublishRules")
            },
            next() {
                this.$router.push('/PublishGame')
            }
        },
        components: {
            topNav
        }
    }
</script>
<style lang="scss" scoped>
    .game-publish-tips {
        height: 100%;
        background-image: url("../assets/images/publishGameTips/bg7.jpg");
        background-size: 100% 100%;
        .content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 400px;
            margin: 40px auto;
            /*color: #ffffff;*/
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 2px;
            .info {
                box-sizing: border-box;
                padding: 20px;
                margin: 40px 0 20px;
                p {
                    font-size: 20px;
                    letter-spacing: 4px;
                    text-indent: 48px;
                    .span1 {
                        text-decoration: line-through;
                    }
                    .span2 {
                        color: blue;
                        cursor: pointer;
                    }
                }
                .intro{
                    margin-bottom: 20px;
                }
            }
            .start-publish {
                width: 100%;
                input {
                    width: 100%;
                    height: 60px;
                    color: #ffffff;
                    border: none;
                    background-color: #0c8aff;
                    margin-top: 20px;
                    cursor: pointer;
                    font-size: 20px;
                    border-radius: 2px;
                }
            }
        }
    }
</style>