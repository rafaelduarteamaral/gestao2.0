<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card" align="center">
            <div slot="header">
              <span>Informações da Empresa</span>
            </div>
            <el-col :span="5">
              <el-form-item label="CNPJ:">
                <el-input v-mask="['##.###.###/####-##']" v-model="formData.cnpj" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="CNAE">
                <el-input v-mask="'##.##-#-##'" v-model="formData.cnae" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Nome:">
                <el-input v-model="formData.nome" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="Razão Social:">
                <el-input v-model="formData.razao_social" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Inscrição Estadual">
                <el-input v-mask="'##########-#'" v-model="formData.inscricaoestadual" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Inscrição Municipal">
                <el-input v-mask="'##########-#'" v-model="formData.inscricaomunicipal" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Telefone 1">
                <el-input v-mask="'(##)####-####'" v-model="formData.telefone1" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Telefone 2">
                <el-input v-mask="'(##)####-####'" v-model="formData.telefone2" type="text"/>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <br>
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card" align="center">
            <div slot="header">
              <span>Informações de Endereço</span>
            </div>
            <el-col :span="5">
              <el-form-item label="Fuso Horário:">
                <el-select v-model="formData.endereco.fuso_hr">
                  <el-option
                    v-for="fuso_hr in fuso_hr"
                    :key="fuso_hr.value"
                    :label="fuso_hr.label"
                    :value="fuso_hr.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="CEP:">
                <el-input v-model="formData.endereco.cep" type="text" @keyup.native="searchCep"/>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Logradouro:">
                <el-input v-model="formData.endereco.logradouro" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Numero:">
                <el-input-number v-model="formData.endereco.numero" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Cidade:">
                <el-input v-model="formData.endereco.cidade" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label="UF:">
                <el-input v-model="formData.endereco.uf" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="Bairro:">
                <el-input v-model="formData.endereco.bairro" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Complemento:">
                <el-input v-model="formData.endereco.complemento" type="text" />
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <el-button v-show="isEdit" type="danger" @click.prevent="showDeleteDialog = true">
      <i class="el-icon-delete"/>
    </el-button>
    <el-button type="primary" style="float:right; margin-top: 20px;" @click="handleSave">Salvar</el-button>
    <!-- Confirmação de Deletar -->
    <el-dialog :visible.sync="showDeleteDialog" title="Confirmação" center>
      <span>
        Tem certeza que deseja deletar o Usuário:
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
  razao_social: '',
  cnpj: '',
  cnae: '',
  inscricaoestadual: '',
  inscricaomunicipal: '',
  telefone1: '',
  telefone2: '',
  endereco: {
    logradouro: '',
    fuso_hr: '',
    cep: '',
    numero: '',
    cidade: '',
    complemento: '',
    bairro: '',
    uf: ''
  }
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'
import axios from 'axios'

export default {
  name: 'EmpresaEditor',

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
      usuarioFind: '',
      fuso_hr: [
        {
          value: '1',
          label: '-02:00 (Horário de verão, Fernando de Noronha)'
        },
        {
          value: '2',
          label: '-03:00 (BRT - Horário de Brasília)'
        },
        {
          value: '3',
          label: '-04:00 (AMT - Horário da Amazônia)'
        },
        {
          value: '4',
          label: '-05:00 (ACT - Horário do Acre)'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      empresa: 'currentEmpresa'
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
      this.findEmpresa(this.$route.params.id)
    }
  },

  methods: {
    findEmpresa(id) {
      this.loading = true
      this.$store.dispatch('findEmpresa', id).then(() => {
        this.loading = false
        this.empresaFind = this.empresa
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.empresaFind)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveEmpresa', this.prepareToSave(this.formData))
        .then(() => {
          this.loading = false
          this.$message({
            message: 'Salvo com sucesso!',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.fillForm()
          if (!this.isEdit) {
            this.deleteNavigationtab()
            this.$router.push({
              name: 'EditEmpresa',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyEmpresa', this.formData.id).then(() => {
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
        razao_social: data.razao_social,
        cnpj: data.cnpj,
        cnae: data.cnae,
        inscricaoestadual: data.inscricaoestadual,
        inscricaomunicipal: data.inscricaomunicipal,
        telefone1: data.telefone1,
        telefone2: data.telefone2,
        endereco: {
          logradouro: data.endereco.logradouro,
          cep: data.endereco.cep,
          numero: data.endereco.numero,
          cidade: data.endereco.cidade,
          complemento: data.endereco.complemento,
          bairro: data.endereco.bairro,
          uf: data.endereco.uf,
          fuso_hr: data.endereco.fuso_hr
        }
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
    },

    searchCep() {
      if (this.formData.endereco.cep.length === 8) {
        axios.get(`https://viacep.com.br/ws/${this.formData.endereco.cep}/json`)
          .then(response => {
            this.formData.endereco.uf = response.data.uf
            this.formData.endereco.localidade = response.data.cidade
            this.formData.endereco.logradouro = response.data.logradouro
            this.formData.endereco.bairro = response.data.bairro
            this.formData.endereco.cidade = response.data.localidade
            return
          })
          .catch()
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px;
  }
}
</style>

