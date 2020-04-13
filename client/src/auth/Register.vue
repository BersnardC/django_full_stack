<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Nuevo Registro</h1>
                <p class="text-muted">Introduce tus datos</p>
                <p v-if="dataRequired" class="text-danger">Data requerida</p>
                <p v-if="waiting" class="text-warning">{{waitingMessage}}</p>
                <p v-if="loginFailed" class="text-danger">{{loginFailedMessage}}</p>
                <p v-if="notResponse" class="text-danger">Servidor no responde, por favor intente mas tarde</p>
                <b-input-group class="mb-3">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                  <input type="text" v-model="email" @keyup.enter="createUser" class="form-control" placeholder="Email">
                </b-input-group>
                <b-input-group class="mb-3">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="fa fa-map"></i></span></div>
                  <input type="text" v-model="country" @keyup.enter="createUser" class="form-control" placeholder="País">
                </b-input-group>
                <b-input-group class="mb-4">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                  <input type="password" v-model="password" @keyup.enter="createUser" class="form-control" placeholder="Clave">
                </b-input-group>
                <b-input-group class="mb-4">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                  <input type="password" v-model="repass" @keyup.enter="createUser" class="form-control" placeholder="Repita Clave">
                </b-input-group>
                <b-row>
                  <b-col cols="12" class="text-right">
                    <router-link class="btn btn-info pull-left" to="/login">Volver al Login</router-link>
                    <b-button variant="primary" @click="createUser" class="px-4">Registrar</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// Auth service
import auth from './auth'
export default {
  name: 'Register',
  data: function() {
    return {
      email: '',
      password: '',
      repass: '',
      country: '',
      dataRequired: false,
      loginFailed: false,
      loginFailedMessage: '',
      waiting: false,
      waitingMessage: 'Por favor espere...',
      notResponse: false
    }
  },
  methods: {
    createUser () {
      if (this.email.trim() != '' && this.password.trim() != '' && this.country.trim() != '' && this.repass.trim() != '') {
        
        if (this.password == this.repass) {
          this.waiting = true
          this.doRegister(this.email, this.password, this.country)
        } else {
          this.$message({
              showClose: false,
              message: 'Contraseñas no coinciden',
              type: 'error'
            });
        }        
      } else {
        this.dataRequired = true
        this.cleanDataRequired()
      }
    },
    cleanDataRequired () {
      setTimeout(
        () => {
          this.dataRequired = !this.dataRequired
        }, 2000)
    },
    doRegister (email, password, country) {
      this.$message({
              showClose: false,
              message: 'Enviando datos',
              type: 'info'
            });
      let obj = {
        'user': {
          'email': email,
          'password': password,
          'country': country
        }
      }
      auth.register(obj)
        .then(loogResp => {
          this.waiting = false
          if (loogResp[0] === 'success') {
            this.$message({
              showClose: false,
              message: 'Registro Exitoso, puede iniciar sesión',
              type: 'success'
            });
            this.country = '';
            this.email = '';
            this.password = '';
            this.repass = '';
          } else {
              this.loginFailed = true
              this.loginFailedMessage = loogResp[1] 
              setTimeout(
              () => {
                this.loginFailed = false
              }, 3000)          
          }
        })
        .catch(error => {
          this.waiting = false
          this.notResponse = true
          setTimeout(
            () => {
              this.notResponse = false
            }, 3000)
        })
    },
  }
}
</script>
