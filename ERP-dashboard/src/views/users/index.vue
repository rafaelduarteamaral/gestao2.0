<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Usuário</el-button>
    </div>
    <el-row>
      <el-table
        v-loading="loading"
        :data="users.data ? users.data.filter(data => !query.name || data.id.toString().includes(query.name.toLowerCase()) || data.name.toLowerCase().includes(query.name.toLowerCase()) || data.surname.toLowerCase().includes(query.name.toLowerCase()) || data.email.toLowerCase().includes(query.name.toLowerCase()) ) : [] "
        fit
        empty-text="Nenhum Usuário foi encontrado!"
      >
        <el-table-column label="ID" prop="id" width="60"/>
        <el-table-column label="Nome">
          <template slot-scope="scope">
            <span>{{ `${scope.row.name} ${scope.row.surname}` }}</span>
          </template>
        </el-table-column>
        <el-table-column label="E-mail" prop="email"/>
        <el-table-column label="Cadastro" prop="created_at"/>
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
        v-show="users.pagination.total && users.pagination.total > 0"
        :total="users.pagination.total ? users.pagination.total : 0"
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
  name: 'UsersListing',

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
      users: 'users'
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
      this.$store.dispatch('fetchUsers', this.query).then(() => {
        this.loading = false
      })
    },

    handleCreate() {
      this.$router.push({ name: 'NewUser' })
    },

    handleEdit(id) {
      /* eslint-disable-next-line */
      this.$router.push({ name: 'EditUser', params: { id } })
    },

    handleClearSearch() {
      this.query.name = undefined
      this.fetch()
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
