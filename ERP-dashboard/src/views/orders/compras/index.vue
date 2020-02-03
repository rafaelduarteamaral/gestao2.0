<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Pedido</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="
        orders.data ?
          orders.data.filter(data => !query.order_id ||
            data.id.toString().includes(query.order_id) ||
            (data.user && data.user.email.includes(query.order_id)) ||
            (data.user && data.user.name.toLowerCase().includes(query.order_id)) ||
          (data.user && data.user.surname.toLowerCase().includes(query.order_id)))
      : []"
      fit
      empty-text="Nenhum Pedido foi encontrado!"
    >
      <el-table-column label="ID" prop="id" width="60"/>
      <el-table-column label="Cliente">
        <template slot-scope="scope">
          <span>{{ formatUserName(scope.row.user) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Status" prop="status"/>
      <el-table-column label="Total" prop="total"/>
      <el-table-column label="Data" prop="date"/>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="query.order_id"
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
      v-show="orders.pagination && orders.pagination.total && orders.pagination.total > 0"
      :total="orders.pagination && orders.pagination.total ? orders.pagination.total : 0"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="fetch"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'OrdersListing',

  components: { Pagination },

  data() {
    return {
      loading: false,
      query: {
        order_id: undefined,
        page: 1,
        limit: 10,
        include: 'user'
      }
    }
  },

  computed: {
    ...mapGetters({
      orders: 'orders'
    })
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
      return this.$store
        .dispatch('fetchOrders', this.query)
        .then(() => (this.loading = false))
    },

    handleCreate() {
      this.$router.push({ name: 'novaCompra' })
    },

    handleEdit(id) {
      // eslint-disable-next-line
      this.$router.push({ name: 'EditarCompra', params: { id } })
    },

    formatUserName(user) {
      return user && user.name ? `${user.name} ${user.surname}` : ''
    },

    handleClearSearch() {
      this.query.order_id = undefined
      this.fetch()
    },

    updateQueryParameters() {
      this.query.type = 'buy'
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
