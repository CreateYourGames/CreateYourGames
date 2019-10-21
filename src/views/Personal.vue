<template>
    <div class="nav-person">
        <!-- 顶部盒子 -->
        <div class="nav">
            <div class="nav-bottom">
                <div class="nav-bottom-img"></div>
                <img src="@/assets/images/personal/01.png" alt/>
                <div class="info">
                    <p style="font-size:22px;font-weight:100;margin-bottom:10px;">用户名字</p>
                    <p style="font-size:14px;">这个人很懒什么都没留下</p>
                </div>
                <button @click="go">编辑资料</button>
            </div>
            <div class="return" @click="goHome">
                <img src="@/assets/images/personal/zuojiantou.png" alt/>
                首页
            </div>
        </div>

        <div>
            <conform ref="delGame"></conform>
        </div>

        <!-- content -->
        <div class="content">
            <div class="publish">
                <span>发布的游戏</span>
                <div class="block">
                    <div v-if="publishList.length>5">
                        <img
                                class="left"
                                @mouseover="leftOver()"
                                @mouseout="leftOut()"
                                v-on:click="left"
                                :src="hover1?img1:img2"
                        />
                        <img
                                class="right"
                                @mouseover="rightOver()"
                                @mouseout="rightOut()"
                                v-on:click="right"
                                :src="hover2?img3:img4"
                        />
                    </div>
                    <div v-else></div>
                    <ul ref="ul">
                        <li
                                v-for="(publish,index) in publishList"
                                :key="index"
                                :class="{style:i === index}"
                                @mouseover="overStyle(index)"
                                @mouseout="outStyle(index)"
                        >
                            <img :src="publish.img" alt/>
                            <div v-show="publish.flag">
                                <p class="details" @click="jumpGameDetails()">查看详情</p>
                                <div class="ud">
                                    <p class="update" @click="jumpGame()">修改信息&nbsp;</p>
                                    <p class="delete" @click="delGame()">&nbsp;删除游戏</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="rl">
                <div class="recently">
                    <span>最近的游戏</span>
                    <ul>
                        <li v-for="game in gameList" :key="game.id" @click="jumpGameDetails">
                            <img :src="game.img" alt/>
                            <p class="gameName">{{game.name}}</p>
                        </li>
                    </ul>
                </div>
                <div class="like">
                    <span>喜欢的游戏</span>
                    <ul>
                        <li
                                v-for="(favor,index) in favorList"
                                :key="index"
                                v-bind:class="{active:ind === index}"
                                @mouseover="addStyle(index)"
                                @mouseout="removeStyle(index)"
                        >
                            <img :src="favor.img" alt/>
                            <div v-bind:class="{bott:!(newInd===index)}">
                                <div class="bot">
                                    <p class="detail" @click="jumpGameDetails">查看详情&nbsp;</p>
                                    <p class="cancel" @click="cancelFavor(favor.id)">&nbsp;取消喜欢</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Conform from "@/components/personal/Conform";

    export default {
        components: {
            Conform
        },
        data() {
            return {
                // 切换左图判定值
                hover1: true,
                // 切换右图标判定值
                hover2: true,
                // 切换图标
                img1: require("@/assets/images/personal/left1.png"),
                img2: require("@/assets/images/personal/left2.png"),
                img3: require("@/assets/images/personal/right1.png"),
                img4: require("@/assets/images/personal/right2.png"),
                // 放大放小索引值
                newInd: "",
                i: "",
                ind: "",
                img104: require("../assets/images/personal/104.jpg"),
                publishList: [
                    {
                        id: 1,
                        img: require("@/assets/images/personal/104.jpg"),
                        flag: false
                    },
                    {
                        id: 2,
                        img: require("@/assets/images/personal/105.jpg"),
                        flag: false
                    },
                    {
                        id: 3,
                        img: require("@/assets/images/personal/103.jpg"),
                        flag: false
                    },
                    {
                        id: 4,
                        img: require("@/assets/images/personal/01.png"),
                        flag: false
                    },
                    {
                        id: 5,
                        img: require("@/assets/images/personal/game1.png"),
                        flag: false
                    },
                    {
                        id: 6,
                        img: require("@/assets/images/personal/info2.jpg"),
                        flag: false
                    },
                    {
                        id: 7,
                        img: require("@/assets/images/personal/game2.png"),
                        flag: false
                    },
                    {
                        id: 8,
                        img: require("@/assets/images/personal/info.jpg"),
                        flag: false
                    }
                ],
                gameList: [
                    {
                        id: 1,
                        name: "游戏1",
                        img: require("@/assets/images/personal/game1.png")
                    },
                    {
                        id: 2,
                        name: "游戏2",
                        img: require("@/assets/images/personal/game2.png")
                    },
                    {
                        id: 3,
                        name: "游戏3",
                        img: require("@/assets/images/personal/game3.png")
                    },
                    {
                        id: 4,
                        name: "游戏4",
                        img: require("@/assets/images/personal/game4.png")
                    }
                ],
                favorList: [
                    {
                        id: 1,
                        name: "游戏1",
                        img: require("@/assets/images/personal/love1.jpg"),
                        flag: false
                    },
                    {
                        id: 2,
                        name: "游戏2",
                        img: require("@/assets/images/personal/love2.jpg"),
                        flag: false
                    },
                    {
                        id: 3,
                        name: "游戏3",
                        img: require("@/assets/images/personal/love3.jpg"),
                        flag: false
                    },
                    {
                        id: 4,
                        name: "游戏4",
                        img: require("@/assets/images/personal/love4.jpg"),
                        flag: false
                    }
                ]
            };
        },
        mounted() {
            console.log(this.$refs.ul.style.width);
            this.$refs.ul.style.width = 170 * this.publishList.length + "px";
        },
        methods: {
            // 路由跳转
            go() {
                this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
            },
            jumpGame() {
                this.$router
                    .push("/Personal/UpdateGameInfo")
                    .catch(err => console.log(err));
            },
            goHome() {
                this.$router.push("/");
            },
            jumpGameDetails() {
                this.$router.push("/GameInfo");
            },
            cancelFavor(id) {
                this.favorList.forEach((item, index) => {
                    if (item.id == id) {
                        console.log(this.favorList.splice(0, 1));
                    }
                });
            },

            // 删除游戏
            delGame() {
                this.$refs.delGame.del()
            },

            //发布的游戏 手表移动事件
            overStyle(index) {
                this.publishList[index].flag = !this.publishList[index].flag;
                this.i = index;
            },
            outStyle(index) {
                this.publishList[index].flag = !this.publishList[index].flag;
                this.i = "";
            },

            // 点击自定义轮播推动
            left() {
                var newList2 = this.publishList.pop();
                this.publishList.unshift(newList2);
            },
            right() {
                var newList1 = this.publishList.shift();
                this.publishList.push(newList1);
            },

            // 喜欢的游戏     鼠标滑入滑出事件
            addStyle(index) {
                this.ind = index;
                this.newInd = index;
            },
            removeStyle(index) {
                this.ind = "";
                this.newInd = "";
            },

            // 判定切换
            leftOver() {
                this.hover1 = false;
            },
            leftOut() {
                this.hover1 = true;
            },
            rightOver() {
                this.hover2 = false;
            },
            rightOut() {
                this.hover2 = true;
            }
        }
    };
