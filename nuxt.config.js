
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
      { src:"https://maps.googleapis.com/maps/api/js?key=!1m18!1m12!1m3!1d686.9547644726107!2d30.71827082926091!3d46.47209192232471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDI4JzE5LjUiTiAzMMKwNDMnMDcuNyJF!5e0!3m2!1sen!2sus!4v1550474347434", body: true}
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
