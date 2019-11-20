<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Navbar @leftDrawerOpens="leftDrawerOpens"></Navbar>
    <Sidebar :leftDrawerOpen="leftDrawerOpen"></Sidebar>
  <!-- batas header -->
    <q-page-container>
      <card-holder></card-holder>
      <!-- <router-view /> -->
    </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import CardHolder from '@/components/CardHolder.vue'
import { mapState } from 'vuex'

export default {
  name: 'MyLayout',
  components:{
    Navbar,
    Sidebar,
    CardHolder
  },
  data(){
    return{
      leftDrawerOpen: false
    }
  },
  methods: {
    redirectGithub(){
      if(window.location.search){
        const query = window.location.search.substring(1)
        const position = query.search("msg")
        if (position === -1){
          const token = query.split('token=')[1].split('&')[0]
          localStorage.setItem('token',token)
          localStorage.setItem('gitSuccess','success login with github')
          window.location = 'http://localhost:8080'
           this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Logged in'
          })
        } else {
          const msg = query.split('msg=')[1].split('%27')[1].split('%20').join(' ')
          localStorage.setItem('msg',msg)
          window.location = 'http://localhost:8080'
        }
      }
    },
    showErrGithub(){
      if(localStorage.getItem('msg')){
        let msg = localStorage.getItem('msg')
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `${msg}`
          })
        setTimeout(()=>{
          localStorage.removeItem('msg')
        },2000)
      }
      if(localStorage.getItem('gitSuccess')){
           this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Logged in'
          }) 
        setTimeout(()=>{
        localStorage.removeItem('gitSuccess')
        },2000)
      }
    },
    leftDrawerOpens(){
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
  }, created(){
    this.$store.dispatch('questions/getAllQuestions')
    this.redirectGithub()
    this.showErrGithub()
  },
  computed: {
    ...mapState('questions',[
      'questions'
    ])
  }
}
</script>

<style scoped>

</style>
