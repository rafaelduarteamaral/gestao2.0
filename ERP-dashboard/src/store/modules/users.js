import { all, find, save, destroy } from '@/api/users'

export default {
  state: {
    data: [],
    pagination: {},
    currentUser: {}
  },

  mutations: {
    SET_USERS: (state, users) => {
      state.data = users.data
      state.pagination = users.pagination
    },

    ADD_USER: (state, user) => {
      state.data.push(user)
    },

    SET_CURRENT: (state, user) => {
      state.currentUser = user
    },

    UPDATE_USER: (state, user) => {
      // remove o pedido antigo da lista e re-adiciona atualizado
      state.data = state.data.filter(item => item.id !== user.id)
      state.data.push(user)

      /**
       * verifica se o pedido atual (em edição ou visualização)
       * é igual ao que foi recebido do backend
       * e atualiza seus valores
       */

      if (state.currentUser && state.currentUser.id === user.id) {
        state.currentUser = user
      }
    },

    REMOVE_USER: (state, id) => {
      state.data = state.data.filter(item => item.id !== id)

      if (state.currentUser && state.currentUser.id === id) {
        state.currentUser = {}
      }
    }
  },

  actions: {
    fetchUsers({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_USERS', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    findUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        find(id)
          .then(({ data }) => {
            commit('ADD_USER', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    saveUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        save(user)
          .then(({ data }) => {
            commit('UPDATE_USER', data)
            commit('SET_CURRENT', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_USER', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}
