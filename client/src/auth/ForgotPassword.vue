

<template>

  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="4">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Forgot Password</h1>
                <b-row>
                  <b-col cols="12">
                    <b-input-group class="mb-3">
                      <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-at"></i></span></div>
                      <input type="email" v-model="user" class="form-control" required placeholder="Enter your Email or Phone Number">
                    </b-input-group>
                  </b-col>
             <!--     <b-col cols="12">
                    <div class="row">
                          <my-captcha v-if="show" :callSuccess="captchaBtn" color="gray"></my-captcha>
                    </div>
                  </b-col> -->
                </b-row>
                <b-col cols="12" class="text-right">
                  <b-btn size="md" variant="secondary" @click="$router.push('/')" class="float-left">Cancel</b-btn>
               <!--   <b-btn size="md" variant="primary" v-bind:disabled="btndis" @click="getUser" class="float-right">Reset Password</b-btn> -->
                  <b-btn size="md" variant="primary" @click="getUser" class="float-right">Reset Password</b-btn>
                </b-col>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>

  </div>
</template>

<script>
// import users_service from './users_service'
import roles_service from '../views/roles/roles_service'
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
// Auth service
import auth from './auth'
// import myCaptcha from 'vue-captcha'

Vue.use(VueSweetalert2)

export default {
  name: 'Login',
 // props: {
 // captchaBtn () {
 // console.log('captcha ok.!') }
 // },
 // components: {
  //  'my-captcha': myCaptcha
  // },
  data: function () {
    return {
      user: '',
      password: '',
      dataRequired: false,
      loginFailed: false,
      loginFailedMessage: '',
      waiting: false,
      waitingMessage: 'Please wait...',
      notResponse: false,
      roles: [],
      selectedRole: null,
      ForgotPassword:false,
      model:{
            first_name :'',
            last_name : '',
						usename : '',
            email : '',
            role_id : null
      },
  //    btndis: true,
      show : true
    }
  },
  methods: {
    getUser () {
      if (this.user.trim()) {
		    	auth.getUser(this.user)
		    		.then(data => {
              if (data[0]=='success') {
                this.$swal( { title: data[1],
                              text:  data[2],
                              type: 'success',
                              showCancelButton: false})
              }
              else {
                this.$swal( { title: data[1],
                              text:  data[2],
                              type: 'warning',
                              showCancelButton: false})
              }
		    		})
            .catch(error => {
              this.$swal('Error', 'Server not response. ' + error, 'error')
			      })
      } else { this.$swal( {  title: 'Opss!',
                              text:  'Email Required',
                              type: 'warning',
                              showCancelButton: false}
                              )
            //    btndis: true
      }

    },
  }
}
</script>
<!--
<style scope>
  .row {
    margin: 60px;
  }

</style>  -->
