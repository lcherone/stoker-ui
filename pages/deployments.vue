<template>
  <div>
    <SEOHead
      title="Deployments"
      description="View and manage deployments"
      canonical="/deployments"
    />

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <alert v-if="alert.message" :alert="alert" />

          <pre>{{ res }}</pre>

          {{ $route.path }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Deployments',
  data () {
    return {
      res: null,
      alert: {
        message: 'This is an alert',
        type: 'alert-primary',
        dismissible: true
      }
    }
  },
  created () {
    this.$ajax.get('/config').then((res) => { this.res = res })
  }
}
</script>

<style lang="scss">
</style>
