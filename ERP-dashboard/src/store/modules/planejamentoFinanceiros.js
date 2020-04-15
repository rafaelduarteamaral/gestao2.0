import { all, find, save, destroy } from '@/api/planejamentoFinanceiros'

export default {
  state: {
    data: [],
    pagination: {},
    currentPlanejamentoFinanceiro: {}
  },

  mutations: {
    SET_PLANEJAMENTOFINANCEIRO: (state, planejamentoFinanceiros) => {
      state.data = planejamentoFinanceiros.data
      state.pagination = planejamentoFinanceiros.pagination
    },

    ADD_PLANEJAMENTOFINANCEIRO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentPlanejamentoFinanceiro = unidade
    },

    UPDATE_PLANEJAMENTOFINANCEIRO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentPlanejamentoFinanceiro && state.currentPlanejamentoFinanceiro.id === unidade.id) {
        state.currentPlanejamentoFinanceiro = unidade
      }
    },

    REMOVE_PLANEJAMENTOFINANCEIRO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentPlanejamentoFinanceiro && state.currentPlanejamentoFinanceiro.id === id) {
        state.currentPlanejamentoFinanceiro = {}
      }
    }
  },

  actions: {
    fetchPlanejamentoFinanceiros({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_PLANEJAMENTOFINANCEIRO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findPlanejamentoFinanceiro({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_PLANEJAMENTOFINANCEIRO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    savePlanejamentoFinanceiro({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_PLANEJAMENTOFINANCEIRO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyPlanejamentoFinanceiro({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_PLANEJAMENTOFINANCEIRO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
