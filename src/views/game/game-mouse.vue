<template>
<div class="nav">
  <div v-if="result" class="result">
    <p>最高分是{{score}}</p>
    <img class="cat" src="../../assets/images/game-Images/game-mouse/cat.gif" alt="">
    <ul>
      <li><img class="start" @click="start" src="../../assets/images/game-Images/game-mouse/gamestart.png" alt=""></li>
      <li><img class="out" @click="quit" src="../../assets/images/game-Images/game-mouse/out.png" alt=""></li>
    </ul>
  </div>
  <div class="newGame" ref="newGame"></div>
  <div class="game">
    <div
      :class="[istrue?ground1:ground2]"
      ref="ground"
      class="ground"
      @mousedown="down"
      @mouseup="up"
     >
      <div class="score">
        <img src="../../assets/images/game-Images/game-mouse/score.png" alt />
        <span class="init-score">{{score}}</span>
      </div>
      <div class="life">
        <span>生命：</span>
        <span class="init-life">{{life}}</span>
      </div>
    </div>
  </div>
  <!-- 组件 -->
  <div class="component">
    <ul>
      <li><img class="start" @click="start" src="../../assets/images/game-Images/game-mouse/gamestart.png" alt=""></li>
      <li><img class="out" @click="quit" src="../../assets/images/game-Images/game-mouse/out.png" alt=""></li>
    </ul>
  </div>
</div>
</template>                                         

