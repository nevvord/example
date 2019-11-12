<template>
    <div class="bg-light">
        <b-container class="bg-white border mb-5 p-0">
            <h3 class="bg-dark text-light p-3">Добавить страницу</h3>
            <b-form>
                <b-row>
                    <b-col cols="12" lg="6" class="p-4 m-0">
                        <b-form-group label="Имя страницы:" description="Єто будет отабраженно на главной странице в навбаре"
                            label-for="inpName">
                            <b-form-input id="inpName" required placeholder="Введите название страницы" v-model="$store.state.pages.form.name"></b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                        <br>
                        Отображать страницу в Навбаре?
                        <b-form-checkbox v-model="$store.state.pages.form.display" name="check-button" switch class="switch"></b-form-checkbox>
                    </b-col>
                </b-row>
                <Html />
                <div class="bg-light border border-top-0 border-dark" v-html="$store.state.pages.form.inner"></div>
                <div class="text-right p-3">
                    <b-button variant="success" :disabled="$store.state.pages.form.name ? false : true" squared @click="ulpd">Добавить</b-button>
                </div>
            </b-form>
        </b-container>

        <b-container class="midContent border-dark pb-5">
            <b-row class="bg-dark p-1 text-light">
                <b-col cols="12" lg="2" class="text-center">Название</b-col>
                <b-col cols="12" lg="6" class="text-center">HTML code</b-col>
                <b-col cols="12" lg="4" class="text-center">Действия</b-col>
            </b-row>
            <b-row>
                <b-col cols="12" v-for="page in $store.state.pages._Page" :key="page.key" class="bg-white border border-top-0 border-dark">
                    <b-row align-v="center">
                        <b-col sm="12" lg="2" class="text-center border-right border-dark p-3" :class="[page.display ? 'bg-success' : 'bg-warning']">{{page.name}}</b-col>
                        <b-col sm="12" lg="6" class="text-truncate border-right border-dark p-3"><code>{{page.inner}}</code></b-col>
                        <b-col sm="12" lg="4">
                            <b-row>
                                <b-col>
                                    <b-button-group>
                                        <b-button variant="warning" v-b-modal.changePage @click="$store.commit('pages/updateChange', page)">Изменить</b-button>
                                        <b-button variant="danger" @click="delPage(page._id)">Удалить</b-button>
                                    </b-button-group>
                                </b-col>
                                <b-col class="text-right">
                                    <small class="pr-3">
                                        Pos: {{page.position}}
                                    </small>
                                    <b-button-group class="text-right">
                                        <b-button @click="counter(-1, page._id)"><i class="fas fa-arrow-up"></i></b-button>
                                        <b-button @click="counter(1, page._id)"><i class="fas fa-arrow-down"></i></b-button>
                                    </b-button-group>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <Change />
    </div>
</template>

<script>
import Html from '~/components/crm/content/page/html'
import Change from '~/components/crm/content/page/change'
export default {
    layout: 'cp',
    components:{
        Html,
        Change
    },
    methods:{
        async ulpd(){
            await this.$axios
                .post(`${this.$store.state._ServerHttp}api/addpage`, this.$store.state.pages.form)
                .then(res => {
                    this.$store.commit('pages/push', res.data.resultat);
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: res.data.msg,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `ERROR ${err.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                })
        },
        async delPage(id) {
            await this.$axios
                .delete(this.$store.state._ServerHttp + 'api/deletepage/' + id)
                .then(res => {
                    this.$store.commit('pages/delete', id)
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: res.data.msg,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `ERROR ${err.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                })
        },
        async counter(num, _id){
            const object = { num, _id }
            let position = 0
            await this.$store.commit('pages/counter', object)
            await this.$store.state.pages._Page.forEach((element, index) => {
                if(element._id === _id){
                    position = element.position
                }
            })
            await this.$axios
                .put(`${this.$store.state._ServerHttp}api/putpageposition/${_id}`, {position})
                .then(res => {
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: res.data.msg,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `ERROR ${err.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                })
        }
    }
}
</script>
