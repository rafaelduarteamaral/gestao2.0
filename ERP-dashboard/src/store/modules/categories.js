import { all, find, save, destroy } from '@/api/categories'

export default {
  state: {
    data: [],
    pagination: {},
    currentCategory: {}
  },

  mutations: {
    SET_CATEGORIES: (state, categories) => {
      state.data = categories.data
      state.pagination = categories.pagination
    },

    ADD_CATEGORY: (state, category) => {
      state.data = state.data.filter(item => item.id !== category.id)
      state.data.push(category)
    },

    SET_CURRENT: (state, category) => {
      state.currentCategory = category
    },

    UPDATE_CATEGORY: (state, category) => {
      // remove o produto antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== category.id)
      state.data.push(category)

      /**
       * verifica se o produto atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCategory && state.currentCategory.id === category.id) {
        state.currentCategory = category
      }
    },

    REMOVE_CATEGORY: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCategory && state.currentCategory.id === id) {
        state.currentCategory = {}
      }
    }
  },

  actions: {
    fetchCategories({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_CATEGORIES', data)
            resolve()
          })
          .then(error => reject(error))
      })
    },

    findCategory({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_CATEGORY', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCategory({ commit }, product) {
      return new Promise((resolve, reject) => {
        save(product)
          .then(({ data }) => {
            commit('UPDATE_CATEGORY', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCategory({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_CATEGORY', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
