import firebase from 'firebase'
import router from "@/router";

export default {
  state: {
    user: null
  },
  mutations: {
    USER_SET(state, payload) {
      state.user = payload
    }
  },
  actions: {
    async signUserUp({commit}, payload) {
      commit('SHARED_SET_LOADING', true)
      commit('SHARED_CLEAR_ERROR')
      try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        const user = userCredential.user
        await firebase.firestore().collection('users').doc(user.uid).set({
          name: payload.name
        })
        commit('SHARED_SET_LOADING', false)
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email
        }
        commit('USER_SET', newUser)
        await router.push('/')
      } catch (error) {
        commit('SHARED_SET_LOADING', false)
        commit('SHARED_SET_ERROR', error)
        console.log(error)
      }
    },
    async signUserIn({commit}, payload) {
      commit('SHARED_SET_LOADING', true)
      commit('SHARED_CLEAR_ERROR')
      try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        let user = userCredential.user
        const userData = await firebase.firestore().collection('users').doc(user.uid).get()
        if (userData.exists) {
          user = {...user, displayName: userData.data().name}
        }
        commit('SHARED_SET_LOADING', false)
        const newUser = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
        }
        commit('USER_SET', newUser)
        await router.push('/')
      } catch (error) {
        commit('SHARED_SET_LOADING', false)
        commit('SHARED_SET_ERROR', error)
        console.log(error)
      }

    },
    autoSignIn({commit}, payload) {
      commit('USER_SET', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
      })
    },
    resetPasswordWithEmail({commit}, payload) {
      const {email} = payload
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
    async logout({commit}) {
      await firebase.auth().signOut()
      commit('USER_SET', null)
      await router.push('/signin')
    }
  },
  getters: {
    user(state) {
      return state.user
    }
  }
}