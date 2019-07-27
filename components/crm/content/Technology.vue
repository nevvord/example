<template>
  <div>
        <b-container>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-1"
                    label="Название технологии:"
                    label-for="input-1"
                    description=""
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Введите название технологии"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Ссылка на технологию:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.link"
                    required
                    placeholder="http://ssilka.com"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Лого технологии:" label-for="input-3">
                     <b-form-file
                        v-model="form.file"
                        :state="Boolean(form.file)"
                        placeholder="Выберете картинку..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
                </b-form-group>

                <b-button type="submit" variant="primary">Добавить</b-button>
            </b-form>
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
        console.log(this.form.file.name);
        
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.name = ''
        this.form.link = ''
        this.form.file = null
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>