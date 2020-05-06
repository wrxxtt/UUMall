import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";

//1、安装插件
Vue.use(Vuex)

//2、创建store对象
const store= new Vuex.Store({
  state:{
    cartList: []
  },
  getters,
  mutations: {
    addCount(state,payload){
      payload.count++
    },
    addToCart(state,payload) {
      state.cartList.push(payload)
    },
    checkedCart(state,payload) {
      payload.checked= !payload.checked;
    }

  },
  actions: {
    addCart(context,payload){
     return new Promise( (resolve, reject) => {
        let oldProduct = context.state.cartList.find(item => item.iid === payload.iid )
        console.log(oldProduct)
        if(oldProduct){
          context.commit('addCount',oldProduct)
          resolve('商品数量+1')
        }else {
          payload.count = 1
          payload.checked = true
          context.commit('addToCart',payload)
          resolve('加入购物车成功')
        }
      })
    },
    checkedChange(context,payload){
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid )
      context.commit('checkedCart',oldProduct)
    }
  }

})


//3挂载到Vue实例里面
export default store;
