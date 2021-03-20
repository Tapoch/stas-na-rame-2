import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from "firebase";
import './assets/tailwind.css'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID
}

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp(firebaseConfig)
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const db = firebase.firestore()
        const userData = await db.collection('users').doc(user.uid).get()
        if (userData.exists) {
          user = {...user, displayName: userData.data().name}
        }
        await this.$store.dispatch('autoSignIn', user)
      }
      await this.$store.dispatch('setIsAppReady', true)
    })
  }
}).$mount('#app')

