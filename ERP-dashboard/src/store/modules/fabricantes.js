import { all, find, save, destroy } from '@/api/fabricantes'

export default {
  state: {
    data: [],
    pagination: {},
    currentFabricante: {}
  },

  mutations: {
    SET_FABRICANTE: (state, fabricantes) => {
      state.data = fabricantes.data
      state.pagination = fabricantes.pagination
    },

    ADD_FABRICANTE: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentFabricante = unidade
    },

    UPDATE_FABRICANTE: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentFabricante && state.currentFabricante.id === unidade.id) {
        state.currentFabricante = unidade
      }
    },

    REMOVE_FABRICANTE: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentFabricante && state.currentFabricante.id === id) {
        state.currentFabricante = {}
      }
    }
  },

  actions: {
    fetchFabricantes({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_FABRICANTE', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findFabricante({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_FABRICANTE', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveFabricante({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_FABRICANTE', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyFabricante({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_FABRICANTE', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
