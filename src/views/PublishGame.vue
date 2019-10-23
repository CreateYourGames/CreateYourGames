<template>
    <div class="publish-game">
        <topNav style="z-index: 1"></topNav>
        <div class="form-box">
            <form action="">
                <div class="publish-title">
                    分享您的游戏
                </div>
                <div class="game-item game-icon">
                    <label for="" class="special">上传游戏封面图：</label>
                    <!--<div class="upload-icon">-->
                        <!--<input class="upload-btn" type="file" name="image" accept="image/*"-->
                               <!--@change="gameIconChange($event)">-->
                        <!--<img class="game-img" :src="gameIcon" alt="">-->
                    <!--</div>-->
                    <uploadImage width="200px" height="100px"></uploadImage>
                </div>
                <div class="game-item game-type">
                    <label for="">游戏分类：</label>
                    <input type="text" name="" value="" placeholder="益智类">
                </div>
                <div class="game-item game-name">
                    <label for="">游戏名称：</label>
                    <input type="text" name="" value="" placeholder="请输入您要发布的游戏名称">
                </div>
                <div class="game-item game-info">
                    <label for="">游戏简介：</label>
                    <textarea name="" cols="30" rows="10" placeholder="请输入您要发布的游戏简介，如果游戏内未说明则还应包括游戏中的一些操作方式等"></textarea>
                </div>
                <div class="game-item game-images">
                    <label>上传游戏相关图片：</label>
                    <div class="game-images-box">
                        <uploadImage width="150px" height="100px"></uploadImage>
                    </div>
                </div>
                <div class="game-item game-file">
                    <label for="">游戏源码文件：</label>
                    <input type="file" name="">
                </div>
                <div class="game-item game-submit">
                    <label for=""></label>
                    <input type="submit" class="gamePublish" @click="gamePublish()" value="确认发布">
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
                gameIcon: require('../assets/images/publishGame/01.png'),
                gameImages:[
                    require('../assets/images/publishGame/01.png')
                ],
            }
        },
        methods: {
            gamePublish() {
                this.$router.push('/')
            },
            gameIconChange(e) {
                const file = e.target.files[0];
                console.log(file);
                // 获取图片的大小，做大小限制有用
                let imgSize = file.size;
                console.log(imgSize);
                const _this = this; // this指向问题，所以在外面先定义
                // 比如上传头像限制5M大小，这里获取的大小单位是b
                if (imgSize <= 5000 * 1024) {
                    // 合格
                    _this.errorStr = '';
                    console.log('大小合适');
                    // 开始渲染选择的图片
                    // 本地路径方法 1
                    // this.imgStr = window.URL.createObjectURL(e.target.files[0])
                    // console.log(window.URL.createObjectURL(e.target.files[0])) // 获取当前文件的信息

                    // base64方法 2
                    var reader = new FileReader();
                    reader.readAsDataURL(file); // 读出 base64
                    reader.onloadend = function () {
                        // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
                        var dataURL = reader.result;
                        console.log(dataURL);
                        _this.gameIcon = dataURL
                        // 下面逻辑处理
                    }
                } else {
                    this.$message.error('图片大小不符，请重新上传大小5M以内的图片!');
                }
            }
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
        background-image: url('../assets/images/publishGame/publish-bg1.jpg');
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
                background-color: rgba(0, 0, 0, 0.5);
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
            .game-type,
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
                    background-color: rgb(234,64,72);
                    color: #e6e6e6;
                }
            }
        }
    }
</style>