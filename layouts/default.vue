<template>
  <div>
    <Navbar />
    <nuxt />
    <Footer />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'



export default {
  middleware: 'getApi',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
</style>
