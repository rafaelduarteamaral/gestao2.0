import '@babel/polyfill' // suporte ao cliente de websocket do AdonisJS
import Vue from 'vue'
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import '@/styles/index.scss' // global css
import ws from '@adonisjs/websocket-client' // Cliente de websockets

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './errorLog' // error log
import './permission' // permission control

import * as filters from './filters' // global filters

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// registra o plugin de websockets
const wsVuePlugin = function(Vue, url, options) {
  Vue.prototype.$ws = ws(url, options)
}
Vue.use(wsVuePlugin, process.env.WS_ENDPOINT, { debug: false })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
