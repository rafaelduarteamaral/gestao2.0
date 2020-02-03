<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <navbar/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],

  data() {
    return {
      ed: null // event daemon
    }
  },

  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },

  created() {
    if (this.$store.getters.token) {
      this.ed = this.$ws
        .withJwtToken(this.$store.getters.token.substr(7))
        .connect()
        .subscribe('notifications')
      this.ed.on('message', this.onMessage)
      this.ed.on('new:user', this.onNewUser)
      this.ed.on('new:order', this.onNewOrder)
    }
  },

  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },

    onMessage(message) {
      this.$message({
        message,
        type: 'success',
        duration: 3000
      })
    },

    onNewUser() {
      this.$store.state.dashboard.users += 1
      this.$message({
        message: 'Novo usuário cadastrado!',
        type: 'success',
        duration: 3000
      })
    },

    onNewOrder(order) {
      this.$store.state.dashboard.orders += 1
      this.$store.state.dashboard.revenues += order.total
      this.$message({
        message: 'Novo pedido Realizado!',
        type: 'success',
        duration: 3000
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
