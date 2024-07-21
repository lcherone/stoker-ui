<template>
  <div>
    <SEOHead
      title="Tools"
      description="Tools and productivity helpers"
      canonical="/servers"
    />
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <alert v-if="alert.message" :alert="alert" />
          <h1>Tools</h1>

          <div class="input-group mb-3">
            <input v-model="branchName" type="text" class="form-control" placeholder="Enter issue title..." aria-describedby="branchname-addon">
            <div class="input-group-append">
              <label class="input-group-text">{{ computedBranchName }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Users',
  data () {
    return {
      res: null,
      alert: {
        message: '',
        type: '',
        dismissible: true
      },
      branchName: ''
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    }),
    computedBranchName () {
      const parts = []
      this.branchName.trim().replace(/\s+/g, '-').replace(/[^\w\-!?]/g, '').split('-').forEach(function (value, i) {
        if (!i) {
          parts.push(value)
        } else {
          parts.push(value.replace(/\s+/g, '-').toLowerCase())
        }
      })

      return parts.join('-')
    }
  },
  created () {
    // this.state.loading = true
  },
  mounted () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/users').then((res) => {
        this.items = res
      }).catch(() => {
        this.alert = {
          message: 'Failed to load servers, refresh page or try again.',
          type: 'alert-danger',
          dismissible: true
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
