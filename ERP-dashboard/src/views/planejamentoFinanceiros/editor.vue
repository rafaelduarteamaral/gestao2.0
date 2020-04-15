<template>
  <div class="app-container">
    <el-row :gutter="24">
      <el-form ref="form" v-model="formData">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header">
              <span>Informações do planejamento financeiro</span>
            </div>
            <el-col :span="8">
              <el-form-item label="Conta Financeira:">
                <el-select v-model="formData.conta_financeira" style="width:100%">
                  <el-option
                    v-for="conta_financeira in conta_financeira"
                    :key="conta_financeira.value"
                    :label="conta_financeira.label"
                    :value="conta_financeira.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Centro de custo:">
                <el-select v-model="formData.centro_custo" style="width:100%">
                  <el-option
                    v-for="centro_custo in centro_custo"
                    :key="centro_custo.value"
                    :label="centro_custo.label"
                    :value="centro_custo.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Ano:">
                <el-select v-model="formData.ano" style="width:100%">
                  <el-option
                    v-for="ano in ano"
                    :key="ano.value"
                    :label="ano.label"
                    :value="ano.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Data Inicial:">
                <el-date-picker
                  v-model="formData.data_inicial"
                  format="dd/MM/yyyy"
                  type="date"
                  start-placeholder="Data Inicial"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Data Final:">
                <el-date-picker
                  v-model="formData.data_final"
                  format="dd/MM/yyyy"
                  type="date"
                  start-placeholder="Data final"
                  style="width:100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="Bloqueia Movimento:">
                <el-select v-model="formData.bloq_movimento" style="width:100%">
                  <el-option
                    v-for="bloq_movimento in bloq_movimento"
                    :key="bloq_movimento.value"
                    :label="bloq_movimento.label"
                    :value="bloq_movimento.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Valor Orçado:">
                <el-input v-model="formData.valor" type="currency"/>
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
  conta_financeira: '',
  centro_custo: '',
  ano: '',
  data_inicial: '',
  data_final: '',
  bloq_movimento: '',
  valor: ''
}
import { mapGetters } from 'vuex'
import MediaManager from '@/components/MediaManager'

export default {
  name: 'PlanejamentoFinanceiroEditor',

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
      conta_financeira: [
        {
          value: '1',
          label: '(4.01.001) Vendas'
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
          label: '(4.02.002) Empréstimo'
        },
        {
          value: '5',
          label: '(5.01.001) Compras'
        },
        {
          value: '6',
          label: '(5.01.002) Ajuste'
        },
        {
          value: '7',
          label: '(5.02.001) Folha de Pagamento'
        },
        {
          value: '8',
          label: '(5.02.002) Data Center'
        },
        {
          value: '9',
          label: '(5.02.002) Data Center'
        },
        {
          value: '10',
          label: '(5.02.003) Àgua, luz e telefone'
        },
        {
          value: '11',
          label: '(5.02.004) Frete'
        },
        {
          value: '12',
          label: '(5.02.005) Outras despesas'
        },
        {
          value: '13',
          label: '(5.02.006) Comissão'
        },
        {
          value: '14',
          label: '(5.02.007) Tarifa Bancária'
        }
      ],
      centro_custo: [
        {
          value: '1',
          label: '13º Salário'
        },
        {
          value: '2',
          label: 'Férias'
        },
        {
          value: '3',
          label: 'Salário Mensal'
        }
      ],
      ano: [
        {
          value: '1',
          label: '2020'
        },
        {
          value: '2',
          label: '2021'
        },
        {
          value: '3',
          label: '2022'
        },
        {
          value: '4',
          label: '2023'
        },
        {
          value: '5',
          label: '2024'
        },
        {
          value: '6',
          label: '2025'
        },
        {
          value: '7',
          label: '2026'
        },
        {
          value: '8',
          label: '2027'
        },
        {
          value: '9',
          label: '2028'
        }
      ],
      bloq_movimento: [
        {
          value: '1',
          label: 'Sim'
        },
        {
          value: '2',
          label: 'Não'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      pagPlanejamentoBancario: 'currentPlanejamentoBancario'
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
      this.findPlanejamentoBancario(this.$route.params.id)
    }
  },

  methods: {
    findPlanejamentoBancario(id) {
      this.loading = true
      this.$store.dispatch('findPlanejamentoBancario', id).then(() => {
        this.loading = false
        this.selectPlanejamentoBancario = this.pagPlanejamentoBancario
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.selectPlanejamentoBancario)
      this.updateNavigationTab()
    },

    handleSave() {
      this.loading = true
      this.$store
        .dispatch('savePlanejamentoBancario', this.prepareToSave(this.formData))
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
              name: 'EditPlanejamentoBancario',
              params: { id: this.formData.id }
            })
          }
        })
    },

    handleDestroy() {
      this.showDeleteDialog = false
      this.$store.dispatch('destroyPlanejamentoBancario', this.formData.id).then(() => {
        this.$message({
          message: 'Planejamento Bancario Deletado!',
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
        conta_financeira: data.conta_financeira,
        centro_custo: data.centro_custo,
        ano: data.ano,
        data_inicial: Date.parse(data.data_inicial),
        data_final: Date.parse(data.data_final),
        bloq_movimento: data.bloq_movimento,
        valor: data.valor
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

