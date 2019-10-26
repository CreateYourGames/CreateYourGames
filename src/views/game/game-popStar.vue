<template>
    <div class="pop-star">
        <div class="pop-star-table" :style="{width:tableWidth + 'px'}">
            <div class="target-score">当前第 {{level}} 关 目标分数：{{targetScore}}</div>
            <div class="now-score">当前分数：{{totalScore}} <span v-if="addScoreFlag" class="add-score" :class="{'show-add-score': addScoreFlag}">+{{selectedScore}}</span></div>
            <div class="selected-score" v-show="starChoose.length > 0">{{starChoose.length}}块 {{selectedScore}}分</div>
            <div class="good-tip"
                 v-if="goodFlag"
                 :class="{
            'none': goodFlag == 0,
            'good': goodFlag == 1,
            'very-good': goodFlag == 2,
            'excelent': goodFlag == 3
        }"
            ></div>
            <div class="win-tip" v-if="nextLevelFlag">
                <img class="congratulation" src="../../assets/images/game-Images/game-popStar/clearance.png" alt="">
                <div class="next-level" @click="nextLevel">进入下一关</div>
                <div class="exit" @click="exitGame">退出游戏</div>
            </div>
            <div class="lose-tip" v-if="gameOverFlag">
                <div class="score-title">
                    <img src="../../assets/images/game-Images/game-popStar/your-score.png" alt="">
                </div>
                <div class="final-score">
                    <p class="score">{{totalScore}}</p>
                </div>
                <div class="operate-btn">
                    <div class="next-level" @click="restart">不服重玩！</div>
                    <div class="exit" @click="exitGame">退出游戏</div>
                </div>
            </div>
            <template class="star-row" v-for="starRow in starSet">
                <div class="star"
                     v-if="star"
                     v-for="star in starRow"
                     :key="'' + star.row + star.col"
                     :class="{
                     'red': star.color == 'red',
                     'yellow': star.color == 'yellow',
                     'blue': star.color == 'blue',
                     'green': star.color == 'green',
                     'purple': star.color == 'purple',
                     // 如果被选中星星数组中包含当前星星，则添加闪烁样式
                     'flicker': starChoose.includes(star),
                     'pop': star.pop
                 }"
                     :style="{
                     width: starWidth + 'px',
                     height: starWidth + 'px',
                     left: star.col * starWidth + 'px',
                     bottom: star.row * starWidth + 'px',
                     }"
                     @mouseover="starSelected(star)"
                     @click="starClick"
                ></div>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        name: "game-pop-star",
        data() {
            return {
                // 游戏区宽度
                tableWidth: 500,
                // 星星宽度
                starWidth: 50,
                // 横竖星星数量
                boardWidth: 10,
                // 星星数组
                starSet: [],
                // 被选中星星数组
                starChoose: [],
                // 星星基础分
                baseScore: 5,
                // 递增分
                stepScore: 10,
                // 被选中星星总分
                selectedScore: 0,
                // 总分
                totalScore: 0,
                // 当前关卡数
                level: 1,
                // 当前关卡目标分
                targetScore: 7000,
                // 连击判断符
                goodFlag: 0,
                // 加分判断符
                addScoreFlag: false,
                // 通关判断符
                nextLevelFlag: false,
                // 游戏结束判断符
                gameOverFlag: false,
            }
        },
        created() {
            this.init();
        },
        methods: {
            // 初始化方法
            init() {
                for (let i = 0; i < this.boardWidth; i++) {
                    this.starSet[i] = [];
                    for (let j = 0; j < this.boardWidth; j++) {
                        this.createSquare(Math.floor(Math.random() * 5), i, j);
                    }
                }
                this.resizeStar();
            },
            // 初始化星星适应当前屏幕尺寸
            resizeStar() {
                const cHeight = document.documentElement.clientHeight;
                this.tableWidth = cHeight / 1.6;
                this.starWidth = this.tableWidth / 10;
            },
            // 创建星星
            createSquare(color, row, col) {
                // 设置星星所在第几行第几列
                this.starSet[row][col] = {
                    row: row,
                    col: col,
                    pop: false
                };
                // 将传入的随机数转换为对应的颜色类名
                switch (color) {
                    case 0:
                        this.starSet[row][col].color = 'red';
                        break;
                    case 1:
                        this.starSet[row][col].color = 'yellow';
                        break;
                    case 2:
                        this.starSet[row][col].color = 'blue';
                        break;
                    case 3:
                        this.starSet[row][col].color = 'green';
                        break;
                    case 4:
                        this.starSet[row][col].color = 'purple';
                        break;
                }
            },

            refresh() {
                for (let i = 0; i < this.starSet.length; i++) {
                    for (let j = 0; j < this.starSet[i].length; j++) {
                        if (this.starSet[i][j] == null) {
                            continue;
                        }
                        this.starSet[i][j].row = i;
                        this.starSet[i][j].col = j;
                    }
                }
            },
            // 鼠标悬停星星被选中
            starSelected(star) {
                this.starChoose = [];
                this.checkLinked(star, this.starChoose);
                if (this.starChoose.length <= 1) {
                    this.starChoose = [];
                    return;
                }
                console.log(this.starChoose);
                this.selectedStarScore();
            },
            // 检查星星连接的所有同色星星
            checkLinked(star, arr) {
                if (star == null) {
                    return;
                }
                arr.push(star);
                //  当不为最左边的星星时
                //  当左边存在星星时
                //  当左边的星星与当前星星颜色相同时
                //  当左边的星星还未被存进数组中时
                // 左侧判断
                if (star.col > 0 && this.starSet[star.row][star.col - 1] && this.starSet[star.row][star.col - 1].color == star.color && !arr.includes(this.starSet[star.row][star.col - 1])) {
                    this.checkLinked(this.starSet[star.row][star.col - 1], arr);
                }
                // 右侧判断
                if (star.col < this.boardWidth - 1 && this.starSet[star.row][star.col + 1] && this.starSet[star.row][star.col + 1].color == star.color && !arr.includes(this.starSet[star.row][star.col + 1])) {
                    this.checkLinked(this.starSet[star.row][star.col + 1], arr);
                }
                // 上方判断
                if (star.row < this.boardWidth - 1 && this.starSet[star.row + 1][star.col] && this.starSet[star.row + 1][star.col].color == star.color && !arr.includes(this.starSet[star.row + 1][star.col])) {
                    this.checkLinked(this.starSet[star.row + 1][star.col], arr);
                }
                // 下方判断
                if (star.row > 0 && this.starSet[star.row - 1][star.col] && this.starSet[star.row - 1][star.col].color == star.color && !arr.includes(this.starSet[star.row - 1][star.col])) {
                    this.checkLinked(this.starSet[star.row - 1][star.col], arr);
                }
            },
            // 计算被选中星星总分
            selectedStarScore() {
                let score = 0;
                for (let i = 0; i < this.starChoose.length; i++) {
                    score += this.baseScore + i * this.stepScore;
                }
                if (score <= 0) {
                    return;
                }
                this.selectedScore = score;
            },
            // 点击星星
            starClick() {
                // 分数增加
                let score = 0;
                for (let i = 0; i < this.starChoose.length; i++) {
                    score += this.baseScore + i * this.stepScore;
                }
                this.totalScore += score;
                // 消灭星星
                for (let i = 0; i < this.starChoose.length; i++) {
                    console.log(this.starChoose[i].row, this.starChoose[i].col);
                    this.starSet[this.starChoose[i].row][this.starChoose[i].col].pop = true;
                    this.starSet[this.starChoose[i].row][this.starChoose[i].col] = null;
                }
                // 消灭星星时出现效果
                this.showGoodTips(this.starChoose.length);
                // 消灭星星时加分效果
                this.showAddScore();
                // 消灭星星后剩余星星移动
                this.starMove();
                this.starChoose = [];
                // 无法进行操作时判断是否通关
                if(this.isFinish()){
                    if(this.totalScore > this.targetScore){
                        console.log('恭喜获胜');
                        // 弹出通关操作界面
                        this.nextLevelFlag = true;
                    }
                    else {
                        console.log('游戏失败');
                        // 弹出游戏结束界面
                        this.gameOverFlag = true;
                    }
                }
                this.showTable();
            },
            // 弹出消灭星星提示
            showGoodTips(count){
                if(count >= 3 && count <= 4){
                    this.goodFlag = 1;
                }
                else if(count >= 5 && count <= 6){
                    this.goodFlag = 2;
                }
                else if(count >= 7){
                    this.goodFlag = 3;
                }
                else{
                    this.goodFlag = 0;
                }
                setTimeout(() => {
                    this.goodFlag = 0;
                }, 850)
            },
            // 消灭星星加分提示
            showAddScore(){
                this.addScoreFlag = !this.addScoreFlag;
                setTimeout(() => {
                    this.addScoreFlag = !this.addScoreFlag;
                }, 850)
            },
            // 移动星星
            starMove(){
                // 上面的星星掉下来
                // 使用指针判断在当前列上若有被消除星星，则指针停留在空位，直到碰到下一个非空位，将星星移到指针处，即全部下落
                for(let i = 0; i < this.boardWidth; i++){
                    let pointer = 0;
                    for(let j = 0; j < this.boardWidth; j++){
                        if(this.starSet[j][i] != null){
                            if(j != pointer){
                                // this.starSet[j][i].row = pointer;
                                this.starSet[pointer][i] = this.starSet[j][i];
                                this.starSet[j][i] = null;
                                this.starSet[pointer][i].row = pointer;
                                // this.starSet[j][i].col = null;
                            }
                            pointer ++;
                        }
                    }
                }
                // 右边的星星往左移
                // 如果有某一列星星全部被消除，将右边的全部星星向左补空列
                for(let i = 0; i < this.boardWidth; i++){
                    this.popColumn();
                }
            },
            // 星星左移
            popColumn(){
                for(let i = 0; i < this.boardWidth; i++){
                    let pointer = 0;
                    for(let j = 0; j < this.boardWidth; j++){
                        if(this.starSet[j][i] != null){
                            pointer ++;
                            break;
                        }
                    }
                    if(pointer == 0){
                        for(let nowCol = i; nowCol < this.boardWidth - 1; nowCol++){
                            for(let row = 0; row < this.boardWidth; row++){
                                if(this.starSet[row][nowCol + 1] != null){
                                    this.starSet[row][nowCol] = this.starSet[row][nowCol + 1];
                                    this.starSet[row][nowCol].col -= 1;
                                    this.starSet[row][nowCol + 1] = null;
                                }
                            }
                        }
                    }
                }
            },
            // 判断是否完成
            isFinish(){
                for(let i = 0; i < this.starSet.length; i++){
                    for(let j = 0; j < this.starSet.length; j++){
                        let temp = [];
                        // 判断所有星星周围是否存在可以消灭的星星
                        this.checkLinked(this.starSet[i][j], temp);
                        if(temp.length > 1){
                            console.log('没结束呢');
                            return false;
                        }
                    }
                }
                return true;
            },
            // 进入下一关
            nextLevel(){
                this.nextLevelFlag = false;
                this.level++;
                this.targetScore = this.targetScore + 1000 + 450 * (this.level -1);
                this.init();
            },
            // 退出游戏，若已登录则上传分数
            exitGame(){
                this.$api.gameCenter.showAllGames({
                    loginName: this.$store.state.token.loginName,
                    gameScore: this.totalScore,
                    gameId: value.gameId
                }).then(res => {
                    console.log(res);
                    this.$router.push('/GameCenter');
                }).catch(err => {
                    console.log(err);
                })

            },
            restart(){
                this.$router.go(0);
            },
            // 展示当前星星情况
            showTable(){
                for(let i = this.starSet.length - 1; i >= 0; i--){
                    let str = '';
                    for(let j = 0; j < this.starSet.length; j++){
                        if(this.starSet[i][j]){
                            str += this.starSet[i][j].row + ',' + this.starSet[i][j].col + ' ';
                        }
                        else{
                            str += 'null';
                        }

                    }
                    console.log(str);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    * {
        margin: 0;
        padding: 0;
    }
    .pop-star{
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        background-image: url("../../assets/images/game-Images/game-popStar/star-bg.jpg");
        background-size: 100% 100%;
    }
    .pop-star-table {
        position: relative;
        /*width: 500px;*/
        height: 100%;
        background: url("../../assets/images/game-Images/game-popStar/background.png");
        background-size: cover;
        font-size: 0;
        margin: 0 auto;
        // 目标分数
        .target-score {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
        }
        // 当前分数
        .now-score {
            position: relative;
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
            // 消灭星星加分效果
            .add-score{
                position: absolute;
                color: #eaca48;
                @keyframes addScore {
                    0%{
                        transform: scale(0.5);
                        opacity: 0.5;
                    }
                    30%{
                        transform: scale(1);
                        opacity: 1;
                    }
                    90%{
                        transform: scale(1);
                        opacity: 1;
                    }
                    100%{
                        transform: scale(0);
                        opacity: 0;
                    }
                }
                &.show-add-score{
                    animation: addScore 0.8s linear forwards;
                }
            }
        }
        // 选中分数
        .selected-score {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            color: #ffffff;
            font-size: 20px;
        }

        // 消灭星星提示
        .good-tip{
            position: absolute;
            top: 18%;
            width: 100%;
            height: 60px;
            background-repeat: no-repeat;
            background-position: center;
            @keyframes goodEnter {
                0%{
                     transform: scale(0.5);
                     opacity: 0.5;
                 }
                30%{
                    transform: scale(1);
                    opacity: 1;
                }
                90%{
                    transform: scale(1);
                    opacity: 1;
                }
                100%{
                    transform: scale(0);
                    opacity: 0;
                }
            }
            @keyframes veryGoodEnter {
                0%{
                    transform: scale(0.5);
                    opacity: 0.5;
                }
                30%{
                    transform: scale(1);
                    opacity: 1;
                }
                90%{
                    transform: scale(1);
                    opacity: 1;
                }
                100%{
                    transform: scale(0);
                    opacity: 0;
                }
            }
            @keyframes excelentEnter {
                0%{
                    transform: scale(0.5);
                    opacity: 0.5;
                }
                30%{
                    transform: scale(1);
                    opacity: 1;
                }
                90%{
                    transform: scale(1);
                    opacity: 1;
                }
                100%{
                    transform: scale(0);
                    opacity: 0;
                }
            }
            &.none{
                background-color: #000;
                opacity: 0;
            }
            &.good{
                animation: goodEnter 0.8s linear forwards;
                background-image: url("../../assets/images/game-Images/game-popStar/good.png");
            }
            &.very-good{
                animation: veryGoodEnter 0.8s linear forwards;
                background-image: url("../../assets/images/game-Images/game-popStar/very_good.png");
            }
            &.excelent{
                animation: excelentEnter 0.8s linear forwards;
                background-image: url("../../assets/images/game-Images/game-popStar/excelent.png");
            }
        }
        .win-tip{
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 20%;
            left: 15%;
            height: 50%;
            width: 70%;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 5px;
            z-index: 999;
            font-size: 16px;
            .congratulation{
                margin: 20px 0 40px;
            }
            .next-level{
                height: 40px;
                line-height: 40px;
                width: 60%;
                text-align: center;
                background-color: rgb(49,164,216);
                color: #ffffff;
                margin: 10% 0 5%;
                border-radius: 5px;
                cursor: pointer;
            }
            .exit{
                height: 40px;
                line-height: 40px;
                width: 60%;
                text-align: center;
                background-color: rgb(49,164,216);
                color: #ffffff;
                border-radius: 5px;
                cursor: pointer;
            }
        }
        .lose-tip{
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            top: 20%;
            left: 15%;
            height: 50%;
            width: 70%;
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 5px;
            z-index: 999;
            font-size: 16px;
            box-sizing: border-box;
            padding: 15px;
            .score-title{
                width: 100%;
                img{
                    width: 95%;
                    margin: 0 auto;
                }
            }
            .final-score{
                .score{
                    font-size: 40px;
                    font-weight: bold;
                }
            }
            .operate-btn{
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                .next-level{
                    height: 40px;
                    line-height: 40px;
                    width: 60%;
                    text-align: center;
                    background-color: rgb(49,164,216);
                    color: #ffffff;
                    border-radius: 5px;
                    cursor: pointer;
                    margin: 10px 0;
                }
                .exit{
                    height: 40px;
                    line-height: 40px;
                    width: 60%;
                    text-align: center;
                    background-color: rgb(215, 21, 30);
                    color: #ffffff;
                    border-radius: 5px;
                    cursor: pointer;
                }
            }
        }
        // 星星
        .star {
            display: inline-block;
            position: absolute;
            border-radius: 12px;
            box-sizing: border-box;
            background-size: 100% 100%;
            transform: scale(0.95);
            transition: bottom 0.3s;
            &.red {
                background-image: url("../../assets/images/game-Images/game-popStar/0.png");
            }
            &.yellow {
                background-image: url("../../assets/images/game-Images/game-popStar/1.png");
            }
            &.blue {
                background-image: url("../../assets/images/game-Images/game-popStar/2.png");
            }
            &.green {
                background-image: url("../../assets/images/game-Images/game-popStar/3.png");
            }
            &.purple {
                background-image: url("../../assets/images/game-Images/game-popStar/4.png");
            }
            @keyframes flickerScale {
                0% {
                    transform: scale(0.95);
                }
                100% {
                    transform: scale(0.9);
                }
            }
            // 星星选中闪烁
            &.flicker {
                border: 3px solid #bfefff;
                animation: flickerScale 0.3s alternate infinite;
            }
            @keyframes starPop {
                0%{
                    opacity: 1;
                    transform: scale(0.95);
                }
                100%{
                    opacity: 0;
                    transform: scale(0);

                }
            }
            &.pop{
                animation: starPop 0.3s linear forwards;
            }
        }
    }
</style>