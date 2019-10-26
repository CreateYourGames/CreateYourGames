<template>
    <div class="game" ref="game">
        <div class="gameStart" ref="gameStart">
            <div class="start">
                <span @click="start">开始游戏</span>
            </div>
        </div>
        <div class="gameEnter" ref="gameEnter">
            <div class="myPlane" ref="myPlane">
                <img src="../../assets/images/gamePlane/my.gif" alt="">
            </div>
            <div class="bullets" ref="bullets">
            </div>
            <div class="enemys" ref="enemys"></div>
        </div>
    </div>
</template>
<script>
import { setInterval } from 'timers'
export default {
    data(){
        return{
            plane:'',
            game:'',
            //游戏相关宽高
            gameW:'',
            gameH:'',
            gameMT:'',
            gameML:'',
            planeW:'',
            planeH:'',
            bulletW:6,
            bulletH:14,
            score:0,   //游戏得分
            gameStatus:false,  //当前游戏状态
            a:null,   //创建子弹定时器
            b:null,   //创建敌机定时器
            c:null,   //背景图定时器
            backgroundPY:0,  //背景图Y轴的值
            bullets:[],   //所有子弹集合
            enemys:[],    //所有敌机元素结合
            //创建敌机对象
            enemysObj :{
                enemy1: {
                    width: 34,
                    height: 24,
                    score: 100,
                    hp: 100
                },
                enemy2: {
                    width: 46,
                    height: 60,
                    score: 500,
                    hp: 800
                },
                enemy3: {
                    width: 110,
                    height: 164,
                    score: 1000,
                    hp: 2000
                }
            },
            percentData : [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,3,3], //敌机出现的序列


        }
    },
    mounted() {
        var _this=this
        document.onkeydown=function(e){
            let key=window.event.keyCode
            if(key==32){
                if(!_this.gameStatus){
                    //飞机跟随鼠标移动
                    document.onmousemove=function(ev){
                        _this.planeMove(ev)
                    }
                    //创建子弹及运动
                    _this.shot()
                    //创建敌机及运动
                    _this.appearEnemy()
                    //背景图的运动
                    _this.bgMove()
                }
                else{

                }
                _this.gameStatus=!_this.gameStatus
            }
        }
        //设置全局game,plane元素 方便使用 延时为了让dom加载完毕
        setTimeout(() => {
            _this.game=_this.$refs.game
            _this.plane=_this.$refs.myPlane

            _this.gameML=_this.game.offsetLeft
            _this.gameMT=_this.game.offsetTop
            _this.gameW=_this.getStyle(_this.game,'width')
            _this.gameH=_this.getStyle(_this.game,'height')
            _this.planeW=_this.getStyle(_this.plane,'width')
            _this.planeH=_this.getStyle(_this.plane,'height')
             
        }, 1000);
    },
    methods: {
        //点击开始游戏
        start(){
            this.$refs.gameStart.style.display='none'
            this.$refs.gameEnter.style.display='block'
        },
        //获取样式
        getStyle(ele, attr) {
           var res = null;
            if(ele.currentStyle){
                res = ele.currentStyle[attr];
            }else{
                res = window.getComputedStyle(ele,null)[attr];
            }
            return parseFloat(res);
            },
        //飞机开始移动
        planeMove(ev){
            // console.log(ev)
            var e=ev||window.event
            var mouse_x=e.x||e.pageX,
                mouse_y=e.y||e.pageY
            var last_myPlane_left=mouse_x-this.gameML-this.planeW/2,
                last_myPlane_top=mouse_y-this.gameMT-this.planeH/2
            //控制飞机不能飞出去
            // 控制飞机不能脱离当前的游戏界面
            if(last_myPlane_left <= 0){
                last_myPlane_left = 0;
            }else if(last_myPlane_left >= this.gameW - this.planeW){
                last_myPlane_left = this.gameW - this.planeW;
            }
            if(last_myPlane_top <= 0){
                last_myPlane_top = 0;
            }else if(last_myPlane_top >= this.gameH - this.planeH){
                last_myPlane_top = this.gameH - this.planeH;
            }
            //得到飞机当前位置
            this.plane.style.left=last_myPlane_left+'px'
            this.plane.style.top=last_myPlane_top+'px'
        },
        //单位时间内制造子弹
        shot(){
            //如果已经开始了定时器，不在开启定时器
            if(this.a) return;
            var _this=this
            this.a=setInterval(() => {
                _this.createBullet()
            }, 100);
        },
        createBullet(){
            //创建子弹
            var bullet=new Image()
            bullet.src=require('../../assets/images/gamePlane/bullet1.png')
            bullet.className='b'
            //确定子弹位置 跟随飞机位置
            var planeL=this.getStyle(this.plane,'left'),
                planeT=this.getStyle(this.plane,'top')
            //确定子弹位置
            var bulletL=planeL+this.planeW/2-this.bulletW/2,
                bulletT=planeT-this.bulletH/2
            // console.log(bulletL,bulletT)
            bullet.style.position='absolute'
            bullet.style.left=bulletL+'px'
            bullet.style.top=bulletT+'px'
            this.$refs.bullets.appendChild(bullet)
            this.bullets.push(bullet)
            this.move(bullet,'top')
        },
        //子弹的运动
        move(ele,attr){
            var speed=-8
            var _this=this
            ele.timer=setInterval(() => {
                var moveVal=_this.getStyle(ele,attr)
                //如果子弹出界，移除子弹元素
                if(moveVal<=_this.bulletH){
                    clearInterval(ele.timer)
                    ele.parentNode.removeChild(ele)
                    // bullets.splice(0,1)
                }else{
                    ele.style[attr]= moveVal+speed+'px'
                }
            }, 10);
        },
        //创建敌机定时器
        appearEnemy(){
            if(this.b) return 
            this.b=setInterval(() => {
                //制造敌机
                this.createEnemy()
                //删除敌机
                // this.delEnemy()
            }, 1000);
        },
        createEnemy(){
            //敌机类型
            var enemyType=this.percentData[Math.floor(Math.random()*this.percentData.length)]
            //得到当前敌机的数据
            var enemyData = this.enemysObj["enemy" + enemyType];
            var enemy=new Image(enemyData.width,enemyData.height)
            enemy.src=require(`../../assets/images/gamePlane/enemy${enemyType}.png`)
            enemy.t = enemyType;
            enemy.score = enemyData.score;
            enemy.hp = enemyData.hp;
            enemy.className = "e";
            enemy.dead = false; // 敌机存活
            // 确定当前敌机出现时的位置
            var enemyL = Math.floor(Math.random()*(this.gameW - enemyData.width + 1))
            ,	enemyT = -enemyData.height;
            // console.log(enemyL,enemyT)
            enemy.style.position='absolute';
            enemy.style.left = enemyL + "px";
            enemy.style.top = enemyT + "px";
            this.$refs.enemys.appendChild(enemy);
            this.enemys.push(enemy);
            this.enemyMove(enemy,"top");
        },
        //敌机的运动
        enemyMove(ele,attr){
            var speed = null;
            if(ele.t == 1){
                speed = 1.5;
            }else if(ele.t == 2){
                speed = 1;
            }else if(ele.t == 3){
                speed = 0.5;
            }
            var _this=this
            ele.timer = setInterval(function(){
                var moveVal = _this.getStyle(ele,attr);
                if(moveVal >= _this.gameH){
                    clearInterval(ele.timer);
                    _this.$refs.enemys.removeChild(ele);
                    _this.enemys.splice(0,1);
                }else{
                    ele.style[attr] = moveVal + speed + "px";
                    // 每一架敌机运动时，检测和每一颗子弹的碰撞
                    _this.danger(ele);
                    // 检测碰撞
                    // gameOver();
                }
            },10);
        },
        //清除子弹和敌机上的定时器
        clear(child){
            for(var i=0;i<child.length;i++){
                clearInterval(child[i].timer)
            }
        },
        // 暂停游戏之后的开始游戏
	    reStart(childs,type){
            for(var i=0;i<childs.length;i++){
                type == 1 ? this.move(childs[i],"top") : this.enemyMove(childs[i],"top");
            }
        },
        // 开始游戏之后的背景图的运动
	    bgMove(){
            var _this=this
            this.c = setInterval(function(){
                _this.backgroundPY += 0.5;
                if(_this.backgroundPY >= _this.gameH){
                    _this.backgroundPY = 0;
                }
                _this.$refs.gameEnter.style.backgroundPositionY = _this.backgroundPY + "px";
            },10);
        },
        //检测子弹和飞机碰撞
        danger(enemy){
            for(var i=0;i<this.bullets.length;i++){
                //获取子弹的位置
                var bulletL=this.bullets[i].style.left
                var bulletT=this.bullets[i].style.top
                //获取敌机的位置
                var enemyL=enemy.style.left
                var enemyT=enemy.style.top
                //获取敌机的宽高
                var enemyW=this.getStyle(enemy,'width')
                var enemyH=this.getStyle(enemy,'height')
            }
            console.log(enemyH,enemyW)
        },
    },
}
</script>
<style lang="scss" scoped>
    .game{
        width: 320px;
        height: 568px;
        margin: 0 auto;
        .gameStart{
            width: 100%;height: 100%;
            background:url(../../assets/images/gamePlane/ks.png)no-repeat;
            position: relative;
            // display: none;
            .start{
                width: 160px;height: 40px;
                background-color: rgba(196, 201, 202);
                border: 4px solid #666;
                font-size: 18px;
                font-weight: 600;
                position: absolute;
                top: 400px;
                left: 80px;
                display: flex;
                align-items: center;
                justify-content: center;
                span{
                    &:hover{
                        color: white;
                        cursor: pointer;
                    }
                }
            }
        }
        .gameEnter{
            width:100%;height: 100%;
            background-image: url(../../assets/images/gamePlane/background_1.png);
            background-position-y: 0;
            position: relative;
            display: none;
            .myPlane{
                width: 66px;height: 80px;
                position: absolute;
                top: 488px;
                left: 127px;
                cursor: pointer;
            }
            .bullets{
                width: 100%;height: 100%;
                position: absolute;
                left: 0;top: 0;
                .bullet{
                    width: 7px;height: 14px;
                    position: absolute;
                    left: 157px;
                    top: 474px;
                }
            }
            .enemys{
                width: 100%;height: 100%;
                position: absolute;
                left: 0;top: 0;
                .enemy{
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }
    }
</style>