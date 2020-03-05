import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user_url:localStorage.user_url?localStorage.user_url:''
  },
  mutations: {
    changeUrl(state,url){
      state.user_url = url
      console.log(url)
    }
  },
  actions: {
  },
  getters: {
  }
})
