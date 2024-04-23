import Vue from 'vue'

export default ({
  app
}, inject) => {
  inject('state', Vue.observable({
    date: new Date(),
    loading: true,
    errors: {},
    alert: {},
    form: {
      errors: {},
      values: {}
    },
    plans: [],
    session: {
      alert: {},
      form: {
        errors: {},
        values: {}
      }
    },
    config: {}
  }))
}