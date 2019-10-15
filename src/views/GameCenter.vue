<template>
    <div class="game-library">
        <div class="head">
            <div class="logo" @click="goHome">
                <img src="../assets/images/home/logo.png" alt="logo">
            </div>
            <div class="search">
                <input type="text" @focus="searchDisplay=true" placeholder="输入需要搜索的游戏" v-model="search" @input='inputSearch(search)'>
                <el-button type="info" size="small">搜索</el-button>
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
                <select name="type" id="">
                    <option value="">所有类型</option>
                    <option value="">益智</option>
                    <option value="">小游戏</option>
                    <option value="">射击</option>
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
                    <div class="item" v-for="(item,index) in 8" :key="index" @click="toDetails(index)">
                        {{item}}
                        <p>描述</p>
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
            searchDisplay:false,
            list:[
                '大朋友','大西瓜','大大大人物','小小小','小孩子','小孩子爱吃糖','游戏大全','腾讯游戏','腾讯斗地主'
            ],
            newList:[]
        }
    },
    methods:{
        goHome(){
            this.$router.push('/')
        },
        toRanking(){
            this.$router.push('/RankingList')
        },
        toDetails(index){
            this.$router.push('/details')
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
            // console.log(value)
            // console.log(this.searchList(value))
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
            return this.list.filter(item=>{
                if(item.includes(value)){
                    return item
                }
            })
        }
    },
    mounted(){
        
    }
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
                        width: 21%;height: 150px;
                        border: 1px solid white;
                        border-radius: 10px;
                        cursor: pointer;
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
                width: 100%;
                justify-content: center;
                display: flex;
                align-items: center;
                input{
                    width: 30px;height: 30px;
                    border:none;
                    background-color: rgba(255,255,255,0.2);
                    cursor: pointer;
                }
                ul{
                    overflow: hidden;
                    li{
                        width: 30px;height: 30px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        border: 1px solid rgb(201, 201, 201);
                        float: left;
                        margin: 0 5px;
                        cursor: pointer;
                        &.active{
                            background-color: yellow;
                            color: white;
                        }
                    }
                }
            }
        }
    }
</style>