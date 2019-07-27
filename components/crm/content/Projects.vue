<template>
  <div>
        <b-container>
            <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                    id="input-group-1"
                    label="Имя проекта:"
                    label-for="input-1"
                    description=""
                >
                    <b-form-input
                    id="input-1"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Ввидите имя проекта"
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Описание проекта:" label-for="input-2">
                    <b-form-input
                    id="input-2"
                    v-model="form.inner"
                    required
                    placeholder="Введите текст который будет отображатся на стартовой странице."
                    ></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-3" label="Food:" label-for="input-3">
                    <b-form-file multiple :file-name-formatter="formatNames"></b-form-file>
                </b-form-group>

                <b-form-group id="input-group-4">
                    <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
                    <b-form-checkbox value="me">Check me out</b-form-checkbox>
                    <b-form-checkbox value="that">Check that out</b-form-checkbox>
                    </b-form-checkbox-group>
                </b-form-group>

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
          inner: '',
          food: null,
          checked: []
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