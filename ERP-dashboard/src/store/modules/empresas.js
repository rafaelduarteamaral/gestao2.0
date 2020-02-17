import { all, find, save, destroy } from '@/api/empresas'

export default {
  state: {
    data: [],
    pagination: {},
    currentEmpresa: {}
  },

  mutations: {
    SET_EMPRESA: (state, empresas) => {
      state.data = empresas.data
      state.pagination = empresas.pagination
    },

    ADD_EMPRESA: (state, empresa) => {
      state.data.push(empresa)
    },

    SET_CURRENT: (state, empresa) => {
      state.currentEmpresa = empresa
    },

    UPDATE_EMPRESA: (state, empresa) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== empresa.id)
      state.data.push(empresa)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentEmpresa && state.currentEmpresa.id === empresa.id) {
        state.currentEmpresa = empresa
      }
    },

    REMOVE_EMPRESA: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentEmpresa && state.currentEmpresa.id === id) {
        state.currentEmpresa = {}
      }
    }
  },

  actions: {
    fetchEmpresas({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_EMPRESA', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findEmpresa({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_EMPRESA', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveEmpresa({ commit }, empresa) {
      return new Promise((resolve, reject) => {
        save(empresa)
          .then(({ data }) => {
            commit('UPDATE_EMPRESA', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyEmpresa({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_EMPRESA', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
