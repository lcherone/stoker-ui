<template>
  <div>
    <SEOHead
      title="Users"
      description="View and manage users"
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
  name: 'Users',
  data () {
    return {
      res: null,
      alert: {
        message: '',
        type: '',
        dismissible: true
      },
      items: [],
      tableColumns: ['Name', 'Email', 'Status', 'Id', 'Created'],
      tableOptions: {
        headings: {
          Name: 'Name',
          Email: 'Email',
          Status: 'Status',
          Id: 'Id',
          Created: 'Created'
        },
        sortable: ['Name', 'Email', 'Status', 'Created'],
        filterable: ['Name', 'Email', 'Status']
      }
    }
  },
  computed: {
    ...mapState({
      header: state => state.header
    })
  },
  beforeCreate () {
    this.items = this.$storage.users || []
  },
  beforeMount () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/users').then((res) => {
        this.items = res

        this.$storage.users = res
      }).catch(() => {
        this.alert = {
          message: 'Failed to load users, refresh page or try again.',
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
