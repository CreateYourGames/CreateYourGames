<template>
    <div class="suggest">
        <topNav></topNav>
        <div class="content">
            <div class="suggest-box">
                <img src="../assets/images/home/logo.png" alt="logo"/>
                <br/>
                <div class="suggest-tip">
                    你们随便提提，我们反正是不会改的๑乛◡乛๑
                </div>
                <br/>
                <textarea cols="60" rows="10" placeholder="此处填写建议" v-model="textMessage"></textarea>
                <br/>
                <button class="submit" @click="goTo()">提交建议</button>
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
                MessageList: [
                    {
                        selected: "one",
                        textMessage: "建议是one啥啥啥"
                    },
                    {
                        selected: "two",
                        textMessage: "建议是two啥啥啥"
                    },
                    {
                        selected: "three",
                        textMessage: "建议是three啥啥啥"
                    }
                ]
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
        display: flex;
        flex-direction: column;
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
                img {
                    height: 45px;
                }
                label {
                    color: white;
                }
                select {
                    width: 100px;
                }
                textarea {
                    width: 370px;
                    height: 250px;
                }
                button {
                    width: 150px;
                    height: 30px;
                    border-radius: 30px;
                    border: none;
                    background-color: #fec003;
                    color: #ffffff;
                }
            }
        }
    }
</style>