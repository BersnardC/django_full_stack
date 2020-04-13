<template>
  <div class="animated fadeIn">
    <b-row>
      <h1>Bienvenido: <b style="color: #36a4c9 !important">{{ current_user }}</b></h1>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  data: function () {
    return {
      current_user: localStorage.getItem('full_name'),
    }
  },
  methods: {
      }
}
</script>

<style>
  /* IE fix */
  #card-chart-01, #card-chart-02 {
    width: 100% !important;
  }
</style>
