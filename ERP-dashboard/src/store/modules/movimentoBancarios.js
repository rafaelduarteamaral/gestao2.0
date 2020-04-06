import { all, find, save, destroy } from '@/api/movimentoBancarios'

export default {
  state: {
    data: [],
    pagination: {},
    currentMovimentoBancario: {}
  },

  mutations: {
    SET_MOVIMENTOBANCARIO: (state, movimentoBancarios) => {
      state.data = movimentoBancarios.data
      state.pagination = movimentoBancarios.pagination
    },

    ADD_MOVIMENTOBANCARIO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentMovimentoBancario = unidade
    },

    UPDATE_MOVIMENTOBANCARIO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentMovimentoBancario && state.currentMovimentoBancario.id === unidade.id) {
        state.currentMovimentoBancario = unidade
      }
    },

    REMOVE_MOVIMENTOBANCARIO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentMovimentoBancario && state.currentMovimentoBancario.id === id) {
        state.currentMovimentoBancario = {}
      }
    }
  },

  actions: {
    fetchMovimentoBancarios({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_MOVIMENTOBANCARIO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findMovimentoBancario({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_MOVIMENTOBANCARIO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveMovimentoBancario({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_MOVIMENTOBANCARIO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyMovimentoBancario({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_MOVIMENTOBANCARIO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
