<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Navbar @leftDrawerOpens="leftDrawerOpens"></Navbar>
    <Sidebar :leftDrawerOpen="leftDrawerOpen"></Sidebar>
    <q-page-container>
      <q-card flat bordered class="my-card">
          <question-detail></question-detail>
          <!-- <div v-if="question.answers">
          </div> -->
            <answer v-for="answer in question.answers"  :key="answer.id" :answer="answer"></answer>
          <!-- <div v-if="question.answers === undefined">
              There are no answers yet
          </div> -->
          <div v-if="!edit">
            <form-answer></form-answer>
          </div>
          <div v-if="edit">
            <form-edit-answer @removeEdit="removeEdit"></form-edit-answer>
          </div>
        </q-card>
      </q-page-container>
  </q-layout>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import QuestionDetail from '@/components/QuestionDetail.vue'
import Answer from '@/components/Answers.vue'
import FormAnswer from '@/components/FormAnswer.vue'
import FormEditAnswer from '@/components/FormEditAnswer.vue'
import { mapState } from 'vuex'

export default {
  name: 'question',
  components: {
    Navbar,
    Sidebar,
    QuestionDetail,
    Answer,
    FormAnswer,
    FormEditAnswer
  },
  data(){
    return{
      leftDrawerOpen: false,
      edit: false
    }
  },
  methods:{
    leftDrawerOpens(){
      this.leftDrawerOpen = !this.leftDrawerOpen
    },
    removeEdit(){
      this.edit = false
    }
  },
  created(){
    let questionId = this.$route.params.questionId
    // console.log(questionId)
    this.$store.dispatch('questions/getThisQuestion', questionId)
    if(localStorage.getItem('edit')){
      this.edit = true
    }
  },
  computed: {
    ...mapState('questions',[
      'question'
    ])
  }

}
</script>

<style>

</style>