<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Panejamento Financeiro</el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="planejamentoFinanceiros.data ? planejamentoFinanceiros.data.filter(data => !query.nome || data.id.toString().includes(query.nome.toLowerCase()) || data.conta_financeira.toLowerCase().includes(query.nome.toLowerCase()) || data.centro_custo.toLowerCase().includes(query.nome.toLowerCase()) || data.data_inicial.toLowerCase().includes(query.nome.toLowerCase()) || data.data_final.toLowerCase().includes(query.nome.toLowerCase()) || data.bloq_movimento.toLowerCase().includes(query.nome.toLowerCase()) || data.valor.toLowerCase().includes(query.nome.toLowerCase()) ) : [] "
        fit
        empty-text="Nenhum movimento Planejamento Financeiro"
      >
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="Conta">
          <template slot-scope="scope">
            <span>{{ `${scope.row.conta_financeira}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Centro de Custo">
          <template slot-scope="scope">
            <span>{{ `${scope.row.centro_custo}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Data Inicial">
          <template slot-scope="scope">
            <span>{{ `${scope.row.data_inicial}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Data Final">
          <template slot-scope="scope">
            <span>{{ `${scope.row.data_final}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Movimento">
          <template slot-scope="scope">
            <span>{{ `${scope.row.bloq_movimento}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Valor">
          <template slot-scope="scope">
            <span>{{ `${scope.row.valor}` }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="query.nome"
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
        v-show="planejamentoFinanceiros.pagination.total && planejamentoFinanceiros.pagination.total > 0"
        :total="planejamentoFinanceiros.pagination.total ? planejamentoFinanceiros.pagination.total : 0"
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
  name: 'PlanejamentoFinanceiroListing',

  components: { Pagination },

  data() {
    return {
      loading: false,
      query: {
        nome: undefined,
        page: 1, // pagina atual, na busca paginada
        limit: 10 // quantos itens você desejar buscar por página
      }
    }
  },

  computed: {
    ...mapGetters({
      planejamentoFinanceiros: 'planejamentoFinanceiros'
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
      this.$store.dispatch('fetchPlanejamentoFinanceiros', this.query).then(() => {
        this.loading = false
      })
    },

    handleCreate() {
      this.$router.push({ name: 'NewPlanejamentoFinanceiro' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditPlanejamentoFinanceiro', params: { id }})
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

