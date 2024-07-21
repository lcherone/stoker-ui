import Vue from 'vue'
import $ from 'jquery'

/**
 * Global utils mixin
 */
const Plugin = {
  //
  install (Vue) {
    /**
     * Singleton
     */
    if (this.installed) {
      return
    }
    this.installed = true

    // this.prevDevicetype = null

    /**
     * Global mixin
     */
    Vue.mixin({
      filters: {
        date_format (date) {
          if (date === '0000-00-00 00:00:00') {
            return '-'
          }
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          return new Date(date).toLocaleString(typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language) : 'en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
            // hour: 'numeric',
            // minute: 'numeric'
          })
        },
        date_format_no_day (date) {
          if (date === '0000-00-00 00:00:00') {
            return '-'
          }
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          return new Date(date).toLocaleString(typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language) : 'en-GB', {
            // weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
            // hour: 'numeric',
            // minute: 'numeric'
          })
        },
        timeSince (date, showAgo = true) {
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          date = date instanceof Date ? date : new Date(date)

          const seconds = Math.floor((new Date() - date) / 1000)
          let interval = Math.floor(seconds / 31536000)

          if (interval >= 1) {
            return interval + ' year' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 2592000)

          if (interval >= 1) {
            return interval + ' month' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 86400)

          if (interval >= 1) {
            return interval + ' day' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 3600)

          if (interval >= 1) {
            return interval + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 60)

          if (interval >= 1) {
            return interval + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }

          if (Math.floor(seconds) === 0) {
            return 'just now'
          }

          return Math.floor(seconds) + ' second' + (Math.floor(seconds) > 1 ? 's' : '') + ' ago'
        },
        // date_format (date) {
        //   if (date === '0000-00-00 00:00:00') {
        //     return '-'
        //   }

        //   if (typeof date !== 'string' && !(date instanceof Date)) {
        //     return '-'
        //   }
        //   return new Date(date).toLocaleString('en-US', {
        //     weekday: 'short',
        //     year: 'numeric',
        //     month: 'short',
        //     day: 'numeric',
        //     hour: 'numeric',
        //     minute: 'numeric'
        //   })
        // },
        // post_date (v) {
        //   v = new Date(v)
        //   const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][v.getMonth()]
        //   return `${month} ${v.getFullYear()}`
        // },
        capitalize (value) {
          return value.charAt(0).toUpperCase() + value.slice(1)
        },
        subText (value) {
          return value.length > 95 ? value.slice(0, value.indexOf(' ', 95)) + '...' : value
        }
      },
      computed: {
        currentUrl () {
          return window.location.href
        }
      },
      methods: {
        date_expired (item) {
          if (!item || ['0000-00-00 00:00:00', '0000-00-00T00:00:00.000Z', '0000-00-00', ''].includes(item)) {
            return false
          }

          const end_date = new Date(item)
          end_date.setHours(23, 59, 59, 0)
          const now = new Date()

          return end_date.getTime() < now.getTime()
        },
        formatBytes (bytes) {
          if (typeof bytes !== 'number' || bytes === 0) {
            return '0 Bytes'
          }

          const i = Math.floor(Math.log(bytes) / Math.log(1024))
          return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + [
            'Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'
          ][i]
        },
        // geoLocation: (function () {
        //   if (!process.server) {
        //     const geocoder = (typeof window.google !== 'undefined') ? new window.google.maps.Geocoder() : false

        //     const getLocation = function (options) {
        //       console.log('vm.geoLocation::getLocation(options)', options)
        //       options = options || {
        //         enableHighAccuracy: false,
        //         timeout: 60000,
        //         maximumAge: 3600
        //       }
        //       return new Promise(function (resolve, reject) {
        //         if (window.navigator.geolocation) {
        //           window.navigator.geolocation.getCurrentPosition(resolve, reject, options)
        //         } else {
        //           reject(new Error('Your browser does not support Geo Location.'))
        //         }
        //       })
        //     }

        //     const getAddress = function (lat, lng) {
        //       console.log('vm.geoLocation::getAddress(lat, lng)', lat, lng)
        //       return new Promise(function (resolve, reject) {
        //         if (geocoder) {
        //           const point = new window.google.maps.LatLng(lat, lng)
        //           geocoder.geocode({
        //             latLng: point
        //           }, function (result, status) {
        //             if (status === window.google.maps.GeocoderStatus.OK) {
        //               resolve(result)
        //             } else {
        //               reject(new Error(status))
        //             }
        //           })
        //         } else {
        //           reject(new Error('Google Maps [google.maps] not loaded'))
        //         }
        //       })
        //     }

        //     const fetchGeo = function (options) {
        //       console.log('vm.geoLocation::fetch(options)', options)
        //       const result = {}
        //       return new Promise(function (resolve, reject) {
        //         if (!geocoder) {
        //           return reject(new Error('[fetch] Google Maps [google.maps] not loaded'))
        //         }
        //         result.waiting = true
        //         getLocation(options).then(function (position) {
        //           result.position = {
        //             coords: {
        //               accuracy: position.coords && position.coords.accuracy ? position.coords.accuracy : 0,
        //               altitude: position.coords && position.coords.altitude ? position.coords.altitude : 0,
        //               altitudeAccuracy: position.coords && position.coords.altitudeAccuracy ? position.coords.altitudeAccuracy : 0,
        //               heading: position.coords && position.coords.heading ? position.coords.heading : 0,
        //               latitude: position.coords && position.coords.latitude ? position.coords.latitude : 0.000000,
        //               longitude: position.coords && position.coords.longitude ? position.coords.longitude : 0.000000,
        //               speed: position.coords && position.coords.speed ? position.coords.speed : 0
        //             },
        //             timestamp: position.timestamp || new Date().getTime()
        //           }
        //           return getAddress(result.position.coords.latitude, result.position.coords.longitude)
        //         }).then(function (locations) {
        //           result.location = locations[0] || {
        //             address_components: [],
        //             formatted_address: '',
        //             geometry: {},
        //             place_id: '',
        //             plus_code: {
        //               compound_code: '',
        //               global_code: ''
        //             },
        //             types: []
        //           }
        //           result.waiting = false
        //           resolve(result)
        //         }).catch(function (error) {
        //           result.error = error.message || 'Failed to get geo position.'
        //           result.waiting = false
        //           resolve(result)
        //         })
        //       })
        //     }

        //     let timer
        //     const update = function (vm, isInitial) {
        //       console.log('vm.geoLocation::update(vm, isInitial)', vm, isInitial)
        //       timer = setTimeout(function () {
        //         fetchGeo({
        //           enableHighAccuracy: false,
        //           timeout: 60000,
        //           maximumAge: 3600
        //         }).then(function (geocode) {
        //           console.log('vm.geoLocation::update::result', geocode)

        //           if (geocode.error && Object.keys(geocode.error).length) {
        //             console.error('vm.geoLocation::update::error', geocode.error)
        //           } else {
        //             vm.$state.geocode = geocode

        //             // send data to server
        //             if ((geocode.position && geocode.position.coords) || geocode.location) {
        //               console.log('vm.geoLocation::update::success', geocode)
        //               vm.socket.io.emit('geo:update', geocode)
        //             }

        //             // lat/lng
        //             if (geocode.position && geocode.position.coords) {
        //               vm.$state.profile.lat = geocode.position.coords.latitude
        //               vm.$state.profile.lng = geocode.position.coords.longitude
        //               vm.$state.location.lat = geocode.position.coords.latitude
        //               vm.$state.location.lng = geocode.position.coords.longitude
        //             } else {
        //               console.info('Geo was not updated in vm.$state.[profile|location].[lat|lng], because position.coords was not defined.', geocode)
        //             }

        //             if (geocode.location) {
        //             // address town
        //               if (geocode.location.address_components && geocode.location.address_components[2]) {
        //                 const locTown = geocode.location.address_components[2].long_name || ''
        //                 vm.$state.location.locationTown = locTown
        //                 vm.$state.profile.town = locTown
        //               }

        //               // address county
        //               if (geocode.location.address_components && geocode.location.address_components[4]) {
        //                 const locCounty = geocode.location.address_components[4].long_name || ''
        //                 vm.$state.location.locationCounty = locCounty
        //                 vm.$state.profile.county = locCounty
        //               }

        //               // address country
        //               if (geocode.location.address_components && geocode.location.address_components[5]) {
        //                 const locCountry = geocode.location.address_components[5].long_name || ''
        //                 vm.$state.location.locationCountry = locCountry
        //                 vm.$state.profile.country = locCountry
        //               }
        //             } else {
        //               console.log('Geo was not updated in vm.$state.[profile|location].[lat|lng], because location was not defined.', geocode)
        //             }
        //           }
        //           update(this, false)
        //         }.bind(this))
        //       }, isInitial ? 10000 : (60000 * 10))
        //     }

        //     return {
        //       error: {},
        //       position: {},
        //       location: {},
        //       updated: new Date(),
        //       waiting: false,
        //       getAddress,
        //       getLocation,
        //       fetch,
        //       update,
        //       stop () {
        //         console.log('vm.geoLocation::stop()')
        //         if (timer) { clearTimeout(timer) }
        //       }
        //     }
        //   }
        // })(),
        isValidEmail (email) {
          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
          return regex.test(String(email).toLowerCase())
        },
        isValidPassword (password) {
          const re = /(?=^.{8,256}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/
          return re.test(password)
        },
        generatePassword (len, options = {}) {
          const chars = {
            num: '1234567890',
            specialChar: "!@#$%&'()*+,^-./:;<=>?[]_`{~}|",
            lowerCase: 'abcdefghijklmnopqrstuvwxyz',
            upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            custom: options.custom || undefined
          }

          const shuffleStr = str => str.split('').sort(() => 0.5 - Math.random()).join('')

          const factor = Math.ceil(len / Object.values(options).reduce((a, b) => b ? a + 1 : a, 0))

          let str = ''
          if (options.numbers) { str += shuffleStr(chars.num.repeat(factor)).substr(0, factor) }
          if (options.special) { str += shuffleStr(chars.specialChar.repeat(factor)).substr(0, factor) }
          if (options.lowerCase) { str += shuffleStr(chars.lowerCase.repeat(factor)).substr(0, factor) }
          if (options.upperCase) { str += shuffleStr(chars.upperCase.repeat(factor)).substr(0, factor) }
          if (options.custom) { str += shuffleStr(chars.custom.repeat(factor)).substr(0, factor) }

          return shuffleStr(str).substr(0, len)
        },
        roundUp (number, increment, offset) {
          return Math.ceil((number - offset) / increment) * increment + offset
        },
        range (start, end, step) {
          // ascii a-z
          if (typeof start === 'string' && typeof end === 'string') {
            const result = []
            for (let idx = start.charCodeAt(0), e = end.charCodeAt(0); idx <= e; ++idx) {
              result.push(String.fromCharCode(idx))
            }
            return result
          }
          // number or date
          const range = []
          typeof step === 'undefined' && (step = 1)
          if (end < start) {
            step = -step
          }
          while (step > 0 ? end >= start : end <= start) {
            range.push(start)
            start += step
          }
          return range
        },
        // turns 1000 into 1k
        formatNumber (number, decPlaces = 1) {
          decPlaces = Math.pow(10, decPlaces)
          const abbrev = ['k', 'm', 'b', 't']
          for (let i = abbrev.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3)
            if (size <= number) {
              number = Math.round(number * decPlaces / size) / decPlaces
              if ((number === 1000) && (i < abbrev.length - 1)) {
                number = 1
                i++
              }
              number += abbrev[i]
              break
            }
          }
          return number
        },
        /**
         * Date Helpers
         */
        //
        dateFromToYYYYMMDD (date) {
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          date = date instanceof Date ? date : new Date(date)

          const yyyy = date.getFullYear().toString()
          const mm = (date.getMonth() + 1).toString()
          const dd = date.getDate().toString()

          return yyyy + '-' + (mm[1] ? mm : '0' + mm[0]) + '-' + (dd[1] ? dd : '0' + dd[0])
        },
        // time to days between two dates
        $timeToDays (to, from) {
          if (typeof to !== 'string' && !(to instanceof Date)) {
            return '-'
          }
          to = to instanceof Date ? to : new Date(to)
          from = from instanceof Date ? from : (from ? new Date(from) : new Date())

          const diffSeconds = (
            Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
            Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
          )
          const diffDays = Math.floor(diffSeconds / (1000 * 60 * 60 * 24))

          return diffDays
        },
        $timeSince (date, showAgo = true) {
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          date = date instanceof Date ? date : new Date(date)

          const seconds = Math.floor((new Date() - date) / 1000)
          let interval = Math.floor(seconds / 31536000)

          if (interval >= 1) {
            return interval + ' year' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 2592000)

          if (interval >= 1) {
            return interval + ' month' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 86400)

          if (interval >= 1) {
            return interval + ' day' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 3600)

          if (interval >= 1) {
            return interval + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 60)

          if (interval >= 1) {
            return interval + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }

          if (Math.floor(seconds) === 0) {
            return 'just now'
          }

          return Math.floor(seconds) + ' second' + (Math.floor(seconds) > 1 ? 's' : '') + ' ago'
        },
        toHms (d, i) {
          d = Number(d) * i
          const h = Math.floor(d / 3600)
          const m = Math.floor(d % 3600 / 60)
          const s = Math.floor(d % 3600 % 60)

          const out = []
          if (h > 0) {
            out.push(h + 'h')
          }
          if (m > 0) {
            out.push(m + 'm')
          }
          if (s > 0) {
            out.push(s + 's')
          }
          return out.join(' ')
        },
        // time ago between two dates
        $agoString (value) {
          value = Math.abs(this.$timeToDays(value))
          return value + ' day' + (value > 1 ? 's' : '') + ' ago'
        },
        /**
         * Array Helpers
         */
        $copy: (v) => {
          if (typeof v !== 'undefined') {
            try {
              return JSON.parse(JSON.stringify(v))
            } catch (e) {
              console.error('$copy', e)
            }
          } else {
            console.error('$copy - value passed is undefined')
          }

          return undefined
        },
        //
        // @link: https://gist.github.com/lcherone/a2a60d8566e03a09c799b95e13e930af
        $merge: (a, b) => [
          ...new Set([
            ...a.map(i => JSON.stringify(i)),
            ...b.map(i => JSON.stringify(i))
          ])
        ].map(i => JSON.parse(i)),
        // @link: https://gist.github.com/lcherone/e0b63a3af841330419cbe290ab87ddb3
        $mergeBy: (...arrays) => {
          const propIndex = arrays.length - 1
          const key = arrays[propIndex]
          if (typeof arrays[propIndex] !== 'string') {
            throw new TypeError('Last argument must be a string')
          }
          arrays.splice(-1, 1)
          return Object.values(
            arrays.reduce((acc, cur) => {
              cur.forEach(prop => (acc[prop[key]] = acc[prop[key]] ? Object.assign(acc[prop[key]], prop) : prop))
              return acc
            }, {})
          )
        },
        // @link: https://gist.github.com/lcherone/f270f73cfd7f91bba09793e0166a62be
        $objectEnum: (object) => {
          let cache = []
          const str = JSON.stringify(object, function (key, value) {
            if (typeof value === 'object' && value !== null) {
              if (cache.includes(value)) {
                return
              }
              cache.push(value)
            }
            return typeof value === 'object'
              ? value
              : (typeof value === 'function'
                  ? (function (func) {
                      const fnStr = func.toString().replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
                      return fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g) || []
                    })(value)
                  : (['string', 'number'].includes(typeof value) ? value : ''))
          }, 0)
          cache = null
          try {
            return JSON.parse(str)
          } catch (e) {
            return {}
          }
        },
        shuffle (a) {
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]]
          }
        },
        randomItem (v) {
          return v[Math.floor(Math.random() * v.length)]
        },
        // slugify a string
        $slugify: str => String(str)
          .toString()
          .normalize('NFD')
          .replace(/&amp;/g, 'and')
          .replace(/&pound;/g, 'pound')
          .replace(/[\u0300-\u036F]/g, '')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-'),
        //
        $ltrim (str, charlist) {
          charlist = !charlist
            ? ' \\s\u00A0'
            : (charlist + '')
                .replace(/([[\]().?/*{}+$^:])/g, '$1')
          const re = new RegExp('^[' + charlist + ']+', 'g')
          return (str + '')
            .replace(re, '')
        },
        //
        $rtrim (str, charlist) {
          charlist = !charlist
            ? ' \\s\u00A0'
            : (charlist + '')
                .replace(/([[\]().?/*{}+$^:])/g, '\\$1')
          const re = new RegExp('[' + charlist + ']+$', 'g')
          return (str + '').replace(re, '')
            .replace(re, '')
        },
        $trim (str, charlist) {
          let whitespace = [
            ' ',
            '\n',
            '\r',
            '\t',
            '\f',
            '\x0B',
            '\xA0',
            '\u2000',
            '\u2001',
            '\u2002',
            '\u2003',
            '\u2004',
            '\u2005',
            '\u2006',
            '\u2007',
            '\u2008',
            '\u2009',
            '\u200A',
            '\u200B',
            '\u2028',
            '\u2029',
            '\u3000'
          ].join('')
          let l = 0
          let i = 0
          str += ''
          if (charlist) {
            whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
          }
          l = str.length
          for (i = 0; i < l; i++) {
            if (!whitespace.includes(str.charAt(i))) {
              str = str.substring(i)
              break
            }
          }
          l = str.length
          for (i = l - 1; i >= 0; i--) {
            if (!whitespace.includes(str.charAt(i))) {
              str = str.substring(0, i + 1)
              break
            }
          }
          return !whitespace.includes(str.charAt(0)) ? str : ''
        },
        padLeft (num, size) {
          let s = num + ''
          while (s.length < size) { s = '0' + s }
          return s
        },
        getDeviceType () {
          //
          let devicetype = null

          // determine the character of the device eg desktop or mobile, but if less then sm breakpoint presume mobile
          devicetype = (
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent) || window.innerWidth <= 575
          )
            ? 'phone' // (window.innerWidth <= 575 ? 'phone' : 'tablet')
            : 'desktop'

          console.log('Device type', devicetype.toUpperCase())

          // reload if device type changes
          // if (Plugin.prevDevicetype !== null && Plugin.prevDevicetype !== devicetype) {
          //     window.location.reload();
          // }
          // Plugin.prevDevicetype = devicetype
          return devicetype
        },
        isDate (date) {
          if (Object.prototype.toString.call(date) === '[object Date]') {
            return !isNaN(date.getTime())
          }
          return false
        },
        // usage: isset(this.obj, 'some.nested.prop', false)
        isset (object, key, _false) {
          if (typeof key === 'undefined') {
            return false
          }

          _false = _false || false
          const keys = key.split('.')
          for (let i = 0; i < keys.length; i++) {
            /* eslint-disable-next-line no-prototype-builtins */
            if (!object || !object.hasOwnProperty(keys[i])) {
              return _false
            }
            object = object[keys[i]]
          }
          return true
        },
        // validate email address
        // isValidEmail (email) {
        //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //   return re.test(String(email).toLowerCase())
        // },
        // is a satisfactory password
        // isValidPassword (password) {
        //   const re = /(?=^.{8,256}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/
        //   return re.test(password)
        // },
        //
        isValidUrl (str) {
          const pattern = new RegExp(
            // scheme
            '^((htt)ps?:\\/\\/)' +
            // hostname
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
            '((\\d{1,3}\\.){3}\\d{1,3}))|' +
            'localhost' +
            // port
            '(\\:\\d+)?' +
            // path, params and hash
            '(\\/[-a-z\\d%@_.~+&:]*)*' +
            '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' +
            '(\\#[-a-z\\d_]*)?$',
            'i'
          )
          return pattern.test(str)
        },
        //
        text_excerpt (v, charlength) {
          // clean up
          v = String(v)
            .replace(/\n/g, ' ')
            .replace(/#/g, '')
            .replace(/\*/g, '')
            .replace(/>/g, '')
            .replace(/&amp;/g, '&')
            .replace(/&nbsp;/g, ' ')
            .replace(/&ldquo;/g, '“')
            .replace(/&rdquo;/g, '”')
            .replace(/&rsquo;/g, '’')
            .replace(/&ndash;/g, '’')
            .replace(/&euml;/g, 'ë')
            .replace(/[[]()]/g, '')

          v = v.trim()

          return v.length > (charlength || 95) ? v.slice(0, v.indexOf(' ', (charlength || 95))) + '...' : v
        },
        lowestKeyFinder (obj) {
          const keys = Object.keys(obj)
          keys.sort(function (a, b) {
            return a - b
          })
          return function (val) {
            let key = -1
            const len = keys.length
            for (let i = 0; i < len; i++) {
              if (key < 0 || keys[i] < (val + 1)) {
                key = Math.max(key, keys[i])
              }
            }
            return key
          }
        },
        percentRound (ipt, precision) {
          if (!precision) {
            precision = 0
          }
          if (!Array.isArray(ipt)) {
            throw new TypeError('percentRound input should be an Array')
          }
          const iptPercents = ipt.slice()
          const length = ipt.length
          const out = new Array(length)

          let total = 0
          for (let i = length - 1; i >= 0; i--) {
            if (typeof iptPercents[i] === 'string') {
              iptPercents[i] = Number.parseFloat(iptPercents[i])
            }
            total += iptPercents[i] * 1
          }
          if (isNaN(total)) {
            throw new TypeError('percentRound invalid input')
          }

          if (total === 0) {
            out.fill(0)
          } else {
            const powPrecision = Math.pow(10, precision)
            const pow100 = 100 * powPrecision
            let check100 = 0
            for (let i = length - 1; i >= 0; i--) {
              iptPercents[i] = 100 * iptPercents[i] / total
              check100 += out[i] = Math.round(iptPercents[i] * powPrecision)
            }

            if (check100 !== pow100) {
              const totalDiff = (check100 - pow100)
              const roundGrain = 1
              let grainCount = Math.abs(totalDiff)
              const diffs = new Array(length)

              for (let i = 0; i < length; i++) {
                diffs[i] = Math.abs(out[i] - iptPercents[i] * powPrecision)
              }

              while (grainCount > 0) {
                let idx = 0
                let maxDiff = diffs[0]
                for (let i = 1; i < length; i++) {
                  if (maxDiff < diffs[i]) {
                    idx = i
                    maxDiff = diffs[i]
                  }
                }
                if (check100 > pow100) {
                  out[idx] -= roundGrain
                } else {
                  out[idx] += roundGrain
                }
                diffs[idx] -= roundGrain
                grainCount--
              }
            }
            if (powPrecision > 1) {
              for (let i = 0; i < length; i++) {
                out[i] = out[i] / powPrecision
              }
            }
          }

          return out
        },
        //
        date_format (date) {
          if (date === '0000-00-00 00:00:00') {
            return '-'
          }
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          return new Date(date).toLocaleString(typeof window !== 'undefined' && window.navigator ? (window.navigator.userLanguage || window.navigator.language) : 'en-GB', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
          })
        },
        // time to days between two dates
        timeToDays (to, from) {
          if (typeof to !== 'string' && !(to instanceof Date)) {
            return '-'
          }
          to = to instanceof Date ? to : new Date(to)
          from = from instanceof Date ? from : (from ? new Date(from) : new Date())

          const diffSeconds = (
            Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) -
            Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())
          )
          const diffDays = Math.floor(diffSeconds / (1000 * 60 * 60 * 24))

          return diffDays
        },
        // time since the date
        timeSince (date, showAgo = true) {
          if (typeof date !== 'string' && !(date instanceof Date)) {
            return '-'
          }
          date = date instanceof Date ? date : new Date(date)

          const seconds = Math.floor((new Date() - date) / 1000)
          let interval = Math.floor(seconds / 31536000)

          if (interval >= 1) {
            return interval + ' year' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 2592000)

          if (interval >= 1) {
            return interval + ' month' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 86400)

          if (interval >= 1) {
            return interval + ' day' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 3600)

          if (interval >= 1) {
            return interval + ' hour' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }
          interval = Math.floor(seconds / 60)

          if (interval >= 1) {
            return interval + ' minute' + (Math.floor(interval) > 1 ? 's' : '') + (showAgo ? ' ago' : '')
          }

          if (Math.floor(seconds) === 0) {
            return 'just now'
          }

          return Math.floor(seconds) + ' second' + (Math.floor(seconds) > 1 ? 's' : '') + ' ago'
        },
        // outputs day(s) ago
        agoString (value) {
          value = Math.abs(this.timeToDays(value))
          return value + ' day' + (value > 1 ? 's' : '') + ' ago'
        },
        // recursive merge two arrays or objects where the first is the constraint, inc type checking
        strictMerge (itemA, itemB) {
          if (!itemB || typeof itemB !== typeof itemA) {
            return itemA
          }

          if (Array.isArray(itemA) && Array.isArray(itemB)) {
            return itemA.map((item, index) => {
              if (itemB[index]) {
                return Object.keys(item).reduce((acc, key) => {
                  acc[key] = typeof itemB[index][key] === 'object' && !Array.isArray(itemB[key])
                    ? this.strictMerge(itemA[index][key], itemB[index][key])
                    : (
                        typeof itemB[index][key] !== 'undefined'
                          ? (
                              typeof itemB[index][key] !== typeof itemA[index][key] ? itemA[index][key] : itemB[index][key]
                            )
                          : itemA[index][key]
                      )
                  return acc
                }, {})
              }
              return item
            }, [])
          } else {
            return Object.keys(itemA).reduce((acc, key) => {
              acc[key] = typeof itemB[key] === 'object' && !Array.isArray(itemB[key])
                ? this.strictMerge(itemA[key], itemB[key])
                : (
                    typeof itemB[key] !== 'undefined'
                      ? (
                          typeof itemB[key] !== typeof itemA[key] ? itemA[key] : itemB[key]
                        )
                      : itemA[key]
                  )
              return acc
            }, {})
          }
        },
        // move an item in an array to another position
        array_move (arr, oldIndex, newIndex) {
          if (newIndex >= arr.length) {
            let k = newIndex - arr.length + 1
            while (k--) {
              arr.push(undefined)
            }
          }
          arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0])
          return arr
        },
        //
        toPageTitle (str) {
          return str.replace(/-/g, ' ').replace(/\//g, ' ').replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
          })
        },
        // look for item on dom, when found fire callback
        waitForDom (selector, cb, interval, maxTicks) {
          interval = Number.isInteger(interval) ? interval : 1000 / 60 // 60fps
          maxTicks = Number.isInteger(maxTicks) ? maxTicks : 100

          let tick = 0
          const domExists = setInterval(function () {
            const elm = $(selector)
            if (elm.length) {
              // console.log('$("' + selector + '") is ready, firing callback.' /*, cb*/ );
              clearInterval(domExists)
              cb(elm)
            } else if (tick >= maxTicks) {
              // console.log('Failed to find: $("' + selector + '") after ' + maxTicks + ' attempts.');
              clearInterval(domExists)
            } else {
              // console.log('$("' + selector + '") is not ready yet.');
            }
            tick++
          }, interval)
        },
        ucFirst (str) {
          if (typeof str !== 'undefined' && str !== '') {
            return String(str).charAt(0).toUpperCase() + String(str).slice(1).toLowerCase()
          } else {
            return ''
          }
        },
        ucWords (str) {
          return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase()
          })
        },
        performance () {
          const result = {}
          if (window.performance && window.performance.timing) {
            const perf = window.performance.timing
            result.pageLoadTime = perf.loadEventEnd - perf.navigationStart
            result.connectTime = perf.responseEnd - perf.requestStart
            result.renderTime = perf.domComplete - perf.domLoading
          }
          return result
        },
        // popup (url, t, w, h) {
        //   const screenLeft = (window.screenLeft !== undefined) ? window.screenLeft : screen.left
        //   const screenTop = (window.screenTop !== undefined) ? window.screenTop : screen.top
        //   const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
        //   const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height
        //   const left = ((width / 2) - (w / 2)) + screenLeft
        //   const top = ((height / 2) - (h / 2)) + screenTop
        //   const popupWindow = window.open(url, t, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left)

        //   if (window.focus) {
        //     popupWindow.focus()
        //   }
        // },
        // slugify a string
        slugify: str => String(str)
          .toString()
          .normalize('NFD')
          .replace(/&amp;/g, 'and')
          .replace(/&pound;/g, 'pound')
          .replace(/[\u0300-\u036F]/g, '')
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-'),
        //
        strip_tags (str) {
          //
          const div = document.createElement('div')
          div.innerHTML = str
          //
          let elements
          elements = div.getElementsByTagName('a')
          while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0])
          }
          elements = div.getElementsByTagName('img')
          while (elements[0]) {
            elements[0].parentNode.removeChild(elements[0])
          }

          return div.innerText
        },
      }
    })
  }
}

Vue.use(Plugin)