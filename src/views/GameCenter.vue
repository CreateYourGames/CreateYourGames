<template>
    <div class="game-library" @click="searchDisplay=false">
        <div class="head">
            <div class="logo" @click="goHome">
                <img src="../assets/images/home/logo.png" alt="logo">
            </div>
            <div class="search">
                <input type="text" 
                @click.stop="searchDisplay=true" placeholder="输入需要搜索的游戏" 
                v-model="search" 
                @input='inputSearch(search)'>
                <el-button type="info" size="small" @click='searchGames(search)'>搜索</el-button>
                <div class="searchContent" v-if="searchDisplay">
                    <ul>
                        <li 
                        v-for="(item,index) in searchList(search)" 
                        :key="index"
                        @click="updateSearch(index,search)">
                            {{item}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="type">
                <select v-model="selected" name="type" id="">
                    <option value="clever">所有类型</option>
                    <option value="clever">益智</option>
                    <option value="smallGame">小游戏</option>
                    <option value="shoot">射击</option>
                </select>
            </div>
            <div class="toRanking" @click="toRanking">
                <span>瞅瞅排行榜&nbsp;-></span>
            </div>
        </div>
        <div class="content">
            <div class='content-top'>
                <div class="left" @click="left">
                    <img src="../assets/images/gameLibrary/left.png" alt="向左">
                </div>
                <div class="middle">
                    <div class="item" v-for="(item,index) in searchType(selected)" :key="index" @click="toDetails(index)">
                        <img :src="item.goodsImg" alt="游戏图片">
                        {{item.info}}
                    </div>
                </div>
                <div class="right" @click='right'>
                    <img src="../assets/images/gameLibrary/left.png" alt="向左">
                </div>
            </div>
            <div class="content-pagination">
                <input type="button" value="<" @click="left">
                <ul>
                    <li 
                    :class="[flag==index?'active':'']" 
                    v-for="(item,index) in 6" 
                    :key="index"
                    @click="flag=index">
                        {{item}}
                    </li>
                </ul>
                <input type="button" value=">" @click='right'>
            </div>
        </div>
    </div> 
</template>
<script>
export default {
    data(){
        return{
            total:100,
            flag:0,
            search:'',
            selected:'clever',
            searchDisplay:false,
            list:[],
            gameList:[
                {
                    id:1,
                    goodsImg:'http://image.namedq.com/uploads/20190105/23/1546702937-UVQsqprDtH.jpg',
                    info:'疾风剑豪',
                    type:'clever'
                },
                {
                    id:2,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571135161031&di=3303e68738ed2bb10d731b214b57b380&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F06%2F201712311390721.jpg',
                    info:'龙年限定',
                    type:'clever'
                },
                {
                    id:3,
                    goodsImg:'http://img.bqatj.com/img/9b158976f1aefa31.jpg',
                    info:'提莫队长',
                    type:'clever'
                },
                {
                    id:4,
                    goodsImg:'http://image.namedq.com/uploads/20190105/23/1546702937-UVQsqprDtH.jpg',
                    info:'疾风剑豪',
                    type:'clever'
                },
                {
                    id:5,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571135161031&di=3303e68738ed2bb10d731b214b57b380&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F06%2F201712311390721.jpg',
                    info:'龙年限定',
                    type:'clever'
                },
                {
                    id:6,
                    goodsImg:'http://img.bqatj.com/img/9b158976f1aefa31.jpg',
                    info:'提莫队长',
                    type:'clever'
                },
                {
                    id:7,
                    goodsImg:'http://image.namedq.com/uploads/20190105/23/1546702937-UVQsqprDtH.jpg',
                    info:'疾风剑豪',
                    type:'clever'
                },
                {
                    id:8,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571135161031&di=3303e68738ed2bb10d731b214b57b380&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2018%2F06%2F201712311390721.jpg',
                    info:'龙年限定',
                    type:'clever'
                },
                {
                    id:11,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:12,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:13,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:14,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:15,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:16,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:17,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:18,
                    goodsImg:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3431566542,3235662944&fm=26&gp=0.jpg',
                    info:'腾讯游戏',
                    type:'smallGame'
                },
                {
                    id:20,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:21,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:22,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:23,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:24,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:25,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:26,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
                {
                    id:27,
                    goodsImg:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571728870&di=3a94f84346d1003306e6968df474acaa&imgtype=jpg&er=1&src=http%3A%2F%2Fg.pps.tv%2Fmobile%2Fdanji%2Fxwj2014%2F1104%2F6Xjh%2F5.jpg',
                    info:'极品飞机',
                    type:'shoot'
                },
            ],
            newList:[]
        }
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
            this.$router.push('/GameInfo')
        },
        //分类
        searchType(type){
            return this.gameList.filter(item=>{
                if(item.type.includes(type)){
                    return item
                }
            })
        },
        //点击搜索，渲染content中的内容
        searchGames(value){
            var list3=[]
            this.gameList.filter(item=>{
                if(item.info.includes(value)){
                    list3.push(item)
                }
            })
            this.gameList=list3
            return this.gameList
        },
        //分页左右按钮
        left(){
            console.log(this.flag)
            if(this.flag<1){
                return
            }else{
                this.flag--
            }
        },
        right(){
            console.log(this.flag)
            if(this.flag>4){
                return
            }else{
                this.flag++
            }
        },
        //点击选择下拉框内容到input框
        updateSearch(index,value){
            this.search=this.searchList(value)[index]
            this.searchDisplay=false
        },
        //输入内容时的变化
        inputSearch(value){
            if(this.search==''){
                this.searchDisplay=true
            }
        },
        searchList(value){
            var a=[]
            this.list.filter(item=>{
                if(item.info.includes(value)){
                    a.push(item.info)
                }
            })
            return a
        }
    },
    mounted() {
        this.list=this.gameList
    },
}
</script>
<style lang="scss" scoped>
    .game-library{
        width: 100%;height: 100%;
        background: url(../assets/images/home/bg.png)no-repeat;
        background-size: 100%;
        .head{
            width: 100%;height: 150px;
            background:url(../assets/images/home/bg.png)no-repeat;
            background-size: 100%;
            display: flex;
            justify-content: space-around;
            .logo{
                width: 300px;height: 80px;
                margin: 20px 0 0 50px;
                cursor: pointer;
                img{
                    width: 300px;
                }
            }
            .search{
                width: 400px;height: 50px;
                position: relative;
                margin: 15px 0 0 200px;
                display: flex;
                align-items: center;
                input{
                    width: 250px;height: 32px;
                    border: 1px solid rgb(184, 182, 182);
                    outline: none;
                    color: white;
                    font-size: 14px;
                    padding-left: 10px;
                    border-radius: 3px;
                    background: rgba($color: #000, $alpha: 0.5);
                }
                .el-button{
                    margin-left: 10px;
                }
                .searchContent{
                    width: 250px;max-height: 175px;
                    overflow: auto;
                    background-color: white;
                    position: absolute;
                    top: 50px;
                    background-color: rgba(255,255,255,0.2);
                    ul{
                        li{
                            display: flex;
                            align-items: center;
                            padding-left: 15px;
                            background-color: rgba(0,0,0,.6);
                            color: white;
                            height: 35px;
                            border-bottom: 1px solid #ccc;
                            cursor: pointer;
                            &:hover{
                                background-color: yellowgreen;
                            }
                        }
                    }
                }
            }
            .type{
                width: 350px;height: 50px;
                margin: 25px 0 0 190px;
                select{
                    width: 200px;height: 30px;
                    background: rgba($color: #000, $alpha: 0.5);
                    color: white;
                    border: 1px solid rgb(184, 182, 182);
                    border-radius: 5px;
                    padding-left: 5px;
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
            width: 1000px;height: 500px;
            // margin-top: -20px;
            border:1px solid rgb(184, 182, 182);
            background-color: rgba(255,255,255,0.2);
            border-radius: 5px;
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
                        background-image: linear-gradient(to left,rgba(0,0,0,.7),rgba(0,0,0,.4));
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
                    }
                }
                .right{
                    width: 50px;height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        background-image: linear-gradient(to left,rgba(0,0,0,.7),rgba(0,0,0,.4));
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
</style>