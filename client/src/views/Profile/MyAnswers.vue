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
                  <q-btn :ripple="false" color="red" icon="delete" size="xs"  @click="confirm = true" > 
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
        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <q-avatar icon="report_problem" color="red" text-color="white" />
              <div >
                <span class="q-ml-sm">Are you sure to delete this answer?</span>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat :no-caps="true" label="Cancel" color="primary" v-close-popup />
              <q-btn flat label="Yes"  :no-caps="true" color="primary" @click="remove(answer)" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'myanswers',
  data(){
    return {
      confirm : false
    }
  },
  methods:{
    edit(val){
      console.log(val);
      localStorage.setItem('edit',val._id)
      let questionId = val.questionId._id
      let slug = val.questionId.title.split(" ").join("-")
      this.$router.push({path : `/questions/${questionId}/${slug}`})
    },
    remove(val){
      this.$q.loading.show()
      this.$store.dispatch('answers/removeAnswer',val._id)
        .then(() => {
        this.$q.loading.hide()
        })
        .catch(err=>{
          this.$q.loading.hide()
          console.log(err.response.data)
        })
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