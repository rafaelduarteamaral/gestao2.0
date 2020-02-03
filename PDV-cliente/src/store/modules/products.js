import { fetch } from '@/api/products'
export default {
  state: {
    data: [],
    pagination: {}
  },

  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.data = products.data
      state.pagination = products.pagination
    },

    addToCart: (state, id) => {
      state.data.forEach(el => {
        if (id === el.id) {
          el.isAddedToCart = true
        }
      })
    },

    setAddedBtn: (state, data) => {
      state.data.forEach(el => {
        if (data.id === el.id) {
          el.isAddedBtn = data.status
        }
      })
    }
  },

  actions: {
    fetchProducts({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        fetch(queryParams)
          .then(({ data }) => {
            commit('SET_PRODUCTS', data)
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  }
}
