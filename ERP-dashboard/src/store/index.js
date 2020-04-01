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
import unidades from './modules/unidades'
import seguimentoNegocios from './modules/seguimentoNegocios'
import fabricantes from './modules/fabricantes'
import tipoDocumentos from './modules/tipoDocumento'
import cfops from './modules/cfops'
import ncms from './modules/ncms'
import cstOrigems from './modules/cstOrigem'
import cstTributacaos from './modules/cstTributacao'
import historicos from './modules/historico'
import aliquotas from './modules/aliquota'
import tipoOperacaos from './modules/tipoOperacao'
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
    bancos,
    unidades,
    seguimentoNegocios,
    fabricantes,
    tipoDocumentos,
    cfops,
    ncms,
    cstOrigems,
    cstTributacaos,
    historicos,
    aliquotas,
    tipoOperacaos
  },
  getters
})

export default store
