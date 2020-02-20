import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import products from './modules/products'
import orders from './modules/orders'
import empresas from './modules/empresas'
import formasPagamentos from './modules/formasPagamentos'
import coupons from './modules/coupons'
import categories from './modules/categories'
import images from './modules/images'
import users from './modules/users'
import dashboard from './modules/dashboard'
import endereco from './modules/endereco'
import bancos from './modules/bancos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    user,
    products,
    orders,
    coupons,
    categories,
    images,
    users,
    dashboard,
    endereco,
    empresas,
    formasPagamentos,
    bancos
  },
  getters
})

export default store
