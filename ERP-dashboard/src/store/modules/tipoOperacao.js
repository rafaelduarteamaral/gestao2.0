import { all, find, save, destroy } from '@/api/tipoOperacaos'

export default {
  state: {
    data: [],
    pagination: {},
    currentTipoOperacao: {}
  },

  mutations: {
    SET_TIPOOPERACAO: (state, tipoOperacaos) => {
      state.data = tipoOperacaos.data
      state.pagination = tipoOperacaos.pagination
    },

    ADD_TIPOOPERACAO: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentTipoOperacao = unidade
    },

    UPDATE_TIPOOPERACAO: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentTipoOperacao && state.currentTipoOperacao.id === unidade.id) {
        state.currentTipoOperacao = unidade
      }
    },

    REMOVE_TIPOOPERACAO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentTipoOperacao && state.currentTipoOperacao.id === id) {
        state.currentTipoOperacao = {}
      }
    }
  },

  actions: {
    fetchTipoOperacaos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_TIPOOPERACAO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findTipoOperacao({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_TIPOOPERACAO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveTipoOperacao({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_TIPOOPERACAO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyTipoOperacao({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_TIPOOPERACAO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
