<template>
    <b-modal id="change-1" :title="'Изменить: ' + $store.state.projects.changeProject.oldName " size="xl">
        <b-form-group label="Имя проекта" description="Єто поле обязательно" label-for="inputName">
            <b-form-input id="inputName" v-model="$store.state.projects.changeProject.name" required placeholder="Имя проекта"></b-form-input>
        </b-form-group>
        <b-form-group label="Ссылка на сайт проекта"
            description="Поле не обязательно. Ссылка не будет отображена если ее не ввести" label-for="inputLink">
            <b-form-input id="inputLink" v-model="$store.state.projects.changeProject.link" type="url" placeholder="http://ssilka.com">
            </b-form-input>
        </b-form-group>
        <b-form-group label="Описание проекта" description="Обязательное поле" label-for="inputDesc">
            <b-form-textarea id="inputDesc" v-model="$store.state.projects.changeProject.description" required placeholder="Описание проекта">
            </b-form-textarea>
        </b-form-group>
        <b-row>
            <b-col sm="12" lg="3">
                <b-img :src="$store.state._ServerHttp + $store.state.projects.changeProject.file" fluid></b-img>
            </b-col>
            <b-col sm="12" lg="9">
                <b-form-group label="Картинка для проекта:" label-for="inputFile">
                    <b-form-file id="inputFile" v-model="$store.state.projects.changeProject.newFile" :state="Boolean($store.state.projects.changeProject.newFile)"
                        placeholder="Выберете картинку..." drop-placeholder="Drop file here..."></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ $store.state.projects.changeProject.newFile ? $store.state.projects.changeProject.newFile.name : '' }}</div>
                </b-form-group>
            </b-col>
        </b-row>
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <b-button variant="success" :disabled="disabled" @click="setProj()">Сохранить</b-button>
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
        return {
            disabled: false
        }
    },
    methods: {
        async setProj(){
            this.disabled = true
            const fd = new FormData()
            if(this.$store.state.projects.changeProject.newFile){
                fd.append('image', this.$store.state.projects.changeProject.newFile, this.$store.state.projects.changeProject.newFile.name)
                fd.append('file', this.$store.state.projects.changeProject.file)
            }
            fd.append('name', this.$store.state.projects.changeProject.name)
            fd.append('link', this.$store.state.projects.changeProject.link)
            fd.append('description', this.$store.state.projects.changeProject.description)

            await this.$axios
                .put(this.$store.state._ServerHttp + 'api/putproject/' + this.$store.state.projects.changeProject._id, fd)
                .then(res => {
                    this.$store.commit('projects/change', res.data.newFile)
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
                        title: `ERROR ${err.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                    this.disabled = false
                })
        }
    }
}
</script>