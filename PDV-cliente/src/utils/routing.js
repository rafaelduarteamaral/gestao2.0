import router from '@/router'
import store from '@/store'
import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth' // getToken from cookie
import { isEmpty } from 'lodash'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken() && isEmpty(store.getters.user)) {
    store
      .dispatch('getUser')
      .then(() => {
        next({ ...to, replace: true })
        NProgress.done()
      })
      .catch(() => {
        next({ path: '/' })
        NProgress.done()
      })
  } else {
    next()
    NProgress.done()
  }
})
