<template>
    <div class="content">
        <div v-if="this.$store.state.admin.content === 'projects'">
            <Projects />
        </div>
        <div v-else-if="this.$store.state.admin.content === 'works'">
            <Works />
        </div>
        <div v-else-if="this.$store.state.admin.content === 'specialization'">
            <Specialization />
        </div>
        <div v-else-if="this.$store.state.admin.content === 'technology'">
            <Technology />
        </div>
    </div>
    
</template>

<script>
import Projects from '~/components/crm/content/Projects.vue';
import Works from '~/components/crm/content/Works.vue';
import Specialization from '~/components/crm/content/Specialization.vue';
import Technology from '~/components/crm/content/Technology.vue';
import { mapMutations } from 'vuex';


export default {
    created(store){
        this.$store.commit('getTechnology')
        this.$store.commit('getSpecialization')
    },
    middleware: 'admin',
    layout: 'cp',
    methods: {
        
    },
    components:{
        Projects,
        Works,
        Specialization,
        Technology
    }
    
}
</script>

<style scoped>
.content {
    margin-left: 50px;
}
</style>
