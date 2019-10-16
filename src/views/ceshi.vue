<template>
    <div class="container">
         <input type="button" value="向左" @click="left">
         <input type="button" value="向右" @click="right">
        <ul>
            <li v-for="(item,index) in list" :key="index">
                {{item}}
            </li>
        </ul>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:['第一个','第二个','第三个','第四个','第五个','第六个','第七个'],
            newlist:[]
        }
    },
    created(){
        this.newlist=this.list
    },
    methods: {
        left(){
            var list1=this.list.shift()
            console.log(list1)
            // list1=list1.split(",")
            this.list.push(list1)
            // this.newlist=this.list
        },
        right(){
            var list2=this.list.pop()
            this.list.unshift(list2)
        }
    },
}
</script>
<style lang="scss" scoped>
.container{
    width: 300px;
    margin: 100px auto;
    border:1px solid red;
    ul{
        width: 600px;height: 30px;
        // overflow: hidden;
        border: 1px solid;
        margin:100px auto;
        li{
            float: left;
            margin: 0 15px;
        }
    }
}
</style>