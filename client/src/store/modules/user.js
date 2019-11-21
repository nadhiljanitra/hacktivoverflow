import axios from '../../../config/axios'

export const User = {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    SET_PROFILE (state, payload) {
      console.log('masuk set profile');
      state.profile = payload
    }
  },
  actions: {
    getProfile ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/users/myprofile`,
          method: 'get',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            console.log(data.user, 'ini data user')
            commit('SET_PROFILE', data.user)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    addWatchedTag ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/users/watchedTag`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            tags: payload
          }
        })
          .then(({ data }) => {
            console.log(data, 'ini data user')
            commit('SET_PROFILE', data)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    removeWathchedTag ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/users/remove-watched-tag`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            tag: payload
          }
        })
          .then(({ data }) => {
            console.log(data, 'ini data user')
            commit('SET_PROFILE', data)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
