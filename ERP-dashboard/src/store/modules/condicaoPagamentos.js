import { all, find, save, destroy } from '@/api/condicaoPagamentos'

export default {
  state: {
    data: [],
    pagination: {},
    currentCondicaoPagamento: {}
  },

  mutations: {
    SET_CONDICAOPAGAMENTO: (state, condicaoPagamentos) => {
      state.data = condicaoPagamentos.data
      state.pagination = condicaoPagamentos.pagination
    },

    ADD_CONDICAOPAGAMENTO: (state, condicaoPagamento) => {
      state.data.push(condicaoPagamento)
    },

    SET_CURRENT: (state, condicaoPagamento) => {
      state.currentCondicaoPagamento = condicaoPagamento
    },

    UPDATE_CONDICAOPAGAMENTO: (state, condicaoPagamento) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== condicaoPagamento.id)
      state.data.push(condicaoPagamento)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCondicaoPagamento && state.currentCondicaoPagamento.id === condicaoPagamento.id) {
        state.currentCondicaoPagamento = condicaoPagamento
      }
    },

    REMOVE_CONDICAOPAGAMENTO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCondicaoPagamento && state.currentCondicaoPagamento.id === id) {
        state.currentCondicaoPagamento = {}
      }
    }
  },

  actions: {
    fetchCondicaoPagamentos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_CONDICAOPAGAMENTO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findCondicaoPagamento({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_CONDICAOPAGAMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCondicaoPagamento({ commit }, condicaoPagamento) {
      return new Promise((resolve, reject) => {
        save(condicaoPagamento)
          .then(({ data }) => {
            commit('UPDATE_CONDICAOPAGAMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCondicaoPagamento({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_CONDICAOPAGAMENTO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
