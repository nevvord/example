<template>
    <b-container class="mt-3">
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
    </b-container>
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
        const curWork = this.$store.state.works._Data.filter(work => work._id === this.$route.params.work)
        this.inner = curWork[0].inner
        this.projects = curWork[0].projects
    }
}
</script>
