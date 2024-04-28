import Vue from 'vue'
import $ from 'jquery'

const CryptoJS = require('crypto-js')
const obfusck = CryptoJS.SHA256('obfuscation-key').toString()

/**
 * Global state plugin
 *  - Stores app state which is not model or store specific, like what current tab or cards/list display
 *  - Is saved encrypted on change into localstorage and restored on page reload
 *  - Is cleared from localstorage on logout
 */
export default ({
  app //, req
}, inject) => {
  let data = {
    state: Vue.observable({
      loading: true,
      errors: {},
      alert: {},
      form: {
        errors: {},
        values: {}
      },
      devicetype: null,
      socketConnected: null,
      slowConnection: false,
      slowRendering: false,
      config: {},
      emptyImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mM8UQ8AAhUBSQV8WJQAAAAASUVORK5CYII=',
      screenOrientation: process.server ? 'landscape' : $(window).width() > $(window).height() ? 'landscape' : 'portrait',
      header: {
        show: {
          sidebar: true
        }
      },
      sidebar: {
        forced: false,
        enabled: true,
        open: true
      },
      table_limit: 25,
      table_select_multi: true,
      selected: []
    })
  }

  if (process.browser) {
    // eslint-disable-next-line no-prototype-builtins
    if (typeof window.localStorage !== 'undefined' && window.localStorage.hasOwnProperty('state')) {
      try {
        data = JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem('state'), obfusck).toString(CryptoJS.enc.Utf8))
        if (typeof data.state !== 'undefined') {
          data.state = Vue.observable(data.state)
        }
      } catch {
        console.error('Error loading global state')
      }
    }
  }

  inject('state',
    new Vue({
      data: () => data,
      watch: {
        state: {
          handler () {
            if (process.browser) {
              if (typeof window.localStorage !== 'undefined') {
                window.localStorage.setItem('state',
                  CryptoJS.AES.encrypt(JSON.stringify({
                    state: this.state
                  }), obfusck))
              }
            }
          },
          deep: true
        }
      }
    }).$data.state)
}
