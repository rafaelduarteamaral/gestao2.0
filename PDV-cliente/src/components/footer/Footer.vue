<template>
  <div class="footer">
    <div class="columns container">
      <div class="column">
        <p>PDV</p>
      </div>
      <div class="column has-text-right">
        <p>PDV Client | Feito com ❤</p>
        <p>API URL {{base_url}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footer-component',

  data() {
    return {
      base_url: process.env.VUE_APP_API_URL
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: #b9e2fc;
  color: black;
}
</style>
