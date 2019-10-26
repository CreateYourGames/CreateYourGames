<template>
    <div class="topNav">
        <div class="logo" @click="backHome"></div>
        <div class="nav-btn">
            <div class="to-home" @click="backHome">主页</div>
            <div class="to-game-center" @click="toGameCenter">游戏库</div>
            <div class="to-ranking-list" @click="toRankingList">排行榜</div>
            <div class="to-suggest" @click="toSuggest">提交建议</div>
            <!--<div class="to-publish-game" @click="toPublishGame">发布游戏</div>-->
            <div class="user-icon" @click="toPersonal">
                <img :src="picture" alt="">
                个人中心
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "top-nav",
        data(){
            return{
                picture:require('@/assets/images/home/user.png')
            }
        },
        created() {
            this.picture=this.$store.state.picture
        },
        methods: {
            backHome() {
                this.$router.push('/')
            },
            // 游戏库跳转
            toGameCenter() {
                this.$router.push('/GameCenter')
            },
            // 排行榜跳转
            toRankingList() {
                this.$router.push('/RankingList')
            },
            // 提交建议跳转
            toSuggest() {
                this.$router.push('/Suggest')
            },
            // // 发布游戏跳转
            // toPublishGame() {
            //     this.$router.push('/PublishGameTips')
            // },
            // 个人信息跳转
            toPersonal() {
                this.$router.push('/Personal')
            },
        },
    }
</script>

<style scoped lang="scss">
    .topNav {
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        height: 60px;
        background-color: rgba(27, 27, 27, 0.7);
        z-index: 9999;
        .logo {
            position: absolute;
            left: 50px;
            width: 240px;
            height: 30px;
            background-image: url("../assets/images/home/logo.png");
            background-size: 100% 100%;
            opacity: 0.8;
            cursor: pointer;
        }
        .nav-btn {
            position: absolute;
            right: 0;
            display: flex;
            align-items: center;
            color: #ffffff;
            div{
                height: 60px;
                line-height: 60px;
                box-sizing: border-box;
                padding: 0 20px;
                cursor: pointer;
                &:not(.user-icon){
                    &:hover{
                        background-color: rgba(0, 0, 0, 0.95);
                    }
                }
            }
            .user-icon{
                display: flex;
                align-items: center;
                margin: 0 150px 0 50px;
                img{
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    margin-right: 10px;
                }
            }
        }
    }

</style>