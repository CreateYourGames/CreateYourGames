<template>
    <div class="container">
        <div class="game" ref="game">
            <div class="gameStart" ref="gameStart">
                <div class="start">
                    <div class="plane" ref="startPlane">
                        <img src="../../assets/images/game-Images/game-plane/my.gif" alt="">
                    </div>
                    <div class="begin" @click="start">开始游戏</div><br>
                    <div class="end" @click="end">退出游戏</div>
                </div>
            </div>
            <div class="gameEnter" ref="gameEnter">
                <div class="myPlane" ref="myPlane">
                    <img src="../../assets/images/game-Images/game-plane/my.gif" alt="">
                </div>
                <div class="bullets" ref="bullets">
                </div>
                <div class="enemys" ref="enemys"></div>
                <div id="scores">
                    <p>得分：<span ref="score">0</span> 分</p>
                </div>
            </div>
        
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
            enemyTime:1000 ,  //敌机出现的频率
            flagCount:0,  //根据时间改变敌机的数量
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
                    if(_this.bullets.length != 0) _this.reStart(_this.bullets,1);
					// 敌机的继续运动
					if(_this.enemys.length != 0) _this.reStart(_this.enemys);
                }
                else{
                    document.onmousemove = null;
					// 清除创建敌机和创建子弹的定时器
					clearInterval(_this.a);
					clearInterval(_this.b);
					clearInterval(_this.c);
					_this.a = null;
					_this.b = null;
					_this.c = null;
					// 清除所有子弹和所有敌机上的运动定时器
					_this.clear(_this.bullets);
					_this.clear(_this.enemys);
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
            // console.log(document.getElementsByClassName("plane")[0])
            document.getElementsByClassName("plane")[0].classList.add('move')
            setTimeout(() => {
                this.$refs.gameStart.style.display='none'
                this.$refs.gameEnter.style.display='block' 
            }, 1500);   
        },
        //结束游戏
        end(){
            this.$router.push('/gameCenter')
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
            bullet.src=require('../../assets/images/game-Images/game-plane/bullet1.png')
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
            // console.log(ele)
            var speed=-8
            var _this=this
            ele.timer=setInterval(() => {
                // console.log(ele.timer)
                var moveVal=_this.getStyle(ele,attr)
                //如果子弹出界，移除子弹元素
                if(moveVal<=_this.bulletH){
                    clearInterval(ele.timer)
                    // console.log(ele.timer)
                    this.$refs.bullets.removeChild(ele)
                    this.bullets.splice(0,1)
                }else{
                    ele.style[attr]= moveVal+speed+'px'
                }
            }, 10);
        },
        //创建敌机定时器
        appearEnemy(){    
            if(this.b) return 
            this.b=setInterval(() => {
                this.flagCount++;
                if(this.flagCount<20 && this.flagCount>10){
                    console.log("走了20")
                    this.enemyTime=600
                    this.percentData.push(2,2,2,2,2,2,1,1,1,1);
                }else if(this.flagCount>20 && this.flagCount<30){
                    this.enemyTime=400
                    this.percentData.push(3,3,3,3,3,3,2,2,1,1,2);
                }
                //制造敌机
                this.createEnemy()
                //删除敌机
                this.delEnemy()
            }, this.enemyTime);
        },
        createEnemy(){
            //敌机类型
            var enemyType=this.percentData[Math.floor(Math.random()*this.percentData.length)]
            //得到当前敌机的数据
            var enemyData = this.enemysObj["enemy" + enemyType];
            var enemy=new Image(enemyData.width,enemyData.height)
            enemy.src=require(`../../assets/images/game-Images/game-plane/enemy${enemyType}.png`)
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
                    // console.log("走了清除")
                    clearInterval(ele.timer);
                    _this.$refs.enemys.removeChild(ele);
                    _this.enemys.splice(0,1);
                }else{
                    ele.style[attr] = moveVal + speed + "px";
                    // 每一架敌机运动时，检测和每一颗子弹的碰撞
                    _this.danger(ele);
                    // 检测碰撞
                    _this.gameOver();
                }
            },10);
        },
        //清除子弹和敌机上的定时器
        clear(child){
            for(var i=0;i<child.length;i++){
                // console.log(child[i].timer._id)
                clearInterval(child[i].timer)
                // console.log(child[i].timer)
            }
        },
        // 暂停游戏之后的开始游戏
	    reStart(childs,type){
            // console.log(childs,type)
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
                // 得到子弹的左上边距
                var bulletL = this.getStyle(this.bullets[i],"left")
                ,	bulletT = this.getStyle(this.bullets[i],"top");
                // console.log(bulletL,bulletT)
                // 得到敌机的左上边距
                var enemyL = this.getStyle(enemy,"left")
                ,	enemyT = this.getStyle(enemy,"top");
                // console.log(enemyL,enemyT)
                // 得到敌机的宽高
                var enemyW = this.getStyle(enemy,"width")
                ,	enemyH = this.getStyle(enemy,"height");
                // console.log( enemyW)
                var condition = bulletL + this.bulletW >= enemyL && bulletL <= enemyL + enemyW && bulletT <= enemyT + enemyH && bulletT + this.bulletH >= enemyT;
                if(condition){
                    //子弹和敌机的碰撞：删除子弹
                    // 1、先清除碰撞子弹的定时器
                    clearInterval(this.bullets[i].timer);
                    // 2、删除元素
                    this.$refs.bullets.removeChild(this.bullets[i]);
                    // 3、从集合中删除子弹
                    this.bullets.splice(i,1);
                    // 4、子弹和敌机发生碰撞后，敌机血量减少，血量为0时，删除敌机
                    enemy.hp -= 100;
                    if(enemy.hp == 0){
                        // 删除敌机
                        clearInterval(enemy.timer);
                        // 替换爆炸图片 
                        // console.log(enemy.t)
                        enemy.src = require("../../assets/images/game-Images/game-plane/bz" + enemy.t + ".gif");
                        // 标记死亡敌机
                        enemy.dead = true;
                        // 计算得分
                        this.score += enemy.score;
                        // console.log(this.score)
                        this.$refs.score.innerHTML = this.score;
                    }
                }
            }
        },
        	// 在创建敌机时，延时删除掉集合和文档中的死亡敌机
	    delEnemy(){
            var _this=this
            for(var i=this.enemys.length - 1;i>=0;i--){
                if(this.enemys[i].dead){
                    // console.log("走了销毁敌机")
                    // (function(index){
                        // 从文档中删除死亡敌机元素
                        document.getElementsByClassName("enemys")[0].removeChild(this.enemys[i]);
                        // 从集合中删除死亡敌机元素
                        _this.enemys.splice(i,1);
                    // })(i)
                }
            }
        },
        // 飞机碰撞，游戏结束
	    gameOver(){
            for(var i=0;i<this.enemys.length;i++){
                if(!this.enemys[i].dead){ // 游戏机界面内存活的敌机
                    // 检测碰撞
                    // 1、获取敌机的左上边距
                    var enemyL = this.getStyle(this.enemys[i],"left")
                    ,	enemyT = this.getStyle(this.enemys[i],"top");
                    // console.log(enemyL,enemyT)
                    // 2、获取敌机的宽高
                    var enemyW = this.getStyle(this.enemys[i],"width")
                    ,	enemyH = this.getStyle(this.enemys[i],"height");
                    // 3、获取己方飞机的左上边距
                    var myPlaneL = this.getStyle(this.plane,"left")
                    ,	myPlaneT = this.getStyle(this.plane,"top");
                    var condition = myPlaneL + this.planeW >= enemyL && myPlaneL <= enemyL + enemyW && myPlaneT <= enemyT + enemyH && myPlaneT + this.planeH >= enemyT;
                    if(condition){ // 己方飞机和敌机的碰撞
                        // console.log("碰撞了...");
                        // 清除定时器：创建子弹的定时器、创建飞机的定时器、游戏背景图的定时器
                        if(this.$store.state.token.loginName){
                            // console.log("走了发送请求")
                            this.$api.gameScore.uploadScore({
                                loginName: this.$store.state.token.loginName,
                                gameScore: this.score,
                                gameId: window.location.hash.split('/')[2]
                            }).then(res => {
                                console.log(res);
                                this.$router.go(0)
                            }).catch(err => {
                                console.log(err);
                            })
                        }
                        else{
                            console.log("走了发送")
                            this.$router.go(0)
                        }
                        clearInterval(this.a);
                        clearInterval(this.b);
                        clearInterval(this.c);
                        this.clear(this.bullets)
                        this.clear(this.enemys)
                        this.a = null;
                        this.b = null;
                        this.c = null;
                        // 删除子弹和敌机元素
                        this.remove(this.bullets);
                        this.remove(this.enemys);
                        // 集合清空
                        this.bullets = [];
                        this.enemys = [];
                        // 清除己方飞机的移动事件
                        document.onmousemove = null;
                        // 提示得分：
                        alert("Game over: " + this.score + "分");
                        // 回到游戏开始界面
                        // this.$refs.gameStart.style.display='block'
                        // this.$refs.gameEnter.style.display='none'
                        this.plane.style.left = "127px";
                        this.plane.style.top = this.gameH - this.planeH + "px";
                        // this.$router.go(0)
                    }
                }
            }
        },
        remove(childs){
            // console.log(childs.length)
            for(var i = childs.length - 1;i>=0;i--){
                clearInterval(childs[i].timer);
                // console.log(childs[i].parentNode)
                childs[i].parentNode.removeChild(childs[i]);
            }
        }
    },
    // computed:{
    //     length(){
    //         return this.bullets.length
    //     },
    //     length1(){
    //         return this.enemys.length
    //     }
    // },
}
</script>
<style lang="scss" scoped>
.container{
    width: 100%;height: 100%;
    background: url(../../assets/images/game-Images/game-plane/bg2.jpg);
    background-size: 100% 100%;
    .game{
        width: 320px;
        height: 568px;
        margin: 0 auto;
        overflow: hidden;
        .gameStart{
            width: 100%;height: 100%;
            background:rgba(0,0,0,.5);
            position: relative;
            // display: none;
            .start{
                font-size: 18px;
                font-weight: 600;
                position: absolute;
                top: 150px;
                left: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                .plane{
                    width: 80px;height: 80px;
                    position: absolute;
                    top: 200px;
                    // animation: mymove 3s
                }
                .move{
                    animation: mymove 1.5s;
                }
                @keyframes mymove {
                    0%{top: 200px;}
                    25%{top: 230px}
                    
                    100%{top: -230px}
                }
                .begin{
                    width: 160px;height: 40px;
                    text-align: center;
                    line-height: 2;
                    background-color: rgb(22, 22, 22);
                    color: white;
                    border: 1px solid #666;
                    &:hover{
                        color: rgb(238, 109, 3);
                        cursor: pointer;
                    }
                }
                .end{
                    width: 160px;height: 40px;
                    text-align: center;
                    line-height: 40px;
                    background-color: rgb(22, 22, 22);
                    border: 1px solid #666;
                    color: white;
                    &:hover{
                        color: rgb(238, 109, 3);
                        cursor: pointer;
                    }
                }
            }
        }
        .gameEnter{
            width:100%;height: 100%;
            background-image: url(../../assets/images/game-Images/game-plane/background_1.png);
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
            #scores{
                position: relative;
                z-index: 100;
                width: 100%;
                height: 40px;
                line-height: 40px;
                font-size: 24px;
                font-weight: bolder;
                padding: 0 20px;
            }
            #scores p{
                text-align: right;
                width: 80%;
            }
        }
    }
}
    
</style>