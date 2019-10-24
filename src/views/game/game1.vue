<template>
<div class="nav">
  <!-- <div v-if="newGame" class="newGame">
    <img class="cat" src="../../assets/images/game1imgs/cat.gif" alt="">
    <ul>
      <li><img class="start" @click="start" src="../../assets/images/game1imgs/gamestart.png" alt=""></li>
      <li><img class="out" @click="quit" src="../../assets/images/game1imgs/out.png" alt=""></li>
    </ul>
  </div> -->
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
        <img src="../../assets/images/game1imgs/score.png" alt />
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
      <li><img class="start" @click="start" src="../../assets/images/game1imgs/gamestart.png" alt=""></li>
      <li><img class="out" @click="quit" src="../../assets/images/game1imgs/out.png" alt=""></li>
    </ul>
  </div>
</div>
</template>                                         

<script>
export default {
  data() {
    return {
      // 开始游戏
      // newGame:'',
      // 游戏start
      gameStart:true,
        // 锤子
      istrue: true,
      ground1: "ground1",
      ground2: "ground2",
      num:'',
        //   gif图
      img:require("../../assets/images/game1imgs/bomb.gif"),
      // 加十分
      imgadd:require('../../assets/images/game1imgs/addScore.png'),
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

    },
    //   锤子
    down() {
      console.log("鼠标按下");
      this.istrue = !this.istrue;
    },
    up() {
      console.log("鼠标抬起");
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
            // hole.style.border = '1px solid black'
            hole.style.top = this.holes[i].y+'px'
            this.$refs.ground.appendChild(hole)
            this.appear[i]=hole
            // 遮罩层
            var hide = document.createElement('img')
            hide.src = require(`../../assets/images/game1imgs/mask${this.hide}.png`)
            hide.style.left = this.holes[i].x+'px'
            hide.style.top = this.holes[i].y+'px'
            hide.style.position = 'absolute'
            hide.style.width = '110px'
            hide.style.height = '110px'
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
        mouse.style.backgroundImage = `url(${require(`../../assets/images/game1imgs/mouse${this.num}.png`)})`
        mouse.style.backgroundSize = '100%'
        this.mouse[i] = mouse
        this.appear[i].appendChild(mouse)
        let self = this
        // 老鼠没有被打 传值
        var timer = setTimeout(() => {
            self.disappear(i,false)
        }, 2000);

        this.mouse[i].timer = timer
        console.log(this.mouse[i].timer,'timer')
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
                console.log(this.mouse[i].style,'+10分样式')

                var boom = document.createElement('img')
                boom.src = `${this.img}`
                boom.style.top='-30px'
                boom.style.position = 'absolute'
                boom.style.width = '100px'
                boom.style.height = '73px'
                this.mouse[i].style.backgroundImage = `url(${require(`../../assets/images/game1imgs/hit${this.hit[i]}.png`)})`
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
            this.createHoles()
            this.gameTimer = setInterval(() => {
            this.controlMouses()
            if(this.life<=0){
                clearInterval(this.gameTimer)
                alert('最高分是'+this.score)
            }
            this.maxMouse = this.score / 100 + 1;
        } , 200);  

// 倒计时  我可能有毛病~~  有空把这改掉
      var self = this
      setTimeout(() => {
        // start
        let start0 = document.createElement('img');
        start0.src = require('../../assets/images/game1imgs/start.png')
        console.log(self)
        console.log(self.$refs.newGame)
        self.$refs.newGame.appendChild(start0)
        setTimeout(() => {
          // 3
        self.$refs.newGame.removeChild(start0)
        let start1 = document.createElement('img');
        start1.src = require('../../assets/images/game1imgs/three.png')
        console.log(self)
        console.log(self.$refs.newGame)
        self.$refs.newGame.appendChild(start1)
        setTimeout(() => {
          // 2
        self.$refs.newGame.removeChild(start1)
        let start2 = document.createElement('img');
        start2.src = require('../../assets/images/game1imgs/two.png')
        console.log(self)
        console.log(self.$refs.newGame)
        self.$refs.newGame.appendChild(start2)
         setTimeout(() => {
          //  1
        self.$refs.newGame.removeChild(start2)
        let start3 = document.createElement('img');
        start3.src = require('../../assets/images/game1imgs/one.png')
        console.log(self)
        console.log(self.$refs.newGame)
        self.$refs.newGame.appendChild(start3)
        setTimeout(() => {
          self.$refs.newGame.removeChild(start3)
        }, 1000);
      }, 1000);
      }, 1000);
      }, 1000);
      }, 50);    
  }
};
</script>

<style lang="scss" scoped>
.nav{
  width: 100%;
  background-image: url('../../assets/images/game1imgs/1.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: 1px solid #fff;
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
    cursor: url("../../assets/images/game1imgs/hammer01.png"), auto;
  }
  .ground2 {
    cursor: url("../../assets/images/game1imgs/hammer02.png"), auto;
  }
  .ground {
    width: 700px;
    height: 500px;
    background-image: url("../../assets/images/game1imgs/bg_canvas.png");
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