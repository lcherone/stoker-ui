import Vue from 'vue'
import $ from 'jquery'

/**
 * Global event bus
 *
 * - listen and trigger events globally though this.$event.*
 * - it will also emit comment events like:
 *   - document:scroll
 *   - window:resize
 *   - window:orientationchange
 *
 * store.state.profile.[device & deviceOrientation] will be updated
 */
export default ({
  app
}, inject) => {
  // global scroll emitter
  if (!process.server) {
    // console.log('[plugins/event.js] start')

    // console.log('[plugins/event.js] set --vh')
    document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')

    //
    const event = new Vue()

    //
    let scrollTimer

    function scrollHandler () {
      clearTimeout(scrollTimer)

      const doc = $(this)

      if (doc[0]) {
        doc[0].scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
        )
      }

      // emit so other handlers can action on scroll events
      scrollTimer = setTimeout(function () {
        doc.bottomOfPage = $(window).scrollTop() + $(window).height() > $(document).height() - 650
        event.$emit('document:scroll', doc)
      }, 30)
    }

    $(document).on('scroll touchmove', function () {
      console.log('[plugins/event.js] scroll')
      window.requestAnimationFrame(scrollHandler)
    })

    //
    function setDeviceType () {
      // on resize update device type
      app.store.commit('site/set', {
        key: 'device',
        value: (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) || window.innerWidth <= 575
        )
          ? (window.innerWidth <= 575 ? 'phone' : 'desktop')
          : 'desktop'
      })

      // device orientation
      app.store.commit('site/set', {
        key: 'deviceOrientation',
        value: $(window).width() > $(window).height() ? 'landscape' : 'portrait'
      })
    }
    //
    $(setDeviceType)

    // global resize emitter
    let resizeTimer
    const resizeCb = function (e) {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(function () {
        console.log('window:' + e.type)

        setDeviceType()

        console.log('[plugins/event.js] set --vh', window.innerHeight + 'px')
        document.documentElement.style.setProperty('--vh', window.innerHeight + 'px')

        event.$emit('window:' + e.type, window)
      }, 100)
    }

    //
    $(window).on('resize', resizeCb)

    // ipad fires event before it's finished rotating
    $(window).on('orientationchange', function (e) {
      setTimeout(function () {
        resizeCb(e)
      }, 250)
    })

    // list of events, for easy debugging
    const events = {}

    // console.log('[plugins/event.js] injecting')
    inject('event', {
      events,
      // listen(event, callback) / on(event, callback) / $on(event, callback)
      listen () {
        // console.log('listen', ...arguments)
        events[arguments[0]] = arguments[1]
        return event.$on(...arguments)
      },
      on () {
        // console.log('on', ...arguments)
        events[arguments[0]] = arguments[1]
        return event.$on(...arguments)
      },
      $on () {
        // console.log('$on', ...arguments)
        events[arguments[0]] = arguments[1]
        return event.$on(...arguments)
      },

      // once(event, callback) / $once(event, callback)
      once () {
        // console.log('once', ...arguments)
        events[arguments[0]] = arguments[1]
        return event.$once(...arguments)
      },
      $once () {
        // console.log('$once', ...arguments)
        events[arguments[0]] = arguments[1]
        return event.$once(...arguments)
      },

      // trigger(event, […args]) / emit(event, […args]) / $emit(event, […args])
      trigger () {
        // console.log('trigger', ...arguments)
        return event.$emit(...arguments)
      },
      emit () {
        // console.log('emit', ...arguments)
        return event.$emit(...arguments)
      },
      $emit () {
        // console.log('$emit', ...arguments)
        return event.$emit(...arguments)
      },

      // off([event, callback]) / $off([event, callback])
      off () {
        // console.log('off', ...arguments)
        delete events[arguments[0]]
        return event.$off(...arguments)
      },
      $off () {
        // console.log('$off', ...arguments)
        delete events[arguments[0]]
        return event.$off(...arguments)
      }
    })
  }
}
