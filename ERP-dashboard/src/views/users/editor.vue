<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-form ref="form" v-model="formData">
        <el-col :span="17">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do Usuário</span>
              <el-button
                v-if="isEdit"
                type="primary"
                style="float:right;margin-top:-5px"
                @click="showSettingsDialog = true"
              >
                <svg-icon icon-class="reset-pass"/>
              </el-button>
            </div>
            <el-col :span="10">
              <el-form-item label="Nome">
                <el-input v-model="formData.name" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Sobrenome">
                <el-input v-model="formData.surname" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="E-mail">
                <el-input v-model="formData.email" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Telefone(1)">
                <el-input v-model="formData.telefone1" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Telefone(2)">
                <el-input v-model="formData.telefone2" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="CPF">
                <el-input v-model="formData.cpf" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="RG">
                <el-input v-model="formData.rg" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item v-if="!isEdit" label="Senha">
                <el-input v-model="formData.password" type="password"/>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header" @click="showMediaGallery = true">
              <img
                :src="formData.image ? formData.image.url : '/static/sem-imagem.png'"
                :alt=" formData.image ? formData.image.original_name : 'Sem Imagem'"
                :title=" formData.image ? formData.image.original_name : 'Clique para escolher uma imagem'"
              >
            </div>
            <el-row style="margin-top:20px;">
              <el-button v-show="isEdit" type="danger" @click.prevent="showDeleteDialog = true">
                <i class="el-icon-delete"/>
              </el-button>
              <el-button type="primary" style="float:right" @click="handleSave">Salvar</el-button>
            </el-row>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <br>
    <el-row v-if="isEdit" :gutter="20">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações adicionais</span>
            </div>
            <el-col :span="10">
              <el-form-item label="Cep">
                <el-input v-model="formData.cep" type="number" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Cidade">
                <el-input v-model="formData.cidade" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Rua">
                <el-input v-model="formData.rua" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Bairro">
                <el-input v-model="formData.bairro" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Casa">
                <el-input v-model="formData.casa" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Complemento">
                <el-input v-model="formData.complemento" type="text" />
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
      </el-form>
    </el-row>
    <!-- galeria de imagens -->
    <media-manager
      :visibility.sync="showMediaGallery"
      :image="formData.image"
      @selectImage="changeImage"
    />
    <!-- Confirmação de Deletar -->
    <el-dialog :visible.sync="showDeleteDialog" title="Confirmação" center>
      <span>
        Tem certeza que deseja deletar o Usuário:
        <b>{{ formData.name }}</b>
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
  </div>
</template>
<script>
const defaultForm = {
  id: undefined,
  name: '',
  surname: '',
  email: '',
  cpf: '',
  rg: '',
  telefone1: '',
  telefone2: '',
  image_id: undefined,
  password: '',
  cep: '',
  cidade: '',
  endereco: '',
  rua: '',
  bairro: '',
  complemento: '',
  casa: '',
  user_id: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'UserEditor',

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
      enderecoFind: ''
    }
  },

  computed: {
    ...mapGetters({
      user: 'currentUser',
      endereco: 'currentEndereco'
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
      this.formData.user_id = this.$route.params.id
      this.findUser(this.$route.params.id)
      this.findEndereco(this.$route.params.id)
    }
  },

  methods: {
    findUser(id) {
      this.loading = true
      this.$store.dispatch('findUser', id).then(() => {
        this.loading = false
        this.usuarioFind = this.user
        this.fillForm()
      })
    },

    findEndereco(id) {
      this.loading = true
      this.$store.dispatch('findEnderecoUser', id).then(() => {
        this.loading = false
        this.enderecoFind = this.endereco
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.usuarioFind, this.enderecoFind)
      this.updateNavigationTab()
      console.log(this.enderecoFind)
    },

    handleSaveEndereco() {
      this.loading = true
      this.$store
        .dispatch('saveEndereco', this.prepareToSave(this.formData))
        .then(() => {
          this.loading = false
          this.$message({
            message: 'Salvo com sucesso!',
            type: 'success',
            showClose: true,
            duration: 1000
          })
          this.updateNavigationTab()
        })
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('saveUser', this.prepareToSave(this.formData))
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
              name: 'EditUser',
              params: { id: this.formData.id }
            })
          }
        })
      this.handleSaveEndereco()
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyUser', this.formData.id).then(() => {
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
        id_endereco: data.id_endereco,
        user_id: data.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        telefone1: data.telefone1,
        telefone2: data.telefone2,
        cpf: data.cpf,
        rg: data.rg,
        image_id: data.image_id,
        password: data.password ? data.password : undefined,
        cep: data.cep,
        cidade: data.cidade,
        rua: data.rua,
        bairro: data.bairro,
        casa: data.casa,
        complemento: data.complemento
      }
    },

    /**
     * Métodos para gerenciar as abas de navegação no topo da pagina
     */
    updateNavigationTab() {
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.name}`
      })
      this.$store.dispatch('updateVisitedView', route)
    },

    deleteNavigationtab() {
      // deleta a tag de paginas visitadas
      const route = Object.assign({}, this.tempRoute, {
        title: `${this.formData.name}`
      })

      this.$store.dispatch('delVisitedView', route)
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
