import { all, find, findEnderecoUser, save, destroy } from '@/api/endereco'

export default {
  state: {
    data: [],
    pagination: {},
    currentEndereco: {}
  },
  mutations: {
    SET_ENDERECOS: (state, enderecos) => {
      state.data = enderecos.data
      state.pagination = enderecos.pagination
    },

    ADD_ENDRECO: (state, endereco) => {
      // remove o produto do estado atual e o adiciona novamente depois (atualizado)
      state.data = state.data.filter(item => item.id !== endereco.id)
      state.data.push(endereco)
    },

    SET_CURRENT: (state, endereco) => {
      state.currentEndereco = endereco
    },

    UPDATE_ENDRECO: (state, endereco) => {
      // remove o produto antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== endereco.id)
      state.data.push(endereco)

      /**
       * verifica se o produto atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentEndereco && state.currentEndereco.id === endereco.id) {
        state.currentEndereco = endereco
      }
    },

    REMOVE_ENDRECO: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentEndereco && state.currentEndereco.id === id) {
        state.currentEndereco = {}
      }
    }
  },
  actions: {
    fetchEnderecos({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_ENDERECOS', data)
            resolve()
          })
          .then(error => reject(error))
      })
    },

    findEndereco({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_ENDRECO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findEnderecoUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        findEnderecoUser(id)
          .then(({ data }) => {
            commit('ADD_ENDRECO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveEndereco({ commit }, endereco) {
      return new Promise((resolve, reject) => {
        save(endereco)
          .then(({ data }) => {
            commit('UPDATE_ENDRECO', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyEndereco({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_ENDRECO', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
