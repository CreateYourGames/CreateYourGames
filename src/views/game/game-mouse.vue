<template>
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
</template>

<script>
export default {
  data() {
    return {
        // 锤子
      istrue: true,
      ground1: "ground1",
      ground2: "ground2",
      num:'',
        //   gif图
      img:require("../../assets/images/game-Images/game-mouse/bomb.gif"),

    //   洞口位置
      holes:[
          {
              x:130,
              y:173
          },
          {
              x: 305,
              y:171
          }, 
          {
              x: 490,
              y:175
          },
          {
              x: 105,
              y: 265
          }, 
          {
              x: 305,
              y: 256
          }, 
          {
              x: 490,
              y: 256
          }, 
          {
              x: 96,
              y: 350
          }, 
          {
              x: 305,
              y: 355
          },
          {
              x: 510,
              y: 358
          }
      ],

    //   出现地鼠
    appear:[],

    // 单次出现最大地鼠数
    maxMouse:2,

    mouse:['','','','','','','','',''],
    // 生命
    life:10,
    // 分数
    score:0,
    // 定时器
    gameTimer:'',
    }
  },
  methods: {
    //   锤子
    down() {
    //   console.log("鼠标按下");
    //   console.log(this.$refs.ground.style);
      this.istrue = !this.istrue;
    },
    up() {
    //   console.log("鼠标抬起");
    //   console.log(this.$refs.ground.style);
      this.istrue = !this.istrue;
    },
    // 老鼠洞
    createHoles(){
        for(var i=0;i<this.holes.length;i++){
            var hole = document.createElement('div')
            hole.classList.add('hole')
            // console.log(hole.classList,"classList的样式")
            // console.log(hole.style,"洞穴样式")
            hole.style.left = this.holes[i].x+'px'
            hole.style.position = 'absolute'
            hole.style.width = '110px'
            hole.style.height = '80px'
            // hole.style.border = '1px solid black'
            hole.style.top = this.holes[i].y+'px'
            this.$refs.ground.appendChild(hole)
            // console.log('加入div成功')
            this.appear[i]=hole

            // 传给地鼠消失 传值
            var self = this
            hole.index= i
            hole.onclick=function() {
                self.disappear(this.index,true);
            }
            
        }
        // console.log(this.appear[1],'appear得值')
    },
    // 创建老鼠
    createMouses(i){
        // console.log('进来了')
        this.num = Math.floor(Math.random()*4)
        let mouse = document.createElement('div')
        // console.log(mouse,'老鼠的盒子')
        mouse.classList.add('mouse')
        mouse.style.position = 'absolute'
        mouse.style.width = '100px'
        mouse.style.height = '73px'
        mouse.style.top = '-8px'
        mouse.style.backgroundImage = `url(${require(`../../assets/images/game-Images/game-mouse/mouse${this.num}.png`)})`
        mouse.style.backgroundSize = '100%'
        // console.log(mouse)
        // console.log(this.appear[1],'appear得值')
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
            // console.log('合格')
            this.createMouses(num)
        }else{
            // console.log('250')
        }
    },
    // 地鼠的消失
    disappear(i,isHit){
        if(this.mouse[i]){
            
            if(isHit){
                this.mouse[i].style.top='-20px'
                this.score+=10
                // console.log(this.score)
                var boom = document.createElement('img')
                boom.src = `${this.img}`
                boom.style.top='-30px'
                boom.style.position = 'absolute'
                boom.style.width = '100px'
                boom.style.height = '73px'
                this.mouse[i].appendChild(boom)
                clearInterval(this.mouse[i].timer)
            }else{
                this.life -=1
                console.log('自动消失')
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
            console.log(this.maxMouse,'???')
        }, 500);    
  },
};
</script>

<style lang="scss" scoped>
// 背景+锤子
.game {
  position: relative;
  width: 700px;
  height: 550px;
  margin: 100px auto;
  .ground1 {
    cursor: url("../../assets/images/game-Images/game-mouse/hammer.png"), auto;
  }
  .ground2 {
    cursor: url("../../assets/images/game-Images/game-mouse/hammer2.png"), auto;
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