<template>
    <div class="publish-game">
        <topNav style="z-index: 1"></topNav>
        <div class="form-box">
            <form action='' method='post'>
                <div class="publish-title">
                    分享您的游戏
                </div>
                <div class="game-item game-icon">
                    <label for="" class="special">上传游戏封面图：</label>
                    <uploadImage @getPic='getPic' width="150px" height="100px"></uploadImage>
                </div>
                <div class="game-item game-type">
                    <label for="">游戏分类：</label>
                    <select name="" id="" v-model="type">
                        <option value="clever">益智类</option>
                        <option value="smallGame">小游戏类</option>
                        <option value="shoot">射击类</option>
                    </select>
                    <!--<input type="text" name="clever" value="" placeholder="益智类">-->
                </div>
                <div class="game-item game-name">
                    <label for="">游戏名称：</label>
                    <input type="text" v-model="name" name="gameName" value="" placeholder="请输入您要发布的游戏名称">
                </div>
                <div class="game-item game-info">
                    <label for="">游戏简介：</label>
                    <textarea name="gameDetail" v-model="details" cols="30" rows="10" placeholder="请输入您要发布的游戏简介，如果游戏内未说明则还应包括游戏中的一些操作方式等"></textarea>
                </div>
                <div class="game-item game-images">
                    <label>上传游戏相关图片：</label>
                    <div class="game-images-box">
                        <el-upload
                            action="#"  
                            :limit="5"  
                            ref="upload" 
                            :multiple="true"  
                            :auto-upload="false"  
                            list-type="picture-card">
                            <el-button slot="trigger" size="small">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip">上传图片大小不超过500kb</div>
                        </el-upload>
                    </div>
                </div>
                <div class="game-item game-file">
                    <label for="">游戏源码文件：</label>
                    <input type="file" ref="code" name="code">
                </div>
                <div class="game-item game-submit">
                    <label for=""></label>
                    <input type="button" class="gamePublish" @click="gamePublish()" value="确认发布">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import topNav from '../components/topNav';
    import uploadImage from '../components/upload-image';
    export default {
        data() {
            return {
                //form表单的值
                logo:'',
                type:'',
                name:'',
                details:'',
                gameIcon: require('../assets/images/publishGame/01.png'),
                gameImages:[
                    require('../assets/images/publishGame/01.png')
                ],
            }
        },
        methods: {
            getPic(value){
                this.logo=value
            },
            gamePublish() {
                var data={
                    type:this.type,
                    name:this.name,
                    details:this.details,
                    loginName:this.$store.state.token.loginName
                }
                console.log(this.$refs.upload)
                let fileArray=this.$refs.upload.uploadFiles
                const fd=new FormData()
                fd.append('gameFiles',this.logo)
                fd.append('gameFiles',this.$refs.code.files[0])
                for(let i=0;i<fileArray.length;i++){
                    fd.append('gameFiles',fileArray[i].raw)
                }
                axios({
                    url:'/api/publishGame',
                    method:'post',
                    data:fd,
                    params:data
                }).then(res=>{
                    if(res.data==true){
                        this.$message({
                            message:'发布成功，请耐心等待审核',
                            type:'success'
                        })
                    }else{
                        this.$message.error("发布失败，请检查您上传的代码是否规范")
                    }
                })

                // this.$router.push('/')
            },
        },
        components: {
            topNav,
            uploadImage
        }
    }
</script>

<style lang="scss" scoped>

    .publish-game {
        /*height: 100%;*/
        background-image: url('../assets/images/publishGameTips/bg.jpg');
        background-size: 100% 100%;
        background-attachment: fixed;
        border: 1px solid black;
        .form-box {
            width: 70%;
            margin: 0 auto;
            height: calc(100% - 60px);
            form {
                height: 100%;
                display: flex;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.15);
                box-sizing: border-box;
                padding: 10px 40px;
                .publish-title {
                    font-size: 30px;
                    color: #e6e6e6;
                    text-align: center;
                }
                .game-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 30px;
                }
                label {
                    display: block;
                    width: 35%;
                    text-align: right;
                    color: #e6e6e6;
                    font-size: 20px;
                    margin-right: 30px;
                }
                .game-icon {
                    margin-top: 30px;
                    .upload-icon {
                        position: relative;
                        .upload-btn {
                            display: block;
                            width: 100%;
                            height: 100%;
                            position: absolute;
                            left: 0;
                            top: 0;
                            opacity: 0;
                        }
                        .game-img {
                            width: 200px;
                            height: 100px;
                            object-fit: cover;
                        }
                    }
                }
            }
            .game-type {
                select{
                    display: block;
                    width: 30%;
                    height: 30px;
                    border: none;
                    outline: none;
                    color: #e6e6e6;
                    box-sizing: border-box;
                    padding-left: 10px;
                    font-size: 20px;
                    background-color: transparent;
                    border-bottom: 2px solid #e6e6e6;
                    &::placeholder{
                        font-size: 14px;
                        color: #b7b7b7;
                    }
                    option{
                        color: #222;
                    }
                }
            }
            .game-name {
                input {
                    display: block;
                    width: 30%;
                    height: 30px;
                    border: none;
                    outline: none;
                    color: #e6e6e6;
                    box-sizing: border-box;
                    padding-left: 10px;
                    font-size: 20px;
                    background-color: transparent;
                    border-bottom: 2px solid #e6e6e6;
                    &::placeholder{
                        font-size: 14px;
                        color: #b7b7b7;
                    }
                }
            }
            .game-info {
                textarea {
                    display: block;
                    width: 30%;
                    height: 200px;
                    outline: none;
                    color: #e6e6e6;
                    box-sizing: border-box;
                    padding: 10px;
                    font-size: 20px;
                    background-color: transparent;
                    border: 2px solid #e6e6e6;
                    &::placeholder{
                        color: #b7b7b7;
                    }
                }
            }
            .game-images{
                .game-images-box{
                    display: flex;
                    position: relative;
                    .upload-btn {
                        display: block;
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        left: 0;
                        top: 0;
                        opacity: 0;
                    }
                    .game-img {
                        width: 200px;
                        height: 100px;
                        object-fit: cover;
                    }
                }
            }
            .game-file{
                input{
                    color: #e6e6e6;
                }
            }
            .game-submit{
                .gamePublish{
                    display: block;
                    width: 180px;
                    height: 80px;
                    outline: none;
                    border: none;
                    font-size: 25px;
                    background-color: rgb(50, 194, 163);
                    color: #e6e6e6;
                }
            }
        }
    }
</style>