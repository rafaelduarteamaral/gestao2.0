import { all, find, save, destroy } from '@/api/products'

export default {
  state: {
    data: [],
    pagination: {},
    currentProduct: {}
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.data = products.data
      state.pagination = products.pagination
    },

    ADD_PRODUCT: (state, product) => {
      // remove o produto do estado atual e o adiciona novamente depois (atualizado)
      state.data = state.data.filter(item => item.id !== product.id)
      state.data.push(product)
    },

    SET_CURRENT: (state, product) => {
      state.currentProduct = product
    },

    UPDATE_PRODUCT: (state, product) => {
      // remove o produto antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== product.id)
      state.data.push(product)

      /**
       * verifica se o produto atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentProduct && state.currentProduct.id === product.id) {
        state.currentProduct = product
      }
    },

    REMOVE_PRODUCT: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentProduct && state.currentProduct.id === id) {
        state.currentProduct = {}
      }
    }
  },
  actions: {
    fetchProducts({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_PRODUCTS', data)
            resolve()
          })
          .then(error => reject(error))
      })
    },

    findProduct({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_PRODUCT', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveProduct({ commit }, product) {
      return new Promise((resolve, reject) => {
        save(product)
          .then(({ data }) => {
            commit('UPDATE_PRODUCT', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyProduct({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_PRODUCT', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
