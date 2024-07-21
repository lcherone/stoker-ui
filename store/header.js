import Vue from 'vue'

/**
 * State for single header item
 *
 * Usage: this.$store.state.header.*
 */
export const state = () => ({
  loading: true,
  links: [],
  notifications: {}
})

/**
 * Mutations / Setters
 *
 * Usage: this.$store.commit('header/<method name>', payload)
 */
export const mutations = {
  /**
   * Initialize/hydrate state
   *
   * Usage: this.$store.commit('header/init', {id: 123})
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
    Vue.set(state, 'loading', false)
  },

  /**
   * Set single state item
   *
   * Usage: this.$store.commit('header/set', {key: 'id', value: 123})
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
   * Set notifications
   *
   * Usage: this.$store.commit('header/setNotification', {key: 'messages', value: 'New message.'})
   *
   * @param {*} state
   * @param {*} param1
   */
  // setNotification (state, {
  //   key,
  //   value
  // }) {
  //   Vue.set(state.notifications, key, value)
  // },

  /**
   * Delete single state item
   *
   * Usage: this.$store.commit('header/clearNotification', 'messages')
   *
   * @param {*} state
   * @param {*} param1
   */
  // clearNotification (state, key) {
  //   Vue.delete(state.notifications, key)
  // },

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
