import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
/**
 * Importação dos módulos
 */
import getters from './getters'
import user from './modules/user'
import products from './modules/products'
import system from './modules/system'
import cart from './modules/cart'

export default new Vuex.Store({
  modules: {
    system,
    user,
    products,
    cart
  },
  getters
})
