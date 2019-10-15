<template>
  <div class="container">
    <el-page-header @back="goBack" content="开发者测试页"></el-page-header>
    <div class="content">
      <div class="test">
        <!-- 进度条 -->
        <div class="progress">
          <el-progress :percentage="progress*100/TopicsList.length" :color="customColor"></el-progress>
          <!-- <div class="progress-bar bg-success" role="progressbar" v-bind:style="{width:(progress*100/TopicsList.length)+'%'}"
          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>-->
        </div>
        <div class="countdown">
          <span>
            <i class="el-icon-time"></i>
            {{minute}}：{{second}}
          </span>
        </div>

        <div class="question">
          <!-- <ul> -->
          <h1>{{TopicsList[progress].question}}</h1>
          <div v-for="(item,index) in TopicsList[progress].option" :key="index" class="form-check">
            <label>
              <input type="radio" name="item" v-model="answer" v-bind:value="itemsValue[index]" />
              <span>{{itemsValue[index]}}</span>
              {{item}}
            </label>
          </div>我是题目
        </div>

        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" @click="prev()">上一题</el-button>
          <el-button type="primary" @click="next()">
            下一题
            <i class="el-icon-arrow-right el-icon-right"></i>
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- <div class="develop-test">
      <div @click="backHome">我不做了！</div>
      <div @click="backHome">提交试题</div>
    </div> -->
  </div>
</template>

<script>
export default {
//   name: "developer-test",
  data() {
    return {
      minutes: 30,
      seconds: 0,

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
          option: ["A.xxx", "B.xxx", "C.xxx", "D.xxx"],
          ans: "A"
        }
      ],
      progress: 0,
      customColor: "#f56c6c",
      itemsValue: ["A", "B", "C", "D"],
      answer: ""
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
      this.progress--;
    },
    next() {
      this.progress++;
    },

    goBack() {
      console.log("go back");
    },
    // backHome() {
    //   this.$router.push("/");
    // }
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/home/bg.png");

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

      .question {
        width: 80%;
        height: 50%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: solid 1px red;
      }
      .el-button-group {
        width: 640px;
        position: absolute;
        left: 50%;
        top: 90%;
        transform: translate(-50%, -90%);
        // text-align: center;

        .el-button {
          width: 300px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
