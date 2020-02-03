<template>
  <div class="login-container">
    <el-form ref="resetForm" v-model="formData" class="login-form" autocomplete="on">
      <div class="title-container">
        <h3 class="title">ERP Admin</h3>
        <span
          class="label"
          style="maring: 10px auto; font-weight:900;text-align:center"
        >{{ formData.email }}</span>
      </div>
      <span class="label">Senha</span>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          v-model="formData.password"
          :type="passwordType"
          placeholder="Insira a senha"
          name="password"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <span class="label">Confirmação de senha</span>
      <el-form-item prop="password_confirmation">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          v-model="formData.password_confirmation"
          :type="passwordType"
          placeholder="Repita a senha"
          name="password_confirmation"
          auto-complete="on"
          @keyup.enter.native="handleReset"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
        </span>
      </el-form-item>
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:10px;"
        @click.native.prevent="handleReset"
      >Alterar Senha!</el-button>
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
export default {
  name: 'ResetPass',

  data() {
    return {
      formData: {
        email: '',
        password: '',
        password_confirmation: '',
        token: ''
      },
      loading: true,
      passwordType: 'password'
    }
  },

  mounted() {
    const resetToken = this.$route.query.token
    if (resetToken) {
      this.findReset(resetToken)
    } else {
      // this.$router.push({ path: '/login' })
    }
  },

  methods: {
    findReset(token) {
      this.$store
        .dispatch('findResetToken', token)
        .then(data => {
          this.formData.email = data.email
          this.formData.token = data.token
          this.loading = false
        })
        .catch(() => {
          this.loading = false
          // eslint-disable-next-line
          this.$router.push({ path: '/login' })
        })
    },

    handleReset() {
      if (this.formData.password !== this.formData.password_confirmation) {
        this.$message({
          message: 'Erro! As senhas precisam ser iguais!',
          type: 'error',
          duration: 15000
        })
        return
      }
      this.loading = true
      this.$store
        .dispatch('ResetPassword', this.formData)
        .then(() => {
          this.$message({
            message:
              'Sucesso! Agora você já pode fazer login com a sua nova senha!',
            type: 'success',
            duration: 30000
          })
          this.loading = false
          this.$router.push('/login')
        })
        .catch(() => {
          this.$message({
            message:
              'Erro! Não foi possível resetar a sua senha, tente mais tarde!',
            type: 'error',
            duration: 30000
          })
          this.loading = false
          this.$router.push('/login')
        })
    },

    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },

    handleLogin() {
      this.loading = true
      setTimeout(() => {
        // eslint-disable-next-line
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

.label {
  color: white;
  margin-bottom: 10px;
  display: block;
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
