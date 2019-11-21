<template>
  <div>
    <div id="cardHolder">
      <q-card class="my-card" style="margin: 3px;" flat bordered  v-for="question in filterQuestion" :key="question.id" >
        <q-card-section style="padding: 0px; height: 80px">
          <div class="row" style="width: 100%; height: 100%; padding: 5px">
            <div class="col-1 stat"  >
              <div>{{question.upvote.length - question.downvote.length}}</div>
              <div>votes</div>
            </div>
            <div class="col-1 stat" >
              <div>{{question.answers.length}}</div>
              <div>answers</div>
            </div>
            <!-- <div class="col-1 stat" >
              <div>{{question.views}}</div>
              <div>views</div>
            </div> -->
            <div class="col-10" id="cardss" style="padding: 0px 10px">
              <div id="head" style="display: flex; flex-direction: row; justify-content:space-between">
                <a @click.prevent="goToQuestion(question)">{{question.title}} </a>
                <q-btn-group  >
                  <q-btn :ripple="false" icon="edit" size="xs" @click="edit(question)">
                    <q-tooltip :delay="500" >Edit</q-tooltip>
                  </q-btn>
                  <q-btn :ripple="false" color="red" icon="delete" size="xs"  @click="confirm = true" > 
                    <q-tooltip :delay="500" >Delete</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </div>
              <div id="foot">
                <div>
                  <q-badge color="blue" style="margin-right: 3px" v-for="tag in question.tags" :key="tag.i">
                    {{ tag }}
                  </q-badge>
                </div>
                <div>
                asked: {{ question.createdAt.slice(0,10) }}
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
                      <span class="q-ml-sm">Are you sure to delete this question?</span>
                    </div>
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat :no-caps="true" label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Yes"  :no-caps="true" color="primary" @click="remove(question)" v-close-popup />
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
  name: 'myquestions',
  data(){
    return{
      confirm: false
    }
  },
  methods:{
    edit(val){
      console.log(val);
      this.$router.push({path: `/update-question/${val._id}`})
    },
    remove(val){
      this.$q.loading.show()
      this.$store.dispatch('questions/removeQuestion',val._id)
        .then(() => {
this.$q.loading.hide()
        })
        .catch((err) => {
          console.log(err.response.data)
this.$q.loading.hide()
        })
    },
     goToQuestion(val){
      this.$router.push({path : `/questions/${val._id}/${val.slug}`})
    }
  },
  created(){
    this.$emit('setHome',false)
    if(this.questions.length < 1) {
      this.$q.loading.show()
      this.$store.dispatch('questions/getAllQuestions')
        .then(() => {
        this.$q.loading.hide()
        })
        .catch((err)=>{
          console.log(err.response.data)
        this.$q.loading.hide()
        })
    }
  },
  computed: {
      ...mapState('questions',[
      'questions'
    ]),
    ...mapState('users',[
      'profile'
    ]),
    filterQuestion(){
      let filter = []
      this.questions.forEach((el) => {
        if (el.author._id == this.profile._id){
          filter.push(el)
        }
      })
      return filter
    }
  }
  

}
</script>

<style>

</style>