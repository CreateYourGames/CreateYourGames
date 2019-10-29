<template>
  <div class="game">
    <div class="nav-game">
      <form action="/api/updateGame" method="post" enctype="multipart/form-data">
        <h3>修改上线游戏信息</h3>
        <div class="mid">
          <div class="title">
            <label for class="special">游戏图标：</label>
          </div>
          <div class="container">
            <!-- <input type="file" name="picture"> -->
            <input type="text" name="gameId" :value="GameInfo[0].gameId" style="display:none;" />
            <img class="game-img" name="gamePic" :src="pic" alt />
            <input
              type="file"
              ref="input"
              name="picture"
              style="display:none;"
              @change="changeImg()"
            />
            <div
              class="up-gm-img"
              @click="fileClick"
              @mouseover="addStyle"
              v-bind:class="{style:enable}"
              @mouseout="removeStyle"
            ></div>
          </div>
        </div>

        <div class="mid" style="margin-bottom:-30px;">
          <div class="title">
            <label for>游戏名称：</label>
          </div>
          <input type="text" name="gameName" id :value="GameInfo[0].gameName" />
        </div>

        <div class="mid">
          <div class="title">
            <label for>游戏分类：</label>
          </div>
          <select v-model="selected" name="gameType" id>
            <option value="all">所有类型</option>
            <option value="clever">益智</option>
            <option value="smallGame">小游戏</option>
            <option value="shoot">射击</option>
          </select>
          <br />
        </div>

        <div class="mid">
          <div class="title">
            <label for class="special">游戏简介：</label>
          </div>
          <textarea name="gameDetail" id cols="30" rows="10" :value="GameInfo[0].gameDetail"></textarea>
          <br />
        </div>

        <!-- <label for>游戏相关截图：</label> -->
        <!-- <ul>
          <li>
            <img src="@/assets/images/personal/103.jpg" alt />
            <img class="del-img" src="@/assets/images/personal/shanchu.png" alt />
          </li>
          <li>
            <img src="@/assets/images/personal/105.jpg" alt />
            <img class="del-img" src="@/assets/images/personal/shanchu.png" alt />
          </li>
        </ul>-->

        <div class="mid">
          <div class="title">
            <label for>游戏源码文件：</label>
          </div>
          <input ref="file" type="file" name="gameCode" id  style="border:none;margin-top:45px"/>
          <!-- <img @click="upload" class="file" src="../assets/images/personal/anniu.png" alt=""> -->
          <!-- <input type="text" name="gameCode" :value="GameInfo[0].gameCode" id /> -->
          <!-- <input type="file" name="code"> -->
        </div>

        <div class="btn">
          <input class="modify" type="submit" value="确认修改" @click="defineUpdate()" />
          <button class="cancel" @click="go2()">取消</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enable: false,
      selected: "all",
      inputid: "input",
      id: "",
      pic: "",
      GameInfo: [{}]
    };
  },
  created() {
    this.id = this.$route.query.id;
    let val = this.id;
    console.log(this.id, "123");
    this.$api.updateGameInfo.updateGameInfo(val).then(res => {
      console.log(res);
      this.GameInfo = res.GameInfo;
      this.pic = res.GameInfo[0].gamePic;
      console.log(this.GameInfo[0].gameName);
    });
  },
  methods: {
    changeImg() {
      let event = event || window.event;
      console.log("11" + event.target.files[0]);
      this.pic = this.getObjectURL(event.target.files[0]);
      console.log("22" + this.pic);
    },
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      }
      return url;
    },
    fileClick() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    upload() {
      this.$refs.file.dispatchEvent(new MouseEvent("click"));
    },
    defineUpdate() {
      // this.$router.push("/Personal").catch(err => console.log(err));
    },
    go2() {
      this.$router.push("/Personal").catch(err => console.log(err));
    },

    // 鼠标移入移出
    addStyle() {
      this.enable = true;
    },
    removeStyle() {
      this.enable = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: calc(100%+100px);
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../assets/images/personal/personal.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.nav-game {
  width: 550px;
  height: 100%;
  margin: 15px 0;
  background: rgba(255, 255, 255, 0.8);
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  h3 {
    width: 100%;
    text-align: center;
    height: 130px;
    line-height: 130px;
    font-size: 38px;
    font-family: 楷体;
  }

  .mid {
    width: 100%;
    height: 110px;
    display: flex;
    align-items: center;

    // 文字标题
    .title {
      width: 140px;
      float: left;
      text-align: right;
      label {
        font-size: 18px;
      }
    }
    input,
    select {
      width: 270px;
      height: 40px;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0 10px;
      outline: none;
      margin: 30px 10px;
    }
    textarea {
      width: 270px;
      height: 130px;
      border-radius: 5px;
      padding: 10px 10px;
      margin: 30px 10px;
      font-size: 16px;
      font-family: 微软雅黑;
    }
  }

  .file {
    width: 100px;
    height: 50px;
  }
  // label {
  //   font-size: 20px;
  // }
  // input,
  // select {
  //   width: 290px;
  //   height: 40px;
  //   border: 1px solid gray;
  //   border-radius: 20px;
  //   margin-top: 20px;
  //   top: -50px;
  //   padding-left: 10px;
  //   outline: none;
  // }



  // 图片的设置
  .container {
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: 40px;
    width: 120px;
    height: 110px;
    position: relative;
    .style {
      width: 120px;
      height: 110px;
      background-color: rgba(128, 128, 128, 0.4);
      background-image: url("../assets/images/personal/z.png");
      background-size: 50px 50px;
      background-repeat: no-repeat;
      background-position: 50% 50%;
      cursor: pointer;
    }
    .game-img {
      width: 120px;
      height: 110px;
      background-color: pink;
      position: absolute;
    }
    .up-gm-img {
      width: 120px;
      height: 110px;
      color: #fff;
      text-align: center;
      line-height: 100px;
      position: absolute;
      cursor: pointer;
      img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }
    }
  }

  // ul li {
  //   // width: 150px;
  //   // height: 90px;
  //   // background-color: pink;
  //   // margin-right: 30px;
  //   // margin-top: 10px;
  //   // margin-bottom: 20px;
  //   // display: inline-block;
  //   // position: relative;
  //   // img {
  //   //   width: 150px;
  //   //   height: 100px;
  //   //   margin-right: 30px;
  //   // }
  //   // .del-img {
  //   //   width: 20px;
  //   //   height: 20px;
  //   //   position: absolute;
  //   //   top: 0;
  //   //   right: -30px;
  //   //   cursor: pointer;
  //   // }
  // }



  // 按钮的设置
  .btn {
    width: 100%;
    margin: 15px 0px 50px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .modify {
      width: 120px;
      height: 35px;
      background-color: #fec003;
      border: none;
      border-radius: 25px;
      margin-right: 45px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
    }
    .cancel {
      width: 120px;
      height: 35px;
      margin-right: -20px;
      background-color: #fec003;
      border: none;
      border-radius: 25px;
      font-size: 14px;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>