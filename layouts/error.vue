<template>
  <div class="container content py-2">
    <section>
      <div id="breadcrumbs">
        <span>
          <nuxt-link to="/">Home</nuxt-link>
        </span>
        <template v-if="error.statusCode === 404">
          <fa icon="angle-right" />
          <span v-if="error.statusCode === 404"> Page not found </span>
        </template>
      </div>
    </section>

    <article class="content-inner">
      <section class="my-5">
        <div class="container text-center">
          <fa icon="exclamation-triangle" size="4x" class="text-danger" />
          <h1 class="text-black pt-4 my-3 font-weight-bold">
            Error!
          </h1>
          <h3 class="text-muted pb-3 my-1 font-weight-bold">
            {{ error.statusCode === 404 ? '404 Page not found!' : 'Error: ' + error.statusCode }}
          </h3>
          <p v-if="error.statusCode === 404">
            The page you are looking for was not found, it may have been renamed, moved or removed.
            <br>Check the link/url and try again.
          </p>
          <p v-else>
            We are very sorry but an unkown error has occured, please refresh the page and try again or click below to
            go to the homepage.
          </p>
          <div class="mt-4">
            <nuxt-link class="btn btn-link" to="/">
              <fa icon="home" /> Go back to homepage
            </nuxt-link>
            <nuxt-link class="btn btn-link" to="/contact-us">
              <fa icon="bullhorn" /> Contact Us
            </nuxt-link>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>