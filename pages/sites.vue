<template>
  <div>
    <SEOHead
      title="Sites"
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
  name: 'Sites',
  data () {
    return {
      res: null,
      alert: {
        message: '',
        type: '',
        dismissible: true
      },
      items: [],
      tableColumns: ['Name', 'Handle', 'Vcs Type', 'Vcs Path', 'Created'],
      tableOptions: {
        headings: {
          Name: 'Name',
          Handle: 'Handle',
          'Vcs Type': 'VCS Type',
          'Vcs Path': 'VCS Path',
          Created: 'Created'
        },
        sortable: ['Name', 'Handle', 'Created'],
        filterable: ['Name', 'Handle']
      }
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  beforeCreate () {
    this.items = this.$storage.sites || []
  },
  beforeMount () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/sites').then((res) => {
        this.items = res

        this.$storage.sites = res
      }).catch(() => {
        this.alert = {
          message: 'Failed to load sites, refresh page or try again.',
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
