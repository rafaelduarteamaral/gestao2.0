<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Nova Condição de Pagamento</el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="condicaoPagamentos.data ? condicaoPagamentos.data.filter(data => !query.name || data.id.toString().includes(query.name.toLowerCase()) || data.name.toLowerCase().includes(query.name.toLowerCase()) || data.desconto.toLowerCase().includes(query.name.toLowerCase()) ) : [] "
        fit
        empty-text="Nenhuma Condição de pagamento foi encontrada!"
      >
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="Nome">
          <template slot-scope="scope">
            <span>{{ `${scope.row.nome}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="% Desconto no PDV">
          <template slot-scope="scope">
            <span>{{ `${scope.row.desconto}` }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="query.name"
              :key="scope.row ? scope.row.id : ''"
              size="mini"
              placeholder="Filtrar"
              clearable
              @keyup.enter.native="fetch"
              @clear="handleClearSearch"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">Editar</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination
        v-show="condicaoPagamentos.pagination.total && condicaoPagamentos.pagination.total > 0"
        :total="condicaoPagamentos.pagination.total ? condicaoPagamentos.pagination.total : 0"
        :page.sync="query.page"
        :limit.sync="query.limit"
        @pagination="fetch"
      />
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Pagination from '@/components/Pagination'

export default {
  name: 'CondicaoPagamentoListing',

  components: { Pagination },

  data() {
    return {
      loading: false,
      query: {
        name: undefined,
        page: 1, // pagina atual, na busca paginada
        limit: 10 // quantos itens você desejar buscar por página
      }
    }
  },

  computed: {
    ...mapGetters({
      condicaoPagamentos: 'condicaoPagamentos'
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
      this.$store.dispatch('fetchCondicaoPagamentos', this.query).then(() => {
        this.loading = false
      })
    },

    handleCreate() {
      this.$router.push({ name: 'NewCondicaoPagamento' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditCondicaoPagamento', params: { id }})
    },

    handleClearSearch() {
      this.query.name = undefined
      this.fetch()
    },

    updateQueryParameters() {
      if (this.query.page > 1) {
        this.$router.replace({ query: { page: this.query.page }})
      } else if (this.query.page === 1) {
        this.$router.replace({ query: {}})
      }
    }
  }
}
</script>

