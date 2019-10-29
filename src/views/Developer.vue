<template>
  <div class="container">
    <topNav></topNav>
    <!-- <el-page-header @back="goBack" content="开发者测试页"></el-page-header> -->
    <div class="content">
      <div class="test">
        <div class="title">欢迎！即将成为开发者的你！</div>
        <div class="nav">
          <h1>考试前的注意事项</h1>
          <p>Create Your Games有你们的陪伴，我们将风雨不惧。即使流泪，也会勇敢微笑，快来加入我们，成为开发者吧！</p>
          <p>
            1.考试时间：
            <span style="color:red;font-size:20px">30min</span>，一定要抓紧哦！
          </p>
          <p>2.考试内容都是关于HTML、CSS、JavaScript、JQuery、vue、Node.js等,相信开发者们，一定没问题的！</p>
          <p>
            3.最最重要的一点！考试必须得到
            <span style="color:red;font-size:20px">满分</span>才可通关哦！只有满分，才能变成开发者！
          </p>
          <p style="font-size:24px;line-height:45px;">那么，现在我们出发吧！加油！</p>
        </div>
        <el-button @click="goTo()">我准备好了！</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import topNav from "../components/topNav";
export default {
  methods: {
    goTo() {
      // if (0) {
        // 点击最后一个"按钮"，弹出确认提交按钮
        this.$confirm("确认进入考试?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "开始考试!"
            });
            this.$router.push("/DeveloperTest");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消进入考试"
            });
          });
    }
  },
  components: {
    topNav
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/images/login/tp.jpg");
  background-attachment: fixed;
  background-size: 100% 100%;
  
  .topNav{
    z-index: 0;
  }

  .content {
    width: 100%;
    height: calc(100% - 60px);
  
    display: flex;
    align-items: center;
    justify-content: center;

    .test {
      width: 800px;
      height: 500px;
      background: rgba(255, 255, 255, 0.9);

      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        width: 800px;
        text-align: center;
        font-size: 24px;
        line-height: 100px;
      }

      .nav {
        width: 80%;
        height: 60%;

        h1 {
          width: 100%;
          text-align: center;
          font-size: 24px;
          line-height: 60px;
        }
        p {
          text-indent: 2em;
          line-height: 30px;
        }
      }

      .el-button {
        width: 300px;
        margin: 10px;
      }
    }
  }
}
</style>
