import { all, find, save, destroy } from '@/api/historicos'

export default {
  state: {
    data: [],
    pagination: {},
    currentHistorico: {}
  },

  mutations: {
    SET_HISTORICO: (state, historicos) => {
      state.data = historicos.data
      state.pagination = historicos.pagination
    },

    ADD_HISTORICO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentHistorico = unidade
    },

    UPDATE_HISTORICO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentHistorico && state.currentHistorico.id === unidade.id) {
        state.currentHistorico = unidade
      }
    },

    REMOVE_HISTORICO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentHistorico && state.currentHistorico.id === id) {
        state.currentHistorico = {}
      }
    }
  },

  actions: {
    fetchHistoricos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_HISTORICO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findHistorico({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_HISTORICO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveHistorico({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_HISTORICO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyHistorico({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_HISTORICO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
