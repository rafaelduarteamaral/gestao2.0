import { all, find, save, destroy } from '@/api/formasPagamentos'

export default {
  state: {
    data: [],
    pagination: {},
    currentFormaPagamento: {}
  },

  mutations: {
    SET_FORMAPAGAMENTO: (state, formasPagamentos) => {
      state.data = formasPagamentos.data
      state.pagination = formasPagamentos.pagination
    },

    ADD_FORMAPAGAMENTO: (state, formaPagamento) => {
      state.data.push(formaPagamento)
    },

    SET_CURRENT: (state, formaPagamento) => {
      state.currentFormaPagamento = formaPagamento
    },

    UPDATE_FORMAPAGAMENTO: (state, formaPagamento) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== formaPagamento.id)
      state.data.push(formaPagamento)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentFormaPagamento && state.currentFormaPagamento.id === formaPagamento.id) {
        state.currentFormaPagamento = formaPagamento
      }
    },

    REMOVE_FORMAPAGAMENTO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentFormaPagamento && state.currentFormaPagamento.id === id) {
        state.currentFormaPagamento = {}
      }
    }
  },

  actions: {
    fetchFormasPagamentos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_FORMAPAGAMENTO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findFormaPagamento({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_FORMAPAGAMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveFormaPagamento({ commit }, formaPagamento) {
      return new Promise((resolve, reject) => {
        save(formaPagamento)
          .then(({ data }) => {
            commit('UPDATE_FORMAPAGAMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyFormaPagamento({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_FORMAPAGAMENTO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
