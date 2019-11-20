<template>
  <div id="ansForm">
      <q-form
          @submit.prevent="onSubmit"
          class="q-gutter-md"
        >
        <div class="label">
          <div class="text-h6">Your Answer</div>
        </div>
          <q-editor v-model="content" min-height="10rem" max-height="15rem" />
        <div style="display: flex">
        <q-btn label="Post Your Answer" type="submit" :no-caps="true" :ripple="false" color="primary" />
      </div>
    </q-form>
  </div>  
</template>

<script>
export default {
  name: 'formanswer',
  data(){
    return{
      content: ''
    }
  },
  methods:{
    onSubmit(){
      let payload = {
        content: this.content,
        questionId: this.$route.params.questionId
      }
      this.$q.loading.show()
      this.$store.dispatch('answers/submitAnswer',payload)
        .then(() => {
          this.$q.loading.hide()
          this.content = ''
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Answer posted!'
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