</script>

<style lang="scss" scoped>
    // 全部背景
    .nav-person {
        background-image: url("../assets/images/personal/texture.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-color: #eeeeee;
        // 顶部
        .nav {
            height: 250px;
            width: 100%;
            background-image: url("../assets/images/personal/bj.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            .return {
                color: #fff;
                cursor: pointer;
                vertical-align: middle;
                position: absolute;
                margin-top: 10px;
                margin-left: 10px;
                img {
                    width: 15px;
                    height: 15px;
                    vertical-align: middle;
                }
            }
            .nav-bottom {
                width: 100%;
                height: 90px;
                background-color: rgba(128, 128, 128, 0.4);
                position: absolute;
                bottom: 0px;
                .nav-bottom-img {
                    width: 150px;
                    height: 150px;
                    border-radius: 10px;
                    position: absolute;
                    background-image: ("../assets/images/personal/01.png");
                    bottom: 20px;
                    left: 200px;
                }
                img {
                    width: 150px;
                    height: 150px;
                    border-radius: 150px;
                    position: absolute;
                    bottom: 20px;
                    left: 200px;
                }
                .info {
                    position: absolute;
                    left: 370px;
                    top: 13px;
                    color: #fff;
                    opacity: 1 !important;
                }
                @keyframes glow {
                    0% {
                        border-color: #393;
                        box-shadow:
                                0 0 5px rgba(0,255,0,.2),
                                inset 0 0 5px rgba(0,255,0,.1),
                                0 1px 0 #393;
                    }
                    100% {
                        border-color: #6f6;
                        box-shadow:
                                0 0 20px rgba(0,255,0,.6),
                                inset 0 0 10px rgba(0,255,0,.4),
                                0 1px 0 #393;
                    }
                }
                button {
                    width: 90px;
                    height: 40px;
                    background-color: transparent;
                    color: #fff;
                    border: none;
                    border-radius: 10px;
                    position: absolute;
                    right: 300px;
                    top: 25px;
                    outline: none;
                    cursor: pointer;
                    animation: glow 800ms ease-out infinite alternate;
                }
            }
        }
        // content
        .content {
            padding-left: 90px;
            width: 1100px;
            margin: 0px auto;
            // 发布游戏
            .publish {
                width: 1000px;
                height: 200px;
                margin: 50px auto;
                display: flex;
                justify-content: space-around;
                position: relative;
                left: -5px;
                .block {
                    height: 250px;
                    width: 800px;
                    margin-top: 30px;
                    overflow: hidden;
                    padding-left: 20px;
                    padding-top: 20px;
                    .left {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        left: 50px;
                        top: 80px;
                    }
                    .right {
                        position: absolute;
                        width: 40px;
                        height: 40px;
                        right: 50px;
                        top: 80px;
                    }
                }
                span {
                    height: 23px;
                    border-bottom: 2px solid #fec003;
                    display: block;
                    width: 110px;
                    text-align: center;
                    line-height: 20px;
                    font-size: 20px;
                    position: absolute;
                    left: 118px;
                }
                ul li {
                    height: 200px;
                    display: inline-block;
                    margin-right: 40px;
                    vertical-align: middle;
                    // border:1px solid red;
                    .cacher {
                        display: none;
                    }
                    &.style {
                        opacity: 1;
                        transform: scale(1.2, 1.2);
                        transition: all 0.6s;
                    }
                    img {
                        width: 120px;
                        height: 120px;
                        border-radius: 30px;
                        vertical-align: middle;
                    }
                    .details {
                        text-align: center;
                        font-size: 11px;
                        cursor: pointer;
                    }
                    .ud {
                        text-align: center;
                        .update {
                            display: inline-block;
                            font-size: 11px;
                            cursor: pointer;
                        }
                        .delete {
                            display: inline-block;
                            border-left: 1px solid #fec003;
                            font-size: 11px;
                            cursor: pointer;
                        }
                    }
                }
            }
            // 最近和喜欢
            .rl {
                width: 850px;
                display: flex;
                margin: 0px 12%;
                .recently {
                    width: 400px;
                    height: 500px;
                    position: relative;
                    span {
                        height: 23px;
                        border-bottom: 2px solid #fec003;
                        display: block;
                        width: 110px;
                        text-align: center;
                        line-height: 20px;
                        font-size: 20px;
                        position: absolute;
                        left: 0px;
                    }
                    ul li {
                        display: inline-block;
                        margin-right: 40px;
                        margin-top: 40px;
                        cursor: pointer;
                        img {
                            width: 120px;
                            height: 120px;
                            border-radius: 30px;
                        }
                        .gameName {
                            text-align: center;
                            font-size: 14px;
                        }
                    }
                }
                .like {
                    width: 400px;
                    height: 500px;
                    position: relative;
                    span {
                        height: 23px;
                        border-bottom: 2px solid #fec003;
                        display: block;
                        width: 110px;
                        text-align: center;
                        line-height: 20px;
                        font-size: 20px;
                        position: absolute;
                        left: 0px;
                    }
                    ul {
                        padding-top: 40px;
                    }
                    ul li {
                        display: inline-block;
                        margin-right: 40px;
                        height: 160px;
                        margin-bottom: 20px;
                        vertical-align: middle;
                        &.active {
                            opacity: 1;
                            transform: scale(1.2, 1.2);
                            transition: all 0.6s;
                        }
                        .bott {
                            display: none;
                        }
                        .bot {
                            text-align: center;
                            .detail {
                                display: inline-block;
                                font-size: 12px;
                                cursor: pointer;
                            }
                            .cancel {
                                display: inline-block;
                                border-left: 1px solid #fec003;
                                font-size: 12px;
                                cursor: pointer;
                            }
                        }
                        img {
                            width: 120px;
                            height: 120px;
                            border-radius: 30px;
                        }
                        .gameName {
                            text-align: center;
                            font-size: 14px;
                        }
                    }
                }
            }
        }
    }


</style>