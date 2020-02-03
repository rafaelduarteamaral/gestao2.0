import { all, upload, update, destroy } from '@/api/images'

const gallery = {
  state: {
    data: [],
    pagination: {}
  },
  mutations: {
    SET_IMAGES: (state, images) => {
      state.data = images.data
      state.pagination = images.pagination
    },
    INSERT_IMAGES: (state, images) => {
      state.data.unshift(...images)
    },

    UPDATE_IMAGE: (state, image) => {
      state.data = state.data.filter(item => item.id !== image.id)
      state.data.push(image)
    },

    REMOVE_IMAGE: (state, image_id) => {
      state.data = state.data.filter(item => item.id !== image_id)
    }
  },
  actions: {
    getImages({ commit }, query) {
      return new Promise((resolve, reject) => {
        all(query)
          .then(({ data }) => {
            commit('SET_IMAGES', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    uploadImages({ commit }, images) {
      return new Promise((resolve, reject) => {
        upload(images)
          .then(({ data }) => {
            commit('INSERT_IMAGES', data.successes)
            resolve([data])
          })
          .catch(error => reject(error))
      })
    },

    updateImage({ commit }, image) {
      return new Promise((resolve, reject) => {
        update(image)
          .then(({ data }) => {
            commit('UPDATE_IMAGE', data)
            resolve()
          })
          .catch(error => reject(error))
      })
    },

    destroyImage({ commit }, id) {
      return new Promise((resolve, reject) => {
        destroy(id)
          .then(() => {
            commit('REMOVE_IMAGE', id)
            resolve()
          })
          .catch(error => reject(error))
      })
    }
  }
}

export default gallery
