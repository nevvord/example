<template>
    <div v-if="autorization">
        <NavBar />
        <nuxt />   
    </div>
    <div v-else>
        lol
    </div>
</template>

<script>
import NavBar from '~/components/crm/NavBar.vue'
export default {
    data() {
        return{
            autorization: true
        }
    },
    components:{
        NavBar
    }
    
}
</script>

<style scoped>

</style>
