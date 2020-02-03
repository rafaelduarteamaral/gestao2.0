<template>
  <div class="columns is-centered is-multiline">
    <div
      class="card column is-one-quarter"
      v-for="product in products.data.filter(prod => prod.name.toLowerCase().includes(searchTerm.toLowerCase()))"
      :key="product.id"
    >
      <products-component :product="product"></products-component>
    </div>
    <div class="section" v-if="products.data.length === 0">
      <p>{{ noProductLabel }}</p>
    </div>
  </div>
</template>

<script>
import ProductsComponent from '../Products'
import { getByTitle } from '../../filters'
import { mapGetters } from 'vuex'

export default {
  name: 'products-list-component',

  components: {
    'products-component': ProductsComponent
  },

  data() {
    return {
      id: '',
      noProductLabel: 'Nenhum produto disponível!',
      productsFiltered: []
    }
  },

  computed: {
    ...mapGetters({
      products: 'products',
      searchTerm: 'searchTerm'
    })
  },

  mounted() {
    this.fetchProducts()
  },

  methods: {
    fetchProducts() {
      this.$store.dispatch('fetchProducts')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  margin: 10px;
}
</style>
