<template>
    <div class="bg-light">
        <b-container class="bg-white border p-0">
            <h3 class="bg-dark text-light p-3">Добавить Работу</h3>
            <!--Название-->
            <b-form @submit="upload">
                <b-form-group class="p-3" id="input-group-1" label="Название специализации:" label-for="input-1">
                    <b-form-input id="input-1"  v-model="$store.state.works.form.name" type="text" required
                        placeholder="Ввидите название специализации">
                    </b-form-input>
                </b-form-group>
                <!--Название-->
                <!--Описание-->
                <b-form-group class="p-3" id="input-group-2" label="Текст на главной странице:" label-for="input-2">
                    <b-form-input id="input-2" v-model="$store.state.works.form.description" required
                        placeholder="Введите текст который будет отображатся на стартовой странице."></b-form-input>
                </b-form-group>
                <!--Описание-->
                <!--Картинка-->
                <b-form-group class="p-3" id="input-group-3" label="Картинка на главной странице:" label-for="input-3">
                    <b-form-file v-model="$store.state.works.form.file" required :state="Boolean($store.state.works.form.file)" placeholder="Выберете картинку..."
                        drop-placeholder="Drop file here..."></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ $store.state.works.form.file ? $store.state.works.form.file.name : '' }}</div>
                </b-form-group>
                <!--Картинка-->
                <!--Технологии и проекты-->
                <b-tabs content-class="mt-3 p-3" active-nav-item-class="text-danger">
                    <b-tab title="Технологии">
                        <b-form-group id="input-group-4">
                            <b-form-checkbox-group v-model="$store.state.works.form.technology" id="checkboxes-4" :state="state">
                                <b-form-checkbox class="checkBox" v-for="tech in $store.state.technologies._Technology" :key="tech.key"
                                    :value="tech._id">
                                    <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                                </b-form-checkbox>
                                <b-form-invalid-feedback :state="state">Выберете до трех техологий</b-form-invalid-feedback>
                                <b-form-valid-feedback :state="state">Спасибо</b-form-valid-feedback>
                            </b-form-checkbox-group>
                        </b-form-group>
                    </b-tab>
                    <b-tab class="margin-left" title="Проекты">
                        <b-form-group id="input-group-6">
                            <b-form-checkbox-group v-model="$store.state.works.form.projects" id="checkbox-6">
                                <b-form-checkbox class="border-bottom border-light"
                                    v-for="proj in $store.state.projects._Project" :key="proj.key" :value="proj._id">
                                    <b-row>
                                        <b-col sm="6" md="1" lg="1" xl="1">
                                            <b-img :src="$store.state._ServerHttp + proj.file" fluid>
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
                <!--HTML для страницы-->
                <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="$store.state.works.form.inner" :options="cmOption"></codemirror>
                </no-ssr>
                <div class="bg-light border border-top-0 border-dark" v-html="$store.state.works.form.inner"></div>
                <!--HTML для страницы-->
                <div class="p-4 text-right">
                    <b-button type="submit" variant="success">Добавить</b-button>
                </div>
            </b-form>
        </b-container>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cmOption: {
                tabSize: 4,
                foldGutter: true,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                keyMap: "sublime",
                mode: 'text/x-vue',
                theme: 'base16-dark'
            }
        }
    },
    methods: {
        async upload(evt) {
            evt.preventDefault()

            const fd = new FormData()

            if (this.$store.state.works.form.file){
                fd.append('image', this.$store.state.works.form.file, this.$store.state.works.form.file.name)
            }

            fd.append('name', this.$store.state.works.form.name)
            fd.append('description', this.$store.state.works.form.description)
            fd.append('technology', this.$store.state.works.form.technology)
            fd.append('projects', this.$store.state.works.form.projects)
            fd.append('inner', this.$store.state.works.form.inner)


            await this.$axios
                .post(this.$store.state._ServerHttp + 'api/addwork', fd)
                .then(res => {
                    this.$store.commit('works/push', res.data.resultat)
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
    },
    computed: {
        state() {
            return this.$store.state.works.form.technology.length <= 3 && this.$store.state.works.form.technology.length > 0;
        }
    }
}
</script>