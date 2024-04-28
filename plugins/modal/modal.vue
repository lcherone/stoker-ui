<template>
  <div>
    <div
      :id="`modal-${_uid}`"
      class="modal fade"
      :data-backdrop="config.static ? 'static' : false"
      :data-keyboard="config.static ? 'static' : false"
      role="dialog"
    >
      <!-- dynamic component -->
      <template v-if="config.component">
        <component
          :is="config.component"
          v-bind="config.props"
          v-on="config.events"
        />
      </template>

      <!-- main with config -->
      <template v-else>
        <div
          :class="[
            'modal-dialog',
            config.size || 'modal-md',
            { 'modal-dialog-centered': config.centered },
          ]"
          role="document"
        >
          <div class="modal-content">
            <!-- header -->
            <div :class="['modal-header', config.color]">
              <h1 class="modal-title">
                {{ config.title }}
              </h1>
              <button type="button" class="close" @click="hide()">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <!-- body -->
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div class="modal-body" v-html="config.text" />

            <!-- footer, render out buttons -->
            <div class="modal-footer">
              <button
                v-for="(button, index) in buttons"
                :key="index"
                type="button"
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
  </div>
</template>

<script>
import $ from 'jquery'
import 'bootstrap'

import modal from './modal.js'

export default {
  props: {
    state: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    config: {
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
    buttons () {
      return Array.isArray(this.config.buttons) && this.config.buttons.length
        ? this.config.buttons
        : this.defaultButtons
    }
  },
  beforeMount () {
    //
    modal.event.$on('show', (config) => {
      this.config = config
      $(`#modal-${this._uid}`).modal({
        backdrop: this.config.static ? 'static' : true
        // keyboard: !this.config.static
      })
      this.show()
    })
    //
    modal.event.$on('hide', () => {
      this.hide()
      setTimeout(() => {
        this.config.component = undefined
        this.config.buttons = undefined
        this.config.props = undefined
      }, 500)
    })
  },
  methods: {
    click (index, event) {
      const button = this.buttons[index]
      if (button && typeof button.cb === 'function') {
        button.cb(...arguments)
      } else if (this.buttons[index].title === 'Close') {
        this.hide()
      }
    },
    show () {
      $(`#modal-${this._uid}`).modal('show')
    },
    hide () {
      $(`#modal-${this._uid}`).modal('hide')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>