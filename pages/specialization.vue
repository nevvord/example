<template>
    <div class="content">
        <div v-html="this.$store.state._SpecBody.inner"></div>
        <hr>
        <b-row>
            <b-col sm="12" md="6" lg="4" v-for="specProjId in $store.state._SpecBody.id" :key="specProjId.key">
                <b-col v-for="proj in $store.state._Project" :key="proj.key">
                    <b-card v-if="proj._id === specProjId" :title="proj.name" :img-src="$store.state._ServerHttp + proj.file" :img-alt="proj.name"
                        img-top tag="article" class="mb-2">
                        <b-card-text>
                            {{proj.description}}
                        </b-card-text>

                        <b-button squared variant="outline-danger" size="lg" to="/project"
                            @click="projInner(proj.inner)">Подробнее</b-button>
                    </b-card>
                </b-col>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    methods: {
        projInner(inner){
            this.$store.commit('changeProjInner', inner)
        }
    }
}
</script>

<style scoped>
.content {
    padding: 75px 75px;
}
</style>
