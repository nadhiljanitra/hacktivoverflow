import axios from '../../../config/axios'

export const Question = {
  namespaced: true,
  state: {
    questions: [],
    question: {}
  },
  mutations: {
    SET_ALL_QUESTION (state, payload) {
      state.questions = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    }
  },
  actions: {
    getAllQuestions ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions',
          method: 'get'
        })
          .then(({ data }) => {
            console.log(data, 'ini all question')
            commit('SET_ALL_QUESTION', data)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    getThisQuestion ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${payload}`,
          method: 'get'
        })
          .then(({ data }) => {
            console.log(data)
            commit('SET_QUESTION', data)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    addNewQuestion ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions',
          method: 'post',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            content: payload.content,
            tags: payload.tags
          }
        })
          .then(({ data }) => {
            console.log(data)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    removeQuestion ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${payload}`,
          method: 'delete',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            dispatch('getAllQuestions')
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    updateQuestion ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${payload.questionId}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          },
          data: {
            title: payload.title,
            content: payload.content,
            tags: payload.tags
          }
        })
          .then(({ data }) => {
            console.log(data)
            return dispatch('getAllQuestions')
          })
          .then(() => {
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    }
  }
}
