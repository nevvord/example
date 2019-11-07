<template>
    <div class="bg-light ml-5">
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
import Projects from '../components/crm/content/projects'
import Works from '../components/crm/content/works'
import Specialization from '../components/crm/content/specialization'
import Technology from '../components/crm/content/technology'
import Page from '../components/crm/content/page'

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