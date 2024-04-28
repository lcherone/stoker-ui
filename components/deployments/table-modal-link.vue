<template>
  <a href="javascript:void(0)" @click="openModal">{{ data[column] }}</a>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    column: {
      type: String,
      required: true
    }
  },
  methods: {
    openModal () {
      this.$modal.show({
        static: true,
        size: 'modal-lg',
        component: 'deployments-modal-' + this.column.toLowerCase(),
        props: {
          data: this.data,
          index: this.index,
          column: this.column
        }
      })
    }
  }
}
</script>
