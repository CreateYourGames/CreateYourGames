<template>
    <div class="upload-image">
        <input class="upload-btn" type="file" name="image" accept="image/*"
               @change="gameIconChange($event)">
        <img class="game-img" :src="gameIcon" alt="" :width="width" :height="height">
    </div>
</template>

<script>
    export default {
        name: "upload-image",
        data() {
            return {
                width: '100px',
                height: '100px',
                gameIcon: require('../assets/images/publishGame/default-upload.png'),
            }
        },
        created(){
            this.width = this.$attrs.width;
            this.height = this.$attrs.height;
        },
        methods: {
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
    }
</script>

<style lang="scss" scoped>
    .upload-image {
        position: relative;
        .upload-btn {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            opacity: 0;
        }
        .game-img {
            object-fit: cover;
        }
    }
</style>