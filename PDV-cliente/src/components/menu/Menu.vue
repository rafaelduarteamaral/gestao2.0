<template>
  <div>
    <div class="navbar-item">
      <div class="field is-grouped">
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showSignupModal">
            <span class="icon">
              <i class="fas fa-user-plus"></i>
            </span>
            <span>{{ signupLabel }}</span>
          </a>
        </p>
        <p class="control">
          <a v-if="!isUserLoggedIn" class="button" @click="showLoginModal">
            <span class="icon">
              <i class="fas fa-user"></i>
            </span>
            <span>{{ loginLabel }}</span>
          </a>
        </p>
      </div>
    </div>
    <div
      v-if="isUserLoggedIn"
      class="navbar-item has-dropdown is-hoverable"
      style="margin-top:-10px"
    >
      <a class="navbar-link">Olá, {{ user.name }}!</a>
      <div class="navbar-dropdown is-boxed">
        <!-- <router-link
          class="navbar-item"
          :to="{ path: '/wishlist', name: 'wishlist-container-component' }"
        >{{ wishlistLabel }}</router-link>
        <hr class="navbar-divider">-->
        <a class="navbar-item" @click="logout">{{ logoutLabel }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'menu-component',
  data() {
    return {
      wishlistLabel: 'Lista de Desejos',
      logoutLabel: 'Sair',
      loginLabel: 'Entrar',
      signupLabel: 'Cadastrar-se'
    }
  },

  computed: {
    ...mapGetters({
      user: 'user',
      isUserLoggedIn: 'isUserLoggedIn'
    })
  },

  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        // redirect to homepage
        this.$router.push({ name: 'homepage-component' })
      })
    },
    showLoginModal() {
      this.$store.commit('showLoginModal', true)
    },
    showSignupModal() {
      this.$store.commit('showSignupModal', true)
    }
  }
}
</script>

