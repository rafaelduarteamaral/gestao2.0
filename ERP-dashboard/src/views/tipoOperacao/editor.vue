<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do TipoOperacao</span>
            </div>
            <el-col :span="8">
              <el-form-item label="Codigo:">
                <el-input v-model="formData.codigo" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Tipo:">
                <el-select v-model="formData.tipo" style="width: 100%">
                  <el-option
                    v-for="tipo in tipo"
                    :key="tipo.value"
                    :label="tipo.label"
                    :value="tipo.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Nome:">
                <el-input v-model="formData.nome" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Situação tributária (CST):">
                <el-select v-model="formData.cst" style="width: 100%">
                  <el-option
                    v-for="cst in cst"
                    :key="cst.value"
                    :label="cst.label"
                    :value="cst.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="ST ICMS:">
                <el-select v-model="formData.icms" style="width: 100%">
                  <el-option
                    v-for="icms in icms"
                    :key="icms.value"
                    :label="icms.label"
                    :value="icms.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="Descrição/histórico legislação">
                <el-input
                  v-model="formData.descricao"
                  :rows="8"
                  type="textarea"
                  placeholder="Descrição/histórico legislação"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ICMS:">
                <el-select v-model="formData.icms" style="width: 100%">
                  <el-option
                    v-for="icms in icms"
                    :key="icms.value"
                    :label="icms.label"
                    :value="icms.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Cód. enquadramento IPI:">
                <el-input v-model="formData.cod_enquadramento_ipi" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="ST IPI:">
                <el-select v-model="formData.stipi" style="width: 100%">
                  <el-option
                    v-for="stipi in stipi"
                    :key="stipi.value"
                    :label="stipi.label"
                    :value="stipi.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="CSOSN (Simples Nacional):">
                <el-select v-model="formData.csosn" style="width: 100%">
                  <el-option
                    v-for="csosn in csosn"
                    :key="csosn.value"
                    :label="csosn.label"
                    :value="csosn.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="ST PIS/COFINS:">
                <el-select v-model="formData.st_pis_cofins" style="width: 100%">
                  <el-option
                    v-for="st_pis_cofins in st_pis_cofins"
                    :key="st_pis_cofins.value"
                    :label="st_pis_cofins.label"
                    :value="st_pis_cofins.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="% Base cálculo ICMS:">
                <el-input v-model="formData.base_calculo_icms" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Alíquota PIS:">
                <el-input v-model="formData.aliquota_pis" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Alíquota COFINS:">
                <el-input v-model="formData.aliquota_cofins" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Alíquota ISSQN:">
                <el-input v-model="formData.aliquota_issqn" type="text"/>
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
  codigo: '',
  tipo: '',
  icms: '',
  nome: '',
  cod_enquadramento_ipi: '',
  descricao: '',
  csosn: '',
  st_pis_cofins: '',
  base_calculo_icms: '',
  aliquota_pis: '',
  aliquota_cofins: '',
  aliquota_issqn: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'TipoOperacaoEditor',

  components: { MediaManager },

  data() {
    return {
      loading: false,
      tempRoute: '',
      isEdit: false,
      tipo: [
        {
          value: 'entrada',
          label: 'Entrada'
        },
        {
          value: 'saida',
          label: 'Saida'
        }
      ],
      cfopsList: [],
      formData: Object.assign({}, defaultForm),
      showMediaGallery: false,
      showDeleteDialog: false,
      showSettingsDialog: false
    }
  },

  computed: {
    ...mapGetters({
      pagTipoOperacao: 'currentTipoOperacao',
      cfops: 'currentCfop'
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
    this.findCfopBase()
    if (this.isEdit) {
      this.findTipoOperacao(this.$route.params.id)
    }
  },

  methods: {
    findTipoOperacao(id) {
      this.loading = true
      this.$store.dispatch('findTipoOperacao', id).then(() => {
        this.loading = false
        this.selectTipoOperacao = this.pagTipoOperacao
        this.fillForm()
      })
    },

    findCfopBase() {
      this.$store.dispatch('fetchCfops').then(() => {
        console.log(this.cfops.data)
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectTipoOperacao)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveTipoOperacao', this.prepareToSave(this.formData))
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
              name: 'EditTipoOperacao',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyTipoOperacao', this.formData.id).then(() => {
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
        codigo: data.codigo,
        tipo: data.tipo,
        icms: data.icms,
        nome: data.nome,
        cod_enquadramento_ipi: data.cod_enquadramento_ipi,
        descricao: data.descricao,
        csosn: data.csosn,
        st_pis_cofins: data.st_pis_cofins,
        base_calculo_icms: data.base_calculo_icms,
        aliquota_pis: data.aliquota_pis,
        aliquota_cofins: data.aliquota_cofins,
        aliquota_issqn: data.aliquota_issqn
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

