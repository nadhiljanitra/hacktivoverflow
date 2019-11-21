<template>
  <div>
     <q-card-section class="row">
        <div id="queSide" class="col-1" >
          <div>
            <q-icon :color="upvoteColor" size="40px" name="play_arrow"  style="transform: rotate(270deg); cursor: pointer" @click="upvote" />
          </div>
          {{score}}
          <div>
            <q-icon :color="downvoteColor"  size="40px" name="play_arrow" style="transform: rotate(90deg); cursor: pointer" @click="downvote" />
          </div>
        </div>
        <div id="queMain" class="col-11" >
          <div v-html="answer.content"></div>
          <div id="foots">
            <div>
              Answered: {{ answered }}
            </div >
            <div>
              {{answer.author.username}}
            </div>

          </div>
        </div>
      </q-card-section>
      <q-separator inset />
  </div>
</template>

<script>
import moment from 'moment'
import { mapState } from 'vuex'

export default {
  name: 'answer',
  props: ['answer'],
  data(){
    return{
      position: 'netral'
    }
  },
  methods: {
     upvote(){
      let payload = {
        answerId : this.answer._id,
        questionId : this.$route.params.questionId
      }
      if (this.position === 'netral' || this.position === 'downvote'){
        this.position = 'upvote'
        payload.type = "addUpvote"
        this.$store.dispatch('answers/vote',payload)
        .then(()=>{
            // this.$q.notify({
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'done',
            //   message: 'succeed'
            // })
          })
          .catch(err=>{
              this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: `${err.response.data.message}`
            })
          })
      } else if (this.position === 'upvote') {
        this.position = 'netral'
        payload.type = "removeUpvote"
        this.$store.dispatch('answers/vote',payload)
        .then(()=>{
            // this.$q.notify({
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'done',
            //   message: 'succeed'
            // })
          })
          .catch(err=>{
              this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: `${err.response.data.message}`
            })
          })
      }
    },
    downvote(){
      let payload = {
        answerId : this.answer._id,
        questionId : this.$route.params.questionId
      }
      if (this.position === 'netral' || this.position === 'upvote'){
        this.position = 'downvote'
        payload.type = "addDownvote"
        this.$store.dispatch('answers/vote',payload)
        .then(()=>{
            // this.$q.notify({
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'done',
            //   message: 'succeed'
            // })
          })
          .catch(err=>{
              this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: `${err.response.data.message}`
            })
          })
      } else if (this.position === 'downvote') {
        this.position = 'netral'
        payload.type = "removeDownvote"
        this.$store.dispatch('answers/vote',payload)
        .then(()=>{
            // this.$q.notify({
            //   color: 'green-4',
            //   textColor: 'white',
            //   icon: 'done',
            //   message: 'succeed'
            // })
          })
          .catch(err=>{
              this.$q.notify({
              color: 'red-4',
              textColor: 'white',
              icon: 'warning',
              message: `${err.response.data.message}`
            })
          })
      }
    }
  },
  computed: {
     ...mapState('users',[
      'profile'
    ]),
    score(){
      if(this.answer.upvote){
        return this.answer.upvote.length - this.answer.downvote.length
      }
    },
    answered(){
      return moment(this.answer.createdAt).from(new Date())
    },
    upvoteColor(){
      if(this.answer.upvote){
        let userId = this.profile._id
        let flag = false
        this.answer.upvote.forEach((el) => {
          if (el === userId){
            this.position = 'upvote'
            flag = true
          }
        })
        if (flag){
          return "orange"
        } else {
          return "grey"
        }
      } else {
        return "grey"     
      }
    },
    downvoteColor(){
      if(this.answer.downvote){
        let userId = this.profile._id
        let flag = false
        this.answer.downvote.forEach((el) => {
          if (el === userId){
            this.position = 'downvote'
            flag = true
          }
        })
        if (flag){
          return "orange"
        } else {
          return "grey"
        }
      } else {
        return "grey"     
      }
    }
  }

}
</script>

<style>
#queMain{
  padding: 10px 20px
}
#foots{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  font-size: 12px
}
</style>