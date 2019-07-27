<template>
  <div>
    <Slider /> 
    <Works />
    <Job />
    <SomeContetnt />
  </div>
</template>

<script>
import Slider from '~/components/Slider.vue'
import Works from '~/components/Works.vue'
import Job from '~/components/Job.vue'
import SomeContetnt from '~/components/SomeContetnt.vue'
export default {
    components: {
      Slider,
      Works,
      Job,
      SomeContetnt
    }
  }
</script>

<style>

</style>
