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
              <span>Cabeçalho</span>
            </div>
            <el-col :span="4">
              <el-form-item label="Codigo de barras">
                <el-input v-model="formData.codigoBarras" placeholder="Codigo de barras"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Lista serviço">
                <el-input v-model="formData.listaServico" placeholder="Lista de servico"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="NCM">
                <el-input v-model="formData.ncm" placeholder="NCM"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Marca">
                <el-input v-model="formData.marca" placeholder="marca"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Endereco">
                <el-input v-model="formData.endereco" placeholder="Endereco"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Material">
                <el-input v-model="formData.material" placeholder="Material"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Operação entrada">
                <el-input v-model="formData.operacaoEntrada" placeholder="Operação entrada"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Operação saída">
                <el-input v-model="formData.operacaoSaida" placeholder="Operação saída"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Nº série">
                <el-input v-model="formData.nSerie" placeholder="Nº série"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Categorias">
                <el-select v-model="formData.category_id" :remote-method="searchCategories" :loading="searching" placeholder="Buscar Categorias" filterable remote style="width:100%">
                  <el-option v-for="(item, index) in categoriesList" :key="index" :label="categoriesLabel(item)" :value="item.id"/>
                </el-select>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="24" style="margin-top:20px">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>Formação de preço</span>
            </div>
            <el-col :span="5">
              <el-form-item label="% Margem valor agregado ">
                <el-input-number v-model="formData.margemValorAgregado" :precision="2" :controls="false" style="width:100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Saldo estoque">
                <el-input-number v-model="formData.saldoEstoque" :controls="true" style="width:100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Valor estoque">
                <el-input-number v-model="formData.valorEstoque" :precision="2" :controls="false" style="width:100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Estoque mínimo*">
                <el-input-number v-model="formData.estoqueMinimo" :controls="true" style="width:100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Perc. comissão">
                <el-input-number v-model="formData.precoComissao" :precision="2" :controls="false" style="width:100%"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Custo compra">
                <el-input-number v-model="formData.custoCompra" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ICMS compra">
                <el-input-number v-model="formData.icmsCompra" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="IPI compra">
                <el-input-number v-model="formData.ipiCompra" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Custo frete">
                <el-input-number v-model="formData.custoFrete" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Preço FOB">
                <el-input-number v-model="formData.precoFob" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Markup">
                <el-input-number v-model="formData.markup" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Preço venda">
                <el-input-number v-model="formData.precoVenda" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ICMS médio vd.">
                <el-input-number v-model="formData.icmsMedioVd" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="% IPI venda ">
                <el-input-number v-model="formData.ipiVenda" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Média descontos">
                <el-input-number v-model="formData.mediaDescontos" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Acréscimos">
                <el-input-number v-model="formData.acrescimos" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="% Margem lucro">
                <el-input-number v-model="formData.margemLucro" :precision="2" :controls="false" style="width:100%" @change="calculoFinal"/>
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
  codigoBarras: '',
  listaServico: '',
  ncm: '',
  marca: '',
  endereco: '',
  material: '',
  operacaoEntrada: '',
  operacaoSaida: '',
  nSerie: '',
  margemValorAgregado: '',
  saldoEstoque: '',
  valorEstoque: '',
  estoqueMinimo: '',
  precoComissao: '',
  custoCompra: '',
  icmsCompra: '',
  ipiCompra: '',
  custoFrete: '',
  precoFob: '',
  markup: '',
  precoVenda: '',
  icmsMedioVd: '',
  ipiVenda: '',
  mediaDescontos: '',
  acrescimos: '',
  margemLucro: '',
  category_id: ''
}
export default {
  name: 'ProductEditor',

  components: { MediaManager },

  data() {
    return {
      isEdit: false,
      loading: false,
      lucro: 0,
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
    },

    calculoFinal() {
      this.formData.precoFob = this.formData.custoCompra - this.formData.icmsCompra - this.formData.ipiCompra + this.formData.custoFrete
      this.formData.precoVenda = this.formData.precoFob + this.formData.markup
      this.lucro = this.formData.precoVenda - this.formData.custoCompra
      this.formData.margemLucro = (((this.lucro / this.formData.precoFob)) * 100) - this.formData.icmsMedioVd - this.formData.mediaDescontos - this.formData.acrescimos
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
