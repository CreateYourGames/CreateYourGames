<template>
    <div class="suggest">
        <topNav></topNav>
        <div class="content">
            <div class="suggest-box">
                <div class="suggest-logo">
                    <img src="../assets/images/home/logo.png" alt="logo"/>
                </div>
                <div class="suggest-tip">
                    你们随便提提，我们反正是不会改的๑乛◡乛๑
                </div>
                <textarea cols="60" rows="10" placeholder="此处填写建议" v-model="textMessage"></textarea>
                <div class="submit">
                    <img :src="submitImg" alt=""
                         @click="goTo"
                         @mousedown="mouseDown"
                         @mouseup="mouseUp"
                    >提交建议
                </div>
                <!--<button class="submit" @click="goTo()">提交建议</button>-->
            </div>
        </div>
    </div>
</template>

<script>
    import topNav from '../components/topNav';

    export default {
        data() {
            return {
                selected: "one",
                textMessage: "",
                submitImg: require('../assets/images/suggest/submit.png'),
                mouseDownImg: require('../assets/images/suggest/submit-click.png'),
                mouseUpImg: require('../assets/images/suggest/submit.png')
            };
        },

        methods: {
            goTo() {
                // 点击最后一个"下一步”，弹出确认提交按钮
                this.$confirm("确认提交?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.$message({
                            type: "success",
                            message: "提交成功!"
                        });
                        this.$router.push("/");
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消提交"
                        });
                    });
            },
            mouseDown(){
                this.submitImg = this.mouseDownImg;
                console.log('down');
            },
            mouseUp(){
                this.submitImg = this.mouseUpImg;
                console.log('up');
            }
        },
        components: {
            topNav
        }
    };
</script>

<style lang="scss" scoped>
    .suggest {
        width: 100%;
        height: 100%;
        background-image: url("../assets/images/home/bg.png");
        background-size: 100% 100%;
        // display: flex;
        // flex-direction: column;
        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .suggest-box {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .suggest-tip {
                    color: #ffffff;
                    font-size: 20px;
                }
                .suggest-logo img {
                    height: 45px;
                    margin: 50px 0 30px;
                }
                .suggest-tip{
                    margin: 20px 0;
                }
                textarea {
                    width: 370px;
                    height: 250px;
                    margin-bottom: 40px;
                    box-sizing: border-box;
                    padding: 10px;
                }
                .submit {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    color: #ffffff;
                    img{
                        width: 96px;
                        height: 80px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    }
                }
            }
        }
    }
</style>