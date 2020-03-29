import { all, find, save, destroy } from '@/api/cstOrigems'

export default {
  state: {
    data: [],
    pagination: {},
    currentCstOrigem: {}
  },

  mutations: {
    SET_CSTORIGEM: (state, cstOrigems) => {
      state.data = cstOrigems.data
      state.pagination = cstOrigems.pagination
    },

    ADD_CSTORIGEM: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentCstOrigem = unidade
    },

    UPDATE_CSTORIGEM: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCstOrigem && state.currentCstOrigem.id === unidade.id) {
        state.currentCstOrigem = unidade
      }
    },

    REMOVE_CSTORIGEM: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCstOrigem && state.currentCstOrigem.id === id) {
        state.currentCstOrigem = {}
      }
    }
  },

  actions: {
    fetchCstOrigems({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_CSTORIGEM', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findCstOrigem({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_CSTORIGEM', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCstOrigem({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_CSTORIGEM', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCstOrigem({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_CSTORIGEM', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
