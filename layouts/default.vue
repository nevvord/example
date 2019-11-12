<template>
  <div class="pt-5">
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
.n-p{
  padding-top: 56px;
}
</style>
