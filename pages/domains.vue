<template>
  <div>
    <SEOHead
      title="Domains"
      description="View and manage domains"
      canonical="/domains"
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
  name: 'Domains',
  data () {
    return {
      res: null,
      alert: {
        message: '',
        type: '',
        dismissible: true
      },
      items: [],
      tableColumns: ['Name', 'Status', 'Offsite', 'Dme Id', 'Created'],
      tableOptions: {
        headings: {
          Name: 'Name',
          Status: 'Status',
          Offsite: 'Offsite',
          'Dme Id': 'Dme Id',
          Created: 'Created'
        },
        sortable: ['Name', 'Created'],
        filterable: ['Name', 'Dme Id']
      }
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  beforeCreate () {
    this.items = this.$storage.domains || []
  },
  beforeMount () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/domains').then((res) => {
        this.items = res

        this.$storage.domains = res
      }).catch(() => {
        this.alert = {
          message: 'Failed to load domains, refresh page or try again.',
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
