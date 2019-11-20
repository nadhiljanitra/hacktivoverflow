<template>
  <div>
    <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <Navbar></Navbar>
    <q-page-container id="askPage">
      <h6>Update Question</h6>
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
                  <q-btn label="Update" :no-caps="true" type="submit" color="primary" />
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
import { mapState } from 'vuex';

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
        tags,
        questionId: this.$route.params.questionId
      }
      // console.log(payload);
      this.$q.loading.show()
      this.$store.dispatch('questions/updateQuestion',payload)
        .then(() => {
          this.$q.loading.hide()
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'done',
            message: 'Question updated! redirecting back to profile page..'
          })
          setTimeout(()=>{
            this.$router.push({path: '/profile/my-questions'})
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
  },
  computed: {
    ...mapState('questions',[
      'questions'
    ]),
    ...mapState('users',[
      'profile'
    ])
  },
  created(){
    let obj = {}
    this.questions.forEach((el) => {
      if(el._id === this.$route.params.questionId){
        obj = el
      }
    })
    console.log(obj)
    this.title = obj.title
    this.content = obj.content
    let temp = {}
    let arr = []
    obj.tags.forEach((el,i)=>{
      temp.key = i
      temp.value = el
    })
    arr.push(temp)
    this.choosenTags = arr
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