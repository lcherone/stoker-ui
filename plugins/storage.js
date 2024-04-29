import Vue from 'vue'

const CryptoJS = require('crypto-js')
const obfusck = CryptoJS.SHA256('obfuscation-key').toString()

export default ({
  app
}, inject) => {
  let data = {
    storage: Vue.observable({
      deployments: [],
      sites: [],
      domains: [],
      servers: [],
      users: []
    })
  }

  if (process.browser) {
    // eslint-disable-next-line no-prototype-builtins
    if (typeof window.localStorage !== 'undefined' && window.localStorage.hasOwnProperty('storage')) {
      try {
        data = JSON.parse(CryptoJS.AES.decrypt(window.localStorage.getItem('storage'), obfusck).toString(CryptoJS.enc.Utf8))
        if (typeof data.storage !== 'undefined') {
          data.storage = Vue.observable(data.storage)
        }
      } catch {
        console.error('Error loading global storage')
      }
    }
  }

  inject('storage',
    new Vue({
      data: () => data,
      watch: {
        storage: {
          handler () {
            if (process.browser) {
              if (typeof window.localStorage !== 'undefined') {
                window.localStorage.setItem('storage',
                  CryptoJS.AES.encrypt(JSON.stringify({
                    storage: this.storage
                  }), obfusck))
              }
            }
          },
          deep: true
        }
      }
    }).$data.storage)
}
