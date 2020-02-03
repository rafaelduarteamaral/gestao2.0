<template>
  <p class="control has-icons-left">
    <input
      class="input is-rounded"
      type="text"
      v-model="value"
      placeholder="buscar"
      @keyup="search(value)"
    >
    <span class="icon is-small is-left">
      <i class="fas fa-search"></i>
    </span>
  </p>
</template>

<script>
export default {
  name: 'search-component',
  data() {
    return {
      value: ''
    }
  },

  methods: {
    search(value) {
      this.$store.dispatch('localSearch', value)
    }
  }
}
</script>

