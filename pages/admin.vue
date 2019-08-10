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
        <div v-else-if="this.$store.state.admin.content === 'page'">
            <Page />
        </div>
    </div>
    
</template>

<script>
import Projects from '~/components/crm/content/Projects.vue';
import Works from '~/components/crm/content/Works.vue';
import Specialization from '~/components/crm/content/Specialization.vue';
import Technology from '~/components/crm/content/Technology.vue';
import Page from '~/components/crm/content/Page.vue';
import { mapMutations } from 'vuex';


export default {
    created(store){
        this.$store.commit('getTechnology')
        this.$store.commit('getSpecialization')
        this.$store.commit('getWorks')
        this.$store.commit('getProject')
        this.$store.commit('getPage')
    },
    middleware: 'admin',
    layout: 'cp',
    methods: {
        
    },
    components:{
        Projects,
        Works,
        Specialization,
        Technology,
        Page
    }
    
}
</script>

<style scoped>
.content {
    margin-left: 22px;
}
</style>
