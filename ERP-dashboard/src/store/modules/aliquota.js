import { all, find, save, destroy } from '@/api/aliquotas'

export default {
  state: {
    data: [],
    pagination: {},
    currentAliquota: {}
  },

  mutations: {
    SET_ALIQUOTA: (state, aliquotas) => {
      state.data = aliquotas.data
      state.pagination = aliquotas.pagination
    },

    ADD_ALIQUOTA: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentAliquota = unidade
    },

    UPDATE_ALIQUOTA: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentAliquota && state.currentAliquota.id === unidade.id) {
        state.currentAliquota = unidade
      }
    },

    REMOVE_ALIQUOTA: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentAliquota && state.currentAliquota.id === id) {
        state.currentAliquota = {}
      }
    }
  },

  actions: {
    fetchAliquotas({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_ALIQUOTA', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findAliquota({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_ALIQUOTA', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveAliquota({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_ALIQUOTA', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyAliquota({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_ALIQUOTA', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
