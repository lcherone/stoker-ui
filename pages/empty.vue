<template>
  <div>
    <SEOHead
      title="Empty Page"
      description="View and manage deployments"
      canonical="/deployments"
    />

    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          This is an empty page, to be used as a template for new pages.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPage',
  data () {
    return {}
  },
  created () {
    console.log('page-empty', 'created')
  }
}
</script>

<style lang="scss">
</style>
