<template>
  <div class="content bg-light">
    <Slider /> 
    <Works />
    <Job />
    <SomeContent />
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue'
import Works from '~/components/Works.vue'
import Job from '~/components/Job.vue'
import SomeContent from '~/components/SomeContent.vue'
export default {
  data() {
    return{

    }
  },
  middleware: 'admin',
  created(store) {
    this.$store.commit('getTechnology')
    this.$store.commit('getSpecialization')
    this.$store.commit('getWorks')
    this.$store.commit('getProject')
    this.$store.commit('getPage')
  },
  components: {
    Slider,
    Works,
    Job,
    SomeContent
  }
}
</script>

<style>

</style>
