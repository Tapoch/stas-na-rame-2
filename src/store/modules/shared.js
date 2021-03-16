export default {
  state: {
    loading: false,
    error: null
  },
  mutations: {
    SHARED_SET_LOADING (state, payload) {
      state.loading = payload
    },
    SHARED_SET_ERROR (state, payload) {
      state.error = payload
    },
    SHARED_CLEAR_ERROR (state) {
      state.error = null
    }
  },
  actions: {
    clearError ({commit}) {
      commit('SHARED_CLEAR_ERROR')
    },
    setError ({commit}, payload) {
      commit('SHARED_SET_ERROR', payload)
    }
  },
  getters: {
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
}