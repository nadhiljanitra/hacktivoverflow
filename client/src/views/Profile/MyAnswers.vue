<template>
  <div>
    <div id="cardHolder">
      <q-card class="my-card" style="margin: 3px;" flat bordered  v-for="answer in filterAnswer" :key="answer.id" >
        <q-card-section style="padding: 0px; height: 80px">
          <div class="row" style="width: 100%; height: 100%; padding: 5px">
            <div class="col-12" id="cardss" style="padding: 0px 10px">
              <div id="head" style="display: flex; flex-direction: row; justify-content:space-between">
                <a @click.prevent="goToQuestion(answer)">Question: {{answer.questionId.title}} </a>
                <q-btn-group  >
                  <q-btn :ripple="false" icon="edit" size="xs" @click="edit(answer)">
                    <q-tooltip :delay="500" >Edit</q-tooltip>
                  </q-btn>
                  <q-btn :ripple="false" color="red" icon="delete" size="xs"  @click="remove(answer)" > 
                    <q-tooltip :delay="500" >Delete</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </div>
              <div id="foot">
                <div>
                answered: {{ answer.createdAt.slice(0,10) }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'myanswers',
  methods:{
    edit(val){
      console.log(val);
      localStorage.setItem('edit',val._id)
      let questionId = val.questionId._id
      let slug = val.questionId.title.split(" ").join("-")
      this.$router.push({path : `/questions/${questionId}/${slug}`})
      // this.$router.push({path:`/update-answer/${val._id}`})
    },
    remove(val){
      this.$store.dispatch('answers/removeAnswer',val._id)
    },
     goToQuestion(val){
      let questionId = val.questionId._id
      let slug = val.questionId.title.split(" ").join("-")
      this.$router.push({path : `/questions/${questionId}/${slug}`})
    }
  },
  created(){
    this.$emit('setHome',false)
    if(this.answers.length < 1) {
      this.$store.dispatch('answers/getAllAnswers')
    }
  },
  computed: {
      ...mapState('answers',[
      'answers'
    ]),
    ...mapState('users',[
      'profile'
    ]),
    filterAnswer(){
      let filter = []
      this.answers.forEach((el) => {
        if (el.author == this.profile._id){
          filter.push(el)
        }
      })
      return filter
    },
    questionTitle(){

    }
  }
  

}
</script>

<style>

</style>