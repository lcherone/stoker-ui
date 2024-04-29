const site = {
  title: 'StokerUI',
  description: '',
  url: 'http://192.168.10.10/api',
  short_name: 'STOKERUI', // should be <= 12 chars (is for PWA)
  lang: 'en',
  copyright: 'Copyright © ' + (new Date().getFullYear()) + ' - D3R Ltd',
}

const production = true

export default {
  env: {
    API_URL: site.url + '/stoker'
  },

  // usable anywhere via $config
  publicRuntimeConfig: {
    ...site
  },

  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'D3R StokerUI',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'robots', content: 'noindex, nofollow' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, user-scalable=yes'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  globalName: 'app',

  loading: {
    color: 'rgb(18 64 123)'
  },

  loadingIndicator: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~plugins/storage.js'
    },
    {
      src: '~plugins/event.js'
    },
    // {
    //   src: '~plugins/state.js'
    // },
    {
      src: '~plugins/utils.js'
    },
    {
      src: '~plugins/ajax.js',
      mode: 'client'
    },
    {
      src: '~plugins/vue-fontawesome.js'
    },
    {
      src: '~plugins/modal',
      mode: 'client'
    },
    {
      src: '~plugins/vue-tables',
      mode: 'client'
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // https://nuxtjs.org/docs/configuration-glossary/configuration-router/#middleware
  router: {
    // Run the middleware/before-page.js on every page
    middleware: 'before-page'
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'nuxt-build-optimisations',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/google-fonts'
  ],

  buildOptimisations: {
    profile: process.env.NODE_ENV === 'development' ? 'risky' : 'safe'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  googleFonts: {
    prefetch: true,
    preconnect: true,
    preload: true,
    // useStylesheet: false,
    display: 'swap',
    download: true,
    // base64: true,
    // inject: true,
    overwriting: false,
    families: {
      'Jersey+15': [400],
      Kanit: [400, 600],
      Roboto: [100, 200, 300, 400, 500, 600, 700, 800]
    }
  },

  bootstrapVue: {
    // icons: false,
    bootstrapCSS: false,
    components: [
      // 'BNavbar',
      // 'BNavbarNav',
      // 'BNavbarBrand',
      // 'BNavItem',
      // 'BNavItemDropdown',
      // 'BSpinner',
      // 'BDropdown',
      // 'BDropdownText',
      // 'BDropdownForm',
      // 'BDropdownItem',
      // 'BDropdownItemButton',
      // 'BDropdownDivider',
      // 'BSidebar',
      // 'BCollapse',
      // 'BImg',
      // 'BImgLazy',
      // 'BBadge',
      // 'BForm',
      // 'BFormTags',
      // 'BFormTag',
      // 'BFormSelect',
      // 'BFormGroup',
      // 'BFormInput',
      // 'BFormCheckbox',
      // 'BFormDatepicker',
      // 'BFormTimepicker',
      // 'BInputGroup',
      // 'BInputGroupAppend',
      // 'BListGroup',
      // 'BListGroupItem',
      // 'BProgress',
      // 'BButton',
      // 'BButtonGroup',
      // 'BSkeleton',
      // 'BSkeletonWrapper',
      // 'BSkeletonImg',
      // 'BTooltip',
      // 'BMedia',
      // 'BTabs',
      // 'BTab',
      // 'BOverlay'
    ],
    directives: ['VBTooltip', 'VBToggle']
  },

  eslint: {
    fix: true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    publicPath: '/dist/',
    devtools: production,
    extractCSS: false,
    minimize: production,
    babel: {
      compact: true
    },
    splitChunks: {
      layouts: false,
      pages: true,
      commons: true
    },
    html: {
      minify:
      production
          ? {
              collapseBooleanAttributes: true,
              decodeEntities: true,
              minifyCSS: true,
              minifyJS: true,
              processConditionalComments: true,
              removeEmptyAttributes: false,
              removeRedundantAttributes: true,
              trimCustomFragments: true,
              useShortDoctype: true,
              preserveLineBreaks: false,
              collapseWhitespace: true
            }
          : {}
    },
    loaders: {
      vue: {
        prettify: production
      }
    }
  },

  messages: {
    error_404: 'Page could not be found',
    server_error: 'Server error',
    nuxtjs: 'Stoker UI',
    back_to_home: 'Go back to the home page',
    server_error_details: 'An error occurred in the application and your page could not be served.',
    client_error: 'Error',
    client_error_details: 'An error occurred whilst rendering the page.'
  },

  telemetry: false
}
