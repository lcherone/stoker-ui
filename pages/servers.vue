<template>
  <div>
    <SEOHead
      title="Servers"
      description="View and manage servers"
      canonical="/servers"
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
  name: 'Servers',
  data () {
    return {
      res: null,
      alert: {
        message: '',
        type: '',
        dismissible: true
      },
      items: [],
      tableColumns: ['Hostname', 'Tools Version', 'Allocate Base Ip'],
      tableOptions: {
        headings: {
          Hostname: 'Hostname',
          'Tools Version': 'Tools Version',
          'Allocate Base Ip': 'Allocate Base Ip'
        },
        sortable: ['Hostname', 'Tools Version'],
        filterable: ['Hostname', 'Tools Version']
      }
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  beforeCreate () {
    this.items = this.$storage.servers || []
  },
  beforeMount () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/servers').then((res) => {
        this.items = res

        this.$storage.servers = res
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
