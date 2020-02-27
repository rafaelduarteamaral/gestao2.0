import { all, find, save, destroy } from '@/api/unidades'

export default {
  state: {
    data: [],
    pagination: {},
    currentUnidade: {}
  },

  mutations: {
    SET_UNIDADE: (state, unidades) => {
      state.data = unidades.data
      state.pagination = unidades.pagination
    },

    ADD_UNIDADE: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentUnidade = unidade
    },

    UPDATE_UNIDADE: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentUnidade && state.currentUnidade.id === unidade.id) {
        state.currentUnidade = unidade
      }
    },

    REMOVE_UNIDADE: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentUnidade && state.currentUnidade.id === id) {
        state.currentUnidade = {}
      }
    }
  },

  actions: {
    fetchUnidades({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_UNIDADE', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findUnidade({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_UNIDADE', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveUnidade({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_UNIDADE', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyUnidade({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_UNIDADE', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
