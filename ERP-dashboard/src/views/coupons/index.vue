<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" @click="handleCreate">Novo Cupom</el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="coupons.data.filter(data => !query.title || data.code.toLowerCase().includes(query.title.toLowerCase()))"
      :default-sort="{prop: 'id', order: 'ascending'}"
      fit
    >
      <el-table-column label="ID" prop="id" width="60"/>
      <el-table-column label="Código" prop="code" align="center"/>
      <el-table-column label="Valor do Desconto" align="center">
        <template slot-scope="scope">{{ formatDiscountValue(scope.row) }}</template>
      </el-table-column>
      <el-table-column label="Quantidade" prop="quantity" align="center"/>
      <el-table-column align="right" width="200">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="query.title"
            :key="scope.row ? scope.row.id : '-'"
            size="mini"
            placeholder="Filtrar"
            clearable
            @keyup.enter.native="handleSearch"
            @clear="handleClearSearch"
          />
        </template>
        <template slot-scope="scope">
          <el-button type="danger" @click="handleDelete(scope.row.id)">Deletar</el-button>
          <!-- <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">Editar</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- Paginação da Tabela -->
    <pagination
      v-show="coupons.pagination.total && coupons.pagination.total > 0"
      :total="coupons.pagination.total ? coupons.pagination.total : 0"
      :page.sync="query.page"
      :limit.sync="query.limit"
      @pagination="fetch"
    />
    <!-- Modal para criar/editar cupons -->
    <el-dialog :visible.sync="editDialog" title="Cupom de Desconto" fullscreen>
      <el-row :gutter="20" style="margin-top:-25px;">
        <el-form ref="form" v-model="formData" label-position="top">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Dados do Cupom</span>
              </div>
              <el-form-item label="Código">
                <el-input
                  v-model="couponCode"
                  placeholder="Insira o código do cupom de desconto aqui"
                />
              </el-form-item>
              <el-form-item label="Tipo">
                <el-radio v-model="discountType" label="percent">Procentagem</el-radio>
                <el-radio v-model="discountType" label="currency">Valor Fixo</el-radio>
                <el-radio v-model="discountType" label="free">Gratuito</el-radio>
              </el-form-item>
              <el-col :span="12">
                <el-form-item label="Valor do Desconto">
                  <el-input-number
                    v-model="formData.discount"
                    :precision="precision"
                    :disabled="formData.type === 'free'"
                    :min="0"
                    :max="maxDiscountValue"
                    placeholder="Insira o código do cupom de desconto aqui"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Quantas vezes este cupom poderá ser utilizado na loja?"
                  placement="top"
                >
                  <el-form-item label="Quantidade de Cupons">
                    <el-input-number
                      v-model="formData.quantity"
                      :precision="0"
                      :min="1"
                      :max="10000"
                      placeholder="Insira o código do cupom de desconto aqui"
                    />
                  </el-form-item>
                </el-tooltip>
              </el-col>
              <el-form-item label="Este cupom pode ser utilizado em conjunto com outros cupons?">
                <el-switch
                  v-model="formData.recursive"
                  style="display: block"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="Sim, pode!"
                  inactive-text="Não, não pode!"
                />
              </el-form-item>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>Aplicabilidade do Cupom</span>
              </div>
              <el-form-item label="Desejar especificar a Validade do Cupom?">
                <el-switch
                  v-model="valid_period"
                  :active-value="true"
                  :inactive-value="false"
                  style="margin-bottom:20px;"
                />
                <el-date-picker
                  v-model="valid_range"
                  :disabled="!valid_period"
                  format="dd-MM-yyyy"
                  type="daterange"
                  range-separator="Até"
                  start-placeholder="Data Inicial"
                  end-placeholder="Data Final"
                  style="width:100%"
                />
              </el-form-item>
              <el-tooltip
                class="item"
                effect="dark"
                content="Escolha um ou mais clientes que serão beneficiados pelo cupom"
                placement="top"
              >
                <el-form-item label="Clientes Beneficiados">
                  <el-select
                    v-model="formData.users"
                    :remote-method="handleSearchClients"
                    :loading="searchingClients"
                    loading-text="Procurando Clientes"
                    filterable
                    multiple
                    remote
                    placeholder="Insira o nome de algum cliente"
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in clientList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="Escolha um ou mais produtos onde este cupom poderá ser aplicado"
                placement="top"
              >
                <el-form-item label="Produtos Aplicáveis">
                  <el-select
                    v-model="formData.products"
                    :loading="searchingProducts"
                    :remote-method="handleSearchProducts"
                    remote
                    multiple
                    filterable
                    placeholder="Insira o nome de algum produto"
                    style="width:100%"
                    loading-text="Procurando Produtos"
                  >
                    <el-option
                      v-for="(item, index) in productList"
                      :key="index"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-tooltip>
            </el-card>
          </el-col>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="confirmDeleteDialog = true">Deletar</el-button>
        <el-button type="primary" @click="handleSave">Salvar</el-button>
      </span>
      <el-dialog
        :visible.sync="confirmDeleteDialog"
        width="30%"
        title="Confirmar Deleção"
        append-to-body
        center
      >
        <span>Você tem certeza que deseja deletar este Cupom?</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDeleteDialog = false">Cancelar</el-button>
          <el-button type="danger" @click="handleDelete">Deletar</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { string_to_slug } from '@/utils'

