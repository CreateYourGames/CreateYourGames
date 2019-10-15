<template>
    <div>
        <!-- 顶部 -->
        <div class="info-nav">
            <input type="file" ref="input" name="" id="" style="display:none;">
            <img src="@/assets/images/personal/01.png" alt="" width="100" height="100" >
            <div class="style" @click="fileClick">
                <img src="@/assets/images/personal/z.png" alt="">
            </div>
            <div class="butt">
                <button @click="go1()">保存</button>
                <button @click="go2()">取消</button>
            </div>
        </div>

        <!-- 内容 -->
        <div class="content">
            <form action="">
                <label for="">用户名：</label>
                <input type="text" name="" id="" value="Abb"><br>
                <label for="">邮箱：</label>
                <input type="text" name="" id="" value="1461523882@qq.com"><br>
                <label for="">手机号：</label>
                <input type="text" name="" id="" value="1461523882"><br>
                <label for="" class="special">个人简介：</label>
                <textarea name="" id="" cols="30" rows="10">aaaa</textarea>
            </form>
            <p class="upEmil" @click="jumpEmil()">修改绑定邮箱</p>
            <p class="upTel" @click="jumpTel()">修改绑定手机</p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
        }
    },
    methods:{
        jumpEmil(){
            this.$router.push('/Personal/ChangeMail').catch(err=>console.log(err))
        },
        jumpTel(){
            this.$router.push('/Personal/ChangeTel').catch(err=>console.log(err))
        },
        fileClick(){
            this.$refs.input.dispatchEvent(new MouseEvent('click'))
        },
        go1(){
            this.$router.push('/Personal')
        },
        go2(){
            this.$router.push('/Personal')
        }
    }
}
</script>

<style lang="scss" scoped>
// top
.info-nav{
    width: 100%;
    height: 250px;
    background-color: gray;
    text-align: center;
    position: relative;
    img{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        margin-top: 30px;
    }
    .style{
        width: 200px;
        height: 200px;
        border-radius: 100px;
        background-color: rgba(128,128,128,0.4);
        text-align: center;
        line-height: 200px;
        position: absolute;
        top: 30px;
        left: 43.5%;
        cursor: pointer;
        color: #fff;
        img{
            width: 100px;
            height: 100px;
            margin-top: 45px;
        }
    }
    .butt{
        position: absolute;
        right: 300px;
        bottom: 20px;
        button{
            width: 80px;
            height: 30px;
            margin-left: 30px;
            color: #fff;
            border: none;
            background-color: black;
            border-radius: 20px;
            outline: none;
            cursor: pointer;
        }
    }
}

// content
.content{
    width: 400px;
    height: 600px;
    margin: 50px 34%;
    text-align: right;
    .special{
        display:block;
        margin-left:10px;
        margin-top:20px;
        float:left;
    }
    .upEmil{
        position: absolute;
        right: 30%;
        margin-top: -310px;
        cursor: pointer;
    }
    .upTel{
        position: absolute;
        right: 30%;
        margin-top: -260px;
        cursor: pointer;
    }
    label{
        font-size: 20px;
    }
    input{
        width: 290px;
        height: 30px;
        margin-top: 20px;
        top: -50px;
        outline: none;
    }
    textarea{
        width: 290px;
        margin-top: 20px;
        font-size: 16px;
        font-family: 微软雅黑;
    }
}
</style>