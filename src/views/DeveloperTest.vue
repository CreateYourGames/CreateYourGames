<template>
  <div class="container">
    <div class="contant">
      <div class="logo">
        <img src="@/assets/images/home/logo.png" alt />
        <p>测试啦！！！</p>
      </div>
       <div class="title">
        <p>展现实力的时候到啦！加油哦！</p>
      </div>
    </div>
    <div class="content">
      <div class="test">
        <!-- 进度条 -->
        <div class="progress">
          <el-progress :percentage="progress*100/TopicsList.length" :color="customColor"></el-progress>
        </div>

        <!-- 倒计时 -->
        <div class="countdown">
          <span>
            <i class="el-icon-time"></i>
            {{minute}}：{{second}}
          </span>
        </div>

        <!-- 考试题目 -->
        <div class="question">
          <!-- <ul> -->
          <div v-if="flag===false">
            <h1>{{TopicsList[progress].question}}</h1>
            <div
              v-for="(item,index) in TopicsList[progress].option"
              :key="index"
              class="form-check"
            >
              <label>
                <input type="radio" name="item" v-model="answer" v-bind:value="itemsValue[index]" />
                <span>{{itemsValue[index]}}</span>
                {{item}}
              </label>
            </div>我是题目
          </div>
        </div>
        <el-button-group v-if="flag===false">
          <el-button type="primary" icon="el-icon-arrow-left" @click="prev()">上一题</el-button>
          <el-button type="primary" @click="next()">
            下一题
            <i class="el-icon-arrow-right el-icon-right"></i>
          </el-button>
        </el-button-group>

        <div class="result" v-if="flag===true">
          <p>恭喜你！获得xxx!可以成为开发者啦!现在我们就去开发吧！</p>
          <p>{{TotalScore}}</p>
        </div>

        <el-button-group v-if="flag===true">
          <el-button type="primary" icon="el-icon-arrow-left" @click="goTo()">前往开发！</el-button>
        </el-button-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minutes: 30,
      seconds: 0,
      flag: false,
      // 题目列表
      TopicsList: [
        {
          question: "1.我是题目一xxxxxxxxxxxxxxxxxxxxxxxxxx",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        },
        {
          question: "2.我是题目二xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        },
        {
          question: "3.我是题目三xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        },
        {
          question: "4.我是题目四xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        },
        {
          question: "5.我是题目五xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        }
      ],
      progress: 0,
      customColor: "#f56c6c",
      itemsValue: ["A", "B", "C", "D"],
      answer: "",
      answers: new Map(),
      TotalScore: 0
    };
  },
  mounted() {
    this.timer();
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },

  computed: {
    //倒计时 start
    second: function() {
      return this.num(this.seconds);
    },
    minute: function() {
      return this.num(this.minutes);
    }
    //倒计时 end
  },

  methods: {
    //倒计时 start
    num(n) {
      return n < 10 ? "0" + n : "" + n;
    },
    timer() {
      var _this = this;
      var time = window.setInterval(function() {
        if (_this.seconds === 0 && _this.minutes !== 0) {
          _this.seconds = 59;
          _this.minutes -= 1;
        } else if (_this.minutes === 0 && _this.seconds === 0) {
          _this.seconds = 0;
          window.clearInterval(time);
        } else {
          _this.seconds -= 1;
        }
      }, 1000);
    },
    //倒计时 end

    prev() {
      if (this.progress > 0) {
        this.progress--;
        this.answer = this.answers.get(this.progress);
      }
    },
    next() {
      if (this.progress < this.TopicsList.length) {
        this.answers.set(this.progress, this.answer);
        this.progress++;
        console.log(this.answers);
        this.answer = "";
      }
      // 计算成绩
      if (this.progress === this.TopicsList.length) {
        // 计算成绩
        var EachScore = 100 / this.TopicsList.length;
        var i = 0;
        // console.log(this.answers.size);
        for (var value of this.answers.values()) {
          if (value === this.TopicsList[i++].ans) {
            this.TotalScore = this.TotalScore + EachScore;
          }
        }

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

            this.flag = true;
            //点击最后一个"下一步”,并且却提交后结束计时
            this.minutes = 0;
            this.seconds = 0;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交"
            });
            this.flag = false;
          });
      }
    },

    // goHome() {
    //   this.$router.push("/");
    // },
    goTo() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/home/bg.png");
  .contant {
    background: rgba(255, 255, 255, 0.3);
    display: flex;
    flex-direction: row;
    padding: 12px 0;

    .logo {
      display: flex;
      flex-direction: column;
      border-right: solid 1px yellow;
      margin-left: 100px;
      padding-right: 30px;
      img {
        width: 250px;
      }
      p {
        color: white;
        width: 250px;
        text-align: center;
      }
    }
    .title {
      height: 55px;
      line-height: 55px;
      color: white;
      margin-left: 30px;
      font-size: 18px;
    }
  }

  .el-page-header {
    background-color: white;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }

  .content {
    width: 100%;
    height: 530px;
    position: relative;

    .test {
      width: 800px;
      height: 500px;
      background-color: white;
      position: absolute;
      left: 50%;
      top: 65%;
      transform: translate(-50%, -65%);

      .progress {
        width: 600px;
        // border: solid 1px red;
        position: absolute;
        left: 50%;
        top: 5%;
        transform: translate(-50%, -5%);
      }

      // 倒计时
      .countdown {
        width: 80px;
        text-align: center;
        border: solid 1px black;
        background-color: white;

        position: absolute;
        left: 50%;
        top: 15%;
        transform: translate(-50%, -15%);
      }

      .question,
      .result {
        width: 80%;
        height: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: solid 1px red;
      }
      .result {
        direction: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
          width: 100%;
          text-align: center;
        }
      }
      .el-button-group {
        width: 640px;
        // text-align: center;

        .el-button:first-of-type {
          width: 300px;
          position: absolute;
          left: 21%;
          top: 90%;
          transform: translate(-21%, -90%);
          margin-right: 100px;
        }
        .el-button:last-of-type {
          width: 300px;
          position: absolute;
          left: 82%;
          top: 90%;
          transform: translate(-82%, -90%);
          margin-right: 100px;
        }
      }
    }
  }
}
</style>
