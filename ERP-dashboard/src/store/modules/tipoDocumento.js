import { all, find, save, destroy } from '@/api/tipoDocumento'

export default {
  state: {
    data: [],
    pagination: {},
    currenttipoDocumento: {}
  },

  mutations: {
    SET_TIPODOCUMENTO: (state, tipoDocumento) => {
      state.data = tipoDocumento.data
      state.pagination = tipoDocumento.pagination
    },

    ADD_TIPODOCUMENTO: (state, tipoDocumento) => {
      state.data.push(tipoDocumento)
    },

    SET_CURRENT: (state, tipoDocumento) => {
      state.currenttipoDocumento = tipoDocumento
    },

    UPDATE_TIPODOCUMENTO: (state, tipoDocumento) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== tipoDocumento.id)
      state.data.push(tipoDocumento)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currenttipoDocumento && state.currenttipoDocumento.id === tipoDocumento.id) {
        state.currenttipoDocumento = tipoDocumento
      }
    },

    REMOVE_TIPODOCUMENTO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currenttipoDocumento && state.currenttipoDocumento.id === id) {
        state.currenttipoDocumento = {}
      }
    }
  },

  actions: {
    fetchtipoDocumento({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_TIPODOCUMENTO', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findtipoDocumento({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_TIPODOCUMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    savetipoDocumento({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_TIPODOCUMENTO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroytipoDocumento({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_TIPODOCUMENTO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
