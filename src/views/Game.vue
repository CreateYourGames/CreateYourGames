<template>
    <div class="game-center" @click="searchDisplay">
        <topNav></topNav>
        <div class="head">
            <div class="type">
                <select v-model="selected" name="type" id="" @change="selectType(selected)">
                    <option value="all" >所有类型</option>
                    <option value="clever" >益智</option>
                    <option value="smallGame" >小游戏</option>
                    <option value="shoot" >射击</option>
                </select>
            </div>
            <search ref="search" :gameList='gameList' @search='searchGames'></search>
            <div class="toRanking" @click="toRanking">
                <span>瞅瞅排行榜&nbsp;-></span>
            </div>
        </div>
        <div class="content">
            <div class='content-top'>
                <div class="left" @click="left">
                    <img src="../assets/images/gameCenter/left.png" alt="向左">
                </div>
                <div class="middle">
                    <div class="item" v-for="(item,index) in list" :key="index" @click="toDetails(item.gameId-1)">
                        <img :src="item.gamePic" alt="游戏图片">
                        {{item.gameName}}
                    </div>
                </div>
                <div class="right" @click='right'>
                    <img src="../assets/images/gameCenter/left.png" alt="向左">
                </div>
            </div>
            <div class="content-pagination">
                <input type="button" value="<" @click="left">
                <ul>
                    <li 
                    :class="[flag==index?'active':'']" 
                    v-for="(item,index) in 6" 
                    :key="index"
                    @click="pageChange(index)">
                        {{item}}
                    </li>
                </ul>
                <input type="button" value=">" @click='right'>
            </div>
        </div>
  </div>
