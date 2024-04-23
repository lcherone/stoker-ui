<template>
  <div
    :id="`modal-${_uid}`"
    class="modal fade"
    :data-backdrop="options.static ? 'static' : false"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <!-- dynamic component -->
    <template v-if="options.component">
      <component :is="options.component" v-bind="options.props"></component>
    </template>

    <!-- main with options -->
    <template v-else>
      <div
        :class="['modal-dialog', options.size || 'modal-md', { 'modal-dialog-centered': options.centered }]"
        role="document"
      >
        <div class="modal-content">
          <!-- header -->
          <div :class="['modal-header', options.color]">
            <h5 class="modal-title">{{ options.title }}</h5>
            <button type="button" class="close" @click="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <!-- body -->
          <div class="modal-body" v-html="options.text"></div>

          <!-- footer, render out buttons -->
          <div class="modal-footer">
            <button
              type="button"
              v-for="(button, index) in buttons"
              :key="index"
              :class="['btn', button.type]"
              @click.stop="click(index, $event)"
            >
              {{ button.title }}
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import modal from './modal.js'

export default {
  props: {
    state: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    options: {
      centered: false,
      size: 'modal-md',
      color: '',
      static: false,
      title: '',
      text: '',
      buttons: undefined,
      component: undefined,
      props: undefined
    },
    defaultButtons: [{ title: 'Close', type: 'btn-secondary' }]
  }),
  computed: {
    buttons() {
      return Array.isArray(this.options.buttons) && this.options.buttons.length
        ? this.options.buttons
        : this.defaultButtons
    }
  },
  beforeMount() {
    //
    modal.event.$on('show', options => {
      this.options = options
      this.show()
    })
    //
    modal.event.$on('hide', () => this.hide())
  },
  methods: {
    click(index, event) {
      const button = this.buttons[index]
      if (button && typeof button.cb === 'function') {
        button.cb(...arguments)
      } else if (this.buttons[index].title === 'Close') {
        this.hide()
      }
    },
    show() {
      this.$nextTick(function () {
        $('#modal-' + this._uid).modal('show')
      })
    },
    hide() {
      this.$nextTick(function () {
        $('#modal-' + this._uid).modal('hide')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-backdrop.show {
  opacity: 0.6;
}
</style>