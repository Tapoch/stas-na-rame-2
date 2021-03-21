import Vue from 'vue'
import Vuex from 'vuex'
import shared from "@/store/modules/shared";
import user from "@/store/modules/user";
import game from "@/store/modules/game";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    shared,
    game
  }
})

export default store
