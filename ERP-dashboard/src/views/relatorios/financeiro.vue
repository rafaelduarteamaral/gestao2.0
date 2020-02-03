<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-form ref="form" v-model="formData" label-position="top">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Relatorio Financeiro</span>
            </div>
            <el-col :span="15">
              <el-form-item label="Data para pesquisa">
                <el-date-picker v-model="valid_range" format="dd-MM-yyyy" type="daterange" range-separator="Até" start-placeholder="Data Inicial" end-placeholder="Data Final" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="24" style="margin-bottom: 20px;">
              <el-button type="primary" style="float:right" @click="fetch()">Gerar relatorio</el-button>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <el-row :gutter="20" style="padding-top:20px;">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header">
            <span>Relatorio Financeiro</span>
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
            <el-table-column label="Cliente/Fornecedor">
              <template slot-scope="scope">
                <span>{{ formatUserName(scope.row.user) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Status" prop="status"/>
            <el-table-column label="Total" prop="total"/>
            <el-table-column label="Tipo OP" prop="type"/>
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
            </el-table-column>
          </el-table>
          <pagination
            v-show="orders.pagination && orders.pagination.total && orders.pagination.total > 0"
            :total="orders.pagination && orders.pagination.total ? orders.pagination.total : 0"
            :page.sync="query.page"
            :limit.sync="query.limit"
            @pagination="fetch"
          />
        </el-card>
      </el-col>
    </el-row>
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
      valid_range: '',
      valid_until: '',
      valid_init: '',
      formData: '',
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
      this.valid_until = this.valid_range[1]
      this.valid_init = this.valid_range[2]

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
