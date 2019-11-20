<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  created(){
    if (localStorage.getItem('token')){
      this.$store.commit('SET_LOGIN',true)
      this.$store.dispatch('users/getProfile')
      this.$store.dispatch('answers/getAllAnswers')
      this.$store.dispatch('questions/getAllQuestions')
    } else {
      this.$store.commit('users/SET_PROFILE',{})
      this.$store.commit('SET_LOGIN',false)
    }
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
