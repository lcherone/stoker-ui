<template>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          Machine Jobs: {{ data.Machine }}
        </h4>
        <button type="button" class="close" @click="close()">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <v-client-table v-model="jobs" :columns="tableColumns" :options="tableOptions" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="close()">
          Close
        </button>
      </div>
    </div>
  </div>
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
  data () {
    return {
      jobs: [],
      tableColumns: ['Description', 'User', 'Status', 'Updated'],
      tableOptions: {
        headings: {
          Description: 'Description',
          User: 'User',
          Status: 'Status',
          Updated: 'Updated'
        },
        sortable: ['Description', 'User', 'Status', 'Updated'],
        filterable: ['Description', 'User', 'Status']
      }
    }
  },
  beforeMount () {
    this.$nextTick(this.init)
  },
  methods: {
    close () {
      this.$modal.hide()
    },
    init () {
      this.getJobs()
    },
    getJobs () {
      const machine = this.data.Machine || ''
      this.$ajax.get('/job/list/' + machine).then((result) => {
        this.jobs = result
      })
    }
  }
}
</script>

<style lang="scss"></style>
