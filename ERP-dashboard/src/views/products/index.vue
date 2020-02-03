<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Produto</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="products.data ? products.data.filter(data => !query.title || data.name.toLowerCase().includes(query.title.toLowerCase())) : []"
      fit
    >
      <el-table-column label="ID" prop="id" width="60"/>
      <el-table-column label="Nome" prop="name"/>
      <el-table-column label="Preço" prop="price"/>
      <el-table-column label="Imagem">
        <template slot-scope="scope">
          <div class="product-tumbnail">
            <img
              :src="scope.row.image && scope.row.image.url ? scope.row.image.url : '/static/sem-imagem.png'"
              :alt="scope.row.image && scope.row.image.orginal_name ? scope.row.image.orginal_name : 'Sem Imagem'"
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="query.title"
            :key="scope.row ? scope.row.id : ''"
            size="mini"
            placeholder="Filtrar"
            clearable
            @keyup.enter.native="fetch"
            @clear="handleClearSearch"
          />
        </template>
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">Editar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="products.pagination && products.pagination.total && products.pagination.total > 0"
      :total="products.pagination && products.pagination.total ? products.pagination.total : 0"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="fetch"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
export default {
  name: 'ProductsListing',

  components: { Pagination },

  data() {
    return {
      query: {
        title: undefined,
        page:
          this.products && this.products.pagination.page
            ? this.products.pagination.page
            : 1,
        limit: 10
      },
      loading: false
    }
  },

  computed: {
    products() {
      return this.$store.getters.products
    }
  },

  created() {
    if (this.$route.query && this.$route.query.page) {
      this.query.page = parseInt(this.$route.query.page)
    }
  },

  mounted() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.loading = true
      this.updateQueryParameters()
      this.$store.dispatch('fetchProducts', this.query).then(() => {
        this.loading = false
      })
    },

    handleClearSearch() {
      this.query.title = undefined
      this.fetch()
    },

    handleCreate() {
      this.$router.push({ name: 'NewProduct' })
    },

    handleEdit(id) {
      // eslint-disable-next-line
      this.$router.push({ name: 'EditProduct', params: { id } })
    },

    updateQueryParameters() {
      if (this.query.page > 1) {
        // eslint-disable-next-line
        this.$router.replace({ query: { page: this.query.page } })
      } else if (this.query.page === 1) {
        // eslint-disable-next-line
        this.$router.replace({ query: {} })
      }
    }
  }
}
</script>
<style>
.product-tumbnail img {
  height: 64px;
  width: 64px;
}
</style>
