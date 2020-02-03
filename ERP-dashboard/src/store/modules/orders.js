import {
  all,
  find,
  save,
  destroy,
  applyDiscount,
  removeDiscount,
  financeiro
} from '@/api/orders'

export default {
  state: {
    data: [],
    pagination: {},
    currentOrder: {}
  },
  mutations: {
    SET_ORDERS: (state, orders) => {
      state.data = orders.data
      state.pagination = orders.pagination
    },

    ADD_ORDER: (state, order) => {
      state.data.push(order)
    },

    SET_CURRENT: (state, order) => {
      state.currentOrder = order
    },

    UPDATE_ORDER: (state, order) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== order.id)
      state.data.push(order)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentOrder && state.currentOrder.id === order.id) {
        state.currentOrder = order
      }
    },

    REMOVE_ORDER: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentOrder && state.currentOrder.id === id) {
        state.currentOrder = {}
      }
    }
  },
  actions: {
    fetchOrders({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_ORDERS', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findOrder({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_ORDER', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findFinanceiro({ commit }, order) {
      return new Promise((resolve, reject) => {
        financeiro(order)
          .then(({ data }) => {
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveOrder({ commit }, order) {
      return new Promise((resolve, reject) => {
        save(order)
          .then(({ data }) => {
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyOrder({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_ORDER', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    applyDiscount({ commit }, { id, code }) {
      return new Promise((resolve, reject) => {
        applyDiscount(id, code)
          .then(({ data }) => {
            commit('SET_CURRENT', data.order)
            resolve(data.info)
          })
          .catch(e => reject(e))
      })
    },

    destroyDiscount({ commit }, { id, discount_id }) {
      return new Promise((resolve, reject) => {
        removeDiscount(id, discount_id)
          .then(() => {
            resolve(discount_id)
          })
          .catch(e => reject(e))
      })
    }
  }
}
