<template>
  <div class="game">
    <div class="nav-game">
      <input type="file" ref="input" name id style="display:none;" />
      <form action>
        <label for class="special">游戏图标：</label>
        <div class="container">
          <img class="game-img" src="@/assets/images/personal/104.jpg" alt />
          <div class="up-gm-img" @click="fileClick">
            <img src="@/assets/images/personal/z.png" alt />
          </div>
        </div>
        <label for>游戏名称：</label>
        <input type="text" name id value="皮皮蛇" />
        <br />
        <label for>游戏分类：</label>
        <input type="text" name id value="益智类" />
        <br />
        <label for class="special">游戏简介：</label>
        <textarea name id cols="30" rows="10">皮皮蛇</textarea>
        <br />
        <label for>游戏相关截图：</label>
        <ul>
          <li>
            <img src="@/assets/images/personal/103.jpg" alt />
            <img class="del-img" src="@/assets/images/personal/shanchu.png" alt />
          </li>
          <li>
            <img src="@/assets/images/personal/105.jpg" alt />
            <img class="del-img" src="@/assets/images/personal/shanchu.png" alt />
          </li>
        </ul>
        <label for>游戏源码文件：</label>
        <input ref="file" type="file" name id style="border:none;display:none" />
        <img @click="upload" class="file" src="../assets/images/personal/anniu.png" alt="">
      </form>
      <div class="btn">
        <button class="modify" @click="go1()">确认修改</button>
        <button class="cancel" @click="go2()">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    fileClick() {
      this.$refs.input.dispatchEvent(new MouseEvent("click"));
    },
    upload(){
        this.$refs.file.dispatchEvent(new MouseEvent("click"));
    },
    go1() {
      this.$router.push("/Personal").catch(err => console.log(err));
    },
    go2() {
      this.$router.push("/Personal").catch(err => console.log(err));
    }
  }
};
</script>

<style lang="scss" scoped>
.game {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/images/personal/gameupdate.jpg');
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
  input {
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
      background-color: rgba(128, 128, 128, 0.4);
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
      left: 30px;
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
      left: 150px;
      outline: none;
      cursor: pointer;
    }
  }
}
</style>