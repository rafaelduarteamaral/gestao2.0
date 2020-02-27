import { all, find, save, destroy } from '@/api/seguimentoNegocios'

export default {
  state: {
    data: [],
    pagination: {},
    currentSeguimentoNegocio: {}
  },

  mutations: {
    SET_SEGUIMENTONEGOCIO: (state, seguimentoNegocios) => {
      state.data = seguimentoNegocios.data
      state.pagination = seguimentoNegocios.pagination
    },

    ADD_SEGUIMENTONEGOCIO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentSeguimentoNegocio = unidade
    },

    UPDATE_SEGUIMENTONEGOCIO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentSeguimentoNegocio && state.currentSeguimentoNegocio.id === unidade.id) {
        state.currentSeguimentoNegocio = unidade
      }
    },

    REMOVE_SEGUIMENTONEGOCIO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentSeguimentoNegocio && state.currentSeguimentoNegocio.id === id) {
        state.currentSeguimentoNegocio = {}
      }
    }
  },

  actions: {
    fetchSeguimentoNegocios({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_SEGUIMENTONEGOCIO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findSeguimentoNegocio({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_SEGUIMENTONEGOCIO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveSeguimentoNegocio({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_SEGUIMENTONEGOCIO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroySeguimentoNegocio({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_SEGUIMENTONEGOCIO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
