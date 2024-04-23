<template>
  <div class="container content py-4">
    <div class="row">
      <div class="col-12 col-sm-4 col-lg-3 border-right order-2 order-sm-1 order-lg-1">
        ...sss
      </div>
      <div class="col-12 col-sm-8 col-lg-6 order-1 order-sm-3 order-lg-2">
        ...sss
      </div>
      <!-- in left side until lg -->
      <div class="col-12 col-lg-3 border-left order-3 d-none d-lg-block">
        ...ddd
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
  }
}
</script>

<style lang="scss">
.content{
  margin-top: 80px;
}
</style>
