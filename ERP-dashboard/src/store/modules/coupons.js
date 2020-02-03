import { all, find, save, destroy } from '@/api/coupons'

export default {
  state: {
    data: [],
    pagination: {},
    currentCoupon: {}
  },

  mutations: {
    SET_COUPONS: (state, coupons) => {
      state.data = coupons.data
      state.pagination = coupons.pagination
    },

    ADD_COUPON: (state, coupon) => {
      state.data = state.data.filter(item => item.id !== coupon.id)
      state.data.push(coupon)
    },

    SET_CURRENT: (state, coupon) => {
      state.currentCoupon = coupon
    },

    UPDATE_COUPON: (state, coupon) => {
      // remove o produto antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== coupon.id)
      state.data.push(coupon)

      /**
       * verifica se o produto atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCoupon && state.currentCoupon.id === coupon.id) {
        state.currentCoupon = coupon
      }
    },

    REMOVE_COUPON: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCoupon && state.currentCoupon.id === id) {
        state.currentCoupon = {}
      }
    }
  },

  actions: {
    fetchCoupons({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_COUPONS', data)
            resolve()
          })
          .then(error => reject(error))
      })
    },

    findCoupon({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_COUPON', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCoupon({ commit }, product) {
      return new Promise((resolve, reject) => {
        save(product)
          .then(({ data }) => {
            commit('SET_CURRENT', data)
            commit('UPDATE_COUPON', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCoupon({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_COUPON', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
