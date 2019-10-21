<template>
    <div class="content">
        <b-container>
            <h3>Добавить страницу</h3>
            <hr>
            <b-form>
                <b-form-group label="Имя страницы:" description="Єто будет отабраженно на главной странице в навбаре"
                    label-for="inpName">
                    <b-form-input id="inpName" required placeholder="Имя прокекта" v-model="form.name"></b-form-input>
                </b-form-group>
                <b-form-checkbox v-model="form.display" name="check-button" switch class="switch">
                    Отображать страницу в Навбаре?
                </b-form-checkbox>
                <br>
                <b-form-group label="HTML код на странице" description="Єто будет отображено на странице"
                    label-for="textArea">
                    <b-form-textarea id="textArea" placeholder="Тут введите HTML код" v-model="form.inner">
                    </b-form-textarea>
                </b-form-group>
                <b-button variant="success" @click="ulpd">Отправить</b-button>
            </b-form>
            <div v-html="form.inner" class="text-truncate"></div>
        </b-container>
        <b-container class="midContent">
            <b-row>
                <b-col cols="12" v-for="page in pageData" :key="page.key" class="pageBlock">
                    <b-row>
                        <b-col sm="12" lg="3">Название: {{page.name}}</b-col>
                        <b-col sm="12" lg="6" class="text-truncate">
                            <span>Код:</span>
                            <span class="font-weight-light ">{{page.inner}}</span>
                        </b-col>
                        <b-col sm="12" lg="3" class="text-right">
                            <b-button-group>
                                <b-button variant="warning" v-b-modal.changePage @click="changeModal(page)">Изменить
                                </b-button>
                                <b-button variant="danger" @click="delPage(page._id)">Удалить</b-button>
                            </b-button-group>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
        <b-modal id="changePage" :title="'Изменить: ' + change.name" size="xl">
            <b-form>
                <b-form-group label="Имя страницы:" description="Єто будет отабраженно на главной странице в навбаре">
                    <b-form-input requireq placeholder="Имя страницы" v-model="change.newName"></b-form-input>
                </b-form-group>
                <b-form-checkbox v-model="change.display" name="check-button" switch class="switch">
                    Отображать страницу в Навбаре?
                </b-form-checkbox>
                <br>
                <b-form-group label="HTML код на странице" description="Єто будет отображено на странице">
                    <b-form-textarea requireq placeholder="HTML код на странице" v-model="change.inner">
                    </b-form-textarea>
                </b-form-group>
            </b-form>
            <hr>
            <div v-html="change.inner"></div>
            <template slot="modal-footer" slot-scope="{ ok, cancel }">
                <b-button variant="success" @click="putChange(); cancel();">Сохранить</b-button>
                <b-button id="btnClose" @click="cancel();">Закрыть</b-button>
                <b-tooltip target="btnClose" variant="danger">
                    Осторожно! Все несохраненые данные будут утеряны!
                </b-tooltip>
            </template>

        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            form: {
                name: '',
                inner: '',
                display: true
            },
            pageData: this.$store.state._Page,
            change: {
                id: '',
                name: '',
                newName: '',
                inner: '',
                display: true
            }
        }
    },
    methods:{
        ulpd(){
            this.pageData = this.$store.state._Page;
            axios
                .post(this.$store.state._ServerHttp + 'api/addpage', this.form)
                .then(res => {
                    this.$store.commit('pushToPage', res.data);
                    this.$notify({
                        group: 'foo',
                        title: "Success",
                        text: `Страница <strong>${this.form.name}</strong> успешно добавленна`,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `ERROR $`
                    })
                })
        },
        changeModal(body){
            this.change.id = body._id;
            this.change.name = body.name;
            this.change.newName = body.name;
            this.change.inner = body.inner;
            this.change.display = body.display;
        },
        putChange(){
            let body = {
                id: this.change.id,
                name: this.change.newName,
                inner: this.change.inner,
                display: this.change.display
            };
            axios.put(this.$store.state._ServerHttp + 'page/' + this.change.id, body).then(res => {
                this.$store.commit('changePage', body);
            });
        },
        delPage(id) {
            this.$store.commit('deletPage', id);
            this.pageData = this.pageData.filter(u => u._id !== id);
        }
    }
}
</script>
<style scoped>
.content {
    padding-top: 45px;
}
.pageBlock{
    padding: 5px;
    border: 1px solid rgba(0, 0, 0, 0.11);
    background-color: rgba(0, 0, 0, 0.027);
}
.midContent {
    margin-top: 15px;
}
</style>
