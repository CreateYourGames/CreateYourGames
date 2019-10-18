import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:'true',//这里用来存放登录成功的信息
    // network:true //判断是否有网
  },
  mutations: {
    removeToken(store, param) {
      store.token = param;
    },
   /*  changeNetwork(store, param) { 
      store.network = param;
    } */
  },
  actions: {

  }
})
