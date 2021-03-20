export default {
  state: {
    loading: false,
    error: null,
    isAppReady: false
  },
  mutations: {
    SHARED_SET_LOADING(state, payload) {
      state.loading = payload
    },
    SHARED_SET_ERROR(state, payload) {
      state.error = payload
    },
    SHARED_CLEAR_ERROR(state) {
      state.error = null
    },
    SHARED_SET_IS_APP_READY(state, payload) {
      state.isAppReady = payload
    }
  },
  actions: {
    clearError({commit}) {
      commit('SHARED_CLEAR_ERROR')
    },
    setError({commit}, payload) {
      commit('SHARED_SET_ERROR', payload)
    },
    setIsAppReady({commit}, payload) {
      commit('SHARED_SET_IS_APP_READY', payload)
      const event = new CustomEvent('app-is-ready')
      dispatchEvent(event)
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    error(state) {
      return state.error
    },
    isAppReady(state) {
      return state.isAppReady
    }
  }
}