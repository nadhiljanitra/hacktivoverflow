<template>
      <q-drawer
      v-model="show"
      show-if-above
      bordered
      content-class="bg-grey-2"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
  
          <q-item v-for="link in links2" :key="link.text" clickable :to='link.url' >
            <q-item-section avatar>
              <q-icon :name="link.icon" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ link.text }}</q-item-label>
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>
</template>

<script>
export default {
  props: ['leftDrawerOpen'],
 data(){
   return {
     show: true,
      links2: [
        { icon: 'message', text: 'Ask Question', url: '/ask' },
        { icon: 'remove_red_eye', text: 'Watched Tags' },
      ]
    }
 },
 watch: {
   leftDrawerOpen(baru,lama){
     this.show = lama
   }
 }
}
</script>

<style>

</style>