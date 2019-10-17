import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/index.scss'
import axios from 'axios'

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)


Vue.config.productionTip = false;
Vue.use(ElementUI);
window.axios=axios


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
