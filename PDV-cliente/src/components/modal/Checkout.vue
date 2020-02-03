<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{ modalTitle }}</p>
        <button class="delete" aria-label="close" @click="closeModal(false)"></button>
      </header>
      <section class="modal-card-body">
        <div v-if="!isCheckoutSection">
          <div class="box" v-for="product in products" :key="product.id">
            <button
              class="is-pulled-right button is-info is-inverted"
              @click="removeFromCart(product.id)"
            >{{ removeLabel }}</button>
            <p>{{ product.name }} {{ product.quantity > 0 ? ` x ${product.quantity}` : ''}}</p>
            <p>R&dollar; {{ product.price }}</p>
          </div>
          <div v-if="products.length === 0">
            <p>{{ cartEmptyLabel }}</p>
          </div>
        </div>
        <div v-if="isCheckoutSection">
          <p>Seu Pedido foi recebido!</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button
          v-show="products.length > 0 && !isCheckoutSection"
          class="button is-success"
          @click="onNextBtn"
        >{{ buyLabel }}</button>
        <button
          v-if="isCheckoutSection"
          class="button is-success"
          @click="closeModal(true)"
        >{{ closeLabel }}</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkout-component',

  data() {
    return {
      modalTitle: 'Checkout',
      removeLabel: 'Remover',
      cartEmptyLabel: 'Carrinho Vazio',
      closeLabel: 'Fechar',
      isCheckoutSection: false
    }
  },

  computed: {
    products() {
      return this.$store.getters.productsAdded
    },

    openModal() {
      if (this.$store.getters.isCheckoutModalOpen) {
        return true
      } else {
        return false
      }
    },

    buyLabel() {
      let totalProducts = this.products.reduce(
          (acc, product) => acc + product.quantity,
          0
        ),
        productsAdded = this.$store.getters.productsAdded,
        pricesArray = [],
        productLabel = '',
        finalPrice = '',
        quantity = 1

      productsAdded.forEach(product => {
        if (product.quantity >= 1) {
          quantity = product.quantity
        }

        pricesArray.push(product.price * quantity) // get the price of every product added and multiply quantity
      })

      finalPrice = pricesArray.reduce((a, b) => a + b, 0) // sum the prices

      if (totalProducts > 1) {
        // set plural or singular
        productLabel = 'produtos'
      } else {
        productLabel = 'produto'
      }
      return `Comprar ${totalProducts} ${productLabel} por R$ ${finalPrice}`
    },

    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn
    }
  },

  methods: {
    closeModal(reloadPage) {
      this.$store.commit('showCheckoutModal', false)

      if (reloadPage) {
        window.location.reload()
      }
    },

    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id)
    },

    onNextBtn() {
      if (this.isUserLoggedIn) {
        this.sendOrder()
      } else {
        this.$store.commit('showCheckoutModal', false)
        this.$store.commit('showLoginModal', true)
      }
    },
    onPrevBtn() {
      this.isCheckoutSection = false
    },

    sendOrder() {
      this.$store
        .dispatch('checkout')
        .then(() => {
          this.isCheckoutSection = true
        })
        .catch(e => {
          this.isCheckoutSection = false
        })
    }
  }
}
</script>

