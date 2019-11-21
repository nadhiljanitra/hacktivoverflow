<template>
  <div>
     
      <q-card-section style="display: flex">
        <div class="text-h6">
          <h6 id="queTitle">{{question.title}}</h6>
          <p  id="queMeta" style="display: flex">Asked: {{asked}} </p>
          <p  id="queMeta" style="display: flex">Author: {{author}} </p>
        </div>
      </q-card-section>

      <q-separator inset />
      
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
          <div v-html="question.content"></div>
        </div>
      </q-card-section>

      <q-separator inset />
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import { chocolate } from 'color-name'

export default {
  name: 'questionDetail',
  data(){
    return{
      position: 'netral'
    }
  },
  methods:{
    upvote(){
      console.log('masuk upvote')
      let payload = {
        questionId : this.question._id,
      }
      if (this.position === 'netral' || this.position === 'downvote'){
        this.position = 'upvote'
        payload.type = "addUpvote"
        this.$store.dispatch('questions/vote',payload)
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
        this.$store.dispatch('questions/vote',payload)
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
      console.log('masuk downvote');
      let payload = {
        questionId : this.question._id,
      }
      if (this.position === 'netral' || this.position === 'upvote'){
        this.position = 'downvote'
        payload.type = "addDownvote"
        this.$store.dispatch('questions/vote',payload)
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
        this.$store.dispatch('questions/vote',payload)
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
  computed:{
    ...mapState('questions',[
      'question'
    ]),
     ...mapState('users',[
      'profile'
    ]),
    asked(){
      return moment(this.question.createdAt).from(new Date())
    },
    score(){
      if (this.question.upvote){
        return this.question.upvote.length - this.question.downvote.length
      }
    },
    author(){
      if (this.question.author){
        return this.question.author.username
      } else {
        console.log('author undefined');
      }
    },
    upvoteColor(){
      if(this.question.upvote){
        let userId = this.profile._id
        let flag = false
        this.question.upvote.forEach((el) => {
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
      if(this.question.downvote){
        let userId = this.profile._id
        let flag = false
        this.question.downvote.forEach((el) => {
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
#queTitle{
  margin: 0px
}
#queMeta{
  margin: 0px;
  font-size: 15px
}
#queMain{
  padding: 10px 20px
}
</style>