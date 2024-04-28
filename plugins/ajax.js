import Vue from 'vue'
import {
  ajax
} from 'jquery'

//
const Plugin = {
  //
  install (Vue) {
    /**
     * Singleton
     */
    if (this.installed) { return }
    this.installed = true

    /**
     * Get cookie value
     */
    const getCookie = (name) => {
      const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
      return v && v[2] ? v[2] : ''
    }

    /**
     * Delete cookie
     */
    const deleteCookie = name => (document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;')

    if (process.env.API_URL) { console.log('API URL: ' + process.env.API_URL) }

    /**
     * Request helper
     */
    const request = (action, method, data) => {
      if (data && (method === 'PUT' || method === 'POST' || method === 'DELETE')) {
        data = JSON.stringify(data)
      }
      return ajax({
        url: (process.env.API_URL || '') + action,
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
        method,
        type: method,
        data,
        dataType: 'json',
        cache: false,
        contentType: 'application/json;charset=UTF-8',
        beforeSend: (xhr) => {
          for (const key of ['csrf-token', 'usertoken', 'refreshtoken']) {
            const v = getCookie(key)
            if (v && v !== 'null') {
              xhr.setRequestHeader(key, v)
            }
          }
        },
        complete (xhr, textStatus) {
          if (xhr.responseJSON && xhr.responseJSON.error && xhr.responseJSON.error.csrf) {
            for (const key of ['csrf-token', 'usertoken', 'refreshtoken']) {
              deleteCookie(key)
            }
            return (window.location = '/')
          }
          if (xhr.status !== 200) { console.error(xhr, textStatus) }
        }
      })
    }

    /**
     * Vue plugin property
     */
    Vue.prototype.$ajax = {
      get: (action, data) => request(action, 'GET', data),
      post: (action, data) => request(action, 'POST', data),
      put: (action, data) => request(action, 'PUT', data),
      delete: (action, data) => request(action, 'DELETE', data)
    }
  }
}

Vue.use(Plugin)
