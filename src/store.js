import Vue from 'vue'
import Vuex from 'vuex'
//页面持久化，刷新页面数据不会丢失
import presistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  //配置插件 保持活性
  plugins: [presistedState({
    storage: window.sessionStorage
  })],
  state: {
    token:{},//这里用来存放登录成功的信息
    searchDisplay: false, //模糊查询框的显示隐藏
    newRouter:'',   //登录页跳转的路由
    rememberPwd: false, // 是否记住密码
    picture:''        //用户头像

    // network:true //判断是否有网
  },
  mutations: {
    //将用户信息清除
    removeToken(state, param) {
      state.token = param;
    },
    //改变模糊查询下拉框的显示隐藏
    changeSearch(state,params){
      state.searchDisplay=params
    },
    //存入用户信息
    getToken(state,params){
      state.token=params
    },
    //存入登录页跳转的不同的路由
    getRouter(state,params){
      state.newRouter=params
    },
    //首页获取用户头像存入头像
    getPic(state,params){
      state.picture=params
    }
   /*  changeNetwork(store, param) { 
      store.network = param;
    } */
  },
  actions: {

  }
})
