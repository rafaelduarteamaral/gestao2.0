import {
  loginByUsername,
  logout,
  getUserInfo,
  ForgotPassword,
  findResetToken,
  resetPassword
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  getRefreshToken,
  setRefreshToken,
  removeRefreshToken
} from '@/utils/auth'

const user = {
  state: {
    loggedUser: '',
    token: getToken(),
    refresh_token: getRefreshToken(),
    name: '',
    avatar: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

    SET_REFRESH_TOKEN: (state, refresh_token) => {
      state.refresh_token = refresh_token
    },

    SET_SETTING: (state, setting) => {
      state.setting = setting
    },

    SET_NAME: (state, name) => {
      state.name = name
    },

    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
    },

    SET_LOGGED_USER: (state, user) => {
      state.loggedUser = user
    }
  },

  actions: {
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(({ data }) => {
            const token = `${data.data.type} ${data.data.token}`
            const refreshToken = data.data.refreshToken
            commit('SET_TOKEN', token)
            commit('SET_REFRESH_TOKEN', refreshToken)
            setToken(token)
            setRefreshToken(refreshToken)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              reject('Erro ao fazer Login. Tente novamente!')
            }
            const data = response.data

            if (data.roles && data.roles.length > 0) {
              commit('SET_ROLES', data.roles)
            } else {
              reject('Usuário: As Roles não podem ser um Array vazio!')
            }
            commit('SET_AVATAR', data.image ? data.image.url : '')
            commit('SET_LOGGED_USER', data)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_REFRESH_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            removeRefreshToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        removeToken()
        removeRefreshToken()
        resolve()
      })
    },

    ForgotPassword({ commit }, { email }) {
      return new Promise((resolve, reject) => {
        ForgotPassword(email)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },

    findResetToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        findResetToken(token)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    },

    ResetPassword({ commit }, userData) {
      return new Promise((resolve, reject) => {
        resetPassword(userData)
          .then(({ data }) => {
            resolve(data)
          })
          .catch(e => reject(e))
      })
    }
  }
}

export default user
