/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do Unidade</span>
            </div>
            <el-col :span="20">
              <el-form-item label="Nome:">
                <el-input v-model="formData.nome" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Abreviatura">
                <el-input v-model="formData.abreviatura" type="text" />
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <el-button v-show="isEdit" class="buttonDelete" type="danger" @click.prevent="showDeleteDialog = true">
      <i class="el-icon-delete"/>
    </el-button>
    <el-button type="primary" style="float:right; margin-top: 20px;" @click="handleSave">Salvar</el-button>
    <!-- galeria de imagens -->
    <media-manager
      :visibility.sync="showMediaGallery"
      :image="formData.image"
      @selectImage="changeImage"
    />
    <!-- Confirmação de Deletar -->
    <el-dialog :visible.sync="showDeleteDialog" title="Confirmação" center>
      <span>
        Tem certeza que deseja deletar está forma de pagamento:
        <b>{{ formData.nome }}</b>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click.prevent="showDeleteDialog = false">Cancelar</el-button>
        <el-button type="primary" @click.prevent="handleDestroy">Confirmar</el-button>
      </span>
    </el-dialog>
    <!-- Modal para Resetar a Senha -->
    <el-dialog :visible.sync="showSettingsDialog" title="Opções">
      <span>Deseja resetar a senha deste usuário?</span>
    </el-dialog>
    <pre>{{ formData.data }}</pre>
  </div>
</template>
<script>
const defaultForm = {
  id: undefined,
  nome: '',
  abreviatura: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'UnidadeEditor',

  components: { MediaManager },

  data() {
    return {
      loading: false,
      tempRoute: '',
      isEdit: false,
      formData: Object.assign({}, defaultForm),
      showMediaGallery: false,
      showDeleteDialog: false,
      showSettingsDialog: false
    }
  },

  computed: {
    ...mapGetters({
      pagUnidade: 'currentUnidade'
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
      this.findUnidade(this.$route.params.id)
    }
  },

  methods: {
    findUnidade(id) {
      this.loading = true
      this.$store.dispatch('findUnidade', id).then(() => {
        this.loading = false
        this.selectUnidade = this.pagUnidade
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectUnidade)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveUnidade', this.prepareToSave(this.formData))
        .then(() => {
          this.loading = false
          this.$message({
            message: 'Salvo com sucesso!',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          if (!this.isEdit) {
            this.deleteNavigationtab()
            this.$router.push({
              name: 'EditUnidade',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyUnidade', this.formData.id).then(() => {
        this.$message({
          message: 'Unidade Deletado!',
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

    /**
     * Formata os dados que serão enviados para o servidor
     */
    prepareToSave(data) {
      console.log(data)
      return {
        id: data.id,
        nome: data.nome,
        abreviatura: data.abreviatura
      }
    },

    /**
     * Métodos para gerenciar as abas de navegação no topo da pagina
     */
    updateNavigationTab() {
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.nome}`
      })
      this.$store.dispatch('updateVisitedView', route)
    },

    deleteNavigationtab() {
      // deleta a tag de paginas visitadas
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.nome}`
      })

      this.$store.dispatch('delVisitedView', route)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.buttonDelete {
  margin-top: 16px;
}
</style>

