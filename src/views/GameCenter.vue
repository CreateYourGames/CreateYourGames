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
                <select v-model="selected" name="type" id="" @change="selectType(selected)">
                    <option value="all" >所有类型</option>
                    <option value="clever" >益智</option>
                    <option value="smallGame" >小游戏</option>
                    <option value="shoot" >射击</option>
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
                    <div class="item" v-for="(item,index) in list" :key="index" @click="toDetails(index)">
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
export default {
    data(){
        return{
            total:100,
            //分页样式的判断
            flag:0,
            //搜索框v-model
            search:'',
            //搜索类型
            selected:'all',
            //搜索快那个的显式隐藏
            searchDisplay:false,
            //定义当前页码
            pageNow:1,
            //存放查询后的结果
            list:[],
            //存放进入页面请求的数据
            gameList:[
                {
                    id:1,
                    goodsImg:'http://image.namedq.com/uploads/20190105/23/1546702937-UVQsqprDtH.jpg',
                    info:'疾风剑豪',
                    type:'clever'
                },
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
    mounted() {
        //页面加载时将list存入8条数据，作为默认显示
        this.gameList.forEach((item,index) => {
            if(index%3==0&&index<24){
                this.list.push(this.gameList[index])
            }
        });
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
            this.$router.push('/GameInfo?id='+this.gameList[index].id)
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
                        alert("没有更所游戏了，抱歉~")
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
                    if(item.type.includes(type)){
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
                if(item.info.includes(value)){
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
            console.log(this.flag)
            if(this.flag>4){
                return
            }else{
                this.flag++
                this.pageNow++
                this.selectType(this.selected)
            }
        },
        //点击选择下拉框内容到input框
        updateSearch(index,value){
            //先匹配到输入内容中的所有元素，然后从现有的元素中选取第几个作为内容放到输入框
            this.search=this.searchList(value)[index]
            this.searchDisplay=false
        },
        //输入内容时的变化
        inputSearch(value){
            if(this.search==''){
                this.searchDisplay=true
            }
        },
        //输入内容时下拉框的内容
        searchList(value){
            //定义一个可以暂时存放数据的容器
            var a=[]
            this.gameList.filter(item=>{
                if(item.info.includes(value)){
                    a.push(item.info)
                }
            })
            return a
        }
    },
}
</script>
<style lang="scss" scoped>
    .game-library{
        width: 100%;height: 100%;
        background: url(../assets/images/home/bg.png)no-repeat;
        background-size: 100% 100%;
        .head{
            width: 100%;height: 150px;
            background:url(../assets/images/home/bg.png)no-repeat;
            background-size: 100%;
            display: flex;
            justify-content: space-around;
            .logo{
                width: 23%;height: 80px;
                margin: 20px 0 0 50px;
                cursor: pointer;
                img{
                    width: 300px;
                }
            }
            .search{
                width: 30%;height: 50px;
                position: relative;
                margin-top: 15px;
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
                width: 25%;height: 50px;
                // margin: 25px 0 0 190px;
                margin-top: 25px;
                select{
                    width: 80%;height: 30px;
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
</style>