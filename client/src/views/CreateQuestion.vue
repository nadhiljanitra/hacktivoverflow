<template>
  <div>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Navbar></Navbar>
    <q-page-container id="askPage">
      <h6>Ask a public question</h6>
        <q-card flat bordered class="my-card123">
          <q-card-section>
            <q-form
                @submit="onSubmit"
                class="q-gutter-md"
              >
                <div class="label">
                  <div class="text-h6">Title</div>
                  <p>Be specific and imagine you’re asking a question to another person</p>
                </div>
                <q-input
                  square 
                  :dense="true"
                  outlined
                  v-model="title"
                  style="margin: 0px 10px"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <div class="label">
                  <div class="text-h6">Body</div>
                  <p>Include all the information someone would need to answer your question</p>
                </div>
                  <q-editor v-model="content" min-height="10rem" max-height="15rem" />
                <div class="label">
                  <div class="text-h6">Tags</div>
                  <p>Add up to 5 tags to describe what your question is about</p>
                </div>
                <tags-input element-id="tags"
                :limit="5"
                  v-model="choosenTags"
                  :existing-tags="existingTags"
                  :typeahead="true"></tags-input>
                <div style="display: flex">
                  <q-btn label="Submit" type="submit" color="primary" />
                </div>
              </q-form>
          </q-card-section>
        </q-card>

    </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import VoerroTagsInput from '@voerro/vue-tagsinput';

export default {
  name: 'ask',
  components: {
    Navbar,
    "tags-input":VoerroTagsInput
  },
  data(){
    return {
      title: '',
      content: '',
      choosenTags: [],
      existingTags: []
    }
  },
  methods: {
    onSubmit(){
      let tags = []
      this.choosenTags.forEach(el=>{
        tags.push(el.value)
      })
      let payload = {
        title: this.title,
        content: this.content,
        tags
      }
      // console.log(payload);
      this.$q.loading.show()
      this.$store.dispatch('questions/addNewQuestion',payload)
        .then(() => {
          this.$q.loading.hide()
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Question created! redirecting back to home..'
          })
          setTimeout(()=>{
            this.$router.push({path: '/'})
          },3000)
        })
        .catch((err) => {
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
#askPage{
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px auto
}
#askPage h6{
  margin: 15px;
  display: flex
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
.my-card123{
  margin-bottom: 50px
}
</style>