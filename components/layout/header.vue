<template>
  <div>
    <nav class="navbar fixed-top navbar-dark bg-dark navbar-expand-lg">
      <nuxt-link class="navbar-brand" to="/">
        {{ $config.title }}
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarMain"
        aria-controls="navbarMain"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div id="navbarMain" class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item" :class="{ active: $route.path === '/deployments' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/deployments"
            >
              Deployments
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/sites' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/sites"
            >
              Sites
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/domains' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/domains"
            >
              Domains
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/servers' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/servers"
            >
              Servers
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/users' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/users"
            >
              Users
            </nuxt-link>
          </li>
          <li class="nav-item" :class="{ active: $route.path === '/tools' }">
            <nuxt-link
              class="nav-link"
              role="menuitem"
              to="/tools"
            >
              Tools
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // props: {
  //     // inModal: {
  //     //   type: Boolean,
  //     //   default: false
  //     // }
  // },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  mounted () {
    this.$nextTick(function () {
      console.log('component-layout-header', 'mounted')
    })
  },
  beforeDestroy () {
    console.log('component-layout-header', 'beforeDestroy')
  }
}
</script>

<style lang="scss"></style>
