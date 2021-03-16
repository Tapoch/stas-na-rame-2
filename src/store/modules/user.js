import firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    USER_SET (state, payload) {
      state.user = payload
    }
  },
  actions: {
    signUserUp ({commit}, payload) {
      commit('SHARED_SET_LOADING', true)
      commit('SHARED_CLEAR_ERROR')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('SHARED_SET_LOADING', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            }
            commit('USER_SET', newUser)
          }
        )
        .catch(
          error => {
            commit('SHARED_SET_LOADING', false)
            commit('SHARED_SET_ERROR', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('SHARED_SET_LOADING', true)
      commit('SHARED_CLEAR_ERROR')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('SHARED_SET_LOADING', false)
            const newUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email,
            }
            commit('USER_SET', newUser)
          }
        )
        .catch(
          error => {
            commit('SHARED_SET_LOADING', false)
            commit('SHARED_SET_ERROR', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('USER_SET', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
      })
    },
    resetPasswordWithEmail ({ commit }, payload) {
      const { email } = payload
      commit('SHARED_SET_LOADING', true)
      firebase.auth().sendPasswordResetEmail(email)
        .then(
          () => {
            commit('SHARED_SET_LOADING', false)
            console.log('Email Sent')
          }
        )
        .catch(
          error => {
            commit('SHARED_SET_LOADING', false)
            commit('SHARED_SET_ERROR', error)
            console.log(error)
          }
        )
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('USER_SET', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}