import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import { Question } from './modules/question'
import { Answer } from './modules/answer'
import { User } from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    questions: Question,
    answers: Answer,
    users: User
  },
  state: {
    login: false
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.login = payload
    }
  },
  actions: {
    login ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/login',
          method: 'post',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            commit('SET_LOGIN', true)
            resolve()
          })
          .catch((err) => {
            console.log(err)
            reject(err)
          })
      })
    },
    register ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/register',
          method: 'post',
          data: {
            username: payload.username,
            email: payload.email,
            password: payload.password
          }
        })
          .then(({ data }) => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            commit('SET_LOGIN', true)
            resolve(data)
          })
          .catch((err) => {
            console.log(err.response.data)
            reject(err)
          })
      })
    },
    google ({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/users/login/google',
          method: 'post',
          data: {
            id_token: payload
          }
        })
          .then(({ data }) => {
            commit('SET_LOGIN', true)
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            resolve()
          })
          .catch((err) => {
            reject(err.response)
          })
      })
    }
  }
})
