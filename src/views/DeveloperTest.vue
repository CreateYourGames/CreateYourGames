<template>
  <div class="container">
    <!-- 顶部菜单栏 -->
    <div class="top">
      <div class="logo">
        <img src="@/assets/images/home/logo.png" alt />
        <p>测试啦！！！</p>
      </div>
      <div class="title">
        <p>展现实力的时候到啦！加油哦！</p>
      </div>

       <!-- <div class="toGo" @click="toGo()"> -->
       <button class="toGo" @click="toGo()">我不想做了！</button>
      <!-- </div> -->
    </div>
    <div class="middle">
     

      <div class="content">
        <div class="test">
          <!-- 进度条 -->
          <div class="progress">
            <el-progress :percentage="progress*100/TopicsList.length" :color="customColor"></el-progress>
          </div>

          <!-- 倒计时 -->
          <div class="countdown">
            <span>
              <i class="el-icon-timer"></i>
              <span>{{minute}} : {{second}}</span>
            </span>
          </div>

          <!-- 考试题目 -->
          <div class="Question">
            <!-- <ul> -->
            <div v-if="flag===false">
              <h1>{{TopicsList[progress].question}}</h1>
              <div
                v-for="(item,index) in TopicsList[progress].option"
                :key="index"
                class="form-check"
              >
                <!-- 答案的选项 -->
                <label>
                  <input type="radio" name="item" v-model="answer" v-bind:value="itemsValue[index]" />
                  <span>{{itemsValue[index]}}</span>
                  <!--选项：A.B.C.C-->
                  {{item}}
                  <!--答案内容：xxxx-->
                </label>
              </div>
            </div>
          </div>
          <el-button-group v-if="flag===false">
            <el-button type="primary" icon="el-icon-arrow-left" @click="prev()">上一题</el-button>
            <el-button type="primary" @click="next()">
              下一题
              <i class="el-icon-arrow-right el-icon-right"></i>
            </el-button>
          </el-button-group>

          <!-- 通过测试 -->
          <div class="result" v-if="flag===true && TotalScore==100">
            <p>恭喜你！成为开发者啦!现在我们就去开发吧！</p>
            <!-- <img src="@/assets/images/login/pass.jpeg" alt /> -->
            <p>{{TotalScore}}</p>
            <button class="submit" v-if="flag===true && TotalScore==100" @click="goTo()">前往开发</button>
          </div>

          <!-- 未通过测试 -->
          <div class="result" v-if="flag===true && TotalScore<100">
            <p>非常抱歉！还差一点点！我们再来一次吧！</p>
            <p>{{TotalScore}}</p>
            <button class="submit" v-if="flag===true && TotalScore<100" @click="goTry()">再来一次</button>
          </div>
        </div>
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
          question:
            "1.我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一我是题目一",
          option: ["xxx", "xxx", "xxx", "xxx"],
          ans: "A"
        },
        {
          question:
            "2.我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二我是题目二",
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
    // this.getCookie();
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
            if (this.TotalScore == 100) {
              return this.$api.developerTest.developerTest({
                loginName: this.$store.state.token.loginName
              });
            }
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

    goTo() {
      this.$router.push("/PublishGameTips");
    },
    goTry() {
      this.$router.push("/Developer");
    },
    toGo() {
      // "我不做了"按钮提示信息
      this.$confirm("确认取消考试?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已取消考试"
          });
          this.$router.push("/Developer");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续考试"
          });
        });
    }
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login/tp.jpg");
  // 顶部导航栏
  .top {
    background-color: rgba(27, 27, 27, 0.7);
    display: flex;
    flex-direction: row;
    padding: 8px 0;

    .logo {
      display: flex;
      flex-direction: column;
      border-right: solid 1px yellow;
      margin-left: 100px;
      padding-right: 15px;
      img {
        width: 230px;
        margin-bottom: 3px;
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

     // "我不想做了"按钮
     .toGo {
      width: 100px;
      height: 30px;
      color: white;
      border: 1px solid white;
      border-radius: 15px;
      cursor: pointer;
      position: absolute;
      top: 25px;
      right: 0;
      &:hover{
        background-color: #fec003;
        border-radius: 15px;
      }
    }
  }

  .middle {
    height: calc(100% - 71px);
    display: flex;
    align-items: center;
    justify-content: center;
    // position: relative;

   

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
        top: 55%;
        transform: translate(-50%, -55%);
        background: rgba(255, 255, 255, 0.9);

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
          width: 180px;
          text-align: center;
          position: absolute;
          left: 50%;
          top: 15%;
          transform: translate(-50%, -15%);

          span {
            color: #fec003;
            font-size: 34px;
            span {
              line-height: 34px;
              font-size: 26px;
              margin-left: 10px;
              // margin-bottom: 5px;
            }
          }
        }

        .Question,
        .result {
          width: 80%;
          height: 50%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          // border: solid 1px red;
        }
        .Question {
          // 题目
          h1 {
            margin-left: 30px;
            font-size: 18px;
            line-height: 30px;
            margin-bottom: 15px;
          }

          // 选项内容
          .form-check {
            font-size: 16px;
            line-height: 30px;
            margin-left: 30px;
          }
        }
        .result {
          direction: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          p {
            font-size: 26px;
            width: 100%;
            text-align: center;
          }
          p:last-of-type {
            margin-top: 50px;
            margin-left: 270px;
            width: 100px;
            height: 100px;
            line-height: 100px;
            border-radius: 50%;
            color: white;
            background-color: #fec003;
          }
          img {
            width: 300px;
          }
          .submit {
            width: 240px;
            height: 45px;
            text-align: center;
            line-height: 45px;
            color: white;
            background-color: #409eff;
            border: none;
            border-radius: 30px;
            margin-top: 70px;
            margin-left: 200px;
          }
        }
        .el-button-group {
          display: flex;
          width: 640px;
          // text-align: center;
          justify-content: space-around;

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
      .submit {
        margin-left: 250px;
      }
    }
  }
}
</style>
