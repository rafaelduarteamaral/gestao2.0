import { isEmpty } from 'lodash'
export default {
  user: state => state.user.user,
  users: state => state.user,
  products: state => state.products,
  searchTerm: state => state.system.searchTerm,
  productsAdded: state => {
    return state.cart.items
  },
  productsAddedToFavourite: state => {
    return state.products.data
      ? state.products.data.filter(el => {
          return el.isFavourite
        })
      : []
  },
  getProductById: state => id => {
    return state.products.data.find(product => product.id === id)
  },
  isUserLoggedIn: state => {
    return !isEmpty(state.user.token)
  },
  isUserSignedUp: state => {
    return state.user.isSignedUp
  },
  getUserName: state => {
    return state.user.name
  },
  isLoginModalOpen: state => {
    return state.system.openLoginModal
  },
  isSignupModalOpen: state => {
    return state.system.openSignupModal
  },
  isCheckoutModalOpen: state => {
    return state.system.openCheckoutModal
  },
  quantity: state => {
    return state.products.quantity
  }
}
