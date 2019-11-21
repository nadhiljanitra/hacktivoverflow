<template>
  <q-card class="my-card" style="margin: 3px;" flat bordered >
    <q-card-section style="padding: 0px; height: 80px">
      <div class="row" style="width: 100%; height: 100%; padding: 5px">
        <div class="col-1 stat"  >
          <div>{{votes}}</div>
          <div>votes</div>
        </div>
        <div class="col-1 stat" >
          <div>{{answers}}</div>
          <div>answers</div>
        </div>
        <!-- <div class="col-1 stat" >
          <div>{{views}}</div>
          <div>views</div>
        </div> -->
        <div class="col-10" id="cardss" style="padding: 0px 10px">
          <div id="head" style="display: flex">
            <a @click.prevent="goToQuestion">{{question.title}} </a>
          </div>
          <div id="foot">
            <div>
              <q-badge color="blue" style="margin-right: 3px" v-for="tag in question.tags" :key="tag.i">
                <div id="eachTag" style="cursor:pointer" @click="tagMode(tag)">
                  {{ tag }}
                </div>
              </q-badge>
            </div>
            <div>
            asked {{ postedAt }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment'


export default {
  name: 'card',
  props: ['question'],
  methods: {
    goToQuestion(){
      this.$router.push({path : `/questions/${this.question._id}/${this.question.slug}`})
    },
    tagMode(tag){
      console.log(tag);
      this.$q.loading.show()
      this.$store.dispatch('questions/searchByTag', tag)
        .then(()=>{
          this.$q.loading.hide()
          this.$emit('searchFromChild',tag)
        })
        .catch((err) => {
          this.$q.loading.hide()
          console.log(err)
        })
    }
  },
  computed: {
    votes(){
      return this.question.upvote.length - this.question.downvote.length
    },
    answers(){
      return this.question.answers.length
    },
    views(){
      return this.question.views
    },
    postedAt(){
      return moment(this.question.createdAt).from(new Date())
    }
  }

}
</script>

<style>
.stat{
  display: flex;
  flex-direction: column;
  justify-content: center
}
#foot{
  display: flex;
  flex-direction: row;
  justify-content:space-between
}
#cardss{
  display: flex;
  flex-direction: column;
  justify-content:space-evenly
}
a {
    color: #0060B6;
    text-decoration: none;
}
a:hover 
{
     color:#00A0C6; 
     text-decoration:none; 
     cursor:pointer;  
}
</style>