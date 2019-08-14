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
    <b-container class="projects">
      <b-row>
        <b-col sm="12" v-for="proj in projData" :key="proj.key" class="projectBlock">
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
                <b-button variant="success" v-b-modal.change-html @click="changeInner(proj.inner, proj._id, proj.name)">HTML</b-button>
                <b-button variant="warning" v-b-modal.change-1 @click="changeProj(proj)">Изменить</b-button>
                <b-button variant="danger" @click="del(proj._id)">Удалить</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!--Всплывающае окно изменения HTML-->
    <b-modal id="change-html" :title="html.name" size="xl">
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
        <b-button @click="cancel(); changeHTMLIneer ? changeHTMLIneer = !changeHTMLIneer : changeHTMLIneer = changeHTMLIneer; ">Закрыть</b-button>
      </template>
    </b-modal>
    <!--Всплывающае окно изменения HTML-->
    <!--Всплывающае окно изменения проекта-->
    <b-modal id="change-1" :title="'Изменить: ' + change.oldName " size="xl">
      <b-form-group label="Имя проекта" description="Єто поле обязательно" label-for="inputName">
        <b-form-input id="inputName" v-model="change.name" required placeholder="Имя проекта"></b-form-input>
      </b-form-group>
      <b-form-group label="Ссылка на сайт проекта" description="Поле не обязательно. Ссылка не будет отображена если ее не ввести" label-for="inputLink">
        <b-form-input id="inputLink" v-model="change.link" type="url" placeholder="http://ssilka.com"></b-form-input>
      </b-form-group>
      <b-form-group label="Описание проекта" description="Обязательное поле" label-for="inputDesc">
        <b-form-textarea id="inputDesc" v-model="change.description" required placeholder="Описание проекта"></b-form-textarea>
      </b-form-group>
      <b-row>
        <b-col sm="12" lg="3">
          <b-img :src="$store.state._ServerHttp + change.file" fluid></b-img>
        </b-col>
        <b-col sm="12" lg="9">
          <b-form-group label="Картинка для проекта:" label-for="inputFile">
            <b-form-file id="inputFile" v-model="change.newFile" :state="Boolean(change.newFile)" placeholder="Выберете картинку..."
              drop-placeholder="Drop file here..."></b-form-file>
            <div class="mt-3">Выбранная картинка: {{ change.newFile ? change.newFile.name : '' }}</div>
        </b-form-group>
        </b-col>
      </b-row>
      <template slot="modal-footer" slot-scope="{ ok, cancel }">
        <b-button variant="success" @click="setProj(); cancel();">Сохранить</b-button>
        <b-button id="btnClose" @click="cancel();">Закрыть</b-button>
        <b-tooltip target="btnClose" variant="danger">
          Осторожно! Все несохраненые данные будут утеряны!
        </b-tooltip>
      </template>
    </b-modal>
    <!--Всплывающае окно изменения проекта-->
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        form: {
          name: '',
          link: '',
          description: '',
          inner: '',
          file: null
        },
        projData: this.$store.state._Project,
        changeHTMLIneer : false,
        change: {
          id: '',
          name: '',
          oldName: '',
          link: '',
          description: '',
          file: null,
          newFile: null
        },
        html: {
          id: '',
          name: '', 
          inner: ''
        }
      }
    },
    methods: {
      upld(evt) {
        evt.preventDefault()

        this.projData = this.$store.state._Project;
        
        const fd = new FormData();
        fd.append('image', this.form.file, this.form.file.name);
        fd.append('name', this.form.name);
        fd.append('description', this.form.description);
        fd.append('inner', this.form.inner);
        fd.append('link', this.form.link);

        axios.post(this.$store.state._ServerHttp + 'project', fd).then(
				res => {
          this.$store.commit('pushToProject', res.data)
				});
      },
      changeProj(data){
        this.change.id = data._id;
        this.change.name = data.name;
        this.change.oldName = data.name;
        this.change.link = data.link;
        this.change.description = data.description;
        this.change.file = data.file;
        this.change.newFile = null;
      },
      changeInner(inner, id, name){
        this.html.id = id;
        this.html.name = name;
        this.html.inner = inner;
      },
      setChangeInner() {
        this.changeHTMLIneer = !this.changeHTMLIneer;

        let bodyJson = {
          id: this.html.id,
          inner: this.html.inner
        }
        axios.put(this.$store.state._ServerHttp + 'projInner/' + this.html.id, bodyJson).then(res => {
          this.$store.commit('changePutInnerProject', bodyJson);
        })
      },
      del(id){
        this.$store.commit('deletProject', id);
        this.$store.commit('clearWithProject', id);
        this.projData = this.projData.filter(u => u._id !== id);
      },
      setProj(){
        const fd = new FormData();
        if(this.change.newFile){
          fd.append('image', this.change.newFile, this.change.newFile.name);
        }
        fd.append('name', this.change.name);
        fd.append('link', this.change.link);
        fd.append('description', this.change.description);

        axios.put(this.$store.state._ServerHttp + 'project/' + this.change.id, fd).then(res => {
          this.$store.commit('changeProject', res.data);
        });
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