const defaultForm = {
  id: undefined,
  code: undefined,
  valid_from: undefined,
  valid_until: undefined,
  quantity: 0,
  type: 'percent',
  recursive: false,
  discount: 0
}

export default {
  name: 'CouponsListing',

  components: { Pagination },

  data() {
    return {
      loading: false,
      formData: Object.assign({}, defaultForm),
      query: {
        title: undefined,
        page:
          this.coupons && this.coupons.pagination.page
            ? this.coupons.pagination.page
            : 1,
        limit: 10
      },
      editDialog: false,
      confirmDeleteDialog: false,
      discountType: 'percent',
      valid_period: false,
      valid_range: [],
      clientList: [],
      productList: [],
      searchingProducts: false,
      searchingClients: false,
      couponCode: ''
    }
  },

  computed: {
    ...mapGetters({
      products: 'products',
      clients: 'users',
      coupons: 'coupons',
      coupon: 'currentCoupon'
    }),

    precision() {
      switch (this.formData.type) {
        case 'percent':
          return 0
        case 'currency':
          return 2
        default:
          return 0
      }
    },

    maxDiscountValue() {
      switch (this.formData.type) {
        case 'percent':
          return 100
        case 'currency':
          return 9999999 // valor ilimitado
        default:
          return 0
      }
    }
  },

  watch: {
    discountType(value) {
      this.formData.type = value
      if (this.editDialog) {
        this.formData.discount = 0
      }
    },

    valid_range(value) {
      this.formData.valid_from = value[0]
      this.formData.valid_until = value[1]
    },

    couponCode(value) {
      this.couponCode = string_to_slug(value).toUpperCase()
      this.formData.code = string_to_slug(value).toUpperCase()
    }
  },

  created() {
    if (this.$route.query && this.$route.query.page) {
      this.query.page = parseInt(this.$route.query.page)
    }
  },

  mounted() {
    this.fetch()
  },

  methods: {
    fetch() {
      this.updateQueryParameters()
      return this.$store.dispatch('fetchCoupons', this.query)
    },

    fillForm() {
      this.formData = Object.assign({}, this.coupon)
      this.couponCode = this.formData.code
      this.discountType = this.formData.type
      this.formData.users = this.coupon.users.map(user => user.id)
      this.formData.products = this.coupon.products.map(product => product.id)
      this.clientList.push(...this.coupon.users)
      this.productList.push(...this.coupon.products)
      if (this.coupon.valid_from) {
        this.valid_period = true
        this.valid_range = [
          Date.parse(this.coupon.valid_from),
          Date.parse(this.coupon.valid_until)
        ]
      }
    },

    handleCreate() {
      this.formData = Object.assign({}, defaultForm)
      this.editDialog = true
      this.valid_period = false
      this.valid_range = []
    },

    handleSearch() {
      this.loading = true
      this.fetch().then(() => (this.loading = false))
    },

    handleClearSearch() {
      this.query.title = undefined
      this.loading = true
      this.fetch().then(() => (this.loading = false))
    },

    handleEdit(id) {
      this.$store
        .dispatch('findCoupon', id)
        .then(() => {
          this.fillForm()
          // necessário, para não esvaziar o valor do editor
          setTimeout(() => {
            this.editDialog = true
          }, 100)
        })
        .catch(e => console.error(e))
    },

    handleSave() {
      this.$store.dispatch('saveCoupon', this.formData).then(() => {
        this.$message({
          message: 'Salvo com Sucesso!',
          type: 'success',
          duration: 3000
        })
      })
    },

    handleDelete(id) {
      this.$store.dispatch('destroyCoupon', id).then(() => {
        this.editDialog = false
        this.confirmDeleteDialog = false
        this.formData = {}
        this.$message({
          message: 'Deletado com sucesso!',
          type: 'warning',
          duation: 3000
        })
      })
    },

    handleSearchClients(name) {
      if (name.length < 3) return
      this.searchingClients = true
      this.$store.dispatch('fetchUsers', { name }).then(() => {
        this.clientList.push(...this.clients.data)
        this.searchingClients = false
      })
    },

    handleSearchProducts(title) {
      this.searchingProducts = true
      this.$store.dispatch('fetchProducts', { title }).then(() => {
        this.productList.push(...this.products.data)
        this.searchingProducts = false
      })
    },

    formatDiscountValue(item) {
      switch (item.type) {
        case 'percent':
          return `${item.discount}%`
        case 'currency':
          return `R$ ${item.discount.toFixed(2)}`
        default:
          return 'Total'
      }
    },

    updateQueryParameters() {
      if (this.query.page > 1) {
        // eslint-disable-next-line
        this.$router.replace({ query: { page: this.query.page } })
      } else if (this.query.page === 1) {
        // eslint-disable-next-line
        this.$router.replace({ query: {} })
      }
    }
  }
}
</script>
