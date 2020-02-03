<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Nova Categoria</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="orderedCategories.filter(data => !query.title || data.title.toLowerCase().includes(query.title.toLowerCase()))"
      fit
    >
      <el-table-column label="ID" prop="id" width="60"/>
      <el-table-column label="Nome" prop="title"/>
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
            @keyup.enter.native="handleSearch"
            @clear="handleClearSearch"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row.id)">Editar</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="categories.pagination.total && categories.pagination.total > 0"
      :total="categories.pagination.total ? categories.pagination.total : 0"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="fetch"
    />
    <el-dialog
      :visible.sync="dialogVisible"
      :title="`${isEdit ? 'Editar' : 'Criar'} Categoria`"
      width="50%"
    >
      <el-dialog :visible.sync="innerVisible" width="50%" title="Confirmação" append-to-body center>
        <span>
          Tem certeza que deseja deletar a categoria:
          <b>{{ formData.title }}</b>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">Cancelar</el-button>
          <el-button type="primary" @click="handleDelete">Confirmar</el-button>
        </span>
      </el-dialog>
      <el-col :span="7">
        <div class="category-thumb" @click="mediaManager = true">
          <img
            :src="formData.image && formData.image.url ? formData.image.url : '/static/sem-imagem.png'"
            :alt="formData.image && formData.image.original_name ? formData.image.original_name : 'Sem Imagem' "
            class="category-image"
          >
        </div>
      </el-col>
      <el-col :span="16" :push="1">
        <el-form ref="form" :model="formData">
          <el-form-item label="Título">
            <el-input v-model="formData.title" placeholder="Nome da Categoria"/>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="formData.description" type="textarea" placeholder="Descrição"/>
          </el-form-item>
        </el-form>
      </el-col>
      <span slot="footer" class="dialog-footer">
        <el-button
          v-if="formData.id"
          type="danger"
          style="float:left;"
          @click="innerVisible = true"
        >Deletar</el-button>
        <el-button @click="dialogVisible = false">Cancelar</el-button>
        <el-button type="primary" @click="handleSave">Confirmar</el-button>
      </span>
    </el-dialog>
    <media-manager
      :visibility.sync="mediaManager"
      :image="formData.image"
      @selectImage="changeImage"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { orderBy } from 'lodash'
import MediaManager from '@/components/MediaManager'

const defaultForm = {
  title: '',
  description: ''
}

export default {
  name: 'CategoriesListing',

  components: { Pagination, MediaManager },

  data() {
    return {
      query: {
        title: undefined,
        page:
          this.categories && this.categories.pagination.page
            ? this.categories.pagination.page
            : 1,
        limit: 10
      },
      loading: false,
      dialogVisible: false,
      innerVisible: false,
      mediaManager: false,
      formData: this.category ? this.category : {},
      isEdit: false
    }
  },

  computed: {
    ...mapGetters({
      categories: 'categories',
      category: 'currentCategory'
    }),
    orderedCategories() {
      return orderBy(this.categories.data, 'id')
    }
  },

  created() {
    if (this.$route.query && this.$route.query.page) {
      this.query.page = parseInt(this.$route.query.page)
    }
  },

  mounted() {
    this.fetch()

    this.formData = Object.assign({}, defaultForm)
  },

  methods: {
    fetch() {
      this.loading = true
      this.updateQueryParameters()
      return this.$store.dispatch('fetchCategories', this.query).then(() => {
        this.loading = false
      })
    },

    handleSearch() {
      this.loading = true
      this.fetch().then(() => (this.loading = false))
    },

    handleClearSearch() {
      this.query.title = undefined
      this.loading = true
      this.fetch().then(() => (this.loading = false))
    },

    handleEdit(id) {
      this.isEdit = true
      this.loading = true
      this.$store.dispatch('findCategory', id).then(() => {
        this.formData = Object.assign({}, this.category)
        this.loading = false
        this.dialogVisible = true
      })
    },

    handleCreate() {
      this.isEdit = false
      this.formData = Object.assign({}, defaultForm)
      this.dialogVisible = true
    },

    handleSave() {
      this.loading = true
      this.$store.dispatch('saveCategory', this.formData).then(() => {
        this.loading = false
        this.$message({
          message: 'Salvo com sucesso!',
          type: 'success',
          showClose: true,
          duration: 10000
        })
        this.formData = Object.assign({}, this.category)
        this.isEdit = true
      })
    },

    handleDelete() {
      this.loading = true
      this.$store.dispatch('destroyCategory', this.formData.id).then(() => {
        this.loading = false
        this.innerVisible = false
        this.dialogVisible = false
        this.$message({
          message: 'Deletado com sucesso!',
          type: 'warning',
          showClose: true,
          duration: 1000
        })
      })
    },

    changeImage(image) {
      this.formData.image_id = image.id
      this.formData.image = image
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
<style scoped>
.category-thumb {
  cursor: pointer;
}
img.category-image {
  width: 100%;
  height: 1000%;
}

.product-tumbnail img {
  height: 64px;
  width: 64px;
}
</style>

