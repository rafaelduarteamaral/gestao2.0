import { all, find, save, destroy } from '@/api/bancos'

export default {
  state: {
    data: [],
    pagination: {},
    currentBanco: {}
  },

  mutations: {
    SET_FORMAPAGAMENTO: (state, bancos) => {
      state.data = bancos.data
      state.pagination = bancos.pagination
    },

    ADD_FORMAPAGAMENTO: (state, banco) => {
      state.data.push(banco)
    },

    SET_CURRENT: (state, banco) => {
      state.currentBanco = banco
    },

    UPDATE_FORMAPAGAMENTO: (state, banco) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== banco.id)
      state.data.push(banco)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentBanco && state.currentBanco.id === banco.id) {
        state.currentBanco = banco
      }
    },

    REMOVE_FORMAPAGAMENTO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentBanco && state.currentBanco.id === id) {
        state.currentBanco = {}
      }
    }
  },

  actions: {
    fetchBancos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_FORMAPAGAMENTO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findBanco({ commit }, id) {
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

    saveBanco({ commit }, banco) {
      return new Promise((resolve, reject) => {
        save(banco)
          .then(({ data }) => {
            commit('UPDATE_FORMAPAGAMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyBanco({ commit }, id) {
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
