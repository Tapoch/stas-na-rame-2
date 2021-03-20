import store from '@/store'

export const notAuthorized = (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/signup')
  }
}

export const authorized = (to, from, next) => {
  if(store.getters.user) {
    next('/')
  } else {
    next()
  }
}