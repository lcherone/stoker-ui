<template>
  <div>
    <footer class="footer bg-dark">
      <div class="container py-2">
        <ul class="list-inline text-center">
          <li class="list-inline-item">
            {{ $config.copyright }} - {{ $config.title }}
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$nextTick(function () {
      console.log('component-layout-footer', 'mounted')
    })
  },
  beforeDestroy () {
    console.log('component-layout-footer', 'beforeDestroy')
  }
}
</script>

<style lang="scss" scoped>
.footer {
  position: sticky;
  bottom: 0;
  width: 100%;

  .list-inline-item {
    font-size: 14px;
    color: #fff;
  }
}
</style>
