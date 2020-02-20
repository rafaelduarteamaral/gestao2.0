/* eslint-disable no-mixed-spaces-and-tabs */
<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do Banco</span>
            </div>
            <el-col :span="5">
              <el-form-item label="Banco:">
                <el-select v-model="formData.banco">
                  <el-option
                    v-for="banco in banco"
                    :key="banco.value"
                    :label="banco.label"
                    :value="banco.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Agencia:">
                <el-input v-mask="'####'" v-model="formData.agencia" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Conta">
                <el-input v-mask="'########-#'" v-model="formData.conta" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Convenio">
                <el-input v-model="formData.convenio" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Carteira">
                <el-input v-model="formData.carteira" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Variação da Carteira">
                <el-input v-model="formData.variacaocarteira" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Nosso Número">
                <el-input v-model="formData.nossonumero" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Formato da Remessa:">
                <el-select v-model="formData.formatoremessa">
                  <el-option
                    v-for="formatoremessa in formatoremessa"
                    :key="formatoremessa.value"
                    :label="formatoremessa.label"
                    :value="formatoremessa.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Codigo">
                <el-input v-model="formData.protesto" type="text" />
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
  agencia: '',
  conta: '',
  convenio: '',
  carteira: '',
  variacaocarteira: '',
  nossonumero: '',
  formatoremessa: '',
  nome: '',
  banco: '',
  protesto: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'BancoEditor',

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
      formatoremessa: [
        {
          value: '240',
          label: '240'
        },
        {
          value: '400',
          label: '400'
        }
      ],
      banco: [
        {
          label: 'Banco do Brasil S.A.',
          value: '001'
        },
        {
          label: 'Banco Itaú S.A.',
          value: '033'
        },
        {
          label: 'Banco Santander (Brasil) S.A.',
          value: '356'
        },
        {
          label: 'Banco Real S.A. (antigo)',
          value: '240'
        },
        {
          label: 'Itaú Unibanco Holding S.A.',
          value: '652'
        },
        {
          label: 'Banco Bradesco S.A.',
          value: '237'
        },
        {
          label: 'Banco Citibank S.A.',
          value: '745'
        },
        {
          label: 'HSBC Bank Brasil S.A. – Banco Múltiplo.',
          value: '399'
        },
        {
          label: 'Caixa Econômica Federal',
          value: '104'
        },
        {
          label: 'Banco Mercantil do Brasil S.A.',
          value: '389'
        },
        {
          label: 'Banco Rural S.A.',
          value: '453'
        },
        {
          label: 'Banco Safra S.A.',
          value: '422'
        },
        {
          label: 'Banco Rendimento S.A.',
          value: '633'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      pagBanco: 'currentBanco'
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
      this.findBanco(this.$route.params.id)
    }
  },

  methods: {
    findBanco(id) {
      this.loading = true
      this.$store.dispatch('findBanco', id).then(() => {
        this.loading = false
        this.selectBanco = this.pagBanco
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectBanco)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveBanco', this.prepareToSave(this.formData))
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
              name: 'EditBanco',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyBanco', this.formData.id).then(() => {
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
      this.nome = this.banco.find(x => x.value === data.banco)
      return {
        id: data.id,
        nome: this.nome.label,
        banco: data.banco,
        agencia: data.agencia,
        conta: data.conta,
        convenio: data.convenio,
        carteira: data.carteira,
        variacaocarteira: data.variacaocarteira,
        nossonumero: data.nossonumero,
        formatoremessa: data.formatoremessa,
        protesto: data.protesto
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

