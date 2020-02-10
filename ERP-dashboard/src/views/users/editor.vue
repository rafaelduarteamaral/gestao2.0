/* eslint-disable no-mixed-spaces-and-tabs */
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
            <el-col :span="6">
              <el-form-item label="Tipo:"><br>
                <el-select v-model="formData.status">
                  <el-option
                    v-for="status in statuses"
                    :key="status.value"
                    :label="status.label"
                    :value="status.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="CPF/CNPJ:">
                <el-input v-mask="['###.###.###-##', '##.###.###/####-##']" v-model="formData.cpf_cnpj" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="CNAE">
                <el-input v-mask="'##.##-#-##'" v-model="formData.cnae" type="text" placeholder="Em caso de CNPJ"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Nome/Razão Social:">
                <el-input v-model="formData.name" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="RG/Inscrição">
                <el-input v-model="formData.rg" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Sobrenome:">
                <el-input v-model="formData.surname" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Data de Nascimento:">
                <el-input v-model="formData.d_nascimento" type="date"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Telefone 1:">
                <el-input v-mask="'(##)#####-####'" v-model="formData.telefone1" type="text" placeholder="(00)00000-0000"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="Telefone 2:">
                <el-input v-mask="'(##)####-####'" v-model="formData.telefone2" type="text" placeholder="(00)0000-0000"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="E-mail:">
                <el-input v-model="formData.email" type="text"/>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item v-if="!isEdit" label="Senha:">
                <el-input v-model="formData.password" type="password"/>
              </el-form-item>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-row style="margin-top:100px;">
            <el-card class="box-card-component">
              <!-- <el-card class="box-img-top"> -->
              <div class="box-card-header" @click="showMediaGallery = true">
                <img
                  :src="formData.image ? formData.image.url : '/static/sem-imagem.png'"
                  :alt=" formData.image ? formData.image.original_name : 'Sem Imagem'"
                  :title=" formData.image ? formData.image.original_name : 'Clique para escolher uma imagem'"
                >
              </div>
              <!-- </el-card> -->
            </el-card>
          </el-row>
        </el-col>
      </el-form>
    </el-row>
    <br>
    <el-row :gutter="35">
      <el-form ref="form" v-model="formData">
        <el-col :span="35">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações de Endereço</span>
            </div>
            <el-col :span="8">
              <el-form-item label="CEP:">
                <el-input v-mask="'#####-###'" v-model="formData.endereco.cep" type="text" @keyup.native="searchCep" />
              </el-form-item>
            </el-col>
            <el-col :span="13">
              <el-form-item label="Logradouro:">
                <el-input v-model="formData.endereco.cep" type="text" />
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item label="Numero:">
                <el-input v-model="formData.endereco.numero" type="number" />
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
    <br>
    <el-form ref="form" v-model="formData" label-position="top">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Informações complementares</span>
          </div>
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
    </el-form>
    <el-button v-show="isEdit" type="danger" @click.prevent="showDeleteDialog = true">
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
    <pre>{{ formData.data }}</pre>
  </div>
</template>
<script>
const defaultForm = {
  id: undefined,
  name: '',
  data: '',
  d_nascimento: '',
  surname: '',
  email: '',
  cpf: '',
  rg: '',
  cnae: '',
  telefone1: '',
  telefone2: '',
  image_id: undefined,
  password: '',
  description: '',
  endereco: {
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    complemento: '',
    numero: '',
    logradouro: ''
  }
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'
import axios from 'axios'

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
      statuses: [
        {
          value: '1',
          label: 'Pessoa Física'
        },
        {
          value: '2',
          label: 'Pessoa Jurídica'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      user: 'currentUser'
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
      this.findUser(this.$route.params.id)
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

    fillForm() {
      this.formData = Object.assign({}, this.usuarioFind, this.enderecoFind)
      this.updateNavigationTab()
      console.log(this.enderecoFind)
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
        name: data.name,
        surname: data.surname,
        telefone1: data.telefone1,
        telefone2: data.telefone2,
        email: data.email,
        cpf: data.cpf,
        rg: data.rg,
        image_id: data.image_id,
        password: data.password ? data.password : undefined,
        endereco: {
          cep: data.endereco.cep,
          cidade: data.endereco.cidade,
          numero: data.endereco.numero,
          bairro: data.endereco.bairro,
          uf: data.endereco.uf,
          logradouro: data.endereco.logradouro,
          complemento: data.endereco.complemento
        }
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
    },

    searchCep() {
      if (this.formData.endereco.cep.length === 8) {
        alert(this.formData.endereco.cep)
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

.box-card-component {
  .box-card-header {
    position: relative;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.5s linear;
      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
      cursor: pointer;
    }
  }
}
</style>

