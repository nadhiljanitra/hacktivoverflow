<template>
  <div>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
      <Navbar></Navbar>
      <q-page-container>
        <q-splitter
          v-model="splitterModel"
          style="height: 90vh"
        >
          <template v-slot:before >
            <q-tabs
              v-model="tab"
              vertical
              class="text-black"     
            >
              <q-route-tab
                icon="account_circle"
                to="/profile"
                label="Profile"
                :ripple="false" 
                :no-caps="true"
                exact
              />
              <q-route-tab
                icon="edit"
                to="/profile/my-answers"
                label="My Answers"
                :ripple="false" 
                :no-caps="true"
                exact
              />
              <q-route-tab
                icon="message"
                to="/profile/my-questions"
                label="My Questions"
                :ripple="false" 
                :no-caps="true"
                exact
              />
            </q-tabs>  
          </template>
          <template v-slot:after>
            <router-view @setHome="setHome"></router-view>
              <q-card bordered class="my-summary" v-if="home" id="cardprofile">
                <q-card-section>
                  <div class="text-h6">{{username}}</div>
                </q-card-section>
                <q-separator inset />
                <q-card-section style="display: flex; flex-direction: column; align-items: flex-start">
                  <p>Joined at: {{createdAt}}</p>
                  <p>Questions Asked: {{questionCount}}</p>
                  <p>Answered Questions: {{answerCount}} </p>
                  <div style="display: flex" >Watched Tags: 
                    <div  v-for="tag in profile.wathedTag" :key="tag.i">
                       <q-badge color="primary" style="margin: 0px 4px">{{tag}}</q-badge>
                    </div>
                    <!-- {{profile.wathedTag}}  -->
                  </div>
                </q-card-section>
              </q-card>
          </template>
        </q-splitter>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'profile',
  components: {
    Navbar
  },
  data(){
    return{
      tab: 'profile',
      splitterModel: 20,
      home: true
    }
  },
  methods: {
    setHome(val){
      this.home = val
    }
  },
  computed: {
    ...mapState('users',[
      'profile'
    ]),
    ...mapState('questions',[
      'questions'
    ]),
    ...mapState('answers',[
      'answers'
    ]),
    username(){
      if (this.profile){
        return this.profile.username
      }
    },
    answerCount(){
      if (this.answers){
        let count = 0
        this.answers.forEach(element => {
          if (element.author == this.profile._id){
            count++
          }
        })
        return count
      }
    },
    questionCount(){
       if (this.questions){
        let count = 0
        this.questions.forEach(element => {
          if (element.author._id == this.profile._id){
            count++
          }
        })
        return count
      }
    },
    createdAt(){
      return moment(this.profile.createdAt).format('MMMM Do YYYY')
      // return moment(this.profile.createdAt).from(new Date())
    }
  },
  created(){
    this.$store.dispatch('answers/getAllAnswers')
  },
  watch : {
    $route(to,from){
      if(to.name === 'profile'){
        this.home = true
      } else {
        this.home = false
      }
    }
  }

}
</script>

<style>
#leftProfile{
  border: 1px solid black;
  padding: 10px
}
#cardprofile{
  width: 60%;
  margin: 20px auto
}
</style>