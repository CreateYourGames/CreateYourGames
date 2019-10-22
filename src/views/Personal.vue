<template>
    <div class="nav-person">
        <!-- 顶部盒子 -->
        <div class="nav">
            <div class="nav-bottom">
                <div class="top-content">
                    <div class="user-info">
                        <img :src="picture" alt/>
                        <div class="info">
                            <p class="user-name">{{nickName}}</p>
                            <p class="user-intro">{{personalInfo}}</p>
                        </div>
                    </div>
                    <div class="btn-box">
                        <button @click="goHome">返回主页</button>
                        <button @click="go">编辑资料</button>
                    </div>
                </div>
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
              <img :src="publish.gamePic" alt />
              <div v-show="publish.flag">
                <p class="details" @click="jumpGameDetails(publish.gameId)">查看详情</p>
                <div class="ud">
                  <p class="update" @click="jumpGame(index)">修改信息&nbsp;</p>
                  <p class="delete" @click="delGame(publish.gameId)">&nbsp;删除游戏</p>
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
            <li v-for="(game) in gameList" :key="game.id" @click="jumpGameDetails">
              <img :src="game.gamePic" alt />
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
              <img :src="favor.gamePic" alt />
              <div v-bind:class="{bott:!(newInd===index)}">
                <div class="bot">
                  <p class="detail" @click="jumpGameDetails(favor.gameId)">查看详情&nbsp;</p>
                  <p class="cancel" @click="cancelFavor(favor.gameId)">&nbsp;取消喜欢</p>
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
      // 删除gameid
      gameId:'',
      // 切换左图判定值
      hover1: true,
      // 切换右图标判定值
      hover2: true,
      userMsg:'',
      picture:'',
      nickName:'',
      personalInfo:'',
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
          id: 4,
          name: "游戏4",
          img: require("@/assets/images/personal/love4.jpg"),
          flag: false
        }
      ]
    };
  },
  created(){
     //请求到发布游戏的相关数据
     let val = this.$store.state.token.loginName
        this.$api.personal.publishGame(val).then(res=>{
            this.publishList=res.publishList
            // console.log(res)
        }),
        this.$api.personal.recentGame(val).then(res=>{
            this.gameList=res.gameList
            // console.log(res)
        }),
        this.$api.personal.favorGame(val).then(res=>{
            this.favorList=res.favorList
            // console.log(res)
        }),
        this.$api.loginInfo.getLoginInfo(this.$store.state.token.loginName).then(res=>{
            // console.log(res)
            this.picture=res.userMsg[0].picture
            this.nickName=res.userMsg[0].nickName
            this.personalInfo=res.userMsg[0].personalInfo
        })
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
    jumpGame(i) {
      console.log(i,"index")
      this.$router
        .push('/Personal/UpdateGameInfo?id='+this.publishList[i].gameId)
        .catch(err => console.log(err));
    },
    goHome() {
      this.$router.push("/");
    },
    jumpGameDetails(id) {
      console.log(id)
      this.$router.push("/GameInfo?id="+id);
    },
    cancelFavor(id) {
      var obj={
        userLoginName:this.$store.state.token.loginName,
        gameId:`${id}`
      }
      this.$api.gameInfo.removeLove(obj).then(()=>{
        this.$message({
          message:'取消喜欢成功',
          type:"success"
        })
      }).catch(()=>{
        this.$message.error("取消喜欢失败")
      })
      this.$api.personal.favorGame(val).then(res=>{
          this.favorList=res.favorList
          // console.log(res)

      })
    },
    // 删除游戏
    delGame(id) {
      this.$refs.delGame.del(id)
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
            height: 230px;
            width: 100%;
            background-image: url("../assets/images/personal/personal.jpg");
            background-repeat: no-repeat;
            background-size: cover;
            position: relative;
            .nav-bottom {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 70px;
                background-color: rgba(0, 0, 0, 0.9);
                position: absolute;
                bottom: 0px;
                .top-content{
                    display: flex;
                    justify-content: space-between;
                    width: 55%;
                    .user-info{
                        display: flex;
                        img {
                            width: 120px;
                            height: 120px;
                            border-radius: 50%;
                            margin-top: -60px;
                            border: 5px solid rgba(0, 0, 0, 0.9);
                        }
                        .info {
                            margin-left: 5%;
                            color: #fff;
                            box-sizing: border-box;
                            padding: 5px;
                            .user-name{
                                font-size: 22px;
                                margin-bottom: 5px;
                            }
                            .user-intro{
                                white-space: nowrap;
                                /*margin: 5px;*/
                            }
                        }
                    }
                    .btn-box{
                        display: flex;
                        align-items: center;
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
                            margin: 5px;
                            outline: none;
                            cursor: pointer;
                            animation: glow 800ms ease-out infinite alternate;
                        }
                    }
                }
            }
        }
        // content
        .content {
            width: 1100px;
            margin: 0 auto;
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
                        transform: scale(1.1, 1.1);
                        transition: all 0.3s;
                    }
                    img {
                        width: 120px;
                        height: 120px;
                        border-radius: 15px;
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
                justify-content: center;
                padding-left: 5%;
                margin: 0 12%;
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
                            border-radius: 15px;
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
                            transform: scale(1.1, 1.1);
                            transition: all 0.3s;
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
                            border-radius: 15px;
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