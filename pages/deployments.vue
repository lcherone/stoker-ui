<template>
  <div>
    <SEOHead
      title="Deployments"
      description="View and manage stoker deployments"
      canonical="/deployments"
    />
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <alert v-if="alert.message" :alert="alert" />
          <v-client-table v-model="items" :columns="tableColumns" :options="tableOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Deployments',
  data () {
    return {
      alert: {},
      items: [],
      tableColumns: [
        'Handle',
        'Machine',
        // 'Env',
        'Alias',
        'Branch',
        'Status',
        'Updated',
        'Refreshed'
      ],
      tableOptions: {
        headings: {
          Handle: 'Handle',
          Machine: 'Machine',
          // Env: 'Env',
          Alias: 'Alias',
          Branch: 'Branch',
          FPM: 'FPM',
          Status: 'Status',
          HTTPS: 'HTTPS',
          Auth: 'Auth',
          Updated: 'Updated',
          Refreshed: 'Refreshed'
        },
        templates: {
          Machine: 'deployments-table-modal-link',
          Branch: 'deployments-table-modal-link',
          Refreshed: 'deployments-table-modal-link'
        },
        sortable: ['Handle', 'Machine', /* 'Env', */ 'Alias', 'Branch', 'Updated', 'Refreshed'],
        filterable: ['Handle', 'Machine', /* 'Env', */ 'Alias', 'Branch', 'Updated', 'Refreshed']
      }
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  beforeCreate () {
    this.items = this.$storage.deployments || []
  },
  beforeMount () {
    console.log('page-deployments mounted')
    this.$nextTick(this.init)

    this.$event.on('refresh.branch', this.init)
    this.$event.on('refresh.machine', this.init)
    this.$event.on('refresh.refreshed', this.init)
  },
  methods: {
    init () {
      this.items = this.$storage.deployments || []

      this.$ajax.get('/deployment').then((res) => {
        this.items = res

        this.$storage.deployments = res
      }).catch(() => {
        this.alert = {
          message: 'Failed to load deployments, refresh page or try again.',
          type: 'alert-danger',
          dismissible: true
        }
      })
    }
  }
}
</script>

<style lang="scss"></style>
