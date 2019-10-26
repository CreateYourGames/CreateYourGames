<template>
<div class="game-2048">
 <div class="container">
    <div class="content">
      <div class="btn">
        <button style="margin-bottom: 5px;" @click="goRefresh()">New Game</button>
        <button @click="goGame()" style="background-color: #76c47d">Go GameCenter</button>
      </div>
      <div class="mid">
        <p>SCORE</p>
        <p>{{this.score}}</p>
      </div>
      <div class="mid">
        <p>BEST</p>
        <p>{{this.bestScore}}</p>
      </div>
    </div>
    <div class="game" v-if="!this.over">
      <div id="my2048"></div>
    </div>

    <div class="over" v-if="this.over">
      <p>Game Over!</p>
      <button style="margin-bottom: 15px;" @click="goRefresh()">Try again</button>
      <button @click="goGame()">Go GameCenter</button>
    </div>
  </div>
</div>
 
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      bestScore: 0,
      over: false, //结束的判断符
      my2048: "",
      rows: 4,
      cols: 4,
      spacing: 12,
      squareWidth: 70,
      boardSet: [], //初始化的默认小方块
      squareSet: [], //存放带数字的小方块
      valueMap: [], //存放每个位置的数值
      //方块颜色
      colorMapping: {
        "0": "#ccc0b3",
        "2": "#eee4da",
        "4": "#ede0c8",
        "8": "#f2b179",
        "16": "#f59563",
        "32": "#f67e5f",
        "64": "#f65e3b",
        "128": "#edcf72",
        "256": "#edcc61",
        "512": "#9c0",
        "1024": "#33b5e5",
        "2048": "#09c",
        "4096": "#5b67ff"
      },
      // 移动方向
      directionEnum: {
        left: { key: "left" },
        right: { key: "right" },
        up: { key: "up" },
        down: { key: "down" }
      },
      isChange: false,
      lock: true, //判断是否结束
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    goRefresh() {
      this.$router.go(0);
    },
    goGame() {
      this.$router.push("/GameCenter");
    },

    // 1.初始化键盘-ok
    initBoard() {
      var _this = this;
      _this.my2048 = document.getElementById("my2048");
      _this.my2048.style.height =
        _this.rows * _this.squareWidth +
        (_this.rows + 1) * _this.spacing +
        "px"; //棋盘高度
      _this.my2048.style.width =
        _this.rows * _this.squareWidth +
        (_this.rows + 1) * _this.spacing +
        "px"; //棋盘宽度
      _this.my2048.style.borderRadius = 5 + "px";
    },
    // 2.创建小方块-ok
    createSquare(value, left, top, row, col) {
      var _this = this;
      var temp = document.createElement("div");
      temp.style.display = "inline-block";
      temp.style.position = "absolute";
      temp.style.width = _this.squareWidth + "px"; //宽
      temp.style.height = _this.squareWidth + "px"; //高
      temp.style.left = left + "px"; //距离左边
      temp.style.top = top + "px"; //距离上边
      temp.style.background = _this.colorMapping[value];
      temp.style.lineHeight = _this.squareWidth + "px";
      temp.style.textAlign = "center";
      temp.style.fontSize = 0.4 * _this.squareWidth + "px";
      temp.style.borderRadius = 5 + "px";
      temp.num = value;
      temp.row = row; //行数
      temp.col = col; //列数
      if (value > 0) {
        temp.innerHTML = "" + value;
      }
      return temp;
    },

    // 3-2生成第一个随机数-ok
    randSquareNum() {
      return Math.random() > 0.5 ? 4 : 2;
    },

    // 3-1.随机生成带数字的方块-ok
    randGenerateSquare() {
      var _this = this;
      for (;;) {
        var randRow = Math.floor(Math.random() * _this.rows);
        var randCol = Math.floor(Math.random() * _this.cols);
        if (_this.valueMap[randRow][randCol] == 0) {
          var temp = _this.createSquare(
            _this.randSquareNum(),
            randCol * _this.squareWidth + (randCol + 1) * _this.spacing,
            randRow * _this.squareWidth + (randRow + 1) * _this.spacing,
            randRow,
            randCol
          );

          _this.valueMap[temp.row][temp.col] = temp.num;
          _this.squareSet[temp.row][temp.col] = temp;
          _this.my2048.appendChild(temp);
          return true;
        }
      }
    },

    // 4.1.1 生成一个空Map
    generateNullMap() {
      var _this = this;
      var newValueMap = [];
      for (var i = 0; i < _this.rows; i++) {
        newValueMap[i] = [];
        for (var j = 0; j < _this.cols; j++) {
          newValueMap[i][j] = null;
        }
      }
      return newValueMap;
    },

    // 4.1.2 对字符串进行分析
    getNewLocation(arr) {
      if (arr.length == 0) {
        // console.log("我在执行 “空” getNewLocation");
        return [];
      }
      var temp = [];
      temp.push(arr[0]);
      for (var i = 1; i < arr.length; i++) {
        // 自己和后一个元素是否相等 && （没有被叠着的元素 || 被叠的元素为空）
        // eg.arr[1]和arr[0]
        if (
          arr[i].num == temp[temp.length - 1].num &&
          (!temp[temp.length - 1].nextSquare ||
            temp[temp.length - 1].nextSquare == null)
        ) {
          temp[temp.length - 1].nextSquare = arr[i];
          // console.log("自己和后一个元素是否相等 && （没有被叠着的元素 || 被叠的元素为空");
        } else {
          temp.push(arr[i]);
        }
      }
      return temp;
    },
    // 4.1计算移动位置
    analysisActions(direction) {
      var _this = this;
      // 生成一个空的Map
      var newSquareSet = _this.generateNullMap();
      //判断方向
      if (direction == _this.directionEnum.left) {
        //向左
        for (var i = 0; i < _this.squareSet.length; i++) {
          var temp = [];
          for (var j = 0; j < _this.squareSet[i].length; j++) {
            if (_this.squareSet[i][j] != null) {
              temp.push(_this.squareSet[i][j]);
            }
          }
          temp = _this.getNewLocation(temp);
          for (var k = 0; k < newSquareSet[i].length; k++) {
            if (temp[k]) {
              newSquareSet[i][k] = temp[k];
            }
          }
        }
      } else if (direction == _this.directionEnum.right) {
        // 向右
        for (var i = 0; i < _this.squareSet.length; i++) {
          var temp = [];
          for (var j = _this.squareSet[i].length - 1; j >= 0; j--) {
            if (_this.squareSet[i][j] != null) {
              temp.push(_this.squareSet[i][j]);
            }
          }
          temp = _this.getNewLocation(temp);
          for (var k = newSquareSet[i].length - 1; k >= 0; k--) {
            if (temp[newSquareSet[i].length - 1 - k]) {
              newSquareSet[i][k] = temp[newSquareSet[i].length - 1 - k];
            }
          }
        }
      } else if (direction == _this.directionEnum.up) {
        // 向上
        for (var j = 0; j < _this.squareSet[0].length; j++) {
          var temp = [];
          for (var i = 0; i < _this.squareSet.length; i++) {
            if (_this.squareSet[i][j] != null) {
              temp.push(_this.squareSet[i][j]);
            }
          }
          temp = _this.getNewLocation(temp);
          for (var k = 0; k < newSquareSet.length; k++) {
            if (temp[k]) {
              newSquareSet[k][j] = temp[k];
            }
          }
        }
      } else if (direction == _this.directionEnum.down) {
        // 向下
        for (var j = 0; j < _this.squareSet[0].length; j++) {
          var temp = [];
          for (var i = _this.squareSet.length - 1; i >= 0; i--) {
            if (_this.squareSet[i][j] != null) {
              temp.push(_this.squareSet[i][j]);
            }
          }
          temp = _this.getNewLocation(temp);
          for (var k = newSquareSet.length - 1; k >= 0; k--) {
            if (temp[newSquareSet.length - 1 - k]) {
              newSquareSet[k][j] = temp[newSquareSet.length - 1 - k];
            }
          }
        }
      }
      // 移动的动画
      for (var i = 0; i < newSquareSet.length; i++) {
        for (var j = 0; j < newSquareSet[i].length; j++) {
          if (newSquareSet[i][j] == null) {
            continue;
          }
          newSquareSet[i][j].style.transition = direction.key + "1s";
          newSquareSet[i][j].style.left =
            (j + 1) * _this.spacing + j * _this.squareWidth + "px";
          newSquareSet[i][j].style.top =
            (i + 1) * _this.spacing + i * _this.squareWidth + "px";
          // 判断位置是否重叠
          if (newSquareSet[i][j].nextSquare) {
            newSquareSet[i][j].nextSquare.style.transition =
              direction.key + "1s";
            newSquareSet[i][j].nextSquare.style.left =
              (j + 1) * _this.spacing + j * _this.squareWidth + "px";
            newSquareSet[i][j].nextSquare.style.top =
              (i + 1) * _this.spacing + i * _this.squareWidth + "px";
            // newSquareSet[i][j].nextSquare.style.transform=scale(1.1,1.1);
          }
        }
      }
      return newSquareSet;
    },

    // 4.2.1刷新数据
    refresh(newSquareSet) {
      var _this = this;
      _this.squareSet = _this.generateNullMap();
      var newValueMap = _this.generateNullMap();
      for (var i = 0; i < _this.rows; i++) {
        for (var j = 0; j < _this.cols; j++) {
          if (newSquareSet[i][j]) {
            if (newSquareSet[i][j].nextSquare) {
              //存在方块重叠

              var temp = _this.createSquare(
                newSquareSet[i][j].num * 2,
                newSquareSet[i][j].offsetLeft,
                newSquareSet[i][j].offsetTop,
                i,
                j
              );
              _this.squareSet[i][j] = temp;
              _this.my2048.appendChild(temp);
              _this.my2048.removeChild(newSquareSet[i][j].nextSquare);
              _this.my2048.removeChild(newSquareSet[i][j]);

              // 分数的设置
              _this.score = _this.score + 4;
            } else {
              //不存在方块重叠
              var temp = _this.createSquare(
                newSquareSet[i][j].num,
                newSquareSet[i][j].offsetLeft,
                newSquareSet[i][j].offsetTop,
                i,
                j
              );

              _this.squareSet[i][j] = temp;
              _this.my2048.appendChild(temp);
              _this.my2048.removeChild(newSquareSet[i][j]);
            }

            if (_this.valueMap[i][j] != _this.squareSet[i][j].num) {
              _this.isChange = true;
            }
            newValueMap[i][j] = _this.squareSet[i][j].num;
          } else {
            newValueMap[i][j] = 0;
          }
        }
      }
      _this.valueMap = newValueMap;
    },

    isOver() {
      var _this = this;
      for (var i = 0; i < _this.squareSet.length; i++) {
        for (var j = 0; j < _this.squareSet[i].length; j++) {
          if (_this.squareSet[i][j] == null) {
            return false;
          }
          if (
            (_this.squareSet[i][j + 1] &&
              _this.squareSet[i][j].num == _this.squareSet[i][j + 1].num) ||
            (_this.squareSet[i + 1] &&
              _this.squareSet[i + 1][j] &&
              _this.squareSet[i][j].num == _this.squareSet[i + 1][j].num)
          ) {
            return false;
          }
        }
      }
      _this.over = true;
      return true;
    },

    // 4.键盘“上下左右”移动事件
    move(direction) {
      var _this = this;
      // 判断游戏是否结束
      if (_this.isOver()) {
        // alert("Game over!");
        return;
      }

      // 计算移动位置
      var newSquareSet = _this.analysisActions(direction);

      // 4.2重绘，刷新显示:再次随机产生一个随机方块
      // setTimeout(function() {
      //刷新数据
      _this.refresh(newSquareSet);
      if (_this.isChange) {
        _this.randGenerateSquare();
      }
      _this.isChange = false;
      _this.lock = true;
      // }, 0);
    },

    init() {
      var _this = this;
      // 初始化键盘
      _this.initBoard();
      // 生成默认小方块
      for (var i = 0; i < _this.rows; i++) {
        _this.boardSet[i] = [];
        _this.squareSet[i] = [];
        _this.valueMap[i] = [];
        for (var j = 0; j < _this.cols; j++) {
          _this.valueMap[i][j] = 0;
          _this.squareSet[i][j] = null;
          _this.boardSet[i][j] = _this.createSquare(
            0,
            j * _this.squareWidth + (j + 1) * _this.spacing,
            i * _this.squareWidth + (i + 1) * _this.spacing,
            i,
            j
          );
          _this.my2048.appendChild(_this.boardSet[i][j]);
        }
      }
      // 随机生成两个带数字的方块
      _this.randGenerateSquare();
      _this.randGenerateSquare();
      // 添加键盘事件
      document.addEventListener("keydown", function(e) {
        if (!_this.lock) {
          return;
        }
        console.log(e.key); //鼠标事件
        switch (e.key) {
          case "ArrowDown":
            _this.move(_this.directionEnum.down);
            break;
          case "ArrowUp":
            _this.move(_this.directionEnum.up);
            break;
          case "ArrowLeft":
            _this.move(_this.directionEnum.left);
            break;
          case "ArrowRight":
            _this.move(_this.directionEnum.right);
            break;
          default: {
            _this.lock = true;
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  
}
.game-2048{
  width: 100%;
  height: 100%;
  background: url("../../assets/images/game-Images/game-2048/1.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;

  .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 380px;
  height: 450px;
  border: solid 1px gray;
  border-radius: 10px;
  background-color: #faf8ef;

  .content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    button {
      width: 135px;
      height: 30px;
      background-color: #8f7a66;
      color: white;
      text-align: center;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .mid {
      width: 90px;
      height: 70px;
      background-color: #bbada0;
      margin-left: 10px;
      border-radius: 8px;
      p {
        width: 90px;
        text-align: center;
        color: #eee4da;
        font-size: 18px;
        line-height: 45px;
        font-weight: bold;
      }
      p:last-of-type {
        color: white;
        font-size: 18px;
        line-height: 10px;
      }
    }
  }
}
.game {
  #my2048 {
    position: relative;
    background-color: #bbada0;
  }
}

.over {
  width: 340px;
  height: 340px;
  background-color: #ede8df;
  // opacity: 0.7;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 340px;
    height: 180px;
    text-align: center;
    line-height: 180px;
    font-size: 42px;
    font-weight: bold;
    color: #8f7865;
  }
  button {
    width: 160px;
    height: 40px;
    background-color: #8f7865;
    color: white;
    text-align: center;
    border: none;
    border-radius: 5px;
    display: block;
    cursor: pointer;
  }
  button:last-of-type {
    background-color: #76c47d;
  }
}

}

</style>