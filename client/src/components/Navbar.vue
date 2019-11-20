<template>
  <div id="navbar">
    <q-header elevated class="bg-white text-grey-8 q-py-xs" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs" to="/">
          <q-icon name="code"  size="28px" />
          <q-toolbar-title shrink class="text-weight-bold">
            myHacktivOverflow
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <div class="YL__toolbar-input-container row no-wrap" style="width: 50%">
          <q-input dense outlined square v-model="search" placeholder="Search" class="bg-white col" />
          <q-btn class="YL__toolbar-input-btn" color="grey-3" text-color="grey-8" icon="search" unelevated />
        </div>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">

          <q-btn-group outline v-if="!login">
            <q-btn :no-caps="true" outline color="primary" to="/login" label="Login"  />
            <q-btn :no-caps="true" color="primary" label="Register" to="/register" />
          </q-btn-group>

          <div  v-if="login">
            
            <!-- <q-btn :no-caps="true" color="primary" label="Logout" @click='logout' />
          <q-btn round flat>
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar> -->
          <!-- </q-btn> -->
          <q-btn-dropdown
            color="primary"
            :no-caps="true"
            :ripple="false"
            label="Profile"
            style="margin-right: 20px"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px" @click="profilePage" style="cursor: pointer">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                  <q-tooltip anchor="center left" :delay="500" self="center right" :offset="[10, 10]">Profile page</q-tooltip>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">{{username}}</div>

                <q-btn
                  :no-caps="true"
                  :ripple="false"
                  color="primary"
                  label="Logout"
                  size="sm"
                  v-close-popup
                  @click='logout'
                />
              </div>
            </div>
          </q-btn-dropdown>
          </div>
        </div>

      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import {mapState} from 'vuex'


export default {
  name: 'Navbar',
  data(){
    return{
      search: '',
      username: localStorage.getItem('username')
    }
  },
  computed:{
    ...mapState([
      'login'
    ])
  },
  methods:{
    logout(){
      localStorage.clear()
      this.$store.commit('SET_LOGIN',false)
      this.$store.commit('users/SET_PROFILE',{})
      this.$router.push({path: '/'})
    },
    leftDrawerOpen(){
      this.$emit('leftDrawerOpens')
    },
    profilePage(){
      this.$router.push({path: '/profile'})
    }
  }
}
</script>

<style>

</style>