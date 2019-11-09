<template>
    <b-container class="bg-white pt-4">
        <h3 class="p-2 border-bottom border-dark">Добавить Специализацию</h3>
      <!--Название-->
      <b-form @submit="upld">
        <b-form-group id="input-group-1" label="Название специализации:" label-for="input-1">
          <b-form-input id="input-1" required v-model="$store.state.specializations.form.name" type="text" required
            placeholder="Ввидите название специализации">
          </b-form-input>
        </b-form-group>
      <!--Название-->
      <!--Описание-->
        <b-form-group id="input-group-2" label="Текст на главной странице:" label-for="input-2">
          <b-form-input id="input-2" v-model="$store.state.specializations.form.description" required
            placeholder="Введите текст который будет отображатся на стартовой странице."></b-form-input>
        </b-form-group>
      <!--Описание-->
      <!--Картинка-->
        <b-form-group id="input-group-3" label="Картинка на главной странице:" label-for="input-3">
          <b-form-file v-model="$store.state.specializations.form.file" required :state="Boolean($store.state.specializations.form.file)" placeholder="Выберете картинку..."
            drop-placeholder="Drop file here..."></b-form-file>
          <div class="mt-3">Выбранная картинка: {{ $store.state.specializations.form.file ? $store.state.specializations.form.file.name : '' }}</div>
        </b-form-group>
      <!--Картинка-->
        <!--Технологии и проекты-->
        <b-tabs content-class="mt-3 pb-3">

          <b-tab title="Технологии">
            <b-form-group id="input-group-4">
              <b-form-checkbox-group v-model="$store.state.specializations.form.technology" id="checkboxes-4" :state="state">
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
                        <b-form-checkbox-group v-model="$store.state.specializations.form.projects">
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
        <!--HTML для страницы-->
        <no-ssr placeholder="Codemirror Loading...">
            <codemirror v-model="$store.state.specializations.form.inner" :options="cmOption"></codemirror>
        </no-ssr>
        <div class="bg-light p-3 border border-top-0 border-dark" v-html="$store.state.specializations.form.inner"></div>
        <!--HTML для страницы-->
        <div class="text-right p-2">
          <b-button type="submit" variant="success">Добавить</b-button>
        </div>
      </b-form>
    </b-container>
</template>
<script>
export default {
    data() {
        return {
            cmOption: {
                tabSize: 4,
                foldGutter: true,
                styleActiveLine: true,
                lineNumbers: true,
                line: true,
                keyMap: "sublime",
                mode: 'text/x-vue',
                theme: 'base16-dark',
                extraKeys: {
                    'F11'(cm) {
                        cm.setOption("fullScreen", !cm.getOption("fullScreen"))
                    },
                    'Esc'(cm) {
                        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false)
                    }
                }
            }
        }
    },
    methods: {
        upld(evt) {
            evt.preventDefault()

            const fd = new FormData()
            if (this.$store.state.specializations.form.file) {
                fd.append('image', this.$store.state.specializations.form.file, this.$store.state.specializations.form.file.name)
            }
            fd.append('name', this.$store.state.specializations.form.name)
            fd.append('description', this.$store.state.specializations.form.description)
            fd.append('technology', this.$store.state.specializations.form.technology)
            fd.append('projects', this.$store.state.specializations.form.projects)
            fd.append('inner', this.$store.state.specializations.form.inner)

            this.$axios
                .post(this.$store.state._ServerHttp + 'api/addspecialization', fd)
                .then(res => {
                    this.$store.commit('specializations/push', res.data.resultat)
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
                        title: `Error ${err.response.status}`,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                })
        }
    },
    computed: {
        state() {
            return this.$store.state.specializations.form.technology.length <= 3 && this.$store.state.specializations.form.technology.length > 0;
        }
    }
}
</script>
<style>
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