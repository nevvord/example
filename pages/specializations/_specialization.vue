<template>
    <div class="content">
        <div v-html="inner"></div>
        <hr>
        <b-row>
            <b-col sm="12" md="6" lg="4" v-for="project in projects" :key="project.key">
                <b-row>
                    <b-col v-for="proj in $store.state.projects._Project" :key="proj.key" v-if="proj._id === project">
                        <b-card :title="proj.name" :img-src="$store.state._ServerHttp + proj.file" :img-alt="proj.name"
                            img-top tag="article" class="mb-2">
                            <b-card-text>
                                {{proj.description}}
                            </b-card-text>

                            <b-button squared variant="outline-danger" size="lg" :to="`/projects/${proj._id}`">Подробнее</b-button>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    head:{
        title: 'ЮЖПРОМАВТОМАТИКА | Специялизация',
    },
    data(){
        return{
            inner: '',
            projects: []
        }
    },
    mounted(){    
        const curSpecialization = this.$store.state.specializations._Specialization.filter(spec => spec._id === this.$route.params.specialization)
        this.inner = curSpecialization[0].inner
        this.projects = curSpecialization[0].projects
    }
}
</script>
<style scoped>
.content {
    padding: 75px 75px;
}
</style>
