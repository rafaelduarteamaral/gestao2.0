export default {
  state: {
    openLoginModal: false,
    openSignupModal: false,
    openCheckoutModal: false,
    searchTerm: ''
  },

  mutations: {
    showLoginModal: (state, show) => {
      state.openLoginModal = show
    },
    showSignupModal: (state, show) => {
      state.openSignupModal = show
    },
    showCheckoutModal: (state, show) => {
      state.openCheckoutModal = show
    },

    updateSearchTerm: (state, term) => {
      state.searchTerm = term
    }
  },

  actions: {
    localSearch({ commit }, term) {
      commit('updateSearchTerm', term)
    }
  }
}
