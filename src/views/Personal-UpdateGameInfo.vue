<template>
  <div class="game">
    <div class="nav-game">
      <form action="/api/updateGame" method="post" enctype="multipart/form-data">
        <label for class="special">游戏图标：</label>
        <div class="container">
          <!-- <input type="file" name="picture"> -->
          <input type="text" name="gameId" :value="GameInfo[0].gameId" style="display:none;">
          <img class="game-img" name="gamePic" :src="pic" alt />
          <input type="file" ref="input" name="picture" style="display:none;" @change="changeImg()" />
          <div class="up-gm-img" @click="fileClick"  @mouseover="addStyle"  v-bind:class="{style:enable}"
          @mouseout="removeStyle">
          </div>
        </div>
        <label for>游戏名称：</label>
        <input type="text" name="gameName" id :value="GameInfo[0].gameName" />
        <br />
        <label for>游戏分类：</label>
        <select v-model="selected" name="gameType" id="" >
            <option value="all" >所有类型</option>
            <option value="clever" >益智</option>
            <option value="smallGame" >小游戏</option>
            <option value="shoot" >射击</option>
        </select>
        <br />
        <label for class="special">游戏简介：</label>
        <textarea name="gameDetail" id cols="30" rows="10" :value="GameInfo[0].gameDetail"></textarea>
        <br />
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
        </ul> -->
        <label for>游戏源码文件：</label>
        <!-- <input ref="file" type="file" name="gameCode" id style="border:none;display:none" /> -->
        <!-- <img @click="upload" class="file" src="../assets/images/personal/anniu.png" alt=""> -->
        <input type="text" name="gameCode" :value="GameInfo[0].gameCode" id="">
        <div class="btn">
        <input class="modify" type="submit" value="确认修改" @click="defineUpdate()"/>
        <button class="cancel" @click="go2()">取消</button>
      </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      return{
        enable: false,
        selected:'all',
        inputid:"input",
        id:'',
        pic:'',
        GameInfo:[
          {
          }
        ]
      }
    },
    created(){
      this.id = this.$route.query.id
      let val = this.id
      console.log(this.id,"123")
      this.$api.updateGameInfo.updateGameInfo(val).then(res=>{
            console.log(res)
            this.GameInfo = res.GameInfo
            this.pic=res.GameInfo[0].gameLogo
            console.log(this.GameInfo[0].gameName)
        })
    },
   methods: {
     changeImg(){
      let event=event||window.event
      console.log(event.target.files[0])
      this.pic=this.getObjectURL(event.target.files[0])
      console.log(this.pic)
     },
     getObjectURL (file) {
      let url = null ;
      if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
      }else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
      }else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
      }
      return url ;
    },
    fileClick() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    upload(){
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
    },
  }
};
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  // background-image: url('../assets/images/personal/gameupdate.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  // border: 1px solid black;
}
.nav-game {
  width: 450px;
  height: 700px;
  // background-color: rgba(252, 249, 249, 0.2);
  margin-top: 50px;
  position: relative;
  .file {
    width: 100px;
    height: 50px;
  }
  label {
    font-size: 20px;
  }
  input,select {
    width: 290px;
    height: 40px;
    border: 1px solid gray;
    border-radius: 20px;
    margin-top: 20px;
    top: -50px;
    padding-left: 10px;
    outline: none;
  }
  textarea {
    width: 290px;
    height: 130px;
    border-radius: 20px;
    padding: 0 10px;
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: 微软雅黑;
  }
  .special {
    display: block;
    margin-top: 60px;
    float: left;
  }
  .container {
    margin-bottom: 20px;
    margin-left: 100px;
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
      margin-top: 20px;
      width: 120px;
      height: 110px;
      background-color: pink;
      position: absolute;
    }
    .up-gm-img {
      margin-top: 20px;
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

  ul li {
    width: 150px;
    height: 90px;
    background-color: pink;
    margin-right: 30px;
    margin-top: 10px;
    margin-bottom: 20px;
    display: inline-block;
    position: relative;
    img {
      width: 150px;
      height: 100px;
      margin-right: 30px;
    }
    .del-img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 0;
      right: -30px;
      cursor: pointer;
    }
  }
  .btn {
      margin-top: 20px;
      width: 300px;
      height: 50px;
      position: relative;
    .modify {
      width: 100px;
      height: 35px;
      background-color: #fec003;
      border: none;
      border-radius: 15px;
      position: absolute;
      margin-top: 50px;
      left: 50px;
      outline: none;
      cursor: pointer;
    }
    .cancel {
      width: 100px;
      height: 35px;
      background-color: #fec003;
      border: none;
      border-radius: 15px;
      position: absolute;
      left: 170px;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>