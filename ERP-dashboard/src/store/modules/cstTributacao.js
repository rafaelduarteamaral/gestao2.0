import { all, find, save, destroy } from '@/api/cstTributacaos'

export default {
  state: {
    data: [],
    pagination: {},
    currentCstTributacao: {}
  },

  mutations: {
    SET_CSTTRIBUTACAO: (state, cstTributacaos) => {
      state.data = cstTributacaos.data
      state.pagination = cstTributacaos.pagination
    },

    ADD_CSTTRIBUTACAO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentCstTributacao = unidade
    },

    UPDATE_CSTTRIBUTACAO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCstTributacao && state.currentCstTributacao.id === unidade.id) {
        state.currentCstTributacao = unidade
      }
    },

    REMOVE_CSTTRIBUTACAO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCstTributacao && state.currentCstTributacao.id === id) {
        state.currentCstTributacao = {}
      }
    }
  },

  actions: {
    fetchCstTributacaos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_CSTTRIBUTACAO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findCstTributacao({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_CSTTRIBUTACAO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCstTributacao({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_CSTTRIBUTACAO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCstTributacao({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_CSTTRIBUTACAO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
