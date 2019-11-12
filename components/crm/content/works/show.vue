<template>
    <b-container class="my-5">
        <b-row align-v="start">
            <b-col v-for="works in $store.state.works._Data" :key="works.key" sm="12" lg="4">
                <b-row>
                    <b-col>
                        <b-card :title="works.name" :img-src="$store.state._ServerHttp + works.file"
                            img-alt="works.name" img-top tag="article" style="max-width: 20rem;" class="mb-2">
                            <b-card-text>
                                {{works.description}}
                            </b-card-text>
                            <b-row>
                                <b-col cols="4" v-for="worksTech in works.technology" :key="worksTech.key">
                                    <div v-for="tech in $store.state.technologies._Technology" :key="tech.key">
                                        <div v-if="tech._id === worksTech">
                                            <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <hr>
                            <b-row>
                                <b-col class="text-center">
                                    <b-button-group>
                                        <b-button variant="success" v-b-modal.modal-1
                                            @click="$store.commit('works/updateChange', works)"> HTML </b-button>
                                        <b-button variant="warning" v-b-modal.modal-2 @click="$store.commit('works/updateChange', works)">
                                            Изменить</b-button>
                                        <b-button variant="danger" @click="delet(works._id, works.file)">Удалить</b-button>
                                    </b-button-group>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    methods: {
        delet(id, file) {
            this.$axios
                .delete(this.$store.state._ServerHttp + 'api/deletework/' + id, { data: { file } })
                .then(res => {
                    this.$store.commit('works/delete', id)
                    this.$notify({
                        group: 'foo',
                        title: `SUCCESS`,
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `Error ${err.response.status}`,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                })
        }
    }
}
</script>