<template>
    <div class="content bg-light">
        <b-container>
            <b-row>
                <b-col class="post bg-white" cols="12" v-for="proj in this.$store.state._Project" :key="proj.key">
                    <b-row>
                        <b-col cols="12" md="6"  class="align-bottom text-uppercase">
                            {{proj.name}}
                        </b-col>
                        <b-col cols="12" md="6" class="text-right link">
                            <a v-if="proj.link" :href="proj.link">Сайт проекта</a>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row>
                        <b-col sm="12" lg="3" md="4">
                            <b-img :src="$store.state._ServerHttp + proj.file" fluid :alt="proj.name"></b-img>
                        </b-col>
                        <b-col sm="12" lg="9" md="8">
                            {{proj.description}}
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row>
                        <b-col class="text-right">
                            <b-button squared variant="outline-danger" size="lg" to="/project" @click="projInner(proj.inner)">
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
    created(store){
        this.$store.commit('getProject')
    },
    methods: {
        projInner(inner){
            this.$store.commit('changeProjInner', inner)
        }
    }
}
</script>

<style scoped>
.content {
    padding: 75px;
}
.post{
    padding: 15px;
    margin-bottom: 10px;
}
hr{
    margin: 5px 0 10px;
}

.link {
    padding-right: 25px;
}
</style>
