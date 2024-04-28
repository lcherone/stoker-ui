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

          <!--
          <pre>{{ res }}</pre>

          {{ $route.path }}

          <pre>{{ header }}</pre>
          <pre>{{ $state }}</pre>
          <pre>{{ $store.state.config }}</pre>

          <button class="btn btn-info" @click="openModal">
            Test
          </button>
        -->
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
      res: null,
      alert: {
        message: 'This is an alert',
        type: 'alert-primary',
        dismissible: true
      },
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
  created () {
    // this.state.loading = true
  },
  mounted () {
    this.$nextTick(this.init)
  },
  methods: {
    init () {
      this.$ajax.get('/deployment').then((res) => { this.items = res })
      // this.get('/api/stoker/deployment').then((result) => this.items = result);
      // this.state.loading = false
    }
  }
  // methods: {
  //   openModal () {
  //     this.$store.commit('header/set', { key: 'loading', value: false })

  //     this.$state.table_limit++

  //     this.$modal.show({
  //       static: true,
  //       centered: true,
  //       size: 'modal-lg',
  //       title: 'Hello, Modal!',
  //       text: 'This is the body of the modal.',
  //       buttons: [
  //         {
  //           title: 'Close',
  //           type: 'btn-secondary',
  //           handler: () => {
  //             this.$modal.hide('modal')
  //           }
  //         }
  //       ]
  //     })
  //   }
  // }
}
</script>

<style lang="scss">
</style>
