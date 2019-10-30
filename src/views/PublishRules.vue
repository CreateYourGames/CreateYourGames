<template>
    <div class="publish-rules">
        <topNav></topNav>
        <div class="content">
            <div class="tip">
                <div class="info">
                    <p class="intro">
                        游戏代码文件请使用压缩文件.zip.rar上传，如果使用Vue等方式编写游戏，不要上传node_modules文件夹，压缩包大小限制在10M以内<span class="span1"></span>
                    </p>
                    <p class="welcome">
                        游戏变量声明请尽量语义化，同时添加必要的注释，游戏内相关方法请合理封装，若已按照规范上传游戏，出现审核问题请联系我们： yugiasuna@foxmail.com
                    </p>
                </div>
                <div class="start-publish">
                    <input type="button" value="我已了解，前往发布" @click="toPublishGame">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import topNav from '../components/topNav';
    export default {
        name: "publish-rules",
        methods: {
            toPublishGame(){
                this.$router.push('/PublishGame')
            }
        },
        components: {
            topNav
        }
    }
</script>

<style scoped lang="scss">
    .publish-rules{
        height: 100%;
        background-image: url("../assets/images/publishGameTips/bg.jpg");
        background-size: 100% 100%;
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100% - 60px);
            .tip {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 350px;
                /*margin: 3% auto;*/
                /*color: #ffffff;*/
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 2px;
                .info {
                    box-sizing: border-box;
                    padding: 20px;
                    margin: 30px 0 10px;
                    p {
                        font-size: 18px;
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
                        background-color: rgb(92,131,146);
                        margin-top: 20px;
                        cursor: pointer;
                        font-size: 20px;
                        border-radius: 2px;
                    }
                }
            }
        }
    }
</style>