<template>
  <div
    v-if="alert.type"
    :class="[
      'alert fade show',
      alert.type,
      { 'alert-dismissible': alert.dismissible },
    ]"
    role="alert"
  >
    <button
      v-if="alert.dismissible"
      type="button"
      class="close"
      aria-label="Close"
      @click="close()"
    >
      <span>&times;</span>
    </button>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <span v-html="alert.message" />
  </div>
</template>

<script>
export default {
  props: {
    alert: {
      type: Object,
      default: () => ({
        type: undefined,
        dismissible: false,
        message: ''
      })
    }
  },
  methods: {
    close () {
      /* eslint-disable-next-line vue/no-mutating-props */
      this.alert.type = this.alert.message = undefined
    }
  }
}
</script>

  <style lang="scss" scoped>
  .alert {
    border-radius: 0;
    margin-top: 10px;
    margin-bottom: 10px;

    padding: 0.75rem 1.25rem;
    @media (min-width: 0px) and (max-width: 480px) {
      padding: 0.5rem 0.5rem;
    }

    .close {
      padding: 0.5rem 1rem;
      font-size: 28px;
      text-shadow: none !important;

      @media (min-width: 0px) and (max-width: 480px) {
        padding: 3px 5px;
        font-size: 24px;
      }
    }
  }
  </style>
