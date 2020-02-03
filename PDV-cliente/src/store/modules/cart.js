import { checkout } from '@/api/user'
export default {
  state: {
    items: []
  },

  mutations: {
    ADD_TO_CART: (state, product) => {
      product.product_id = product.id
      product.quantity = 1
      state.items.push(product)
    },

    UPDATE_ITEM: (state, newItem) => {
      state.items = state.items.map(item => {
        if (item.product_id === newItem.id) {
          item.quantity = newItem.quantity
        }
        return item
      })
    },

    REMOVE_ITEM: (state, product_id) => {
      state.items = state.items.filter(item => item.product_id !== product_id)
    }
  },

  actions: {
    addToCart({ commit }, product) {
      commit('ADD_TO_CART', product)
    },

    updateItem({ commit }, product) {
      commit('UPDATE_ITEM', product)
    },

    removeFromCart({ commit }, product_id) {
      commit('REMOVE_ITEM', product_id)
    },

    checkout({ commit, state }) {
      return new Promise((resolve, reject) => {
        const items = state.items.map(item => {
          return {
            product_id: item.product_id,
            quantity: item.quantity
          }
        })
        checkout(items)
          .then(({ data }) => resolve(data))
          .catch(e => reject(e))
      })
    }
  }
}
