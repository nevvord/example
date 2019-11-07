<template>
    <b-modal id="changePage" :title="'Изменить: ' + $store.state.pages.change.oldName" size="xl">
        <b-form>
            <b-form-group label="Имя страницы:" description="Єто будет отабраженно на главной странице в навбаре">
                <b-form-input requireq placeholder="Имя страницы" v-model="$store.state.pages.change.name"></b-form-input>
            </b-form-group>
            <b-form-checkbox v-model="$store.state.pages.change.display" name="check-button" switch class="switch">
                Отображать страницу в Навбаре?
            </b-form-checkbox>
            <br>
            <section class="container">
                <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="$store.state.pages.change.inner" :options="cmOption"></codemirror>
                </no-ssr>
            </section>
        </b-form>
        <hr>
        <div v-html="$store.state.pages.change.inner"></div>
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
import axios from 'axios'
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
            await axios
                .put(this.$store.state._ServerHttp + 'api/putpage/' + this.$store.state.pages.change._id, this.$store.state.pages.change)
                .then(res => {
                    console.log(res.data);
                    
                    this.$store.commit('pages/change')
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                    this.disabled = false
                })
                .catch(err => {
                    console.log(err.response);
                    
                    this.$notify({
                        group: 'foo',
                        title: `ERROR ${err.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                    this.disabled = false
                })
        }
    }
}
</script>