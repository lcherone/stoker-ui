import modal from "./modal.vue"

const Plugin = {
  install(Vue, options = {}) {
    /**
     * Singleton
     */
    if (this.installed) return
    this.installed = true

    /**
     * Event bus
     */
    this.event = new Vue()

    /**
     * Plugin methods
     */
    Vue.prototype.$modal = {
      show: (options = {}) => Plugin.event.$emit("show", options),
      open: (options = {}) => Plugin.event.$emit("show", options),
      close: () => Plugin.event.$emit("hide"),
      hide: () => Plugin.event.$emit("hide")
    }

    /**
     * Registration of <modal/> component
     */
    Vue.component("modal", modal)
  }
}

export default Plugin