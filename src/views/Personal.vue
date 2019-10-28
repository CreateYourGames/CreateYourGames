<template>
  <div class="nav-person">
    <!-- 顶部盒子 -->
    <div class="nav">
      <div class="nav-bottom">
        <div class="top-content">
          <div class="user-info">
            <img :src="picture" alt />
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

    <div class="content">
      <!-- 开发者部分 -->
      <div class="publish" v-if="isDeveloper===1">
        <span>发布的游戏</span>
        <!-- 有发布 -->
        <div class="block" v-if="publishList.length!=0">
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
              <img :src="publish.gameLogo" alt />
              <!-- <img :src="publish.img" alt /> -->
              <div v-show="publish.flag">
                <p class="details" @click="jumpGameDetails(index+1)">查看详情</p>
                <div class="ud">
                  <p class="update" @click="jumpGame(index)">修改信息&nbsp;</p>
                  <p class="delete" @click="delGame(publish.gameId)">&nbsp;删除游戏</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 无发布 -->
        <div class="noGame" v-if="publishList.length===0">
          <p>亲！暂时还没有发布过游戏哦！快去发布游戏吧！</p>
          <button @click="goPublish()">前往发布游戏</button>
        </div>
      </div>

      <!-- 所有用户 -->
      <div class="rl">
        <!-- 最近的游戏 -->
        <div class="recently">
          <span>最近的游戏</span>

          <!-- 无最近game -->
          <div class="middle" v-if="gameList.length===0">
            <div class="noGame">
              <p>亲！暂时还没有玩过游戏！<br/>快去玩游戏吧！</p>
              <button @click="goGame()">前往游戏库</button>
            </div>
          </div>

          <!-- 有最近game -->
          <div class="mid-Game" v-if="gameList.length!=0">
            <ul>
              <li v-for="(game) in gameList" :key="game.id" @click="jumpGameDetails(game.gameId)">
                <img :src="game.gameLogo" alt />
                <p class="gameName">{{game.name}}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 喜欢的游戏 -->
        <div class="like">
          <span>喜欢的游戏</span>

          <!-- 没有喜欢-->
          <div class="middle" v-if="favorList.length===0">
            <!-- 没有喜欢 -->
            <div class="noGame">
              <p>亲！暂时还没有喜欢过的游戏！<br/>快去玩游戏吧！</p>
              <button @click="goGame()">前往游戏库</button>
            </div>
          </div>
          <!-- 有喜欢 -->
          <div class="mid-Game" v-if="favorList.length!=0">
            <ul>
              <li
                v-for="(favor,index) in favorList"
                :key="index"
                v-bind:class="{active:ind === index}"
                @mouseover="addStyle(index)"
                @mouseout="removeStyle(index)"
              >
                <img :src="favor.gameLogo" alt />
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
      isDeveloper: 0,

      // 删除gameid
      gameId: "",
      // 切换左图判定值
      hover1: true,
      // 切换右图标判定值
      hover2: true,
      userMsg: "",
      picture: "",
      nickName: "",
      personalInfo: "",
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
        // {
        //   id: 1,
        //   img: require("@/assets/images/personal/104.jpg"),
        //   flag: false
        // },
        // {
        //   id: 2,
        //   img: require("@/assets/images/personal/105.jpg"),
        //   flag: false
        // },
        // {
        //   id: 3,
        //   img: require("@/assets/images/personal/103.jpg"),
        //   flag: false
        // },
        // {
        //   id: 4,
        //   img: require("@/assets/images/personal/01.png"),
        //   flag: false
        // },
        // {
        //   id: 5,
        //   img: require("@/assets/images/personal/game1.png"),
        //   flag: false
        // },
        // {
        //   id: 6,
        //   img: require("@/assets/images/personal/info2.jpg"),
        //   flag: false
        // }
      ],
      gameList: [
        // {
        //   id: 1,
        //   name: "游戏1",
        //   img: require("@/assets/images/personal/game1.png")
        // },
        // {
        //   id: 2,
        //   name: "游戏2",
        //   img: require("@/assets/images/personal/game2.png")
        // },
        // {
        //   id: 3,
        //   name: "游戏3",
        //   img: require("@/assets/images/personal/game3.png")
        // },
        // {
        //   id: 4,
        //   name: "游戏4",
        //   img: require("@/assets/images/personal/game4.png")
        // }
      ],
      favorList: [
        // {
        //   id: 1,
        //   name: "游戏1",
        //   img: require("@/assets/images/personal/love1.jpg"),
        //   flag: false
        // },
        // {
        //   id: 4,
        //   name: "游戏4",
        //   img: require("@/assets/images/personal/love4.jpg"),
        //   flag: false
        // },
        // {
        //   id: 1,
        //   name: "游戏1",
        //   img: require("@/assets/images/personal/love1.jpg"),
        //   flag: false
        // },
        // {
        //   id: 4,
        //   name: "游戏4",
        //   img: require("@/assets/images/personal/love4.jpg"),
        //   flag: false
        // }
      ]
    };
  },

  created() {
    //请求到发布游戏的相关数据
    let val = this.$store.state.token.loginName;
    this.$api.personal.publishGame(val).then(res => {
      this.publishList = res.publishList;
      // console.log(res)
    }),
      this.$api.personal.recentGame(val).then(res => {
        this.gameList = res.gameList;
        // console.log(res)
      }),
      this.$api.personal.favorGame(val).then(res => {
        this.favorList = res.favorList;
        // console.log(res)
      }),
      this.$api.loginInfo
        .getLoginInfo(this.$store.state.token.loginName)
        .then(res => {
          // console.log(res)
          this.picture = res.userMsg[0].picture;
          this.nickName = res.userMsg[0].nickName;
          this.personalInfo = res.userMsg[0].personalInfo;

          // 请求判断是否为开发者
          this.isDeveloper = res.userMsg[0].flag;
        })
        .catch(err => console.log(err));
  },
  mounted() {
    setTimeout(() => {
        console.log(this.$refs.ul);
        this.$refs.ul.style.width = 170 * this.publishList.length + "px";
    }, 500);
   
    
  },
  methods: {
    // 路由跳转
    go() {
      this.$router.push("/Personal/UpdateInfo").catch(err => console.log(err));
    },
    jumpGame(i) {
      console.log(i, "index");
      this.$router
        .push("/Personal/UpdateGameInfo?id=" + this.publishList[i].gameId)
        .catch(err => console.log(err));
    },
    goHome() {
      this.$router.push("/");
    },

    // 前往游戏库
    goGame() {
      this.$router.push("/GameCenter");
    },
    goPublish() {
      this.$router.push("/PublishGameTips");
    },

    jumpGameDetails(id) {
      console.log(id);
      this.$router.push("/GameInfo?id=" + id);
    },
    cancelFavor(id) {
      var obj = {
        userLoginName: this.$store.state.token.loginName,
        gameId: `${id}`
      };
      this.$api.gameInfo
        .removeLove(obj)
        .then(() => {
          this.$message({
            message: "取消喜欢成功",
            type: "success"
          });
          this.$router.go(0);
        })
        .catch(() => {
          this.$message.error("取消喜欢失败");
        });
      this.$api.personal.favorGame(val).then(res => {
        this.favorList = res.favorList;
        // console.log(res)
      });
    },

    // 删除游戏
    delGame(id) {
      this.$refs.delGame.del(id);
      // this.$router.go(0);
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
      .top-content {
        display: flex;
        justify-content: space-between;
        width: 55%;
        .user-info {
          display: flex;
          img {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin-top: -60px;
            border: 5px solid rgba(0, 0, 0, 0.9);
          }
          .info {
            color: #fff;
            box-sizing: border-box;
            padding: 5px;
            .user-name {
              font-size: 22px;
              margin-bottom: 5px;
            }
            .user-intro {
              white-space: nowrap;
              /*margin: 5px;*/
            }
          }
        }
        .btn-box {
          display: flex;
          align-items: center;
          @keyframes glow {
            0% {
              border-color: #393;
              box-shadow: 0 0 5px rgba(0, 255, 0, 0.2),
                inset 0 0 5px rgba(0, 255, 0, 0.1), 0 1px 0 #393;
            }
            100% {
              border-color: #6f6;
              box-shadow: 0 0 20px rgba(0, 255, 0, 0.6),
                inset 0 0 10px rgba(0, 255, 0, 0.4), 0 1px 0 #393;
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
            animation: glow 1000ms ease-out infinite alternate;
          }
        }
      }
    }
  }
  // content
  .content {
    width: 1100px;
    margin: 0 auto;
    height: calc(100% - 230px);

    // 开发者部分
    // 发布游戏
    .publish {
      width: 1000px;
      height: 200px;
      margin: 50px auto;
      display: flex;
      justify-content: space-around;
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
        left: 80px;
      }

      .block {
        height: 200px;
        width: 855px;
        margin-top: 30px;
        display: block;
        overflow: hidden;
        padding-left: 30px;
        padding-top: 20px;

        // border: solid 1px red;
        .left {
          position: absolute;
          width: 40px;
          height: 40px;
          left: 50px;
          top: 90px;
        }
        .right {
          position: absolute;
          width: 40px;
          height: 40px;
          right: 50px;
          top: 80px;
        }

        ul li {
          height: 200px;
          display: inline-block;
          margin-right: 45px;
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

      // 没有“发布的游戏”
      .noGame {
        // border: solid 1px #d8dce0;
        margin-top: 30px;
        width: 830px;
        height: 150px;
        text-align: center;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -40%);
        p {
          padding: 15px 30px;
          line-height: 45px;
          font-size: 21px;
        }
        button {
          width: 145px;
          height: 38px;
          margin-top: 10px;
          border: none;
          border-radius: 30px;
          background-color: #fec003;
          color: white;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }

    // 开发者和普通用户共同部分
    // 最近和喜欢
    .rl {
      width: 1000px;
      display: flex;
      justify-content: center;
      margin: 50px auto;

      // 最近的游戏
      .recently {
        width: 400px;
        height: 100%;
        position: relative;
        margin-right: 30px;

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

        // 无最近游戏
        .middle {
          // border: solid 1px #d8dce0;
          height: 440px;
          margin-top: 60px;

          position: relative;
          // 没有“最近的游戏”
          .noGame {
            width: 400px;
            text-align: center;
            position: absolute;
            top: 10%;
            left: 40%;
            transform: translate(-50%, -10%);

            p {
              padding: 15px 30px;
              line-height: 45px;
              font-size: 21px;
            }
            button {
              width: 140px;
              height: 40px;
              margin-top: 20px;
              border: none;
              border-radius: 30px;
              background-color: #fec003;
              color: white;
              font-size: 18px;
              cursor: pointer;
            }
          }
        }
        // 最近游戏
        .mid-Game {
          height: calc(100% - 60px);
          margin-top: 60px;
          ul li {
            display: inline-block;
            margin: 5px;
            margin-right: 35px;
            cursor: pointer;
            img {
              width: 120px;
              height: 120px;
              border-radius: 15px;

              &:hover {
                opacity: 1;
                transform: scale(1.1, 1.1);
                transition: all 0.3s;
              }
            }
            .gameName {
              text-align: center;
              font-size: 14px;
            }
          }
        }
      }

      // 喜欢的游戏
      .like {
        width: 400px;
        height: 100%;
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

        // 没有“喜欢的游戏”
        .middle {
          height: 440px;
          margin-top: 60px;
          // border: solid 1px #d8dce0;
          position: relative;
          // 没有“喜欢的游戏”
          .noGame {
            width: 400px;
            text-align: center;
            position: absolute;
            top: 10%;
            left: 45%;
            transform: translate(-50%, -10%);

            p {
              padding: 15px 30px;
              line-height: 45px;
              font-size: 21px;
            }
            button {
              width: 140px;
              height: 40px;
              margin-top: 20px;
              border: none;
              border-radius: 30px;
              background-color: #fec003;
              color: white;
              font-size: 18px;
              cursor: pointer;
            }
          }
        }

        // 有“喜欢的游戏”
        .mid-Game {
          // border: solid 1px red;
          height: calc(100% - 60px);
          margin-top: 60px;
          // 有“喜欢的游戏”
          ul li {
            display: inline-block;
            margin: 5px;
            margin-right: 35px;
            height: 160px;
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
              // border: solid 1px red;
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
}
</style>