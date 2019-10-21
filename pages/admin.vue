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
        <div v-else class="defContent">
            <b-container>
                Добро пожаловать в Админ панель NCP
            </b-container>
        </div>
    </div>
    
</template>

<script>
import Projects from '~/components/crm/content/Projects';
import Works from '~/components/crm/content/Works';
import Specialization from '~/components/crm/content/Specialization';
import Technology from '~/components/crm/content/Technology';
import Page from '~/components/crm/content/Page';
import { mapMutations } from 'vuex';


export default {
    middleware: 'getApi',
    layout: 'cp',
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
.defContent{
    margin-left: 25px;
}
</style>
