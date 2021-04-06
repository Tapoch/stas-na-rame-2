import Vue from 'vue'
import Vuex from 'vuex'
import shared from "@/store/modules/shared"
import user from "@/store/modules/user"
import game from "@/store/modules/game"
import skills from "@/store/modules/skills"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    shared,
    game,
    skills
  }
})

export default store
