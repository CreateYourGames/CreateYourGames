<template>
  <div class="container">
    <topNav></topNav>
    <div class="header">
      <div class="contant">
        <p class="title" v-if="tabType==='all'">所有类型</p>
        <p class="title" v-if="tabType==='clever'">益智</p>
        <p class="title" v-if="tabType==='smallGame'">小游戏</p>
        <p class="title" v-if="tabType==='shoot'">射击</p>

        <div class="progress-bar">
          <div class="progress-now"></div>
        </div>

      </div>
    </div>

    <div class="Game" @click="searchDisplay">
      <div class="left">
        <div class="middle">
          <!-- 游戏列表 -->
          <div
            class="item"
            v-for="(item,index) in list"
            :key="index"
            @click="toDetails(item.gameId-1)"
          >
            <img :src="item.gamePic" alt="游戏图片" />
            <p>{{item.gameName}}</p>
          </div>
        </div>
      </div>

      <div class="right">
        <div class="middle">
          <!-- 游戏搜索框 -->
          <search ref="search" :gameList="gameList" @search="searchGames"></search>

          <!-- 游戏选择框 -->
          <div class="tab">
            <p>类型</p>
            <ul>
              <li v-bind:class="{active:tabType==='all'}" @click="choose('all')">
                所有类型
                <i v-if="tabType==='all'" class="el-icon-circle-check"></i>
              </li>
              <li v-bind:class="{active:tabType==='clever'}" @click="choose('clever')">
                益智
                <i v-if="tabType==='clever'" class="el-icon-circle-check"></i>
              </li>
              <li v-bind:class="{active:tabType==='smallGame'}" @click="choose('smallGame')">
                小游戏
                <i v-if="tabType==='smallGame'" class="el-icon-circle-check"></i>
              </li>
              <li v-bind:class="{active:tabType==='shoot'}" @click="choose('shoot')">
                射击
                <i v-if="tabType==='shoot'" class="el-icon-circle-check"></i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Search from "../components/search";
