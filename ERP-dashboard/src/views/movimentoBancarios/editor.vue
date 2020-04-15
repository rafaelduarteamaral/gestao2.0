<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do Movimento Bancario</span>
            </div>
            <el-col :span="8">
              <el-form-item label="Banco Débito/ Origem:">
                <el-select v-model="formData.banco_debito" style="width:100%">
                  <el-option
                    v-for="banco_debito in banco_debito"
                    :key="banco_debito.value"
                    :label="banco_debito.label"
                    :value="banco_debito.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Banco Crédito/ Destino:">
                <el-select v-model="formData.banco_credito" style="width:100%">
                  <el-option
                    v-for="banco_credito in banco_credito"
                    :key="banco_credito.value"
                    :label="banco_credito.label"
                    :value="banco_credito.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Valor:">
                <el-input v-model="formData.valor" type="currency"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Data do Lançamento:">
                <el-date-picker
                  v-model="formData.data_lancamento"
                  format="dd/MM/yyyy"
                  type="date"
                  start-placeholder="Data do lançamento"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="Descrição/ Histórico">
                <el-input v-model="formData.descricao" type="text"/>
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
        Tem certeza que deseja deletar este movimento bancário:
        <b>{{ formData.id }}</b>
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
  banco_debito: '',
  banco_credito: '',
  valor: '',
  data_lancamento: '',
  descricao: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'MovimentoBancarioEditor',

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
      banco_debito: [
        {
          value: '1',
          label: 'Aplicação financeira Satander'
        },
        {
          value: '2',
          label: 'Banco Satander (Brasil) 3678 1300 38296'
        },
        {
          value: '3',
          label: 'Clientes'
        }
      ],
      banco_credito: [
        {
          value: '1',
          label: 'Aplicação financeira Satander'
        },
        {
          value: '2',
          label: 'Banco Satander (Brasil) 3678 1300 38296'
        },
        {
          value: '3',
          label: 'Clientes'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      pagMovimentoBancario: 'currentMovimentoBancario'
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
      this.findMovimentoBancario(this.$route.params.id)
    }
  },

  methods: {
    findMovimentoBancario(id) {
      this.loading = true
      this.$store.dispatch('findMovimentoBancario', id).then(() => {
        this.loading = false
        this.selectMovimentoBancario = this.pagMovimentoBancario
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectMovimentoBancario)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveMovimentoBancario', this.prepareToSave(this.formData))
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
              name: 'EditMovimentoBancario',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyMovimentoBancario', this.formData.id).then(() => {
        this.$message({
          message: 'MovimentoBancario Deletado!',
          type: 'warning',
          showClose: true,
          duration: 1000
        })

        this.deleteNavigationtab()
        this.$router.go(-1)
      })
    },

    /**
     * Formata os dados que serão enviados para o servidor
     */
    prepareToSave(data) {
      return {
        id: data.id,
        banco_debito: data.banco_debito,
        banco_credito: data.banco_credito,
        valor: data.valor,
        data_lancamento: Date.parse(data.data_lancamento),
        descricao: data.descricao
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

