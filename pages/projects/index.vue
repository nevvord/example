<template>
    <div class="bg-light">
        <b-container class="">
            <b-row>
                <b-col class="border my-3 bg-white" cols="12" v-for="proj in $store.state.projects._Project" :key="proj.key">
                    <b-row align-v="center" class="p-2 border-bottom mb-3">
                        <b-col cols="6"   class="text-uppercase">
                            {{proj.name}}
                        </b-col>
                        <b-col cols="6" class="text-right link">
                            <a v-if="proj.link" :href="proj.link">Сайт проекта</a>
                        </b-col>
                    </b-row>
                    <b-row class="border-bottom">
                        <b-col sm="12" lg="3" md="4">
                            <b-img :src="$store.state._ServerHttp + proj.file" fluid :alt="proj.name"></b-img>
                        </b-col>
                        <b-col sm="12" lg="9" md="8" class="m-2">
                            {{proj.description}}
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="text-right p-3">
                            <b-button squared variant="outline-danger" size="lg" :to="`/projects/${proj._id}`">
                                Подробнее
                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    head:{
        title: 'ЮЖПРОМАВТОМАТИКА | Проекты'
    }
}
</script>
