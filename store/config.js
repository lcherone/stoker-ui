import Vue from 'vue'

/**
 * State for single config item
 *
 * Usage: this.$store.state.config.*
 */
export const state = () => ({
  loading: true,
  site_name: '',
  page_title: '',
  metatags: {},
  facebook_url: '',
  twitter_url: '',
  website_url: '',
  modules: {},
  loading: true,
  deviceOrientation: null,
  device: '',
  state: ''
})

/**
 * Mutations / Setters
 *
 * Usage: this.$store.commit('config/<method name>', payload)
 */
export const mutations = {
  /**
   * Initialize/hydrate state
   *
   * Usage: this.$store.commit('config/init', {id: 123})
   *
   * @param {Object} state
   * @param {Object} data
   */
  init (state, data) {
    // hydrate passed vars
    for (const i in data) {
      Vue.set(state, i, data[i])
    }
    // set as not longer loading
    state.loading = false
  },

  /**
   * Set single state item
   *
   * Usage: this.$store.commit('config/set', {key: 'id', value: 123})
   *
   * @param {*} state
   * @param {*} param1
   */
  set (state, {
    key,
    value
  }) {
    Vue.set(state, key, value)
  },

  /**
   * Clear state, set to null
   * @param {*} state
   */
  clear (state) {
    // set all to null
    for (const i of Object.keys(state)) {
      state[i] = null
    }

    // set loading state
    state.loading = true
  }
}

export const getters = {}

export const actions = {}
