<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Navbar @leftDrawerOpens="leftDrawerOpens" @search="setquery"></Navbar>
    <Sidebar :leftDrawerOpen="leftDrawerOpen" @tagMode="queryTag"></Sidebar>
  <!-- batas header -->
    <q-page-container>
      <div v-if="!tagMode">
        <card-holder :filter='filter'></card-holder>
      </div>
      <div v-if="tagMode">
        
        <card-holder :filter='filter' :query='tagQuery' :tagMode='tagMode' @allQuestion="getAllQuestions"></card-holder>
      </div>
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
      leftDrawerOpen: false,
      tagMode: false,
      tagQuery : '',
      filter : ''
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
          window.location = 'https://myhacktivoverflow.nadhiljanitra.xyz/'
           this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Logged in'
          })
        } else {
          const msg = query.split('msg=')[1].split('%27')[1].split('%20').join(' ')
          localStorage.setItem('msg',msg)
          window.location = 'https://myhacktivoverflow.nadhiljanitra.xyz/'
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
    queryTag(tag){
      this.$q.loading.show()
      this.$store.dispatch('questions/searchByTag', tag)
        .then(() => {
          this.$q.loading.hide()
          this.tagQuery = tag
          this.tagMode = true
        })
        .catch((err) => {
          this.$q.loading.hide()
          console.log(err.response.data)
        })
    },
    getAllQuestions(){
      this.tagMode = false;
      this.tagQuery = ''
      this.$q.loading.show()
      this.$store.dispatch('questions/getAllQuestions')
        .then(() => {
        this.$q.loading.hide()
        })
        .catch(err=>{
        this.$q.loading.hide()
        })
    },
    setquery(search){
      this.filter = search
    }
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
