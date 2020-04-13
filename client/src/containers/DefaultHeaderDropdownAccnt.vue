<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/profile.png"
        class="img-avatar"
        alt="admin@bootstrapmaster.com" />
        <span class="active">{{  current_user }} </span>
        <span class="fa fa-sort-desc" style="margin-right: 8px;"></span>
    </template>
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Cuenta</strong></b-dropdown-header>
      <!--b-dropdown-item><i class="fa fa-user" /> Perfil </b-dropdown-item-->
      <b-dropdown-item @click="logout"><i class="fa fa-lock"></i> Salir</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import auth from '../auth/auth'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      current_user: localStorage.getItem('full_name'),
      //userID : localStorage.getItem('user_id')
    }
  },
  methods: {
      getProfile() {
        //this.$router.push('/profile/' + this.userID)
      },
      logout() {
        this.$message({
              showClose: false,
              message: 'Desconectando...',
              type: 'info'
            });
      this.$router.push('/logout')
        // auth.desconnect_session()
        //   .then(result => {
        //     this.$router.push('/logout')
        //   })
      }
    }
}
</script>
