<template>
  <div class="section">
    <div class="card is-clearfix columns">
      <figure class="card-image is-480x480 column is-one-thirds">
        <img :src="product.image ? product.image.url : defaultImage">
      </figure>
      <div class="card-content column is-two-thirds">
        <div class="card-content__title">
          <h2 class="title is-4">
            {{ product.name }}
            <button
              class="button is-small"
              :title="removeFromFavouriteLabel"
              v-show="product.isFavourite"
              @click="removeFromFavourite(product.id)"
            >
              <span class="icon is-small">
                <i class="fas fa-heart"></i>
              </span>
            </button>
            <button
              class="button is-small"
              :title="addToFavouriteLabel"
              v-show="!product.isFavourite"
              @click="saveToFavorite(product.id)"
            >
              <span class="icon is-small">
                <i class="far fa-heart"></i>
              </span>
            </button>
          </h2>
        </div>
        <div class="card-content__text">
          <p>{{product.description}}</p>
        </div>
        <div class="card-content__ratings" v-if="product.rating === 1">
          <i class="fa fa-star"></i>
        </div>
        <div class="card-content__ratings" v-else-if="product.rating === 2">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="card-content__ratings" v-else-if="product.rating === 3">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="card-content__ratings" v-else-if="product.rating === 4">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="card-content__ratings" v-else-if="product.rating === 5">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </div>
        <div class="card-content__reviews">
          <div class="is-pulled-left">
            <p>
              <strong>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</strong>
            </p>
          </div>
          <div class="select is-rounded is-small is-pulled-right">
            <select @change="onSelectQuantity(product)" v-model="product.quantity">
              <option v-for="(quantity, index) in 10" :value="quantity" :key="index">{{ quantity }}</option>
            </select>
          </div>
        </div>
        <div class="card-content__price is-pulled-left">
          <span class="title is-3">
            <strong>R$ {{ product.price }}</strong>
          </span>
        </div>
        <div class="card-content__btn is-pulled-right">
          <button
            class="button is-primary"
            v-if="!isAddedToCart(product.id)"
            @click="addToCart(product)"
          >{{ addToCartLabel }}</button>
          <button
            class="button is-text"
            v-else
            @click="removeFromCart(product.id)"
          >{{ removeFromCartLabel }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'product-detail-component',

  data() {
    return {
      addToCartLabel: 'Adicionar ao Carrinho',
      removeFromCartLabel: 'Remover do Carrinho',
      addToFavouriteLabel: 'Adicionar aos Favoritos',
      removeFromFavouriteLabel: 'Remover dos Favoritos',
      product: {},
      selected: 1,
      defaultImage: 'https://bulma.io/images/placeholders/480x480.png'
    }
  },

  mounted() {
    this.product = this.$store.getters.getProductById(this.$route.params.id)
  },

  computed: {
    isAddedBtn() {
      return this.product.isAddedBtn
    },
    ...mapGetters({
      cartItems: 'productsAdded'
    })
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product)
    },
    removeFromCart(id) {
      this.$store.dispatch('removeFromCart', id)
    },
    onSelectQuantity(product) {
      this.$store.dispatch('updateItem', product)
    },
    saveToFavorite(id) {
      let isUserLogged = this.$store.state.userInfo.isLoggedIn

      if (isUserLogged) {
        this.$store.commit('addToFavourite', id)
      } else {
        this.$store.commit('showLoginModal', true)
      }
    },
    removeFromFavourite(id) {
      this.$store.commit('removeFromFavourite', id)
    },

    onSelectQuantity(product) {
      this.$store.dispatch('updateItem', product)
    },

    isAddedToCart(id) {
      const exists = this.cartItems.find(item => item.product_id === id)
      if (exists) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.card-content {
  padding: 15px 10px 15px 0;

  &__text {
    margin: 15px 0;
  }
  &__reviews {
    display: inline-block;
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>

