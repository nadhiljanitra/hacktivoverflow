import axios from '../../../config/axios'

export const Answer = {
  namespaced: true,
  state: {
    answers: []
  },
  mutations: {
    SET_ALL_ANSWERS (state, payload) {
      state.answers = payload
    }
  },
  actions: {
    submitAnswer ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.questionId}`,
          method: 'post',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            content: payload.content
          }
        })
          .then(({ data }) => {
            dispatch('questions/getThisQuestion', payload.questionId, { root: true })
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    getAllAnswers ({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers`,
          method: 'get'
        })
          .then(({ data }) => {
            commit('SET_ALL_ANSWERS', data)
            resolve()
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    },
    removeAnswer ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload}`,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('getAllAnswers')
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    updateAnswer ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.answerId}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            content: payload.content
          }
        })
          .then(({ data }) => {
            dispatch('questions/getThisQuestion', payload.questionId, { root: true })
          })
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    vote ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/answers/${payload.type}/${payload.answerId}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('questions/getThisQuestion', payload.questionId, { root: true })
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
