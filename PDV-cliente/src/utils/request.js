import axios from 'axios'
import NProgress from 'nprogress' // progress bar
import store from '@/store'
import { getToken, getRefreshToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 1000 * 60 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    NProgress.start()
    if (store.getters.isUserLoggedIn) {
      config.headers['Authorization'] = getToken()
      config.headers['refresh_token'] = getRefreshToken()
    }
    return config
  },
  error => {
    NProgress.done()
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },

  error => {
    NProgress.done()
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
