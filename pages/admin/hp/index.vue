<template>
    <div class="bg-light pb-5">
        <b-container class="bg-white p-0 border">
            <h2 class="p-3 bg-dark text-light m-0">Текст на главной странице</h2>
            <section class="w-100">
                <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="$store.state.inner.inner" :options="cmOption"></codemirror>
                </no-ssr>
            </section>
            <div class="bg-light p-3 border border-top-0 border-dark" v-html="$store.state.inner.inner"></div>
            <div class="text-right p-3">
                <b-button variant="success" squared @click="change">Изменить</b-button>
            </div>
        </b-container>
    </div>
</template>

<script>
    export default {
        layout: 'cp',
        data(){
            return {
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
            async change() {
                await this.$axios
                    .put(`${this.$store.state._ServerHttp}api/putinner/${this.$store.state.inner._Data._id}`, {inner: this.$store.state.inner.inner})
                    .then(res => {
                        this.$notify({
                            group: 'foo',
                            title: "Success",
                            text: `${res.data.msg}`,
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'foo',
                            title: `ERROR ${err.response.status}`,
                            text: err.response.data.msg,
                            type: 'error'
                        })
                    })
            }
        }
    }
</script>