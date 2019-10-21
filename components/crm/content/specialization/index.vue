<template>
  <div class="content">
    <b-container>
      <h3>Добавить Специализацию</h3>
      <hr>
      <!--Название-->
      <b-form @submit="upld">
        <b-form-group id="input-group-1" label="Название специализации:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.name" type="text" required
            placeholder="Ввидите название специализации">
          </b-form-input>
        </b-form-group>
      <!--Название-->
      <!--Описание-->
        <b-form-group id="input-group-2" label="Текст на главной странице:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.description" required
            placeholder="Введите текст который будет отображатся на стартовой странице."></b-form-input>
        </b-form-group>
      <!--Описание-->
      <!--Картинка-->
        <b-form-group id="input-group-3" label="Картинка на главной странице:" label-for="input-3">
          <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Выберете картинку..."
            drop-placeholder="Drop file here..."></b-form-file>
          <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
        </b-form-group>
      <!--Картинка-->
        <!--Технологии и проекты-->
        <b-tabs content-class="mt-3">
          <b-tab title="Технологии">
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="form.technology" id="checkboxes-4" :state="state">
                <b-form-checkbox class="checkBox" v-for="tech in techData" :key="tech.key" :value="tech._id">
                  <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                </b-form-checkbox>
                <b-form-invalid-feedback :state="state">Выберете до трех техологий</b-form-invalid-feedback>
                <b-form-valid-feedback :state="state">Спасибо</b-form-valid-feedback>
              </b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab class="margin-left" title="Проекты">
            <b-form-group id="input-group-6">
              <b-form-checkbox-group v-model="form.projects" id="checkbox-6">
                <b-form-checkbox class="checkBoxProject bg-light col-12" v-for="proj in $store.state._Project"
                  :key="proj.key" :value="proj._id">
                  <b-row class="max-width">
                    <b-col sm="6" md="1" lg="1" xl="1">
                      <b-img class="imgCheckBox" :src="$store.state._ServerHttp + proj.file" fluid></b-img>
                    </b-col>
                    <b-col sm="6" md="11" lg="4" xl="4">
                      <span>{{proj.name}}</span>
                    </b-col>
                    <b-col sm="12" md="7" lg="5" xl="7" class="text-truncate">
                      <span >{{proj.description}}</span>
                    </b-col>
                  </b-row>
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-tab>
        </b-tabs>
        <!--Технологии и проекты-->
        <!--HTML для страницы-->
        <b-form-group id="input-group-5" label="HTML на странице:" label-for="input-5">
          <b-form-textarea id="textarea" v-model="form.inner" placeholder="Введите HTML для страници(в подробнее)"
            rows="6">
          </b-form-textarea>
        </b-form-group>
        <div class="innerHtmlBlock" v-html="form.inner"></div>
        <!--HTML для страницы-->
        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-container>
    <!--Нижний блок с контентом-->
    <b-container class="botContent">
      <b-row align-v="start">
        <b-col v-for="spec in specData" :key="spec.key" sm="12" lg="4">
          <b-row>
            <b-col>
              <b-card :title="spec.name" :img-src="$store.state._ServerHttp + spec.file" img-alt="spec.name" img-top
                tag="article" style="max-width: 20rem;" class="mb-2">
                <b-card-text>
                  {{spec.description}}
                </b-card-text>
                <b-row>
                  <b-col cols="4" v-for="specTech in spec.technology" :key="specTech.key">
                    <div v-for="tech in techData" :key="tech.key">
                      <div v-if="tech._id === specTech">
                        <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                      </div>
                    </div>
                  </b-col>
                </b-row>
                <hr>
                <b-row>
                  <b-col>
                    <b-button-group class="margCentr">
                      <b-button variant="success" v-b-modal.modal-1
                        @click="setHtmlbody(spec.inner, spec._id, spec.name)"> HTML </b-button>
                      <b-button variant="warning" v-b-modal.modal-2 @click="changeSpec(spec)">Изменить</b-button>
                      <b-button variant="danger" @click="delSpec(spec._id)">Удалить</b-button>
                    </b-button-group>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!--Нижний блок с контентом ↑↑↑↑↑↑-->
    <!-- Всплывающае окно изменения HTML  ↓↓↓↓↓-->
    <b-modal id="modal-1" :title="html.name" size="xl">
      <div v-if="changeHTMLIneer === true">
        <b-form-textarea v-model="html.inner" id="textarea-plaintext" placeholder="Введи хоть что-то для потомков!"
          autofocus>
        </b-form-textarea>
      </div>
      <div v-html="html.inner"></div>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <div v-if="changeHTMLIneer === false">
          <b-button variant="warning" @click="changeHTMLIneer = !changeHTMLIneer">Изменить</b-button>
        </div>
        <div v-else-if="changeHTMLIneer === true">
          <b-button variant="success" @click="setChangeInner">Сохранить</b-button>
        </div>
        <b-button @click="cancel(); changeHTMLIneer ? changeHTMLIneer = !changeHTMLIneer : changeHTMLIneer = changeHTMLIneer;">Закрыть</b-button>
      </template>
    </b-modal>
    <!-- Всплывающае окно изменения HTML-->
    <!-- Всплывающае окно изменения специализации-->
    <b-modal id="modal-2" :title="'Изменить: ' + specForChange.oldName" size="xl">
      <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
        label="Введите название:" label-for="input-name">
        <b-input v-model="specForChange.name" id="input-name"></b-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
        label="Введите описание:" label-for="textarea-description">
        <b-form-textarea placeholder="Введи хоть что-то для потомков!" v-model="specForChange.description"
          id="textarea-description"></b-form-textarea>
      </b-form-group>
      <hr>
      <b-row>
        <b-col sm="12" lg="4" class="imgInChangeBlock">
          <p>Картинка специализации:</p>
          <b-img :src="$store.state._ServerHttp + specForChange.file" fluid></b-img>
        </b-col>
        <b-col sm="12" lg="8">
          <p>Изменить картинку:</p>
          <b-form-group label="Картинка на главной странице:" label-for="inpImg">
            <b-form-file id="inpUmg" v-model="specForChange.newFile" :state="Boolean(specForChange.newFile)"
              placeholder="Выберете картинку..." drop-placeholder="Drop file here..."></b-form-file>
            <div class="mt-3">Выбранная картинка: {{ specForChange.newFile ? specForChange.newFile.name : '' }}</div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <!--Технологии и проекты-->
        <b-tabs content-class="mt-3">
          <b-tab title="Технологии">
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="specForChange.technology" id="checkboxes-4" :state="state2">
                <b-form-checkbox class="checkBox" v-for="tech in techData" :key="tech.key" :value="tech._id">
                  <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                </b-form-checkbox>
                <b-form-invalid-feedback :state="state2">Выберете до трех техологий</b-form-invalid-feedback>
                <b-form-valid-feedback :state="state2">Спасибо</b-form-valid-feedback>
              </b-form-checkbox-group>
            </b-form-group>
          </b-tab>
          <b-tab class="margin-left" title="Проекты">
            <b-form-group id="input-group-6">
              <b-form-checkbox-group v-model="specForChange.projects" id="checkbox-6">
                <b-form-checkbox class="checkBoxProject bg-light col-12" v-for="proj in $store.state._Project"
                  :key="proj.key" :value="proj._id">
                  <b-row class="max-width">
                    <b-col sm="6" md="1" lg="1" xl="1">
                      <b-img class="imgCheckBox" :src="$store.state._ServerHttp + proj.file" fluid></b-img>
                    </b-col>
                    <b-col sm="6" md="11" lg="4" xl="4">
                      <span>{{proj.name}}</span>
                    </b-col>
                    <b-col sm="12" md="7" lg="5" xl="7" class="text-truncate">
                      <span >{{proj.description}}</span>
                    </b-col>
                  </b-row>
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-tab>
        </b-tabs>
        <!--Технологии и проекты-->
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button disabled variant="danger">Отменить</b-button>
        <b-button variant="success" @click="setSpec(); cancel();">Сохранить</b-button>
        <b-button id="btnClose" @click="cancel();">Закрыть</b-button>
        <b-tooltip target="btnClose" variant="danger">
          Осторожно! Все несохраненые данные будут утеряны!
        </b-tooltip>
      </template>
    </b-modal>
    <!-- Всплывающае окно изменения специализации-->
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
        fiel: null,
        technology: [],
        projects: [],
        inner: ''
      },
      techData: this.$store.state._Technology,
      specData: this.$store.state._Specialization,
      changeHTMLIneer: false,
      html: {
        id: '',
        name: '',
        inner: ''
      },
      specForChange: {
        id: '',
        name: '',
        oldName: '',
        description: '',
        file: '',
        newFile: null,
        technology: [],
        projects: []
      }
    }
  },
  created($store) {},
  methods: {
    upld(evt) {
      evt.preventDefault()

      this.specData= this.$store.state._Specialization;

      const fd = new FormData();
      fd.append('image', this.form.file, this.form.file.name);
      fd.append('name', this.form.name);
      fd.append('description', this.form.description);
      fd.append('technology', this.form.technology);
      fd.append('projects', this.form.projects);
      fd.append('inner', this.form.inner);


      axios
        .post(this.$store.state._ServerHttp + 'api/addspecialization', fd)
        .then(res => {
          this.$store.commit('pushToSpecialization', res.data)
          this.$notify({
            group: 'foo',
            title: 'Success',
            text: `Специализация успешно добавлена`,
            type: 'success'
          })
        })
        .catch(err => {
          this.$notify({
            group: 'foo',
            title: `Error ${err.status}`,
            text: `${err.response.data}`,
            type: 'error'
          })
        })
    },
    delSpec(id) {
      this.$store.commit('deletSpecialization', id);
      this.specData = this.specData.filter(u => u._id !== id);
    },
    setHtmlbody(html, id, name) {
      this.html.inner = html;
      this.html.id = id;
      this.html.name = name;
    },
    setChangeInner() {
      this.changeHTMLIneer = !this.changeHTMLIneer;

      let bodyJson = {
        id: this.html.id,
        inner: this.html.inner
      }
      axios.put(this.$store.state._ServerHttp + 'specInner/' + this.html.id, bodyJson).then(res => {
        this.$store.commit('changePutInner', bodyJson);
      })
    },
    changeSpec(spec) {
      this.specForChange.id = spec._id;
      this.specForChange.name = spec.name;
      this.specForChange.oldName = spec.name;
      this.specForChange.description = spec.description;
      this.specForChange.file = spec.file;
      this.specForChange.technology = spec.technology;
      this.specForChange.projects = spec.projects;
    },
    setSpec() {
      const fd = new FormData();

      if (this.specForChange.newFile) {
        fd.append('image', this.specForChange.newFile, this.specForChange.newFile.name);
      }
      fd.append('name', this.specForChange.name);
      fd.append('description', this.specForChange.description);
      fd.append('technology', this.specForChange.technology);
      fd.append('projects', this.specForChange.projects);
      fd.append('inner', this.specForChange.inner);

      axios.put(this.$store.state._ServerHttp + 'specialization/' + this.specForChange.id, fd).then(res => {
        this.$store.commit('changeSpecialization', res.data)
      });
    }
  },
  computed: {
    state() {
      return this.form.technology.length <= 3 && this.form.technology.length > 0;
    },
    state2() {
      return this.specForChange.technology.length <= 3 && this.specForChange.technology.length > 0;
    }
  }
}
</script>

<style scoped>
.checkBox {
  padding: 5px;
  width: auto;
  height: 50px;
  margin-left: 15px;
  margin-bottom: 5px;
  padding-left: 30px;
  background-color: rgba(153, 153, 153, 0.089);
  border: solid 3px rgba(153, 153, 153, 0.384);
  border-radius: 5px;
}

.checkBox img {
  max-width: 55px;
  max-height: 35px;
}


.innerHTML {
	height: 50px;
}

.margCentr {
  margin: 0 12px;
}

.content {
	padding: 50px 0;
}

.botContent {
	margin-top: 50px;
}

.innerHtmlBlock {
	padding: 15px;
	background-color: rgb(236, 236, 236);
	border-radius: 12px;
	margin-bottom: 15px;
}

.imgInChangeBlock img {
  box-shadow: 0px 0px 15px black;
  border-radius: 10px;
}

.checkBoxProject {
  padding: 5px;
  border-bottom: solid 1px rgba(153, 153, 153, 0.342);
}
.imgCheckBox{
  height: 25px;
  padding: 0 10px;
  border-right: solid 1px rgba(0, 0, 0, 0.171) ; 
}
.margin-left {
  margin-left: 25px;
}

.max-width {
  max-width: 1075px;
}
</style>
