<template>
  <div :class="[ openModal ? 'is-active' : '', 'modal' ]">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p v-if="!isUserSignedUp" class="modal-card-title">{{ modalTitle }}</p>
        <p v-if="isUserSignedUp" class="modal-card-title">{{ modalTitleRegistered }}</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </header>
      <form @submit="checkForm" action="#" method="post">
        <section class="modal-card-body">
          <div v-if="!isUserSignedUp">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightNameWithError ? 'input is-danger' : 'input']"
                  type="text"
                  :placeholder="namePlaceholder"
                  v-model="name"
                  @keyup="checkNameOnKeyUp(name)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span v-if="highlightNameWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightNameWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightNameWithError" class="help is-danger">{{ nameErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightSurnameWithError ? 'input is-danger' : 'input']"
                  type="text"
                  :placeholder="surnamePlaceHolder"
                  v-model="surname"
                  @keyup="checkSurnameOnKeyUp(surname)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-user"></i>
                </span>
                <span v-if="highlightSurnameWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightSurnameWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightSurnameWithError" class="help is-danger">{{ surnameErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightEmailWithError ? 'input is-danger' : 'input']"
                  type="email"
                  :placeholder="emailPlaceholder"
                  name="emailName"
                  v-model="email"
                  @keyup="checkEmailOnKeyUp(email)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span v-if="highlightEmailWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightEmailWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightEmailWithError" class="help is-danger">{{ emailErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  :placeholder="passwordPlaceholder"
                  v-model="password"
                  @keyup="checkPasswordOnKeyUp(password)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span v-if="highlightPasswordWithError !== null" class="icon is-small is-right">
                  <i
                    :class="[highlightPasswordWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p v-if="highlightPasswordWithError" class="help is-danger">{{ passwordErrorLabel }}</p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input
                  :class="[highlightRepeatPasswordWithError ? 'input is-danger' : 'input']"
                  type="password"
                  :placeholder="repeatPasswordPlaceholder"
                  v-model="password_confirmation"
                  @keyup="checkRepeatPasswordOnKeyUp(password_confirmation)"
                >
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span
                  v-if="highlightRepeatPasswordWithError !== null"
                  class="icon is-small is-right"
                >
                  <i
                    :class="[highlightRepeatPasswordWithError ? 'fas fa-exclamation-circle' : 'fas fa-check']"
                  ></i>
                </span>
              </p>
              <p
                v-if="highlightRepeatPasswordWithError"
                class="help is-danger"
              >{{ notEqualErrorLabel }}</p>
            </div>
          </div>
          <div v-if="isUserSignedUp" class="level">
            <div class="level-item has-text-centered">
              <div>
                <p class="title">Bem vindo {{ name }}!</p>
                <p class="heading">Agora você é um membro</p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button v-if="!isUserSignedUp" class="button is-success">{{ primaryBtnLabel }}</button>
          <button
            v-if="isUserSignedUp"
            type="button"
            class="button is-info"
            @click="closeModal"
          >{{ btnRegisteredLabel }}</button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script>
import { isValidEmail } from '../../validators'

export default {
  name: 'registration-component',

  data() {
    return {
      modalTitle: 'Cadastro',
      modalTitleRegistered: 'Bem Vindo ',
      primaryBtnLabel: 'Cadastrar',
      btnRegisteredLabel: 'Fechar',
      namePlaceholder: 'Nome*',
      surnamePlaceHolder: 'Sobrenome*',
      emailPlaceholder: 'Email*',
      passwordPlaceholder: 'Senha*',
      repeatPasswordPlaceholder: 'Repetir Senha*',
      notEqualErrorLabel: 'As senhas precisam ser Iguais',
      passwordErrorLabel: 'Senha Obrigatória',
      nameErrorLabel: 'Nome obrigatório',
      surnameErrorLabel: 'Sobrenome é Obrigatório',
      emailErrorLabel: 'E-mail obrigatório',
      emailNotValidLabel: 'E-mail válido obrigatório',
      name: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: '',
      highlightNameWithError: null,
      highlightSurnameWithError: null,
      highlightEmailWithError: null,
      highlightPasswordWithError: null,
      highlightRepeatPasswordWithError: null,
      isFormSuccess: false,
      isUserSignedUp: false
    }
  },

  computed: {
    openModal() {
      if (this.$store.getters.isSignupModalOpen) {
        return true
      } else {
        return false
      }
    }
  },

  methods: {
    closeModal() {
      this.$store.commit('showSignupModal', false)
    },
    checkForm(e) {
      e.preventDefault()

      if (
        this.name &&
        this.surname &&
        this.email &&
        this.password &&
        this.password_confirmation
      ) {
        this.highlightEmailWithError = false
        this.highlightSurnameWithError = false
        this.highlightPasswordWithError = false
        this.isFormSuccess = true
        this.$store
          .dispatch('register', {
            name: this.name,
            surname: this.surname,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
          .then(data => {
            this.isUserSignedUp = true
            this.closeModal()
          })
          .catch(e => {
            this.isUserSignedUp = false
          })
      }

      if (!this.name) {
        this.highlightNameWithError = true
      } else {
        this.highlightNameWithError = false
      }

      if (!this.surname) {
        this.highlightSurnameWithError = true
      } else {
        this.highlightSurnameWithError = false
      }

      if (!this.email) {
        this.highlightEmailWithError = true

        if (this.email && !isValidEmail(this.email)) {
          this.emailErrorLabel = this.emailNotValidLabel
        }
      } else {
        this.highlightEmailWithError = false
      }

      if (!this.password) {
        this.highlightPasswordWithError = true
      } else {
        this.highlightPasswordWithError = false
      }

      if (!this.password_confirmation) {
        this.highlightRepeatPasswordWithError = true
      } else {
        this.highlightRepeatPasswordWithError = false
      }
    },
    checkNameOnKeyUp(nameValue) {
      if (nameValue) {
        this.highlightNameWithError = false
      } else {
        this.highlightNameWithError = true
      }
    },

    checkSurnameOnKeyUp(surname) {
      if (surname) {
        this.highlightSurnameWithError = false
      } else {
        this.highlightSurnameWithError = true
      }
    },

    checkEmailOnKeyUp(emailValue) {
      if (emailValue && isValidEmail(emailValue)) {
        this.highlightEmailWithError = false
      } else {
        this.highlightEmailWithError = true

        if (!isValidEmail(emailValue)) {
          this.emailErrorLabel = this.emailNotValidLabel
        }
      }
    },

    checkPasswordOnKeyUp(passwordValue) {
      if (passwordValue) {
        this.highlightPasswordWithError = false

        if (this.password_confirmation === this.password) {
          this.highlightRepeatPasswordWithError = false
        } else {
          this.highlightRepeatPasswordWithError = true
        }
      } else {
        this.highlightPasswordWithError = true
      }
    },

    checkRepeatPasswordOnKeyUp(repeatPasswordValue) {
      if (repeatPasswordValue) {
        if (repeatPasswordValue === this.password) {
          this.highlightRepeatPasswordWithError = false
        } else {
          this.highlightRepeatPasswordWithError = true
        }
      } else {
        this.highlightRepeatPasswordWithError = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fa-exclamation-circle {
  color: red;
}
.fa-check {
  color: green;
}
</style>


