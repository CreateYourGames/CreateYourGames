<template>
  <div class="Game">
    <!-- <topNav></topNav> -->
    <div class="left">
      <div class="middle">
        <div
          class="item"
          v-for="(item,index) in list"
          :key="index"
          @click="toDetails(item.gameId-1)"
        >
          <img :src="item.gamePic" alt="游戏图片" />
          {{item.gameName}}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="middle">
        <div class="toRanking" @click="toRanking">
          <span>瞅瞅排行榜&nbsp;-></span>
        </div>

        <select v-model="selected" name="type" id @change="selectType(selected)">
          <option value="all">所有类型</option>
          <option value="clever">益智</option>
          <option value="smallGame">小游戏</option>
          <option value="shoot">射击</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "all",
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
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3607462520,2504722129&fm=26&gp=0.jpg",
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
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3607462520,2504722129&fm=26&gp=0.jpg",
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
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3607462520,2504722129&fm=26&gp=0.jpg",
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
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3607462520,2504722129&fm=26&gp=0.jpg",
          gameCode: "代码正在准备中",
          publishTime: "2019-09-30T16:00:00.000Z"
        }
      ]
    };
  },
  created() {
    // this.$api.gameCenter.showAllGames().then(res => {
    //   this.list = res.data;
    // });
  }
};
</script>

<style lang="scss" scoped>
.Game {
  background-image: url("../assets/images/home/bg.png");
  background-attachment: fixed;
  background-size: 100% 100%;

  display: flex;
  flex-direction: row;

  .left {
    width: 65%;
    margin-left: 5%;
    border: solid 1px red;
    .middle {
      padding: 30px;
      .item {
        text-align: center;
        width: 320px;
        height: 320px;
        margin: 25px;
        border: solid 1px yellow;
        background-color: white;
        float: left;
        display: flex;
        flex-direction: column;
        img {
          width: 300px;
        }
      }
    }
  }

  .right {
    width: 30%;
    border: solid 1px white;
    .middle {
      .toRanking {
        width: 120px;
        height: 25px;
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
</style>