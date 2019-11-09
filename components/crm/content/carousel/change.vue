<template>
    <b-modal id="changeCarousel" :title="'Изменить: ' + $store.state.carousel.change.oldName" size="xl">
        <b-form>
            <b-form-group label="Имя элемента:" description="Єто будет отабраженно на главной странице в навбаре">
                <b-form-input requireq placeholder="Имя страницы" v-model="$store.state.carousel.change.name"></b-form-input>
            </b-form-group>
            <b-row>
                <b-col class="my-4 px-5">
                    <b-img :src="$store.state._ServerHttp + $store.state.carousel.change.oldFile" fluid></b-img>
                </b-col>
                <b-col>
                    <b-form-group class="px-2">
                        <h5 class="py-2">Картика</h5>
                        <b-form-file 
                        v-model="$store.state.carousel.change.file" 
                        :state="Boolean($store.state.carousel.change.file)" 
                        required 
                        placeholder="Выберете картинку..."
                        drop-placeholder="Drop file here..."
                        ></b-form-file>
                        <div class="mt-3">Выбранная картинка: {{ $store.state.carousel.change.file ? $store.state.carousel.change.file.name : '' }}</div>
                    </b-form-group>
                </b-col>
            </b-row>
            <section class="container">
                <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="$store.state.carousel.change.inner" :options="cmOption"></codemirror>
                </no-ssr>
            </section>
        </b-form>
        <hr>
        <div v-html="$store.state.carousel.change.inner"></div>
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <b-button variant="success" :disabled="disabled" @click="putChange()">Сохранить</b-button>
            <b-button id="btnClose" @click="cancel();">Закрыть</b-button>
            <b-tooltip target="btnClose" variant="danger">
                Осторожно! Все несохраненые данные будут утеряны!
            </b-tooltip>
        </template>

    </b-modal>
</template>
<script>
export default {
    data() {
      return {
        disabled: false,
        cmOption: {
          tabSize: 4,
          foldGutter: true,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          keyMap: "sublime",
          mode: 'text/x-vue',
          theme: 'base16-dark'
        }
      }
    },
    methods:{
        async putChange(){
            this.disabled = true

            const fd = new FormData()
            fd.append('name', this.$store.state.carousel.change.name)
            fd.append('inner', this.$store.state.carousel.change.inner)
            if(this.$store.state.carousel.change.file !== null){
                fd.append('image', this.$store.state.carousel.change.file, this.$store.state.carousel.change.file.name)
                fd.append('oldFile', this.$store.state.carousel.change.oldFile)
            }

            await this.$axios
                .put(`${this.$store.state._ServerHttp}api/putcarousel/${this.$store.state.carousel.change._id}`, fd)
                .then(res => {
                    this.$store.commit('carousel/change', res.data.newFile)
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
                        title: `ERROR ${err.response.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                    this.disabled = false
                })
        }
    }
}
</script>