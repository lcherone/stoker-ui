import Vue from 'vue'

/**
 * Fontawesome svg/core and component
 */
import { library, config } from '@fortawesome/fontawesome-svg-core'
//
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
//
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

config.autoAddCss = false

// Add all icons to the library so you can use it in your page
library.add(fas, far, fab)

// apply <fa icon="..." spin></fa> component
Vue.component('fa', FontAwesomeIcon)