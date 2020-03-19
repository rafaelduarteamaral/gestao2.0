import { all, find, save, destroy } from '@/api/cfops'

export default {
  state: {
    data: [],
    pagination: {},
    currentCfop: {}
  },

  mutations: {
    SET_CFOP: (state, cfops) => {
      state.data = cfops.data
      state.pagination = cfops.pagination
    },

    ADD_CFOP: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentCfop = unidade
    },

    UPDATE_CFOP: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentCfop && state.currentCfop.id === unidade.id) {
        state.currentCfop = unidade
      }
    },

    REMOVE_CFOP: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentCfop && state.currentCfop.id === id) {
        state.currentCfop = {}
      }
    }
  },

  actions: {
    fetchCfops({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_CFOP', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findCfop({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_CFOP', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveCfop({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_CFOP', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyCfop({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_CFOP', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
