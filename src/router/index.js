import Vue from 'vue'
import VueRouter from 'vue-router'
import authGuard from "@/router/authGuard";



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/IndexPage'),
    beforeEnter: authGuard
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUpPage')
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignInPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