import topNav from "../components/topNav";
export default {
  data() {
    return {
      selected: "all",
      tabType: "all",
      active: 1,
      list: [
        {
          gameId: 1,
          gameName: "飞机大战",
          userId: "1",
          gameType: "shoot",
          gameDetail:
            "这是一款飞行射击游戏，惊险刺激的大战，通过歼灭敌机的数量来计算最终得分",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190705/9/1920x1080.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-09T16:00:00.000Z"
        },
        {
          gameId: 2,
          gameName: "连连看",
          userId: "3",
          gameType: "clever",
          gameDetail: "经典版的连连看，一定时间内完成相同图标的连接，即可获胜",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190228/4/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-10T16:00:00.000Z"
        },
        {
          gameId: 3,
          gameName: "贪吃蛇",
          userId: "2",
          gameType: "smallGame",
          gameDetail:
            "怀旧小游戏，通过上下左右键来控制方向，根据存活时间计算成绩",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/2/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-02T16:00:00.000Z"
        },
        {
          gameId: 4,
          gameName: "打地鼠",
          userId: "4",
          gameType: "smallGame",
          gameDetail: "怀旧小游戏",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/10/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-09-30T16:00:00.000Z"
        },
        {
          gameId: 5,
          gameName: "飞机大战",
          userId: "1",
          gameType: "shoot",
          gameDetail:
            "这是一款飞行射击游戏，惊险刺激的大战，通过歼灭敌机的数量来计算最终得分",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20181120/1/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-09T16:00:00.000Z"
        },
        {
          gameId: 6,
          gameName: "连连看",
          userId: "3",
          gameType: "clever",
          gameDetail: "经典版的连连看，一定时间内完成相同图标的连接，即可获胜",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190705/13/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-10T16:00:00.000Z"
        },
        {
          gameId: 7,
          gameName: "贪吃蛇",
          userId: "2",
          gameType: "smallGame",
          gameDetail:
            "怀旧小游戏，通过上下左右键来控制方向，根据存活时间计算成绩",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/10/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-02T16:00:00.000Z"
        },
        {
          gameId: 8,
          gameName: "打地鼠",
          userId: "4",
          gameType: "smallGame",
          gameDetail: "怀旧小游戏",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190228/4/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-09-30T16:00:00.000Z"
        }
      ],
      gameList: [
        {
          gameId: 1,
          gameName: "飞机大战",
          userId: "1",
          gameType: "shoot",
          gameDetail:
            "这是一款飞行射击游戏，惊险刺激的大战，通过歼灭敌机的数量来计算最终得分",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190705/9/1920x1080.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-09T16:00:00.000Z"
        },
        {
          gameId: 2,
          gameName: "连连看",
          userId: "3",
          gameType: "clever",
          gameDetail: "经典版的连连看，一定时间内完成相同图标的连接，即可获胜",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190228/4/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-10T16:00:00.000Z"
        },
        {
          gameId: 3,
          gameName: "贪吃蛇",
          userId: "2",
          gameType: "smallGame",
          gameDetail:
            "怀旧小游戏，通过上下左右键来控制方向，根据存活时间计算成绩",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/2/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-02T16:00:00.000Z"
        },
        {
          gameId: 4,
          gameName: "打地鼠",
          userId: "4",
          gameType: "smallGame",
          gameDetail: "怀旧小游戏",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/10/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-09-30T16:00:00.000Z"
        },
        {
          gameId: 5,
          gameName: "飞机大战",
          userId: "1",
          gameType: "shoot",
          gameDetail:
            "这是一款飞行射击游戏，惊险刺激的大战，通过歼灭敌机的数量来计算最终得分",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20181120/1/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-09T16:00:00.000Z"
        },
        {
          gameId: 6,
          gameName: "连连看",
          userId: "3",
          gameType: "clever",
          gameDetail: "经典版的连连看，一定时间内完成相同图标的连接，即可获胜",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190705/13/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-10T16:00:00.000Z"
        },
        {
          gameId: 7,
          gameName: "贪吃蛇",
          userId: "2",
          gameType: "smallGame",
          gameDetail:
            "怀旧小游戏，通过上下左右键来控制方向，根据存活时间计算成绩",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20180918/10/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-10-02T16:00:00.000Z"
        },
        {
          gameId: 8,
          gameName: "打地鼠",
          userId: "4",
          gameType: "smallGame",
          gameDetail: "怀旧小游戏",
          gameVersion: "1.0",
          gamePic:
            "https://yys.res.netease.com/pc/zt/20170731172708/data/picture/20190228/4/1440x900.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-09-30T16:00:00.000Z"
        }
      ]
    };
  },
  created() {
    //  this.$api.gameCenter.showAllGames().then(res=>{
    //       this.gameList=res.data
    //       //页面加载时将list存入8条数据，作为默认显示 延时是为了在数据取到后再执行该操作
    //       if(this.gameList.length>8){
    //           this.gameList.forEach((item,index) => {
    //               if(index%3==0&&index<24){
    //                 this.list.push(this.gameList[index])
    //              }
    //          });
    //         }else{
    //             this.gameList.forEach(item=>{
    //                 this.list.push(item)
    //             })
    //         }
    //       })
  },
  methods: {
    toRanking() {
      this.$router.push("/RankingList");
    },
    toDetails(index) {
      this.$router.push("/GameInfo?id=" + this.gameList[index].gameId);
    },
    //改变模糊查询框的显示隐藏
    searchDisplay() {
      this.$store.commit("changeSearch", false);
    },

    //点击搜索，渲染content中的内容
    searchGames(value) {
      var list3 = [];
      this.gameList.filter(item => {
        if (item.gameName.includes(value)) {
          list3.push(item);
        }
      });
      this.list = list3;
    },

    //点击分类渲染相应的内容区
    choose(type) {
      this.tabType = type;
      var list4 = [];
      var list5 = [];
      //首先将判断类型分为两类
      if (type == "all") {
        list5 = [];
        this.list = this.gameList;
        //判断数据的条数，如果大于八条数据，
        if (this.list.length > 8) {
          if (this.pageNow > Math.ceil(this.list.length / 8)) {
            alert("没有更多游戏了，抱歉~");
          } else {
            //匹配当前页的数据，将当前页的数据添加到数组
            for (
              var i = (this.pageNow - 1) * 8;
              i < (this.pageNow - 1) * 8 + 8;
              i++
            ) {
              list5.push(this.list[i] || "");
            }
          }
          this.list = list5;
        }
      } else {
        //每次进来先置空list 首先先根据type得到相应的数据
        list5 = [];
        this.gameList.filter(item => {
          if (item.gameType.includes(type)) {
            list4.push(item);
          }
        });
        this.list = list4;
        //根据数据是否超过八条，进行不同的操作
        if (this.list.length > 8) {
          // console.log("走了其他类型的大于八条数据")
          if (this.pageNow > Math.ceil(this.list.length / 8)) {
            // console.log("走了上边")
            alert("没有更多游戏了，抱歉~");
          } else {
            // console.log("走了下边")
            //匹配当前页的数据，将当前页的数据添加到数组
            for (
              var i = (this.pageNow - 1) * 8;
              i < (this.pageNow - 1) * 8 + 8;
              i++
            ) {
              list5.push(this.list[i] || "");
            }
          }
          this.list = list5;
        } else {
          if (this.pageNow > Math.ceil(this.list.length / 8)) {
            alert("没有更多游戏了，抱歉~");
          }
          // this.list=list4
        }
      }
    }
  },
  components: {
    Search,
    topNav
  }
};
</script>