<script>
export default {
  data() {
    return {
      // newGame
      result:false,
    //  遍历的数组
    flag:false,
    i:0,
    arr:[
      {
        src:require('../../assets/images/game-Images/game-mouse/start1.png')
      },
      {
        src:require('../../assets/images/game-Images/game-mouse/start2.png')
      },
      {
        src:require('../../assets/images/game-Images/game-mouse/start3.png')
      },
      {
        src:require('../../assets/images/game-Images/game-mouse/start0.png')
      }
      ,
      {
        src:''
      }
    ],
    // 锤子
    istrue: true,
    ground1: "ground1",
    ground2: "ground2",
    num:'',
    //   gif图
    img:require("../../assets/images/game-Images/game-mouse/bomb.gif"),
    // 加十分
    imgadd:require('../../assets/images/game-Images/game-mouse/addScore.png'),
    //   洞口位置
    holes:[
          {
              x:130,
              y:158
          },
          {
              x: 308,
              y:159
          }, 
          {
              x: 490,
              y:162
          },
          {
              x: 105,
              y: 243
          }, 
          {
              x: 310,
              y: 243
          }, 
          {
              x: 495,
              y: 240
          }, 
          {
              x: 96,
              y: 331
          }, 
          {
              x: 310,
              y: 335
          },
          {
              x: 510,
              y: 335
          }
      ],
    //   出现地鼠坑
    appear:[],
    // 单次出现最大地鼠数
    maxMouse:2,
    // 地鼠
    mouse:['','','','','','','','',''],
    // 生命
    life:10,
    // 分数
    score:0,
    // 定时器
    gameTimer:'',
    // 遮罩
    hide:'',
    // 哭的老鼠！
    hit:['','','','','','','','',''],
    }
  },
  methods: {
    // 开始游戏
    start(){
      location.reload();  
    },
    // 退出
    quit(){
      this.$router.go(-1)
    },
    //   锤子
    down() {
      this.istrue = !this.istrue;
    },
    up() {
      this.istrue = !this.istrue;
    },
    // 老鼠洞
    createHoles(){
        for(var i=0;i<this.holes.length;i++){
            this.hide = i
            var hole = document.createElement('div')
            hole.classList.add('hole')
            hole.style.left = this.holes[i].x+'px'
            hole.style.position = 'absolute'
            hole.style.width = '110px'
            hole.style.height = '110px'
            hole.style.top = this.holes[i].y+'px'
            this.$refs.ground.appendChild(hole)
            this.appear[i]=hole
            // 遮罩层
            var hide = document.createElement('img')
            hide.src = require(`../../assets/images/game-Images/game-mouse/mask${this.hide}.png`)
            hide.style.left = this.holes[i].x+'px'
            hide.style.top = this.holes[i].y+'px'
            hide.style.position = 'absolute'
            hide.style.width = '110px'
            hide.style.height = '110px'
            hide.style.border = '1px solid red'
            hide.style.zIndex = 3*i+1
            // hide.style.backgroundColor='pink'
            console.log(3*i+1)
            console.log(hide.style.zIndex,'ceshi')
            // hide.style.border='1px solid black'
            hide.ondragstart=function(){window.event.returnValue=false;return false;}
            hide.oncontextmenu=function(){window.event.returnValue=false;return false;}
            hide.onselectstart=function(){event.returnValue=false;return false;}
            hide.style.zIndex = (this.hide)*2+1
            this.$refs.ground.appendChild(hide)
            // 传给地鼠消失 传值
            var self = this
            hide.index= i
            hide.onclick=function() {
                self.disappear(this.index,true);
                console.log('hit')
            }    
        }
    },
    // 创建老鼠
    createMouses(i){
        this.num = Math.floor(Math.random()*4)
        let mouse = document.createElement('div')
        this.hit[i]=this.num
        mouse.classList.add('mouse')
        mouse.style.position = 'absolute'
        mouse.style.width = '100px'
        mouse.style.height = '73px'
        mouse.style.top = '20px'
        mouse.style.zIndex = 2*i
        mouse.style.backgroundImage = `url(${require(`../../assets/images/game-Images/game-mouse/mouse${this.num}.png`)})`
        mouse.style.backgroundSize = '100%'
        this.mouse[i] = mouse
        this.appear[i].appendChild(mouse)
        let self = this
        // 老鼠没有被打 传值
        var timer = setTimeout(() => {
            self.disappear(i,false)
        }, 2000);

        this.mouse[i].timer = timer
    },
    // 控制地鼠单次出现
    controlMouses(){
        var num = Math.floor(Math.random()*9)
        if(this.mouse.filter(item=>{
            return item
        }).length < this.maxMouse && this.mouse[num] == ''){
            this.createMouses(num)
        }
    },
    // 地鼠的消失
    disappear(i,isHit){
        if(this.mouse[i]){
            if(isHit){
                this.mouse[i].style.top='25px'
                this.score+=10
                // +10分样式
                var addScore = document.createElement('img')
                addScore.src = `${this.imgadd}`
                addScore.style.top='-45px'
                addScore.style.left = '40px'
                addScore.style.position = 'absolute'
                this.mouse[i].appendChild(addScore)
                var boom = document.createElement('img')
                boom.src = `${this.img}`
                boom.style.top='-30px'
                boom.style.position = 'absolute'
                boom.style.width = '100px'
                boom.style.height = '73px'
                this.mouse[i].style.backgroundImage = `url(${require(`../../assets/images/game-Images/game-mouse/hit${this.hit[i]}.png`)})`
                this.mouse[i].appendChild(boom)
                clearInterval(this.mouse[i].timer)
            }else{
              if(this.life>0){
                this.life -=1
              }
            }
            // 被打完的地鼠  500ms后消失
            setTimeout(() => {
                if(this.mouse[i]){
                    this.appear[i].removeChild(this.mouse[i])
                }
                this.mouse[i]=''
            }, 500);
        }
    }
  },

  mounted() {
      // 倒计时
      var start = document.createElement('img');
      var timer1 = setInterval(() => {
        if(this.i<4){
        start.src = this.arr[this.i].src
        this.$refs.newGame.appendChild(start)
        this.i++;
        }else if(this.i==4){
          start.src = this.arr[this.i].src
          this.$refs.newGame.appendChild(start)
          this.flag = true
          this.i++
          if(this.flag){
            this.createHoles()
                this.gameTimer = setInterval(() => {
                this.controlMouses()
                if(this.life<=0){
                    clearInterval(this.gameTimer)
                    this.result = true
                    if(this.$store.state.token.loginName){
                            // console.log("走了发送请求")
                            this.$api.gameScore.uploadScore({
                                loginName: this.$store.state.token.loginName,
                                gameScore: this.score,
                                gameId: window.location.hash.split('/')[2]
                            }).then(res => {
                                console.log(res);
                                // this.$router.go(0)
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                        else{
                            console.log("走了发送")
                            // this.$router.go(0)
                        }
                }
                this.maxMouse = this.score / 100 + 1;
            } , 200);
          }
        }
        else{
          clearInterval(timer1)
        }
      }, 1000);     
  }
};
</script>

<style lang="scss" scoped>
.nav{
  width: 100%;
  background-image: url('../../assets/images/game-Images/game-mouse/1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 1px solid #fff;
  .result{
    width: 400px; 
    position: absolute;
    border-radius: 20px;
    z-index: 19999999;
    margin-left: 36%;
    margin-top: 250px;
    background-color: #fff;
    p{
      text-align: center;
      font-size: 20px;
      font-family: 微软雅黑;
    }
    img{
      width: 250px;
    }
    ul{
      display: flex;
      justify-content: space-around;
    }
    ul li{
      list-style: none;
      display: inline-block;
      .out,.start{
        width: 130px;
        cursor: pointer;
      }
    }
  }
    // 组件
  .component{
    // border: 1px solid red;
    width: 400px;
    position: absolute;
    right: 0;
    top: 40%;
    ul li{
      list-style-type: none;
      vertical-align: middle;
      .out,.start{
        width: 150px;
        cursor: pointer;
      }
    }
  }
}
 // gamestart
 .newGame{
   width: 100px;
   height: 100px;
   margin: 300px auto;
   z-index: 9999;
   position: absolute;
   left: 40%;;
 }
// 背景+锤子
.game {
  position: relative;
  width: 700px;
  height: 550px;
  margin: 100px auto;
  .ground1 {
    cursor: url("../../assets/images/game-Images/game-mouse/hammer01.png"), auto;
  }
  .ground2 {
    cursor: url("../../assets/images/game-Images/game-mouse/hammer02.png"), auto;
  }
  .ground {
    width: 700px;
    height: 500px;
    background-image: url("../../assets/images/game-Images/game-mouse/bg_canvas.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    // 得分
    .score {
      position: absolute;
      top: 140px;
      right: 230px;
      height: 30px;
      img {
        margin-right: 8px;
      }
      .init-score {
        font-size: 18px;
        color: #fff;
        vertical-align: top;
      }
    }
    // 生命
    .life {
      position: absolute;
      top: 143px;
      right: 120px;
      font-size: 18px;
      color: #fff;
    }
    .mouse{
        position: absolute;
        width: 100px;
        height: 70px;
        background-repeat: no-repeat;
        background-size: 50% 50%;
    }
  }
}
</style>