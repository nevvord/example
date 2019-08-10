
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: "Южпромка" || process.env.npm_package_name || 'Южпром',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: "https://kit.fontawesome.com/b194ce6fcf.js", body: true },
      { src:"https://maps.googleapis.com/maps/api/js?key=AIzaSyDErFPrPynUMhkr_I9wkVpgebHbKf_3LW0", body: true}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#f3f3f3' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [

  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    'nuxt-fontawesome',
    '@nuxtjs/axios'
  ],
  axios: {
    // proxyHeaders: false
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
