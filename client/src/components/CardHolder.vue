<template>
  <div id="cardHolder">

    <div  v-if="!tagMode && !tagFromChild">
      <card v-for="question in filteredQuestions" :key="question.id" :question="question" @searchFromChild="checkProfile"></card>
    </div>

    <div  v-if="tagMode || tagFromChild">
      <h6 id="titleTagMode">Question tagged [{{query || title}}]</h6>
      <div>
        <q-btn v-if="unwatch" class="btnUnwatch" color="grey" @click="unwatchTag" icon="visibility_off" label="Unwatch Tag" :no-caps="true" :ripple="false" size='sm' />
        <q-btn v-if="!unwatch" class="btnUnwatch" color="primary" @click="watchTag" icon="visibility" label="Watch Tag" :no-caps="true" :ripple="false" size='sm' />
        <q-btn  class="btnUnwatch" color="primary" @click="allQuestions" icon="home" label="All questions" :no-caps="true" :ripple="false" size='sm' />
      </div>
      <card v-for="question in filteredTagQuestions" :key="question.id" :question="question" @searchFromChild="checkProfile"></card>
      <div v-if="questionsTag.length < 1">
            <q-card flat bordered class="my-card" style="margin-top: 10px">
              <q-card-section>
                <div class="text-h6">Oops..</div>
              </q-card-section>
              <q-card-section>
                Currently there are no questions using this tag anymore, you can unwatch it or wait untill another questions using this tags.
              </q-card-section>
              <q-separator inset />
            </q-card>
      </div>
    </div>

  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'

export default {
  name: 'cardholder',
  props: ['tagMode','query','filter'],
  data(){
    return{
      unwatch: true,
      tagFromChild: false,
      title: ''
    }
  },
  components:{
    Card
  },
  methods:{
    unwatchTag() {
      this.$q.loading.show()
      let tag = ''
      if(this.query){
        tag = this.query
      } else {
        tag = this.title 
      }
      this.$store.dispatch('users/removeWathchedTag',tag)
        .then(() => {
          this.unwatch = false
          this.$q.loading.hide()
           this.$q.loading.hide()
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'done',
              message: 'Watched tag updated'
            })
        })
        .catch((err) => {
          this.$q.loading.hide()
        })
    },
    watchTag() {
      this.$q.loading.show()
      let tag = this.profile.wathedTag
       if(this.query){
        tag.push(this.query)
      } else {
        tag.push(this.title) 
      }
      this.$store.dispatch('users/addWatchedTag',tag)
        .then(() => {
          this.unwatch = true
          this.$q.loading.hide()
           this.$q.loading.hide()
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'done',
              message: 'Watched tag updated'
            })
        })
        .catch((err) => {
          this.$q.loading.hide()
        })
    },
    allQuestions(){
      this.unwatch = true
      this.tagFromChild = false
      this.title = ''
      this.$emit('allQuestion')
    },
    checkProfile(tag){
      this.tagFromChild = true
      this.title = tag
      let flag = false
      this.profile.wathedTag.forEach((el) => {
        if (el === tag){
          flag = true
        }
      })
      if(flag){
        this.unwatch = true
      } else {
        this.unwatch = false
      }
    }
  },
  computed: {
    ...mapState('questions',[
      'questions',
      'questionsTag'
    ]),
    ...mapState('users',[
      'profile'
    ]),
    filteredQuestions(){
      console.log('asda123')
       let find = this.filter
          return this.questions.filter((question)=>{
            let regex = new RegExp(find,'i')
            return question.title.match(regex)
          })
    },
    filteredTagQuestions(){
      console.log('asda')
       let find = this.filter
          return this.questionsTag.filter((question)=>{
            let regex = new RegExp(find,'i')
            return question.title.match(regex)
          })
    },
  }

}
</script>

<style>
#cardHolder{
  padding: 10px
}
#titleTagMode{
  margin: 20px;
  display: flex
}
.btnUnwatch{
  margin: 0px 0px 10px 10px
}
</style>