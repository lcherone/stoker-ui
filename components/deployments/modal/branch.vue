<template>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">
          Deployment Branch
        </h4>
        <button type="button" class="close" @click="close()">
          &times;
        </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="branch-name" class="control-label">Branch</label>
          <div class="input-group">
            <input id="branch-name" v-model="branch" type="text" class="form-control" placeholder="Enter branch name...">
            <span class="input-group-append">
              <button class="btn btn-success" type="button" :disabled="submitted" @click="setBranch">
                {{ !submitted ? 'Change' : 'Updated' }}
              </button>
            </span>
            <span class="input-group-append">
              <button class="btn btn-dark" type="button" :disabled="submitted" @click="setMaster">
                {{ !submitted ? 'Set to Master' : 'Updated' }}
              </button>
            </span>
          </div>
        </div>
        <div v-if="submitted">
          <h4 v-if="!result.return_value">
            Updating deployment
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
      branch: '',
      submitted: false,
      result: {
        output: '',
        error: '',
        return_value: 0
      }
    }
  },
  beforeMount () {
    this.branch = this.data[this.column]
  },
  methods: {
    close () {
      this.$emit('refresh')
      this.$modal.hide()
    },
    setBranch () {
      if (!this.branch) {
        return
      }

      this.$storage.deployments = []

      this.submitted = true

      this.$ajax.post('/deployment/change', {
        handle: this.data.Handle,
        machine: this.data.Machine,
        env: this.data.Env,
        alias: this.data.Alias,
        branch: this.branch
      }).then((result) => {
        this.result = result
      })
    },
    setMaster () {
      this.branch = 'master'
      this.setBranch()
    }
  }
}
</script>

<style lang="scss"></style>
