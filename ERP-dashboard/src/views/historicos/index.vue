<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Historico</el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="historicos.data ? historicos.data.filter(data => !query.texto || data.id.toString().includes(query.texto.toLowerCase()) || data.texto.toLowerCase().includes(query.texto.toLowerCase()) || data.conta.toLowerCase().includes(query.texto.toLowerCase()) || data.agencia.toLowerCase().includes(query.texto.toLowerCase()) ) : [] "
        fit
        empty-text="Nenhum Historico encontrado"
      >
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="texto">
          <template slot-scope="scope">
            <span>{{ `${scope.row.texto}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Ativo">
          <template slot-scope="scope">
            <span>{{ `${scope.row.ativo == 1 ? 'Sim': 'Não'}` }}</span>
          </template>
        </el-table-column>
        <el-table-column align="right" width="200">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="query.texto"
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
        v-show="historicos.pagination.total && historicos.pagination.total > 0"
        :total="historicos.pagination.total ? historicos.pagination.total : 0"
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
  name: 'HistoricoListing',

  components: { Pagination },

  data() {
    return {
      loading: false,
      query: {
        texto: undefined,
        page: 1, // pagina atual, na busca paginada
        limit: 10 // quantos itens você desejar buscar por página
      }
    }
  },

  computed: {
    ...mapGetters({
      historicos: 'historicos'
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
      this.$store.dispatch('fetchHistoricos', this.query).then(() => {
        this.loading = false
      })
    },

    handleCreate() {
      this.$router.push({ name: 'NewHistorico' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditHistorico', params: { id }})
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

