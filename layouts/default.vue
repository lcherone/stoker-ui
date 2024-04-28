<template>
  <div :class="['app', layoutClass]">
    <layoutHeader />

    <div
      :class="[
        'content',
        { 'has-alert': $state.alert.type },
        $route.name ? 'page-' + $route.name : 'no-min-height'
      ]"
    >
      <Nuxt />
    </div>

    <layoutFooter />

    <client-only>
      <modal />
    </client-only>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Default',
  computed: {
    ...mapState({
      site: state => state.site
    }),
    // handles switching class from phone to desktop on resize
    layoutClass () {
      return this.site.device === 'phone' ? 'app-phone' : 'app-desktop'
    }
  },
  created () {
    // maintain correct device type
    if (!process.server) {
      const getDeviceType = () => {
        this.$state.devicetype = this.getDeviceType()
        // this.$store.commit('state/set', {
        //   key: 'device',
        //   value: String(this.$state.devicetype)
        // })
      }

      //
      getDeviceType()

      //
      this.$event.on('window:resize', getDeviceType)
      //
      this.$event.on('window:orientationchange', getDeviceType)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/style.scss';

.content {
  background-color: #fff;
  min-height: calc(100vh - 40px);
  padding: 65px 0 15px 0;
}
</style>
