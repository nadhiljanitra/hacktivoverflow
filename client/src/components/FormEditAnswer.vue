<template>
  <div id="ansForm">
      <q-form
          @submit.prevent="onSubmit"
          class="q-gutter-md"
        >
        <div class="label">
          <div class="text-h6">Update your answer</div>
        </div>
          <q-editor v-model="content" min-height="10rem" max-height="15rem" />
        <div style="display: flex">
        <q-btn label="Update Your Answer" type="submit" :no-caps="true" :ripple="false" color="primary" />
      </div>
    </q-form>
  </div>  
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'formeditanswer',
  data(){
    return{
      content: ''
    }
  },
  methods:{
    onSubmit(){
      let payload = {
        content: this.content,
        answerId: localStorage.getItem('edit'),
        questionId: this.$route.params.questionId
      }
      this.$q.loading.show()
      this.$store.dispatch('answers/updateAnswer',payload)
        .then(() => {
          localStorage.removeItem('edit')
          this.$emit('removeEdit')
          this.$q.loading.hide()
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Answer updated!'
          })
        })
        .catch((err) => {
          console.log(err.response);
          this.$q.loading.hide()
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: `${err.response.data.message}`
          })
        })
    }
  },
  created(){
    let editId = localStorage.getItem('edit')
    if(editId){
      this.answers.forEach(element => {
        if (element._id === editId){
          this.content = element.content
        }
      });
    }
  },
  computed:{
    ...mapState('answers',[
      'answers'
    ])
  }

}
</script>

<style>
#ansForm{
  width: 80%;
  margin: 0 auto 30px auto
}
.label{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 2px !important
}
.label p{
  margin-bottom: 2px !important;
  font-weight: 100;
  color: lightslategrey
}
</style>