</template>
<script>
import Search from '../components/search';
import topNav from '../components/topNav';
export default {
    data(){
        return{
            total:100,
            //分页样式的判断
            flag:0,
            //搜索类型
            selected:'all',
            //定义当前页码
            pageNow:1,
            //存放查询后的结果
            list:[],
            gameList:[],
            newList:[]
        }
    },
    created() {
        this.$api.gameCenter.showAllGames().then(res=>{
            this.gameList=res.data
            //页面加载时将list存入8条数据，作为默认显示 延时是为了在数据取到后再执行该操作 
            if(this.gameList.length>8){
                this.gameList.forEach((item,index) => {
                    if(index%3==0&&index<24){
                        this.list.push(this.gameList[index])
                    }
                });
            }else{
                this.gameList.forEach(item=>{
                    this.list.push(item)
                })
            }
        })
       
    },
    methods:{
        //相应的路由跳转
        goHome(){
            this.$router.push('/')
        },
        toRanking(){
            this.$router.push('/RankingList')
        },
        toDetails(index){
            this.$router.push('/GameInfo?id='+this.gameList[index].gameId)
        },
        //改变模糊查询框的显示隐藏
        searchDisplay(){
            this.$store.commit('changeSearch',false)
        },
        //点击分页切换内容
        pageChange(index){
            this.flag=index;
            this.pageNow=index+1
            this.selectType(this.selected)
        },
        //点击分类渲染相应的内容区
        selectType(type){
            var list4=[]
            var list5=[]
            //首先将判断类型分为两类
            if(type=='all'){
                list5=[]
                this.list=this.gameList
                //判断数据的条数，如果大于八条数据，
                if(this.list.length>8){
                    if(this.pageNow>Math.ceil(this.list.length/8)){
                        alert("没有更多游戏了，抱歉~")
                    }else{
                        //匹配当前页的数据，将当前页的数据添加到数组
                        for(var i=(this.pageNow-1)*8;i<(this.pageNow-1)*8+8;i++){
                            list5.push(this.list[i]||'')
                        }
                    }
                    this.list=list5 
                }  
            }
            else{
                //每次进来先置空list 首先先根据type得到相应的数据
                list5=[]
                this.gameList.filter(item=>{
                    if(item.gameType.includes(type)){
                        list4.push(item)
                    }
                })
                this.list=list4
                //根据数据是否超过八条，进行不同的操作
                if(this.list.length>8){
                    // console.log("走了其他类型的大于八条数据")
                    if(this.pageNow>Math.ceil(this.list.length/8)){
                        // console.log("走了上边")
                        alert("没有更多游戏了，抱歉~")
                    }
                    else{
                        // console.log("走了下边")
                        //匹配当前页的数据，将当前页的数据添加到数组
                        for(var i=(this.pageNow-1)*8;i<(this.pageNow-1)*8+8;i++){
                            list5.push(this.list[i]||'')
                        }
                    }
                    this.list=list5 
                }
                else{
                    if(this.pageNow>Math.ceil(this.list.length/8)){
                        alert("没有更多游戏了，抱歉~")
                    }
                    // this.list=list4
                } 
            }
            
        },
        //点击搜索，渲染content中的内容
        searchGames(value){
            var list3=[]
            this.gameList.filter(item=>{
                if(item.gameName.includes(value)){
                    list3.push(item)
                }
            })
            this.list=list3
        },
        //分页左右按钮
        left(){
            if(this.flag<1){
                return
            }else{
                this.flag--
                this.pageNow--
                this.selectType(this.selected)
            }
        },
        right(){
            if(this.flag>4){
                return
            }else{
                this.flag++
                this.pageNow++
                this.selectType(this.selected)
            }
        },
    },
    components:{
        Search,
        topNav
    }
}
</script>
<style lang="scss" scoped>
    .game-center{
        width: 100%;height: 100%;
        background: url(../assets/images/home/bg.png)no-repeat;
        background-size: 100% 100%;
        .head{
            width: 100%;
            /*background:url(../assets/images/home/bg.png)no-repeat;*/
            background-size: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;
            .type{
                width: 25%;height: 50px;
                // margin: 25px 0 0 190px;
                margin-top: 25px;
                margin-left: -150px;
                select{
                    width: 80%;height: 30px;
                    background: rgba($color: #000, $alpha: 0.5);
                    color: white;
                    border: 1px solid rgb(184, 182, 182);
                    border-radius: 5px;
                    padding-left: 5px;
                    option{
                        font-size: 20px;
                    }
                }
            }
            .toRanking{
                width: 120px;height: 25px;
                background: rgba($color: #000, $alpha: 0.5);
                color:white;
                border: 1px solid rgb(184, 182, 182);
                border-right: none;
                padding-left: 5px;
                border-radius: 3px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                // background-color: white;
                position: absolute;
                top: 80px;right: 0;
            }
          }
        .content{
            width: 75%;height: 500px;
            // margin-top: -20px;
            border:1px solid rgb(184, 182, 182);
            background-color: rgba(255,255,255,0.2);
            border-radius: 5px;
            box-shadow: 0 0 10px 1px #d6c7c7ad;
            margin: 0 auto;
            .content-top{
                width: 100%;height: 420px;
                display: flex;
                .left{
                    width: 50px;height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        background-image: linear-gradient(to left,rgba(0,0,0,.1),rgba(0,0,0,.2));
                        cursor: pointer;
                    }
                }
                .middle{
                    padding: 40px 80px;
                    flex: 1;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: center;
                    .item{
                        width: 21%;height: 190px;
                        text-align: center;
                        border-radius: 10px;
                        cursor: pointer;
                        color: white;
                        img{
                            width: 90%;
                            border-radius: 10px;
                        }
                        &:hover{
                            transform: scale(1.2,1.3)
                        }
                        transition: transform .5s ease;
                    }
                }
                .right{
                    width: 50px;height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        background-image: linear-gradient(to left,rgba(0,0,0,.2),rgba(0,0,0,.1));
                        cursor: pointer;
                    }
                    img{
                        transform: rotate(180deg)
                    }
                }
            }
            .content-pagination{
                margin-top: 20px;
                width: 100%;
                justify-content: center;
                display: flex;
                align-items: center;
                input{
                    width: 30px;height: 30px;
                    border:none;
                    background-color: rgba(255,255,255,0.2);
                    cursor: pointer;
                    color:white;
                }
                ul{
                    overflow: hidden;
                    li{
                        width: 30px;height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        color: white;
                        border: 1px solid rgb(201, 201, 201);
                        float: left;
                        margin: 0 5px;
                        cursor: pointer;
                        &.active{
                            background-color: white;
                            color: black;
                        }
                    }
                }
            }
        }
    }
    .content-pagination {
      width: 100%;
      justify-content: center;
      display: flex;
      align-items: center;
      input {
        width: 30px;
        height: 30px;
        border: none;
        background-color: rgba(255, 255, 255, 0.2);
        cursor: pointer;
      }
      ul {
        overflow: hidden;
        li {
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid rgb(201, 201, 201);
          float: left;
          margin: 0 5px;
          cursor: pointer;
          &.active {
            background-color: yellow;
            color: white;
          }
        }
      }
    }
</style>