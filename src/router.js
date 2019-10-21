import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        // 登录
        {
            path: '/Login',
            name: 'Login',
            component: () => import('./views/Login.vue'),
        },
        // 注册
        {
            path: '/Register',
            name: 'Register',
            component: () => import('./views/Register.vue')
        },
         // 注册完善页
         {
            path: '/RegisterPerfect',
            name: 'RegisterPerfect',
            component: () => import('./views/RegisterPerfect.vue')
        },
        // 找回密码
        {
            path: '/Login/SafetyCenter',
            name: 'SafetyCenter',
            component: () => import('./views/SafetyCenter.vue')
        },
        // 游戏库
        {
            path: '/GameCenter',
            name: 'GameCenter',
            component: () => import('./views/GameCenter.vue')
        },
        // 排行榜
        {
            path: '/RankingList',
            name: 'RankingList',
            component: () => import('./views/RankingList.vue')
        },
        // 提交建议
        {
            path: '/Suggest',
            name: 'Suggest',
            component: () => import('./views/Suggest.vue')
        },
        // 发布游戏提示页
        {
            path: '/PublishGameTips',
            name: 'PublishGameTips',
            component: () => import('./views/PublishGameTips.vue')
        },
        // 发布游戏页
        {
            path: '/PublishGame',
            name: 'PublishGame',
            component: () => import('./views/PublishGame.vue')
        },
        // 游戏发布代码规范页
        {
            path: '/PublishRules',
            name: 'PublishRules',
            component: () => import('./views/PublishRules.vue')
        },
        // 个人信息页
        {
            path: '/Personal',
            name: 'Personal',
            component: () => import('./views/Personal.vue')
        },
        //个人资料修改页
        {
            path: '/Personal/UpdateInfo',
            name: 'UpdateInfo',
            component: () => import('./views/Personal-UpdateInfo.vue')
        },
        // 绑定邮箱修改页
        {
            path: '/Personal/ChangeMail',
            name: 'ChangeMail',
            component: () => import('./views/Personal-ChangeMail.vue')
        },
        // 绑定手机修改页
        {
            path: '/Personal/ChangeTel',
            name: 'ChangeTel',
            component: () => import('./views/Personal-ChangeTel.vue')
        },
        // 游戏信息修改页
        {
            path: '/Personal/UpdateGameInfo',
            name: 'UpdateGameInfo',
            component: () => import('./views/Personal-UpdateGameInfo.vue')
        },
         // 开发者测试提示页
         {
            path: '/Developer',
            name: 'Developer',
            component: () => import('./views/Developer.vue')
        },
        // 开发者测试页
        {
            path: '/DeveloperTest',
            name: 'DeveloperTest',
            component: () => import('./views/DeveloperTest.vue')
        },
        // 游戏详情页
        {
            path: '/GameInfo',
            name: 'GameInfo',
            component: () => import('./views/GameInfo.vue')
        },
        //游戏进行页
        {
            path: '/GamePlaying',
            name: 'GamePlaying',
            component: () => import('./views/GamePlaying.vue')
        }
    ]
})
