import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import GAuth from 'vue-google-oauth2'
import './quasar'

Vue.config.productionTip = false

const gauthOption = {
  clientId: `1065588573229-679adqnrbj3mhmi1qja8qseulqv9ftqo.apps.googleusercontent.com`,
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
