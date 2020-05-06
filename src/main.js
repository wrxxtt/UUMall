import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import Toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.use(Toast)
Vue.use(VueLazyload,{
  loading: import('./assets/img/common/load.jpg')
})
Vue.config.productionTip = false
Vue.prototype.$bus=new Vue()

FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
