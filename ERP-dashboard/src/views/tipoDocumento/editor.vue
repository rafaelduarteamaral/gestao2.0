<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>tipo de documento</span>
            </div>
            <el-col :span="5">
              <el-form-item label="Nome:">
                <el-input v-model="formData.nome" type="text"/>
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
    <!-- Confirmação de Deletar -->
    <el-dialog :visible.sync="showDeleteDialog" title="Confirmação" center>
      <span>
        Tem certeza que deseja deletar este tipo de documento?:
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
  cod_registro: '',
  nome: '',
  sigla: '',
  plano_de_contas: ''
}

import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'FabricanteEditor',

  components: { MediaManager },

  data() {
    return {
      loading: false,
      tempRoute: '',
      isEdit: false,
      formData: Object.assign({}, defaultForm),
      showMediaGallery: false,
      showDeleteDialog: false,
      showSettingsDialog: false,
      plano_de_contas: [
        {
          value: '1',
          label: '(4.01.001) Faturamento bruto - mensalidades'
        },
        {
          value: '2',
          label: '(4.01.002) Ajuste'
        },
        {
          value: '3',
          label: '(4.02.001) Lucro Investimentos'
        },
        {
          value: '4',
          label: '(5.01.001) Compras'
        },
        {
          value: '5',
          label: '(5.01.002) Ajuste'
        },
        {
          value: '6',
          label: '(5.02.001) Custo Mão de Obra'
        },
        {
          value: '7',
          label: '(5.02.002) Aluguel'
        },
        {
          value: '8',
          label: '(5.02.003) Água, Luz e Telefone'
        },
        {
          value: '9',
          label: '(5.02.004) Comissão'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      pagtipoDocumento: 'currenttipoDocumento'
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
      this.findtipoDocumento(this.$route.params.id)
    }
  },

  methods: {
    findtipoDocumento(id) {
      this.loading = true
      this.$store.dispatch('findtipoDocumento', id).then(() => {
        this.loading = false
        this.selecttipoDcoumento = this.pagtipoDocumento
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selecttipoDocumento)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('savetipoDocumento', this.prepareToSave(this.formData))
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
              name: 'EdittipoDocumento',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroytipoDocumento', this.formData.id).then(() => {
        this.$message({
          message: 'Tipo de Documento Deletado!',
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
      return {
        id: data.id,
        cod_registro: data.cod_registro,
        nome: data.nome,
        sigla: data.sigla,
        plano_de_contas: data.plano_de_contas
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

