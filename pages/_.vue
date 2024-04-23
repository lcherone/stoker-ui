<template>
  <div class="container content py-2">
    <SEOHead
      title="404 page not found"
      description="The page you are looking for was not found, it may have been renamed, moved or removed. Check the link/url and try again."
      image="social-card-image.png"
      canonical="/"
    />

    <section>
      <div id="breadcrumbs">
        <span>
          <a href="/">Home</a>
        </span>
        <fa icon="angle-right" />
        <span> Page not found </span>
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
            404 Page not found!
          </h3>
          <p>
            The page you are looking for was not found, it may have been renamed, moved or removed.
            <br>Check the link/url and try again.
          </p>
          <div class="mt-4">
            <a href="/" class="btn btn-link"> <fa icon="home" /> Go back to homepage </a>
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
export default {}
</script>

<style lang="scss">
</style>
