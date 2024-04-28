<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          Deployment Refresh
        </h4>
        <button type="button" class="close" @click="close()">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <p>Refresh the deployment database. <strong>Note:</strong> this action can take a while to complete.</p>
        <button class="btn btn-success" type="button" :disabled="submitted" @click="initRefresh">
          {{ !submitted ? 'Trigger Database Refresh' : 'Refreshing Database' }}
        </button>
        <div v-if="submitted">
          <h4 v-if="!result.return_value">
            Refreshing deployment
          </h4>
          <h4 v-else>
            Deployment Error
          </h4>
          <pre v-if="result.output">{{ result.output }}</pre>
          <pre v-if="result.error">{{ result.error }}</pre>
        </div>
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
      submitted: false,
      result: {
        output: '',
        error: '',
        return_value: 0
      }
    }
  },
  methods: {
    close () {
      this.$modal.hide()
    },
    initRefresh () {
      this.submitted = true
      this.post('/deployment/refresh', {
        handle: this.data.Handle,
        machine: this.data.Machine,
        env: this.data.Env,
        alias: this.data.Alias,
        branch: this.data.Branch
      }).then((result) => {
        this.result = result
      })
    }
  }
}
</script>

<style lang="scss"></style>
