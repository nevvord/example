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
