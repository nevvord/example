<template>
  <div>
    <b-container class="bg-white pt-4">
      <h3 class="border-bottom border-dark p-2">Добавить Проект</h3>
      <b-form @submit="upld">
        <b-row>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-1" label="Имя проекта:" label-for="input-1" description="Это будет отображено на странице проектов">
              <b-form-input id="input-1" v-model="$store.state.projects.form.name" required type="text" required placeholder="Ввидите имя проекта">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-2" label="Ссылка на сайт проекта:" label-for="input-1" description="Это создаст ссылку на сайт (Если конечно он есть)">
              <b-form-input id="input-1" v-model="$store.state.projects.form.link" required type="url" placeholder="http://ssilka.com">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group id="input-group-3" label="Описание проекта:" label-for="input-2">
              <b-form-textarea id="input-2" required v-model="$store.state.projects.form.description" required
                placeholder="Описание проекта"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-3" label="Лого\Картинка для проекта:" label-for="input-3">
              <b-form-file v-model="$store.state.projects.form.file" :state="Boolean($store.state.projects.form.file)" placeholder="Выберете картинку..."
                drop-placeholder="Drop file here..."></b-form-file>
              <div class="mt-3">Выбранная картинка: {{ $store.state.projects.form.file ? $store.state.projects.form.file.name : '' }}</div>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <Html />
            <div class="bg-light p-3 border border-top-0 border-dark" v-html="$store.state.projects.form.inner"></div>
          </b-col>
        </b-row>
        <div class="text-right p-3">
          <b-button type="submit" variant="success">Добавить</b-button>
        </div>
      </b-form>
    </b-container>
    <hr>
    <!--Отрисовка Проектов-->
    <b-container>
      <b-row>
        <b-col class="bg-white mb-2 border" cols="12" v-for="proj in $store.state.projects._Project" :key="proj.key">
          <b-row class="p-2 border-bottom mb-2">
            <b-col cols="6" class="text-left text-uppercase">
              {{proj.name}}
            </b-col>
            <b-col cols="6" v-if="proj.link" class=" text-right text-uppercase text-decoration-none">
              <b-link :href="proj.link">
                Сайт проекта
              </b-link>
            </b-col>
          </b-row>
          <b-row class="border-bottom pb-2">
            <b-col lg="3">
              <b-img :src="$store.state._ServerHttp + proj.file" fluid class="imjProj"> 
              </b-img>
            </b-col>
            <b-col lg="8">
              {{proj.description}}
            </b-col>
          </b-row>
          <b-row class="p-2">
            <b-col class="text-right">
              <b-button-group>
                <b-button variant="success" v-b-modal.change-html @click="$store.commit('projects/updateChangeProject', proj)">HTML</b-button>
                <b-button variant="warning" v-b-modal.change-1 @click="$store.commit('projects/updateChangeProject', proj)">Изменить</b-button>
                <b-button variant="danger" @click="del(proj._id, proj.file)">Удалить</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!--Отрисовка Проектов-->
    <!--Всплывающае окно изменения HTML-->
    <ChangeHtml />
    <!--Всплывающае окно изменения HTML-->
    <!--Всплывающае окно изменения проекта-->
    <ChangeProject />
    <!--Всплывающае окно изменения проекта-->
  </div>
</template>

<script>
  import ChangeHtml from '~/components/crm/content/projects/changeHtml'
  import ChangeProject from '~/components/crm/content/projects/changeProject'
  import Html from '~/components/crm/content/projects/html'

  export default {
    layout: 'cp',
    components: {
      ChangeHtml,
      ChangeProject,
      Html
    },
    methods: {
      async upld(evt) {
        evt.preventDefault()
        
        const fd = new FormData()
        fd.append('image', this.$store.state.projects.form.file, this.$store.state.projects.form.file.name)
        fd.append('name', this.$store.state.projects.form.name)
        fd.append('description', this.$store.state.projects.form.description)
        fd.append('inner', this.$store.state.projects.form.inner)
        fd.append('link', this.$store.state.projects.form.link)

        await this.$axios
            .post(this.$store.state._ServerHttp + 'api/addproject', fd)
            .then(res => {
              this.$store.commit('projects/push', res.data.resultat)
              this.$notify({
                group: 'foo',
                title: "Success",
                text: `${res.data.msg}`,
                type: 'success'
              })
              this.$store.state.projects.form = {
                name: '',
                link: '',
                description: '',
                inner: '',
                file: null
              }
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
      async del( id, file ) {
        await this.$axios
            .delete(`${this.$store.state._ServerHttp}api/deleteproject/${id}`, { data: { file } })
            .then(res => {
              this.$store.commit('projects/delete', id)
              this.$store.commit('specializations/clear', id)
              this.$store.commit('works/clear', id)
              this.$notify({
                group: 'foo',
                title: "Success",
                text: `${res.data.msg}`,
                type: 'success'
              })
            })
            .catch(err => {
              this.$notify({
                group: 'foo',
                title: `ERROR ${err.response.status}`,
                text: err.response.data.msg,
                type: 'error'
              })
            })
      }
    }
  }
</script>
