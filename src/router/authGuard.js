import store from '@/store'

const authGuard = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signin')
  }
}

export default authGuard