<style lang="scss" scoped>
.container {
  .topNav{
    background-color: rgba(27, 27, 27, 1);
  }
  .header {
    // border: solid 1px yellow;
    width: 75%;
    height: 90px;;
    overflow: hidden;
    position: fixed;
    z-index: 999;
    top: 60px;
    background-color: #ffffff;
    .contant {
      padding-top: 21px;
      position: relative;
      .title {
        margin-left: 130px;
      }
      .progress-bar {
        width: 90%;
        height: 4px;
        background-color: #696969;
        margin: 20px auto 0;
         margin-left: 90px;
        border-radius: 2px;
        box-shadow: inset 0 0 0 0 #ffffff;
        .progress-now {
          width: 20%;
          height: 100%;
         
          background-color: #2285ff;
          border-radius: 2px;
        }
      }
    }
  }

  .Game {
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    // background-image: url("../assets/images/home/bg.png");
    background-color: #ffffff;
    background-attachment: fixed;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;

    margin-top: 30px;

    .left {
      // border: solid 1px black;
      width: 73%;
      margin-left: 6%;
      // border: solid 1px red;
      .middle {
        padding: 30px 10px 30px 16px;
        // margin-left:100px;
        // 游戏框
        .item {
          text-align: center;
          width: 45%;
          // height: 320px;
          margin-right: 30px;
          float: left;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          // border-radius: 10px;
          // background: rgba($color: #000, $alpha: 0.5);
          cursor: pointer;
          position: relative;
          img {
            width: 100%;
            height: 210px;
            margin-top: 35px;
            border-radius: 10px;
            background: rgba($color: #000, $alpha: 0.5);
            // border: solid 1px white;
          }
          p {
            // margin: 10px 0;
            color: white;
            width: 100%;
            height: 30px;
            line-height: 30px;
            background-color: rgba(27, 27, 27, 0.7);
            border-radius: 0 0 10px 10px;

            position: absolute;
            bottom: 0px;
          }
          &:hover {
            transform: scale(1.03, 1.03);
          }
          transition: transform 0.5s ease;
        }
      }
    }

    .right {
      
      width: 25%;
      height: 100%;
      overflow: hidden;
      position: fixed;
      right: 0;
      // border: solid 1px red;

      .middle {
        padding: 30px;
        margin-right: 10%;

        .search {
          margin-top: -28px;
          z-index: 9999;
        }

        .tab {
          margin-top: 50px;
          width: 112%;
          height: 100%;
          p{
            text-indent: 1em;
            width: 100%;
            height: 36px;
            line-height: 36px;
            border-bottom: solid 1px #d8dce0;
            margin-bottom: 10px;
          }
          ul {
            // border-radius: 10px;
            // border-top: solid 1px gray;
            // border-bottom: solid 1px gray;
            // li:first-of-type {
             
            //   // border-radius: 10px 10px 0px 0px;
            // }
            // li:last-of-type {
            //   border-radius: 0px 0px 10px 10px;
            // }
            li {
              text-indent: 1em;
              line-height: 36px;
              // border-bottom: solid 1px gray;
              // background-color: #7F7F7F;
              position: relative;
              border-radius: 4px;
              margin: 1px 0;
              color: #1e262c;
              cursor: pointer;
              i {
                line-height: 36px;
                position: absolute;
                right: 28px;
                color: #04bd68;
                font-size: 24px;
              }
              &:hover{
                background-color: #d8dce0;
              }
            }
            .active {
              background-color: #d8dce0;
            }
          }
        }

        // 瞅瞅排行榜
        .toRanking {
          width: 120px;
          height: 25px;
          // margin: 25px;
          background: rgba($color: #000, $alpha: 0.5);
          color: white;
          border: 1px solid rgb(184, 182, 182);
          border-right: none;
          padding-left: 5px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          // background-color: white;
          position: absolute;
          top: 80px;
          right: 0;
        }
      }
    }
  }
}
</style>