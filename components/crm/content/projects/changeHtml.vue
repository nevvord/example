<template>
    <b-modal id="change-html" :title="$store.state.projects.changeProject.name" size="xl">
        <div v-if="changeHTMLIneer === true">
            <section class="container">
                <no-ssr placeholder="Codemirror Loading...">
                <codemirror v-model="$store.state.projects.changeProject.inner" :options="cmOption"></codemirror>
                </no-ssr>
            </section>
        </div>
        <div v-html="$store.state.projects.changeProject.inner"></div>
        <!-- Настройки футера модала -->
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <div v-if="changeHTMLIneer === false">
                <b-button variant="warning" @click="changeHTMLIneer = !changeHTMLIneer">Изменить</b-button>
            </div>
            <div v-else-if="changeHTMLIneer === true">
                <b-button variant="success" @click="changeInnerProject">Сохранить</b-button>
            </div>
            <b-button
                @click="cancel(); changeHTMLIneer ? changeHTMLIneer = !changeHTMLIneer : changeHTMLIneer = changeHTMLIneer; ">
                Закрыть</b-button>
        </template>
        <!-- Настройки футера модала -->
    </b-modal>
</template>
<script>
import Axios from 'axios'
export default {
    data(){
        return {
            changeHTMLIneer : false,
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
        changeInnerProject(){
            const body = {
                _id: this.$store.state.projects.changeProject._id,
                inner: this.$store.state.projects.changeProject.inner
            }
            Axios
                .put(this.$store.state._ServerHttp + 'api/putprojectinner', body)
                .then((result) => {
                    this.changeHTMLIneer = false
                    this.$store.commit('projects/updateProjectInner', body)
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: result.data.msg,
                        type: 'success'
                    })
                })
                .catch((err) => {
                    this.$notify({
                        group: 'foo',
                        title: "Error",
                        text: err.response.data.msg,
                        type: 'error'
                    })
                })
        }
    }
}
</script>