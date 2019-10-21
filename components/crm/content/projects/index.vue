<template>
  <div class="content">
    <b-container>
      <h3>Добавить Проект</h3>
      <hr>
      <b-form @submit="upld">
        <b-row>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-1" label="Имя проекта:" label-for="input-1" description="Это будет отображено на странице проектов">
              <b-form-input id="input-1" v-model="form.name" type="text" required placeholder="Ввидите имя проекта">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-2" label="Ссылка на сайт проекта:" label-for="input-1" description="Это создаст ссылку на сайт (Если конечно он есть)">
              <b-form-input id="input-1" v-model="form.link" type="url" placeholder="http://ssilka.com">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group id="input-group-3" label="Описание проекта:" label-for="input-2">
              <b-form-textarea id="input-2" v-model="form.description" required
                placeholder="Описание проекта"></b-form-textarea>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-3" label="Лого\Картинка для проекта:" label-for="input-3">
              <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Выберете картинку..."
                drop-placeholder="Drop file here..."></b-form-file>
              <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group id="input-group-5" label="HTML на странице:" label-for="input-5">
              <b-form-textarea id="textarea" v-model="form.inner" placeholder="Введите HTML для страници(в подробнее)"
                rows="6">
              </b-form-textarea>
            </b-form-group>
            <div class="innerHtmlBlock" v-html="form.inner"></div>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-container>
    <hr>
    <!--Отрисовка Проектов-->
    <b-container class="projects">
      <b-row>
        <b-col sm="12" v-for="proj in $store.state.projects._Project" :key="proj.key" class="projectBlock">
          <b-row class="headProj">
            <b-col cols="6" class="text-left text-uppercase ">
              {{proj.name}}
            </b-col>
            <b-col cols="6" v-if="proj.link" class=" text-right text-uppercase text-decoration-none">
              <b-link :href="proj.link">
                Сайт проекта
              </b-link>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="3">
              <b-img :src="$store.state._ServerHttp + proj.file" fluid class="imjProj"> 
              </b-img>
            </b-col>
            <b-col lg="8">
              {{proj.description}}
            </b-col>
          </b-row>
          <hr>
          <b-row>
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
  import axios from 'axios'
  import ChangeHtml from './changeHtml'
  import ChangeProject from './changeProject'

  export default {
    components: {
      ChangeHtml,
      ChangeProject
    },
    data() {
      return {
        form: {
          name: '',
          link: '',
          description: '',
          inner: '',
          file: null
        }
      }
    },
    methods: {
      async upld(evt) {
        evt.preventDefault()
        
        const fd = new FormData()
        fd.append('image', this.form.file, this.form.file.name)
        fd.append('name', this.form.name)
        fd.append('description', this.form.description)
        fd.append('inner', this.form.inner)
        fd.append('link', this.form.link)

        await axios
            .post(this.$store.state._ServerHttp + 'api/addproject', fd)
            .then(res => {
              this.$store.commit('projects/push', res.data.resultat)
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
                title: `ERROR ${err.status}`,
                text: err.response.data.msg,
                type: 'error'
              })
            })
      },
      async del( id, file ) {
        await axios
            .delete(this.$store.state._ServerHttp + 'api/deleteproject/' + id, { data: { file } })
            .then(res => {
              this.$store.commit('projects/delete', id)
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
                title: `ERROR ${err.status}`,
                text: err.response.data.msg,
                type: 'error'
              })
            })
      }
    }
  }
</script>

<style scoped>
.content {
  padding: 40px 0;
}

.projectBlock {
  padding: 10px;
  border: 2px solid rgba(0, 0, 0, 0.089);
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.007);
  margin-bottom: 10px;
}
.projects {
  padding-top: 20px;
}
.headProj {
  border-bottom: solid 1px rgba(0, 0, 0, 0.226);
  padding: 0 10px;
  margin: 0 0  15px 0;
}

.imjProj {
  border-radius: 5px;
}
</style>
