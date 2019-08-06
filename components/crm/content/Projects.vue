<template>
  <div class="content">
    <b-container>
      <b-form @submit="onSubmit" @reset="onReset">
        <b-row>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-1" label="Имя проекта:" label-for="input-1" description="Это будет отображено на странице проектов">
              <b-form-input id="input-1" v-model="form.name" type="text" required placeholder="Ввидите имя проекта">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12" lg="6">
            <b-form-group id="input-group-2" label="Ссылка на сайт проекта:" label-for="input-1" description="Это создаст ссылку на сайт (Если конечно он есть)">
              <b-form-input id="input-1" v-model="form.link" type="text" required placeholder="http://ssilka.com">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="12">
            <b-form-group id="input-group-3" label="Описание проекта:" label-for="input-2">
              <b-form-textarea id="input-2" v-model="form.inner" required
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
        </b-row>



        

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card>
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          link: '',
          inner: '',
          file: null
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
        formatNames(files) {
        if (files.length === 1) {
          return files[0].name
        } else {
          return `${files.length} files selected`
        }
      }
    }
  }
</script>

<style scoped>
.content {
  padding-top: 40px;
}
</style>
