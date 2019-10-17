<template>
    <div class="search">
        <input type="text" 
        @click.stop="searchDisplay=true" placeholder="输入需要搜索的游戏" 
        v-model="search" 
        @input='inputSearch(search)'>
        <el-button type="info" size="small" @click='searchFather'>搜索</el-button>
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
</template>
<script>
export default {
    data(){
        return{
            search:'',
            //搜索快那个的显式隐藏
            searchDisplay:false,
        }
    },
    props:['gameList'],
    methods: {
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
        },
        searchFather(){
            this.$emit('search',this.search)
        }
    },
}
</script>
<style lang="scss" scoped>
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
</style>