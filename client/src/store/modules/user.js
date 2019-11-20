import axios from '../../../config/axios'

export const User = {
  namespaced: true,
  state: {
    profile: {}
  },
  mutations: {
    SET_PROFILE (state, payload) {
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
    }
  }
}
