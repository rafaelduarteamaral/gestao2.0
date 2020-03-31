<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo tipo de operacao</el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="tipoOperacaos.data ? tipoOperacaos.data.filter(data => !query.nome || data.id.toString().includes(query.nome.toLowerCase()) || data.nome.toLowerCase().includes(query.nome.toLowerCase()) || data.conta.toLowerCase().includes(query.nome.toLowerCase()) || data.agencia.toLowerCase().includes(query.nome.toLowerCase()) ) : [] "
        fit
        empty-text="Nenhum tipo de operacao encontrado"
      >
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="Nome">
          <template slot-scope="scope">
            <span>{{ `${scope.row.nome}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Codigo" prop="codigo"/>
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
        v-show="tipoOperacaos.pagination.total && tipoOperacaos.pagination.total > 0"
        :total="tipoOperacaos.pagination.total ? tipoOperacaos.pagination.total : 0"
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
  name: 'TipoOperacaoListing',

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
      tipoOperacaos: 'tipoOperacaos'
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
      this.$store.dispatch('fetchTipoOperacaos', this.query).then(() => {
        this.loading = false
      })
    },

    handleCreate() {
      this.$router.push({ name: 'NewTipoOperacao' })
    },

    handleEdit(id) {
      this.$router.push({ name: 'EditTipoOperacao', params: { id }})
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

