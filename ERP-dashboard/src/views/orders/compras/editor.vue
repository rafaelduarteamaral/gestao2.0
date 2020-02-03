<template>
  <div class="app-container">
    <el-dialog :visible.sync="modalAddItems" title="Adicionar Itens ao Carrinho" fullscreen>
      <el-row>
        <el-input
          v-model="product"
          placeholder="Buscar Produtos"
          suffix-icon="el-icon-search"
          clearable
          @keyup.native.enter="searchProduct"
        />
      </el-row>
      <el-row :gutter="10" style="padding-top:10px;">
        <el-col
          v-for="item in productList.filter(item => item.name.toLowerCase().includes(product.toLowerCase()))"
          :span="4"
          :key="item.id"
          style="margin-top:10px;"
        >
          <el-card class="box-card-component">
            <div slot="header" class="box-card-header">
              <img
                :src="item.image && item.image.url ? item.image.url : '/static/sem-imagem.png'"
                :alt="item.image && item.image.original_name ? item.image.original_name : 'Sem Imagem'"
              >
            </div>
            <div>
              <span>
                <strong>{{ item.name }}</strong>
              </span>
              <br>
              <span>
                <strong>R$</strong>
                {{ item.custoCompras }}
              </span>
              <div style="padding-top:10px;">
                <el-button type="success" @click="addToCart(item)">Adicionar!</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-dialog>
    <el-card>
      <div slot="header">
        <span>{{ title }}</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="17">
          <el-card>
            <div slot="header" class="clearfix">
              <span>Produtos</span>
              <el-button
                type="primary"
                style="float:right;"
                @click="showModalAddItems"
              >Adicionar Itens</el-button>
            </div>
            <el-table v-loading="loading" :data="formData.items">
              <el-table-column label="ID" prop="product.id" width="50"/>
              <el-table-column label="Imagem" width="100">
                <template slot-scope="scope">
                  <img
                    :src="scope.row.product && scope.row.product.image ? scope.row.product.image.url : '/static/sem-imagem.png'"
                    class="product-thumbnail"
                  >
                </template>
              </el-table-column>
              <el-table-column label="Nome" prop="product.name"/>
              <el-table-column label="Preço" width="90">
                <template slot-scope="scope" prop="product.image">
                  <span>R$ {{ (scope.row.product.custoCompras).toFixed(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Quantidade" width="150">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.quantity" :min="1" :max="100" size="mini"/>
                </template>
              </el-table-column>
              <el-table-column label="subtotal">
                <template
                  slot-scope="scope"
                >R$ {{ parseFloat(scope.row.quantity * scope.row.product.custoCompras).toFixed(2) }}</template>
              </el-table-column>
              <el-table-column width="50">
                <template slot-scope="scope">
                  <el-button type="text" @click="removeFromCart(scope.row.product.id)">
                    <i class="el-icon-close"/>
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="7">
          <el-card>
            <div slot="header">
              <span>Informações da Compra</span>
            </div>
            <div>
              <el-form ref="form" label-position="top">
                <el-form-item label="Fornecedor">
                  <el-select
                    v-model="formData.user_id"
                    :remote-method="searchClient"
                    :loading="searching"
                    placeholder="Buscar Fornecedor"
                    filterable
                    remote
                    style="width:100%"
                  >
                    <el-option
                      v-for="(item, index) in clientList"
                      :key="index"
                      :label="clientLabel(item)"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="Status">
                  <el-select v-model="formData.status">
                    <el-option
                      v-for="status in statuses"
                      :key="status.value"
                      :label="status.label"
                      :value="status.value"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="N° NF-E">
                  <el-input v-model="formData.numero_nfe" placeholder="Insira o N° NF-E"/>
                </el-form-item>
                <el-form-item label="Cupom de Desconto">
                  <el-tooltip
                    v-if="!isEdit"
                    content="Voce precisa salvar o pedido antes de adicionar desconto!"
                    placement="top"
                  >
                    <el-input placeholder="Insira o código" suffix-icon="el-icon-warning" disabled/>
                  </el-tooltip>
                  <el-input v-else v-model="couponCode" placeholder="Insira o código">
                    <el-button
                      slot="suffix"
                      :type="canApplyDiscount ? 'primary' : 'default'"
                      icon="el-icon-success"
                      style="margin-right:-5px;"
                      @click="handleApplyDiscount(couponCode)"
                    />
                  </el-input>
                </el-form-item>
                <div class="order-info">
                  <h4>Subtotal</h4>
                  <span>R$ {{ orderSubtotal.toFixed(2) }}</span>
                </div>
                <div class="order-info">
                  <h4>Descontos</h4>
                  <span>R$ {{ formData.discount }}</span>
                </div>
                <el-row
                  v-for="(discount, index) in formData.discounts"
                  :key="index"
                  class="order-info-discount"
                >
                  <small>{{ discount.coupon.code }}</small>
                  <el-button
                    class="remove-btn"
                    type="text"
                    @click="handleRemoveDiscount(discount.id)"
                  >
                    <i class="el-icon-close"/>
                  </el-button>
                  <span>R$ {{ discount.amount }}</span>
                </el-row>
                <hr>
                <div class="order-info">
                  <h4>Total</h4>
                  <span>R$ {{ orderTotal.toFixed(2) }}</span>
                </div>
              </el-form>
              <!-- <el-button v-show="formData.id" type="danger">
                <i class="el-icon-delete"/>
              </el-button> -->
              <el-button
                :disabled="canSave"
                type="primary"
                style="float:right;margin-bottom:10px"
                @click="handleSave"
              >Salvar</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
const defaultForm = {
  id: undefined,
  user_id: undefined,
  items: [],
  status: '',
  numero_nfe: '',
  type: 'buy',
  coupons: [],
  discount: 0.0
}

export default {
  name: 'OrderEditor',

  data() {
    return {
      formData: Object.assign({}, defaultForm),
      isEdit: false,
      loading: false,
      searching: false,
      product: '',
      couponCode: '',
      modalAddItems: false,
      clientList: [],
      statuses: [
        {
          value: 'pending',
          label: 'Pendente'
        },
        {
          value: 'cancelled',
          label: 'Cancelado'
        },
        {
          value: 'paid',
          label: 'Pago'
        },
        {
          value: 'shipped',
          label: 'Enviado'
        },
        {
          value: 'finished',
          label: 'Finalizado'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      order: 'currentOrder',
      products: 'products',
      users: 'users'
    }),

    productList() {
      return this.products &&
        this.products.data &&
        this.products.data.length > 0
        ? this.products.data
        : []
    },

    orderSubtotal() {
      var total = 0
      this.formData.items.map(item => {
        total += item.product.custoCompras * item.quantity
      })
      return total
    },

    orderTotal() {
      return this.orderSubtotal - this.formData.discount
    },

    canSave() {
      return !(
        this.formData.items.length >= 1 && this.formData.user_id !== undefined
      )
    },

    title() {
      return this.isEdit ? 'Editar Pedido #' + this.formData.id : 'Novo Pedido'
    },

    canApplyDiscount() {
      return this.couponCode.length > 3
    }
  },

  watch: {
    couponCode(val) {
      this.couponCode = val.toUpperCase()
    }
  },

  created() {
    // Salva o nome da rota para evitar bugs nas abas de navegaÃ§Ã£o
    this.tempRoute = Object.assign({}, this.$route)

    this.$route.params && this.$route.params.id
      ? (this.isEdit = true)
      : (this.isEdit = false)
  },

  mounted() {
    if (this.isEdit) {
      this.findOrder(this.$route.params.id)
    }
  },

  methods: {
    updateNavigationTab() {
      const route = Object.assign({}, this.tempRoute, {
        title: this.title
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

    findOrder(id) {
      this.loading = true
      this.$store.dispatch('findOrder', id).then(() => {
        this.loading = false
        this.fillForm()
      })
    },

    fillForm() {
      this.formData = Object.assign({}, this.order)
      if (this.order.user) {
        this.formData.user_id = this.order.user.id
        this.clientList.push(this.order.user)
      }
      this.updateNavigationTab()
    },

    searchProduct() {
      this.searching = true
      this.$store
        .dispatch('fetchProducts', { title: this.product })
        .then(() => (this.searching = false))
    },

    searchClient(name) {
      this.searching = true
      this.$store.dispatch('fetchUsers', { name }).then(() => {
        this.searching = false
        this.clientList.push(...this.users.data)
      })
    },

    clientLabel(client) {
      return client && client.name ? `${client.name} ${client.surname}` : ''
    },

    addToCart(item) {
      const exists = this.formData.items.filter(
        orderItem => orderItem.product.id === item.id
      )[0]
      if (exists) {
        this.formData.items = this.formData.items.map(orderItem => {
          if (orderItem.product.id === item.id) {
            orderItem.quantity++
          }
          return orderItem
        })
      } else {
        this.formData.items.unshift({ product: item, quantity: 1 })
      }

      this.$message({
        message: 'Item Adicionado com sucesso!',
        type: 'success',
        duration: 1000
      })
    },

    removeFromCart(item_id) {
      this.formData.items = this.formData.items.filter(
        item => item.product.id !== item_id
      )
    },

    prepareToSave({ id, user_id, type, items, status, numero_nfe }) {
      return {
        id,
        user_id,
        status,
        numero_nfe,
        type,
        items: items.map(item => {
          return {
            id: item.id ? item.id : undefined,
            product_id: item.product.id,
            quantity: item.quantity
          }
        })
      }
    },

    handleSave() {
      this.$store
        .dispatch('saveOrder', this.prepareToSave(this.formData))
        .then(() => {
          this.$message({
            message: 'Salvo com Sucesso!',
            type: 'success',
            duration: 3000
          })

          // preenche o objeto do form em memÃ³ria
          this.fillForm()

          if (!this.isEdit) {
            this.$router.push({
              name: 'EditarCompra',
              params: { id: this.formData.id }
            })
          }
        })
    },

    showModalAddItems() {
      this.modalAddItems = true
      this.$store.dispatch('fetchProducts')
    },

    handleApplyDiscount(code) {
      if (!code) return
      this.loading = true
      this.$store
        .dispatch('applyDiscount', { id: this.formData.id, code })
        .then(data => {
          this.$message({
            message: data.message,
            type: data.success ? 'success' : 'warning',
            duration: 3000
          })
          this.loading = false
          this.fillForm()
          this.updateDiscounts()
        })
        .catch(() => (this.loading = false))
    },

    handleRemoveDiscount(discount_id) {
      this.loading = true
      this.$store
        .dispatch('destroyDiscount', {
          id: this.formData.id,
          discount_id
        })
        .then(removed => {
          this.formData.discounts = this.formData.discounts.filter(
            discount => discount.id !== removed
          )
          this.$message({
            message: 'Desconto Removido',
            type: 'warning',
            duration: 3000
          })
          this.loading = false
          this.updateDiscounts()
        })
        .catch(() => (this.loading = false))
    },

    updateDiscounts() {
      let discount = 0
      this.formData.discounts.map(item => {
        discount += item.amount
      })
      this.formData.discount = discount
    }
  }
}
</script>

<style scoped>
img.product-thumbnail {
  width: 64px;
  height: auto;
}
img.item-thumbnail {
  width: 128px;
  height: auto;
}
.order-info {
  font-weight: bold;
  color: #606266;
  margin: 10px auto 10px auto;
}
.order-info h4 {
  display: inline;
}
.order-info span {
  font-weight: 300;
  float: right;
  color: #999;
}
.order-info-discount {
  font-weight: bold;
  color: #606266;
  margin: 10px auto 10px auto;
}
.order-info-discount small {
  color: green;
}
.order-info-discount span {
  font-weight: 300;
  float: right;
  color: #999;
  margin-top: 10px;
}
</style>

<style rel="stylesheet/scss" lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px !important;
  }
}

.box-card-component {
  .box-card-header {
    position: relative;
    height: 180px;
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
