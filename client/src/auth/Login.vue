<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Iniciar Sesion</h1>
                <p class="text-muted">Introduce tus credenciales</p>
                <p v-if="dataRequired" class="text-danger">Data requerida</p>
                <p v-if="waiting" class="text-warning">{{waitingMessage}}</p>
                <p v-if="loginFailed" class="text-danger">{{loginFailedMessage}}</p>
                <p v-if="notResponse" class="text-danger">Servidor no responde, por favor intente mas tarde</p>
                <b-input-group class="mb-3">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                  <input type="text" v-model="email" @keyup.enter="loginUser" class="form-control" placeholder="Email">
                </b-input-group>
                <b-input-group class="mb-4">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                  <input type="password" v-model="password" @keyup.enter="loginUser" class="form-control" placeholder="Clave">
                </b-input-group>
                <b-row>
                  <b-col cols="12" class="text-right">
                    <b-button variant="primary" @click="loginUser" class="px-4">Iniciar</b-button>
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
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: '',
      dataRequired: false,
      loginFailed: false,
      loginFailedMessage: '',
      waiting: false,
      waitingMessage: 'Por favor espere...',
      notResponse: false
    }
  },
  methods: {
    loginUser () {
      if (this.email.trim() != '' && this.password.trim() != '') {
        this.waiting = true
        this.doLogin(this.email, this.password)
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
    doLogin (email, password) {
       this.$message({
              showClose: false,
              message: 'Conectando servicio...',
              type: 'info'
            });
      auth.login(email, password)
        .then(loogResp => {
          this.waiting = false
          if (loogResp[0] === 'success') {
            this.$router.replace('/dashboard')
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
