import axios from '../../../config/axios'

export const Question = {
  namespaced: true,
  state: {
    questions: [],
    question: {},
    allTags: [],
    questionsTag: []
  },
  mutations: {
    SET_ALL_QUESTION (state, payload) {
      state.questions = payload
    },
    SET_QUESTION (state, payload) {
      state.question = payload
    },
    SET_TAGS (state, payload) {
      let arr = []
      payload.forEach((el) => {
        el.tags.forEach(element => {
          arr.push(element)
        })
      })
      state.allTags = [...new Set(arr)]
    },
    SET_QUESTIONS_BY_TAG (state, payload) {
      state.questionsTag = payload
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
            console.log(data)
            commit('SET_ALL_QUESTION', data)
            commit('SET_TAGS', data)
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
            commit('SET_QUESTION', data)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
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
    },
    vote ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: `/questions/${payload.type}/${payload.questionId}`,
          method: 'patch',
          headers: {
            token: localStorage.getItem('token')
          }
        })
          .then(({ data }) => {
            commit('SET_QUESTION', data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    searchByTag ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/questions/search-tag',
          method: 'post',
          data: {
            tag: payload
          }
        })
          .then(({ data }) => {
            commit('SET_QUESTIONS_BY_TAG', data)
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
