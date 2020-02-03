import { load } from '@/api/dashboard'
export default {
  state: {
    users: 0,
    orders: 0,
    products: 0,
    revenues: 0
  },

  mutations: {
    SET_USERS_COUNT: (state, users) => {
      state.users = users
    },
    SET_ORDERS_COUNT: (state, orders) => {
      state.orders = orders
    },
    SET_PRODUCTS_COUNT: (state, products) => {
      state.products = products
    },
    SET_REVENUES_COUNT: (state, revenues) => {
      state.revenues = revenues
    }
  },

  actions: {
    getDashboard({ commit }, query) {
      return new Promise((resolve, reject) => {
        load(query)
          .then(({ data }) => {
            commit('SET_USERS_COUNT', data.users)
            commit('SET_ORDERS_COUNT', data.orders)
            commit('SET_PRODUCTS_COUNT', data.products)
            commit('SET_REVENUES_COUNT', data.revenues)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
