<template>
    <b-modal id="modal-1" :title="$store.state.works.change.name" size="xl">
        <div v-if="changeHTMLIneer === true">
            <no-ssr placeholder="Codemirror Loading...">
                <codemirror v-model="$store.state.works.change.inner" :options="cmOption"></codemirror>
            </no-ssr>
        </div>
        <div v-html="$store.state.works.change.inner"></div>
        <template slot="modal-footer" slot-scope="{ ok, cancel }">
            <div v-if="changeHTMLIneer === false">
                <b-button variant="warning" @click="changeHTMLIneer = !changeHTMLIneer">Изменить</b-button>
            </div>
            <div v-else-if="changeHTMLIneer === true">
                <b-button variant="success" :disabled="disabled" @click="setChangeInner">Сохранить</b-button>
            </div>
            <b-button
                @click="cancel(); changeHTMLIneer ? changeHTMLIneer = !changeHTMLIneer : changeHTMLIneer = changeHTMLIneer;">
                Закрыть</b-button>
        </template>
    </b-modal>
</template>
<script>
export default {
    data(){
        return{
            changeHTMLIneer: false,
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
        async setChangeInner() {
            this.disabled = true
            let bodyJson = {
                _id: this.$store.state.works.change._id,
                inner: this.$store.state.works.change.inner
            }
            await this.$axios
                .put(this.$store.state._ServerHttp + 'api/putworkinner', bodyJson)
                .then(res => {
                    this.$store.commit('works/updateInner', bodyJson)
                    this.$notify({
                        group: 'foo',
                        title: `SUCCESS`,
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                    this.disabled = false
                    this.changeHTMLIneer = !this.changeHTMLIneer
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
    }
}
</script>