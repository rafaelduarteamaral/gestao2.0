<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img :src="product.image ? product.image.url : defaultImage" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ product.name }}</p>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>{{ product.description }}</p>
        <div class="is-pulled-left">
          <i v-if="product.ratings === 1" class="fa fa-star"></i>
          <i v-if="product.ratings === 2" class="fa fa-star"></i>
          <i v-if="product.ratings === 2" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 3" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 4" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <i v-if="product.ratings === 5" class="fa fa-star"></i>
          <p>{{ product.reviews > 0 ? `${product.reviews} Reviews` : 'No reviews' }}</p>
        </div>
        <p class="is-pulled-right">
          <span class="title is-4">
            <strong>R&dollar; {{ product.price }}</strong>
          </span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button
              class="button is-primary"
              v-if="!isAddedToCart(product.id)"
              @click="addToCart(product)"
            >{{ addToCartLabel }}</button>
            <button
              class="button is-text"
              v-else
              @click="removeFromCart(product.id, false)"
            >{{ removeFromCartLabel }}</button>
            <div>
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
              <div class="select is-rounded is-small">
                <select @change="onSelectQuantity(product)" v-model="product.quantity">
                  <option v-for="(qty, index) in 10" :value="qty" :key="index">{{ qty }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link
      class="details"
      :to="{
        path: '/product-detail',
        name: 'product-detail-component',
        params: {
          id: product.id,
          title: product.name,
          price: product.price,
          rating: product.ratings,
          reviews: product.reviews,
          isAddedBtn: product.isAddedBtn
        }
      }"
    ></router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'products-component',
  props: ['product'],

  data() {
    return {
      addToCartLabel: 'Comprar',
      viewDetailsLabel: 'Detalhes',
      removeFromCartLabel: 'Remover',
      addToFavouriteLabel: 'Favorito',
      removeFromFavouriteLabel: 'Remover Favorito',
      selected: 1,
      defaultImage: 'https://bulma.io/images/placeholders/1280x960.png'
    }
  },

  mounted() {
    //
  },

  computed: {
    ...mapGetters({
      isUserLogged: 'isUserLoggedIn',
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
.details {
  cursor: pointer;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  &:hover {
    border: 1px solid #51bafc;
  }
}
.button,
.select {
  z-index: 2;
}
.select {
  position: absolute;
  right: 15px;
}
</style>


