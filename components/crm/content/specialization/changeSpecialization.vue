<template>
    <b-modal id="modal-2" :title="'Изменить: ' + $store.state.specializations.change.oldName" size="xl">
      <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
        label="Введите название:" label-for="input-name">
        <b-input v-model="$store.state.specializations.change.name" id="input-name"></b-input>
      </b-form-group>
      <b-form-group label-cols-sm="4" label-cols-lg="2" description="Это поле отобразится на главной странице"
        label="Введите описание:" label-for="textarea-description">
        <b-form-textarea placeholder="Введи хоть что-то для потомков!" v-model="$store.state.specializations.change.description"
          id="textarea-description"></b-form-textarea>
      </b-form-group>
      <hr>
      <b-row>
        <b-col sm="12" lg="4" class="imgInChangeBlock">
          <p>Картинка специализации:</p>
          <b-img :src="$store.state._ServerHttp + $store.state.specializations.change.file" fluid></b-img>
        </b-col>
        <b-col sm="12" lg="8">
          <p>Изменить картинку:</p>
          <b-form-group label="Картинка на главной странице:" label-for="inpImg">
            <b-form-file id="inpUmg" v-model="$store.state.specializations.change.newFile" :state="Boolean($store.state.specializations.change.newFile)"
              placeholder="Выберете картинку..." drop-placeholder="Drop file here..."></b-form-file>
            <div class="mt-3">Выбранная картинка: {{ $store.state.specializations.change.newFile ? $store.state.specializations.change.newFile.name : '' }}</div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <!--Технологии и проекты-->
        <b-tabs content-class="mt-3">

          <b-tab title="Технологии">
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="$store.state.specializations.change.technology" id="checkboxes-4" :state="state">
                <b-form-checkbox class="checkBox" v-for="tech in $store.state.technologies._Technology" :key="tech.key" :value="tech._id">
                  <b-img :src="$store.state._ServerHttp + tech.file" fluid></b-img>
                </b-form-checkbox>
                <b-form-invalid-feedback :state="state">Выберете до трех техологий</b-form-invalid-feedback>
                <b-form-valid-feedback :state="state">Спасибо</b-form-valid-feedback>
              </b-form-checkbox-group>
            </b-form-group>
          </b-tab>

          <b-tab title="Проекты">
              <b-row v-for="proj in $store.state.projects._Project" :key="proj.key" class="border-btm bg-light mr-0">
                  <b-col>
                    <b-form-group class="mr-0">
                        <b-form-checkbox-group v-model="$store.state.specializations.change.projects">
                            <b-form-checkbox :value="proj._id">
                                <b-row>
                                    <b-col cols="6" md="1">
                                        <b-img  :src="$store.state._ServerHttp + proj.file" fluid></b-img>
                                    </b-col>
                                    <b-col cols="6" md="5">
                                        {{proj.name}}
                                    </b-col>
                                    <b-col cols="12" md="6">
                                        {{proj.description}}
                                    </b-col>
                                </b-row>
                            </b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                      
                  </b-col>
              </b-row>
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

      if (this.$store.state.specializations.change.newFile) {
        fd.append('image', this.$store.state.specializations.change.newFile, this.$store.state.specializations.change.newFile.name)
      }
      fd.append('name', this.$store.state.specializations.change.name)
      fd.append('description', this.$store.state.specializations.change.description)
      fd.append('technology', this.$store.state.specializations.change.technology)
      fd.append('projects', this.$store.state.specializations.change.projects)
      fd.append('file', this.$store.state.specializations.change.file)
      
      await this.$axios
        .put(this.$store.state._ServerHttp + 'api/putspecialization/' + this.$store.state.specializations.change._id, fd)
        .then(res => {
          this.$store.commit('specializations/change', res.data.newFile)
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
  computed:{
      state() {
          return this.$store.state.specializations.change.technology.length <= 3 && this.$store.state.specializations.change.technology.length > 0;
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

.table-project-specialization{
    margin-left: 15px;
    width: auto;
    height: 28px;
}

.img-technology {
    height: 20px;
    width: 2rem;
    padding: 0px;
}

.width-100 {
    width: 100%;
}

.mr-0 {
    margin: 0;
}

.border-btm {
    border-bottom: solid 1px rgb(197, 197, 197);
}
</style>