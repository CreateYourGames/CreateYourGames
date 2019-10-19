import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'true',//这里用来存放登录成功的信息
    searchDisplay: false, //模糊查询框的显示隐藏

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
    }
   /*  changeNetwork(store, param) { 
      store.network = param;
    } */
  },
  actions: {

  }
})
