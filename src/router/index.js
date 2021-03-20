import Vue from 'vue'
import VueRouter from 'vue-router'
import {notAuthorized, authorized} from "@/router/authGuard";
import store from "@/store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/IndexPage'),
    beforeEnter: notAuthorized
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUpPage'),
    beforeEnter: authorized
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignInPage'),
    beforeEnter: authorized
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (store.getters.isAppReady) {
    next()
  } else {
    await new Promise((resolve, reject) => {
      addEventListener('app-is-ready', _ => {
        resolve(next())
      })
    })
  }
})

export default router
