<template>
  <span v-if="false" />
</template>

<script>
// Test on: https://cards-dev.twitter.com/validator
// Test on: https://developers.facebook.com/tools/debug/
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    keywords: {
      type: String,
      default: ''
    },
    canonical: {
      type: String,
      default: ''
    }
  },
  head () {
    return {
      title: this.$trim(this.title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$trim(this.description)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.keywords
        },
        {
          hid: 'canonical',
          rel: 'canonical',
          href: this.canonical
        }
      ]
    }
  }
}
</script>
