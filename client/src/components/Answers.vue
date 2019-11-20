<template>
  <div>
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
          <div v-html="answer.content"></div>
            <div>
              Answered: {{ answered }}
            </div >
            <div>
              {{answer.author.username}}
            </div>
        </div>
      </q-card-section>
      <q-separator inset />
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'answer',
  props: ['answer'],
  computed: {
    score(){
      if(this.answer.upvote){
        return this.answer.upvote - this.answer.downvote
      }
    },
    answered(){
      return moment(this.answer.createdAt).from(new Date())
    },
  }

}
</script>

<style>
#queMain{
  padding: 10px 20px
}
</style>