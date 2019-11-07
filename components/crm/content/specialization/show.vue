<template>
    <b-container class="mt-4">
        <b-row align-v="start">
            <b-col v-for="spec in $store.state.specializations._Specialization" :key="spec.key" sm="12" lg="4">
                <b-row>
                    <b-col>
                        <b-card :title="spec.name" :img-src="$store.state._ServerHttp + spec.file" :img-alt="spec.name"
                            img-top tag="article" style="max-width: 20rem;" class="mb-2 p-0">
                            <b-card-text>
                                {{spec.description}}
                            </b-card-text>
                            <b-row class="border-bottom pb-2 mb-2">
                                <b-col cols="4" v-for="specTech in spec.technology" :key="specTech.key">
                                    <div v-for="tech in $store.state.technologies._Technology" :key="tech.key">
                                        <div v-if="tech._id === specTech">
                                            <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                                        </div>
                                    </div>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col class="text-center">
                                    <b-button-group>
                                        <b-button variant="success" v-b-modal.modal-1 @click="$store.commit('specializations/updateChange', spec)">HTML</b-button>
                                        <b-button variant="warning" v-b-modal.modal-2 @click="$store.commit('specializations/updateChange', spec)">Изменить
                                        </b-button>
                                        <b-button variant="danger" @click="del(spec._id, spec.file)">Удалить</b-button>
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
    methods:{
        del(id, file) {
            this.$axios
                .delete(this.$store.state._ServerHttp + 'api/deletespecialization/' + id, { data: { file } })
                .then(res => {
                    this.$store.commit('specializations/delete', id)
                    this.$notify({
                        group: 'foo',
                        title: 'Success',
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: 'Error ' + err.response.status,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                })
        }
    }
}
</script>