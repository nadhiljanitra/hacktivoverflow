<template>
  <div id="loginpage">
    <q-card id="loginCard">
      <q-card-section>
         <div class="q-pa-md">
           <div>
             <q-icon name="code"  size="28px" />
             <h6 style="margin: 0px">Login</h6>
           </div>
           <div id="oauth">
              <q-btn color="primary" :no-caps="true" :ripple="false" @click='google'>
                <i class="fab fa-google"><span style="margin-left: 10px"> Login with Google </span></i>
              </q-btn>
              <a href="https://github.com/login/oauth/authorize?client_id=5eef05ccf61a804f920c&scope=user:email">
                <q-btn color="dark" :no-caps="true" :ripple="false"  style="margin-top: 10px" >
                  <i class="fab fa-github"><span style="margin-left: 10px" > Login with Github </span></i>
                </q-btn>
              </a>
           </div>
            <q-form
              @submit.prevent="onSubmit"
              class="q-gutter-md"
              style="margin-top: 10px"
            >
              <q-input
                filled
                v-model="email"
                label="Your name *"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Your passwprd *"
              />

                <a style="margin-top: 5px;" @click="jump" >Dont have any account?</a>
              <div>
                <q-btn label="Login" type="login" :no-caps="true" :ripple="false" color="primary"/>
              </div>
            </q-form>

          </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'login-form',
  components:{
  },
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    onSubmit(){
      let payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login',payload)
        .then(()=>{
          this.$store.dispatch('users/getProfile')
          this.$router.push({path: '/'})
        })
    },
    jump(){
      this.$router.push({path:'/register'})
    },
    google(){
    this.$gAuth.signIn()
      .then(GoogleUser => {
        this.$q.loading.show()
        this.isSignIn = this.$gAuth.isAuthorized
        let id_token = GoogleUser.getAuthResponse().id_token
        this.$store.dispatch('google',id_token)
          .then(_ => {
            console.log('masuk then google')
            this.$store.dispatch('users/getProfile')
            this.$router.push({path: '/'})
            this.$q.loading.hide()
              this.$q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'done',
              message: 'Logged in'
            })
          })
          .catch((error)=>{
            this.$q.loading.hide()
          console.log(error);
          this.$q.notify({
            color: 'red-4',
            textColor: 'white',
            icon: 'warning',
            message: `${error.data.message}`
          })
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
#loginCard{
  width: 40%;
  margin: 30px auto
}
#oauth{
  display: flex;
  flex-direction: column;
  margin: 10px 0 !important
}
</style>