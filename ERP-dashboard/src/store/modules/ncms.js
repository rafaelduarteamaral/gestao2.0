import { all, find, save, destroy } from '@/api/ncms'

export default {
  state: {
    data: [],
    pagination: {},
    currentNcm: {}
  },

  mutations: {
    SET_NCM: (state, ncms) => {
      state.data = ncms.data
      state.pagination = ncms.pagination
    },

    ADD_NCM: (state, unidade) => {
      state.data.push(unidade)
    },

    SET_CURRENT: (state, unidade) => {
      state.currentNcm = unidade
    },

    UPDATE_NCM: (state, unidade) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== unidade.id)
      state.data.push(unidade)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentNcm && state.currentNcm.id === unidade.id) {
        state.currentNcm = unidade
      }
    },

    REMOVE_NCM: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentNcm && state.currentNcm.id === id) {
        state.currentNcm = {}
      }
    }
  },

  actions: {
    fetchNcms({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_NCM', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findNcm({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_NCM', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveNcm({ commit }, unidade) {
      return new Promise((resolve, reject) => {
        save(unidade)
          .then(({ data }) => {
            commit('UPDATE_NCM', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyNcm({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_NCM', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
