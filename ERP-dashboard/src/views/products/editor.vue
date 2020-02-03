<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-form ref="form" v-model="formData" label-position="top">
        <el-col :span="17">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ formData.name ? formData.name : 'Novo Produto' }}</span>
            </div>
            <el-form-item label="Título">
              <el-input v-model="formData.name" placeholder="Título do Produto"/>
            </el-form-item>
            <el-form-item label="Descrição">
              <el-input
                v-model="formData.description"
                :rows="8"
                type="textarea"
                placeholder="Descrição do Produto"
              />
            </el-form-item>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header" @click="showMediaManager = true">
              <img
                :src=" formData.image ? formData.image.url : '/static/sem-imagem.png'"
                :alt=" formData.image ? formData.image.original_name : 'Sem Imagem'"
                :title=" formData.image ? formData.image.original_name : 'Clique para escolher uma imagem'"
              >
            </div>
            <el-form-item label="Preço de venda">
              <el-input-number
                v-model="formData.price"
                :precision="2"
                :controls="false"
                style="width:100%"
              />
            </el-form-item>
            <el-row>
              <el-button v-show="isEdit" type="danger" @click.prevent="showDeleteDialog = true">
                <i class="el-icon-delete"/>
              </el-button>
              <el-button type="primary" style="float:right" @click="handleSave">Salvar</el-button>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ formData.name ? formData.name : 'Novo Produto' }}</span>
            </div>
            <el-col :span="5">
              <el-form-item label="Categorias">
                <el-select v-model="formData.category_id" :remote-method="searchCategories" :loading="searching" placeholder="Buscar Categorias" filterable remote style="width:100%">
                  <el-option v-for="(item, index) in categoriesList" :key="index" :label="categoriesLabel(item)" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="NCM">
                <el-input v-model="formData.ncm" placeholder="NCM"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Tipo">
                <el-input v-model="formData.tipo" placeholder="Tipo"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Estoque mínimo">
                <el-input-number v-model="formData.estoqueMinimo" placeholder="Estoque mínimo"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Custo de compra">
                <el-input-number v-model="formData.custoCompras" :precision="2" :controls="false" style="width:100%"/>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <media-manager
      :visibility.sync="showMediaManager"
      :image="formData.image"
      @selectImage="changeImage"
    />
    <el-dialog :visible.sync="showDeleteDialog" title="Confirmação" center>
      <span>
        Tem certeza que deseja deletar o produto:
        <b>{{ formData.name }}</b>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click.prevent="showDeleteDialog = false">Cancelar</el-button>
        <el-button type="primary" @click.prevent="handleDestroy">Confirmar</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

const defaultForm = {
  id: undefined,
  name: '',
  description: '',
  image_id: undefined,
  price: undefined,
  titulo: '',
  category_id: '',
  ncm: '',
  tipo: '',
  estoqueMinimo: '',
  custoCompras: ''
}
export default {
  name: 'ProductEditor',

  components: { MediaManager },

  data() {
    return {
      isEdit: false,
      loading: false,
      categoriesList: [],
      searching: false,
      showMediaManager: false,
      showDeleteDialog: false,
      formData: Object.assign({}, defaultForm)
    }
  },

  computed: {
    ...mapGetters({
      product: 'currentProduct',
      categories: 'categories',
      category: 'currentCategory'
    })
  },

  created() {
    // Salva o nome da rota para evitar bugs nas abas de navegação
    this.tempRoute = Object.assign({}, this.$route)

    this.$route.params && this.$route.params.id
      ? (this.isEdit = true)
      : (this.isEdit = false)
  },

  mounted() {
    if (this.isEdit) {
      this.findProduct(this.$route.params.id)
    }
  },

  methods: {
    updateNavigationTab() {
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.name}`
      })
      this.$store.dispatch('updateVisitedView', route)
    },

    searchCategories(name) {
      this.searching = true
      this.$store.dispatch('fetchCategories', { name }).then(() => {
        this.searching = false
        this.categoriesList.push(...this.categories.data)
      })
    },

    categoriesLabel(categories) {
      return categories && categories.title ? `${categories.title}` : ''
    },

    deleteNavigationtab() {
      // deleta a tag de paginas visitadas
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.name}`
      })

      this.$store.dispatch('delVisitedView', route)
    },

    fillForm() {
      this.formData = Object.assign({}, this.product)
    },

    findProduct(id) {
      this.loading = true
      this.$store.dispatch('findProduct', id).then(() => {
        this.loading = false
        this.fillForm()
        this.updateNavigationTab()
      })
    },

    handleSave() {
      this.loading = true
      this.$store.dispatch('saveProduct', this.formData).then(() => {
        this.loading = false
        this.$message({
          message: 'Salvo com sucesso!',
          type: 'success',
          showClose: true,
          duration: 1000
        })
        this.fillForm()

        // Checa se o post acabou de ser criado e muda a rota
        if (!this.isEdit) {
          this.deleteNavigationtab()
          this.$router.push({
            name: 'EditProduct',
            params: { id: this.formData.id }
          })
        }

        this.updateNavigationTab()
      })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyProduct', this.formData.id).then(() => {
        this.$message({
          message: 'Produto Deletado!',
          type: 'warning',
          showClose: true,
          duration: 1000
        })

        this.deleteNavigationtab()
        this.$router.go(-1)
      })
    },

    changeImage(image) {
      this.formData.image_id = image.id
      this.formData.image = image
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}

.box-card-component {
  .box-card-header {
    position: relative;
    height: 270px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
      cursor: pointer;
    }
  }
}
</style>
