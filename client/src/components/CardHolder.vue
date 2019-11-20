<template>
  <div id="cardHolder">
    <card v-for="question in questions" :key="question.id" :question="question"></card>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { mapState } from 'vuex'

export default {
  name: 'cardholder',
  components:{
    Card
  },
  computed: {
    ...mapState('questions',[
      'questions'
    ])
  }

}
</script>

<style>
#cardHolder{
  padding: 10px
}
</style>