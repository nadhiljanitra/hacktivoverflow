<template>
      <q-drawer
      v-model="show"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="300"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable to='/ask' >
            <q-item-section avatar>
              <q-icon name="message" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Ask Question</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable @click="setWatcher" >
            <q-item-section avatar>
              <q-icon name="remove_red_eye" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Watched Tags</q-item-label>
            </q-item-section>
          </q-item>
          <!-- belum handle kalau ngga ada yg login -->
          <div v-for="tag in profile.wathedTag" :key="tag.i">
            <q-badge color="primary" style="cursor: pointer" @click="questionTag(tag)">{{tag}}</q-badge>
          </div>
        <div id="tagWatcher"  v-if="addWatcher && login">
            <tags-input element-id="tags"
            :limit="5"
            v-model="choosenTags"
            placeholder=''
            :only-existing-tags="true"
            :typeahead-hide-discard="true"
            :existing-tags="existingTags"
            :typeahead="true"></tags-input>
            <q-btn outline color="primary" :ripple="false" :no-caps="true" size="sm" label="Submit" style="margin-top: 5px; display: flex" @click="addWatch" /> 
        </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>
</template>

<script>
import VoerroTagsInput from '@voerro/vue-tagsinput';
import { mapState } from 'vuex';

export default {
  props: ['leftDrawerOpen'],
  components:{
    "tags-input":VoerroTagsInput
  },
 data(){
   return {
     show: true,
      links2: [
        { icon: 'message', text: 'Ask Question', url: '/ask', action:'setWatcher' },
        { icon: 'remove_red_eye', text: 'Watched Tags' ,action:'setWatcher' },
      ],
       choosenTags: [],
      existingTags: [],
      addWatcher: false,
    }
 },
 methods: {
   setWatcher(){
     this.addWatcher = !this.addWatcher
          if(this.profile.wathedTag){
       let arr = []
        this.profile.wathedTag.forEach((el,i)=>{
        let temp = {}
          temp.key = i+1
          temp.value = el
        arr.push(temp)
        })
        this.choosenTags = arr
     }
   },
   addWatch(){
     let tags = []
      this.choosenTags.forEach(el=>{
        tags.push(el.value)
      })
     this.choosenTags = []
     this.$store.dispatch('users/addWatchedTag',tags)
      .then(()=>{
        this.addWatcher = !this.addWatcher
          this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'done',
          message: 'Watched Tags updated!'
        })
      })
      .catch((err)=>{
        console.log(err.response.data)
      })
   },
   setAllTags(){
      let arr = []
           this.allTags.forEach((el,i)=>{
           let temp = {}
             temp.key = i
             temp.value = el
           arr.push(temp)
           })
       this.existingTags = arr
   },
   questionTag(tag){
     this.$emit('tagMode',tag)
   }
   
 },
 computed:{
   ...mapState('users',[
     'profile'
   ]),
   ...mapState('questions',[
     'allTags'
   ]),
   ...mapState([
     'login'
   ])
   
 },
 watch: {
   leftDrawerOpen(baru,lama){
     this.show = lama
   },
   allTags(baru,lama){
     if (baru.length >= 1 || lama.length >= 1){
       this.setAllTags()
     }
   }
 },
 created(){
   this.setAllTags()
 }
}
</script>

<style>
#tagWatcher{
  width: 80%;
  margin: 10px auto;
}
</style>