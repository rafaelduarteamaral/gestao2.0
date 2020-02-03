import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import 'nprogress/nprogress.css' // progress bar style
import 'bulma'
import 'babel-polyfill'

import App from './App'
import '@/utils/routing'
import router from './router'
import store from '@/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
