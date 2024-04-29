<template>
  <div>
    <nav class="navbar fixed-top navbar-dark navbar-expand-sm">
      <nuxt-link class="navbar-brand" to="/">
        <span>://</span> Stoker<span>UI</span>
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

<style lang="scss" scoped>

.navbar {
  padding: .25rem 1rem;
  background-color: #00AACE;
}

.navbar-brand {
  padding: 0;
  font-family: 'Jersey 15', serif;
  font-size: 28px;
  text-shadow: 2px 2px #3e3e3e;
  span:first-of-type {
    font-size: larger;
  }
  span:last-of-type {
    color: #e9e5e5;
  }
}

.nuxt-link-active:not(.navbar-brand) {
  text-decoration: underline;
}
</style>
