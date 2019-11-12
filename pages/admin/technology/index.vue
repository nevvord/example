<template>
    <div class="bg-light">
        <b-container class="bg-white border p-0">
            <h3 class="p-3 bg-dark text-light">Добавить Технологию</h3>
            <b-form @submit="upld" class="p-3" onsubmit="false" enctype="multipart/form-data">
                <b-form-group id="input-group-1" label="Название технологии:" label-for="input-1" description="">
                    <b-form-input id="input-1" v-model="form.name" type="text" required
                        placeholder="Введите название технологии">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Ссылка на технологию:" label-for="input-2">
                    <b-form-input id="input-2" v-model="form.link" required placeholder="http://link.com">
                    </b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Лого технологии:" label-for="input-3">
                    <b-form-file v-model="form.file" :state="Boolean(form.file)" required
                        placeholder="Выберете картинку..." drop-placeholder="Drop file here..."></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
                </b-form-group>
                <div class="text-right p-3">
                    <b-button type="submit" :disabled="form.name && form.file ? false : true" squared variant="success">Добавить</b-button>
                </div>
            </b-form>
        </b-container>
        <b-container class="mb-4 pt-4">
            <b-row>
                <b-col class="bg-white border p-0 text-center mb-2" lg="2" md="2" sm="2" cols="6" xl="1"
                    v-for="tech in $store.state.technologies._Technology" :key="tech.key">
                    <b-row class="m-0 p-0 bg-info">
                        <b-col class="border-bottom p-0">
                            <b-link class="text-light" style="font-size: 12px;" :href="tech.link">{{ tech.name }}
                            </b-link>
                        </b-col>
                    </b-row>
                    <b-row class="border-bottom p-o m-0">
                        <b-col>
                            <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="p-2">
                            <b-button variant="danger" @click="delTech(tech._id, tech.file)">
                                Удалить
                            </b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default  {
        layout: 'cp',
        data() {
            return {
                form: {
                    name: '',
                    link: '',
                    file: null
                }
            } 
        },
        methods: {
            async upld(evt) { // Загружаем технологию на сервер
                evt.preventDefault()
            
                const fd = new FormData()
                fd.append('image', this.form.file, this.form.file.name)
                fd.append('name', this.form.name)
                fd.append('link', this.form.link)
                
                let bodyJson = {
                    name: this.form.name,
                    link: this.form.link
                }
                await this.$axios
                    .post(this.$store.state._ServerHttp + 'api/addtechnology', fd)
                    .then(res => {
                        this.$store.commit('technologies/push', res.data.resultat)
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
                            title: `ERROR ${err.status}`,
                            text: err.response.data,
                            type: 'error'
                        })
                    })
            },
            async delTech(id, file){// Удаление технологии
                await this.$axios
                    .delete(`${this.$store.state._ServerHttp}api/deletetechnology/${id}`, { data: { file } })
                    .then(res => {
                        this.$store.commit('technologies/delete', id)
                        this.$store.commit('specializations/clear', id)
                        this.$store.commit('works/clear', id)
                        this.$notify({
                            group: 'foo',
                            title: 'Success',
                            text: "Технологии Удаленна",
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'foo',
                            title: `ERROR ${err.status}`,
                            text: err.response.data.msg,
                            type: 'error'
                        })
                    })
            },
            clearWithTechnology(state, id) {
                
                
                state._Works = state._Works.map(work => {
                    return {
                        ...work,
                        technology: work.technology.filter((tech) => {
                            return tech !== id
                        })
                    }
                })
                state._Works.forEach(element => {
                    this.$axios.put(`${state._ServerHttp}workTech/${element._id}`, {
                        technology: element.technology
                    })
                })
            }
        }
  }
</script>