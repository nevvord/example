<template>
  <div class="content">
    <b-container>
      <b-form @submit="upld">
        <b-form-group id="input-group-1" label="Название специализации:" label-for="input-1" description="">
          <b-form-input id="input-1" v-model="form.name" type="text" required placeholder="Ввидите название специализации">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Текст на главной странице:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.description" required
            placeholder="Введите текст который будет отображатся на стартовой странице."></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Картинка на главной странице:" label-for="input-3">
          <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Выберете картинку..."
            drop-placeholder="Drop file here..."></b-form-file>
          <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
        </b-form-group>

        <b-form-group id="input-group-4" label="Технологии:">
            <b-form-checkbox-group v-model="form.technology" id="checkboxes-4" :state="state"> 
                <b-form-checkbox v-for="tech in techData" :key="tech.key" :value="tech._id">
                    <b-img :src="'http://localhost:3012/' + tech.file" fluid></b-img>
                </b-form-checkbox>
                <b-form-invalid-feedback :state="state">Выберете до трех техологий</b-form-invalid-feedback>
                <b-form-valid-feedback :state="state">Спасибо</b-form-valid-feedback>
            </b-form-checkbox-group>
        </b-form-group>

        <b-form-group id="input-group-5" label="HTML на странице:" label-for="input-5">
          <b-form-textarea id="textarea" v-model="form.inner" placeholder="Введите HTML для страници(в подробнее)" rows="6">
          </b-form-textarea>
        </b-form-group>

        <div class="innerHtmlBlock" v-html="form.inner"></div>

        <b-button type="submit" variant="primary">Добавить</b-button>

        {{form}}

      </b-form>
    </b-container>
    <b-container class="botContent">
        <b-row>
            <b-col v-for="spec in specData" :key="spec.key" cols="4">
                <b-row>
                    <b-col>
                        <b-card :title="spec.name" :img-src="'http://localhost:3012/' + spec.file" img-alt="spec.name" img-top
                            tag="article" style="max-width: 20rem;" class="mb-2">
                        <b-card-text>
                            {{spec.description}}
                        </b-card-text>

                        {{techData}}
                        <hr>
                        {{specData[0].technology}}

                        <div v-for="tech in techData" :key="tech.key">
                            <div v-for="specTech in specData.technology" :key="specTech.key">
                                {{specTech}}
                                <div v-if="tech._id === specTech">
                                    kek
                                </div>
                            </div>
                        </div>


                        <b-button-group>
                            <b-button variant="success"> HTML </b-button>
                            <b-button variant="warning">Изменить</b-button>
                            <b-button variant="danger">Удалить</b-button>
                        </b-button-group>   
                        </b-card>

                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
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
          inner: ''
        },
        techData: this.$store.state._Technology,
        specData: this.$store.state._Specialization

      }
    },
    methods: {
      upld(evt) {
        evt.preventDefault()

        const fd = new FormData();
        fd.append('image', this.form.file, this.form.file.name);
        fd.append('name', this.form.name);
        fd.append('description', this.form.description);
        fd.append('technology', this.form.technology);
        fd.append('inner', this.form.inner);
        console.log(fd);

        axios.post('http://localhost:3012/specialization', fd).then(
          res => {
            this.$store.commit('pushToSpecialization', res.data)
          });
      }
    },
    computed: {
        state() {
          return this.form.technology.length <= 3 && this.form.technology.length > 0;
        }
    }
  }
</script>

<style scoped>
.innerHTML {
    height: 50px;
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
</style>
