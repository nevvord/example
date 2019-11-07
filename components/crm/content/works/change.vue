<template>
    <b-modal id="modal-2" :title="'Изменить: ' + $store.state.works.change.oldName" size="xl">
        <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
            label="Введите название:" label-for="input-name">
            <b-input v-model="$store.state.works.change.name" id="input-name"></b-input>
        </b-form-group>
        <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
            label="Введите описание:" label-for="textarea-description">
            <b-form-textarea placeholder="Введи хоть что-то для потомков!" v-model="$store.state.works.change.description"
                id="textarea-description"></b-form-textarea>
        </b-form-group>
        <hr>
        <b-row>
            <b-col sm="12" lg="4" class="imgInChangeBlock">
                <p>Картинка специализации:</p>
                <b-img :src="$store.state._ServerHttp + $store.state.works.change.file" fluid></b-img>
            </b-col>
            <b-col sm="12" lg="8">
                <p>Изменить картинку:</p>
                <b-form-group label="Картинка на главной странице:" label-for="inpImg">
                    <b-form-file id="inpUmg" v-model="$store.state.works.change.newFile" :state="Boolean($store.state.works.change.newFile)"
                        placeholder="Выберете картинку..." drop-placeholder="Drop file here..."></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ $store.state.works.change.newFile ? $store.state.works.change.newFile.name : '' }}
                    </div>
                </b-form-group>
            </b-col>
        </b-row>
        <hr>
        <!--Технологии и проекты-->
        <b-tabs content-class="mt-3">
            <b-tab title="Технологии">
                <b-form-group id="input-group-4">
                    <b-form-checkbox-group v-model="$store.state.works.change.technology" id="checkboxes-4" :state="state">
                        <b-form-checkbox class="checkBox" v-for="tech in $store.state.technologies._Technology" :key="tech.key" :value="tech._id">
                            <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                        </b-form-checkbox>
                        <b-form-invalid-feedback :state="state">Выберете до трех техологий</b-form-invalid-feedback>
                        <b-form-valid-feedback :state="state">Спасибо</b-form-valid-feedback>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-tab>
            <b-tab class="margin-left" title="Проекты">
                <b-form-group id="input-group-6">
                    <b-form-checkbox-group v-model="$store.state.works.change.projects" id="checkbox-6">
                        <b-form-checkbox class="checkBoxProject bg-light col-12" v-for="proj in $store.state.projects._Project"
                            :key="proj.key" :value="proj._id">
                            <b-row class="max-width">
                                <b-col sm="6" md="1" lg="1" xl="1">
                                    <b-img class="imgCheckBox" :src="$store.state._ServerHttp + proj.file" fluid>
                                    </b-img>
                                </b-col>
                                <b-col sm="6" md="11" lg="4" xl="4">
                                    <span>{{proj.name}}</span>
                                </b-col>
                                <b-col sm="12" md="7" lg="5" xl="7" class="text-truncate">
                                    <span>{{proj.description}}</span>
                                </b-col>
                            </b-row>
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>
            </b-tab>
        </b-tabs>
        <!--Технологии и проекты-->
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <b-button variant="success" :disabled="disabled" @click="update()">Сохранить</b-button>
            <b-button id="btnClose" @click="cancel()">Закрыть</b-button>
            <b-tooltip target="btnClose" variant="danger">
                Осторожно! Все несохраненые данные будут утеряны!
            </b-tooltip>
        </template>
    </b-modal>
</template>
<script>
export default {
    data(){
        return{
            disabled: false
        }
    },
    methods: {
        async update() {
            this.disabled = true
            const fd = new FormData();

            if (this.$store.state.works.change.newFile) {
                fd.append('image', this.$store.state.works.change.newFile, this.$store.state.works.change.newFile.name)
            }
            fd.append('name', this.$store.state.works.change.name)
            fd.append('description', this.$store.state.works.change.description)
            fd.append('technology', this.$store.state.works.change.technology)
            fd.append('projects', this.$store.state.works.change.projects)
            fd.append('file', this.$store.state.works.change.file)

            await this.$axios
                .put(this.$store.state._ServerHttp + 'api/putwork/' + this.$store.state.works.change._id, fd)
                .then(res => {
                    this.$store.commit('works/change', res.data.newFile)
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                    this.disabled = false
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `Error ${err.response.status}`,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                    this.disabled = false
                })
        }
    },
    computed: {
        state() {
            return this.$store.state.works.change.technology.length <= 3 && this.$store.state.works.change.technology.length > 0
        }
    }
}
</script>