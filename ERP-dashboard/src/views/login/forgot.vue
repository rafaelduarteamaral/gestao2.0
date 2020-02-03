<template>
  <div class="login-container">
    <el-form ref="resetForm" v-model="formData" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">ERP Admin</h3>
      </div>
      <el-form-item prop="email">
        <span class="svg-container">
          <svg-icon icon-class="email"/>
        </span>
        <el-input v-model="formData.email" placeholder="E-mail"/>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:10px;"
        @click.native.prevent="handleReset"
      >Enviar</el-button>
      <el-button
        v-loading.fullscreen.lock="loading"
        type="text"
        style="float:right"
        @click="handleLogin"
      >Voltar para o Login</el-button>
    </el-form>
  </div>
</template>
<script>
import { validateEmail } from '@/utils/validate'

export default {
  name: 'ForgotPass',

  data() {
    return {
      formData: {
        email: ''
      },
      loading: false
    }
  },

  mounted() {
    const token = this.$route.query.token
    if (token) {
      // eslint-disable-next-line
      this.$router.push({ name: 'ResetPassword', query: { token } })
    }
  },

  methods: {
    handleReset() {
      if (!validateEmail(this.formData.email)) {
        this.$message({
          message: 'E-mail Inválido!',
          type: 'error',
          duration: 10000
        })
        return
      }
      this.loading = true
      this.$store
        .dispatch('ForgotPassword', this.formData)
        .then(() => {
          this.loading = false
          this.$message({
            message: `Sucesso! Enviamos um e-mail para ${
              this.formData.email
            }, verifique sua caixa de entrada!`,
            type: 'success',
            duration: 30000
          })
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            message: `Ops! houve um erro ao enviar o e-mail para ${
              this.formData.email
            }, Tente novamente mais tarde!`,
            type: 'error',
            duration: 30000
          })
          this.loading = false
        })
    },

    handleLogin() {
      this.loading = true
      setTimeout(() => {
        this.$router.push({ path: '/login' })
        this.loading = false
      }, 100)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
