import Vue from 'vue'
import Vuex from 'vuex'
import shared from "@/store/modules/shared";
import user from "@/store/modules/user";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    shared
  }
})

export default store
