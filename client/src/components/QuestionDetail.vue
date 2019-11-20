<template>
  <div>
     
      <q-card-section style="display: flex">
        <div class="text-h6">
          <h6 id="queTitle">{{question.title}}</h6>
          <p  id="queMeta" style="display: flex">Asked: {{asked}} </p>
          <p  id="queMeta" style="display: flex">{{author}} </p>
        </div>
      </q-card-section>

      <q-separator inset />
      
      <q-card-section class="row">
        <div id="queSide" class="col-1" >
          <div>
            <q-icon color="grey" size="40px" name="play_arrow"  style="transform: rotate(270deg)" />
          </div>
          {{score}}
          <div>
            <q-icon color="grey"  size="40px" name="play_arrow" style="transform: rotate(90deg)" />
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

export default {
  name: 'questionDetail',
  computed:{
    ...mapState('questions',[
      'question'
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
  font-size: 10px
}
#queMain{
  padding: 10px 20px
}
</style>