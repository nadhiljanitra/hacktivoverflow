import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyQuestions from './views/Profile/MyQuestions.vue'
import MyAnswers from './views/Profile/MyAnswers.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue')
    },
    {
      path: '/questions/:questionId/:questionSlug',
      name: 'question',
      props: true,
      component: () => import(/* webpackChunkName: "question" */ './views/Question.vue')
    },
    {
      path: '/ask',
      name: 'ask',
      component: () => import(/* webpackChunkName: "ask" */ './views/CreateQuestion.vue'),
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import(/* webpackChunkName: "profile" */ './views/Profile/Profile.vue'),
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      },
      children: [
        {
          path: 'my-questions',
          name: 'myquestions',
          component: MyQuestions
        },
        {
          path: 'my-answers',
          name: 'myanswers',
          component: MyAnswers
        }
      ]
    },
    {
      path: '/update-question/:questionId',
      name: 'updateQuestion',
      props: true,
      component: () => import(/* webpackChunkName: "updateQuestion" */ './views/Profile/UpdateQuestion.vue'),
      beforeEnter (to, from, next) {
        if (localStorage.getItem('token')) {
          next()
        } else {
          next('/')
        }
      }
    },
  ]
})
