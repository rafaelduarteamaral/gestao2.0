/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do CstOrigem</span>
            </div>
            <el-col :span="8">
              <el-form-item label="Nome:">
                <el-input v-model="formData.nome" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Aliquota">
                <el-select v-model="formData.estado" style="width:100%">
                  <el-option
                    v-for="estado in Estados"
                    :key="estado.value"
                    :label="estado.label"
                    :value="estado.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Estado">
                <el-input v-model="formData.estado" type="text" />
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
  estado: '',
  aliquota: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'CstOrigemEditor',

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
      Estados: [
        {
          label: 'Acre',
          value: '8'
        },
        {
          label: 'Alagoas',
          value: '9'
        },
        {
          label: 'Amapá',
          value: '11'
        },
        {
          label: 'Amazonas',
          value: '10'
        },
        {
          label: 'Bahia',
          value: '12'
        },
        {
          label: 'Ceará',
          value: '13'
        },
        {
          label: 'Distrito Federal',
          value: '14'
        },
        {
          label: 'Espírito Santo',
          value: '15'
        },
        {
          label: 'EXTERIOR',
          value: '48'
        },
        {
          label: 'Goiás',
          value: '16'
        },
        {
          label: 'Maranhão',
          value: '17'
        },
        {
          label: 'Mato Grosso',
          value: '20'
        },
        {
          label: 'Mato Grosso do Sul',
          value: '19'
        },
        {
          label: 'Minas Gerais',
          value: '18'
        },
        {
          label: 'Pará',
          value: '21'
        },
        {
          label: 'Pernambuco',
          value: '23'
        },
        {
          label: 'Piaui',
          value: '24'
        },
        {
          label: 'Rio de Janeiro',
          value: '25'
        },
        {
          label: 'Rio Grande do Norte',
          value: '26'
        },
        {
          label: 'Rio Grande do Sul',
          value: '7'
        },
        {
          label: 'Rondônia',
          value: '27'
        },
        {
          label: 'Roraima',
          value: '28'
        },
        {
          label: 'Santa Catarina',
          value: '1'
        },
        {
          label: 'São Paulo',
          value: 'Sergipe'
        },
        {
          label: 'Tocantins',
          value: '30'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      pagCstOrigem: 'currentCstOrigem'
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
      this.findCstOrigem(this.$route.params.id)
    }
  },

  methods: {
    findCstOrigem(id) {
      this.loading = true
      this.$store.dispatch('findCstOrigem', id).then(() => {
        this.loading = false
        this.selectCstOrigem = this.pagCstOrigem
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectCstOrigem)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveCstOrigem', this.prepareToSave(this.formData))
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
              name: 'EditCstOrigem',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyCstOrigem', this.formData.id).then(() => {
        this.$message({
          message: 'Usuário Deletado!',
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
        nome: data.nome,
        estado: data.estado,
        aliquota: data.aliquota
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

