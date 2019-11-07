<template>
    <div>
        <div :class="{slideMenuShow: sShow, slideMenuHide: sHide  }">
            <b-row>
                <b-col>
                    <div :class="{itemSlideMenu: true, bgItemAtive : pgBG} " @click="setContent('page')">
                        Страницы
                    </div>
                    <div :class="{itemSlideMenu: true, bgItemAtive : prBG} " @click="setContent('projects')">
                        Проекты
                    </div>
                    <div :class="{itemSlideMenu: true, bgItemAtive : wrBG}" @click="setContent('works')">
                        Работы
                    </div>
                    <div :class="{itemSlideMenu: true, bgItemAtive : spBG}" @click="setContent('specialization')">
                        Специализация
                    </div>
                    <div :class="{itemSlideMenu: true, bgItemAtive : tcBG}" @click="setContent('technology')">
                        Технологии
                    </div>
                </b-col>
            </b-row>
        </div>
        <div class="content bg-dark" >
                <div class="cLogo vertical_text">
                    NCP
                </div>
            <b-row>
                <b-col>
                    <b-link class="item" @click="$store.commit('admin/setContent', 'fp')">
                        <i class="fas fa-home"></i>
                    </b-link>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-link  class="item" @click="openSlider()">
                        <i class="fas fa-edit">
                    </i></b-link>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="item" @click="changeHide()">
                    <i class="fas fa-play"></i>
                </b-col>
            </b-row>
            <b-row>
                <b-col class="item" v-b-modal.file>
                    <i class="fas fa-file-image"></i>
                </b-col>
            </b-row>

            <b-row class="btmBlock">
                <b-col cols="12">
                    <p class="text-white vertical" @click="exit">Выход</p>
                </b-col>
            </b-row>
        </div>
        <div :class="{player: true, hide}">
            <div class="bg-dark text-center">
                <b-link class="text-light" href="https://www.youtube.com/channel/UCSJ4gkVC6NrvII8umztf0Ow">ChilledCow</b-link>
            </div>
            <b-embed
                type="iframe"
                aspect="16by9"
                src="https://www.youtube.com/embed/hHW1oY26kxQ"
                allowfullscreen
            ></b-embed>
        </div>
        <b-modal id="file" title="Файлы на сервере" size="lg">
            <b-form class="border-bottom">
                <b-form-group id="input-group-3" label="Картинка на главной странице:" label-for="input-3">
                    <b-form-file v-model="$store.state.files.form.file" :state="Boolean($store.state.files.form.file)" placeholder="Выберете картинку..."
                        drop-placeholder="Drop file here..."></b-form-file>
                    <div class="mt-3">Выбранная картинка: {{ $store.state.files.form.file ? $store.state.files.form.file.name : '' }}</div>
                </b-form-group>
                <div class="text-right p-3">
                    <b-button variant="success" @click="upload()">Загрузить</b-button>
                </div>
            </b-form>
            <b-row class="pt-2">
                <b-col class="mb-3" cols="6" lg="3" v-for="files in $store.state.files._Data" :key="files.key">
                    <b-img :src="$store.state._ServerHttp + files.file" fluid></b-img>
                    <b-input class="input bg-dark p-1 text-light" :value="$store.state._ServerHttp + files.file"></b-input>
                    <div class="bg-danger text-light text-center btn-delete" @click="del(files._id, files.file)"> X </div>
                </b-col>
            </b-row>
            <template slot="modal-footer" slot-scope="{ ok, cancel }">
                <b-button id="btnClose" @click="cancel()">Закрыть</b-button>
                <b-tooltip target="btnClose" variant="danger">
                    Осторожно! Все несохраненые данные будут утеряны!
                </b-tooltip>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    data(){
        return{
            hide: true,
            // Переменые для выплывающего меню
            sShow : false,
            sHide : true,
            // Переменные для активации элементов
            prBG: false,
            wrBG: false,
            spBG: false,
            tcBG: false,
            pgBG: false
        }
    },
    methods: {
        del(id, file) {
            this.$axios
                .delete(`${this.$store.state._ServerHttp}api/deletefile/${id}`, { data: { file } })
                .then(res => {
                    this.$store.commit('files/delete', id)
                    this.$notify({
                        group: 'foo',
                        title: `SUCCESS`,
                        text: `${res.data.msg}`,
                        type: 'success'
                    })
                })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `Error ${err.response.status}`,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                })
        },
        upload(){
            if(this.$store.state.files.form.file){
                const token = localStorage.getItem('token')

                let fd = new FormData()
                fd.append('image', this.$store.state.files.form.file, this.$store.state.files.form.file.name)
                fd.append('token', token)
                
                this.$axios
                    .post(`${this.$store.state._ServerHttp}api/addfile`, fd)
                    .then( res => {
                        this.$store.commit('files/push', res.data.resultat)
                        this.$notify({
                            group: 'foo',
                            title: 'Success',
                            text: `${res.data.msg}`,
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'foo',
                            title: `Error ${err.response.status}`,
                            text: `${err.response.data.msg}`,
                            type: 'error'
                        })
                    })
            }
        },
        changeHide(){
            this.hide = !this.hide
        },
        // Метод для открытия выплывающего меню
        openSlider() {
            this.sShow = !this.sShow;
            this.sHide = !this.sHide;
        },
        // Костыль для активации элемента меню
        activeElement(change){
            if (change === "projects") {
                this.prBG = true;
                this.wrBG = false;
                this.spBG = false;
                this.tcBG = false;
                this.pgBG = false;
            }else if (change === "works") {
                this.prBG = false;
                this.wrBG = true;
                this.spBG = false;
                this.tcBG = false;
                this.pgBG = false;
            }else if (change === "specialization") {
                this.prBG = false;
                this.wrBG = false;
                this.spBG = true;
                this.tcBG = false;
                this.pgBG = false;
            }else if (change === "technology") {
                this.prBG = false;
                this.wrBG = false;
                this.spBG = false;
                this.tcBG = true;
                this.pgBG = false;
            }else if (change === "page") {
                this.prBG = false;
                this.wrBG = false;
                this.spBG = false;
                this.tcBG = false;
                this.pgBG = true;
            }
        },
        // Настройки контента
        setContent(change) {
            this.$store.commit('admin/setContent', change)
            this.openSlider()
            this.activeElement(change)
        },
        exit(){
            this.$axios
                .post(`${this.$store.state._ServerHttp}user/logout`)
                .then( res => {
                    if(res.data.logout === 'success'){
                        this.$store.commit('setAuth', false)
                        localStorage.removeItem('token')
                        this.$notify({
                            group: 'foo',
                            title: 'Success',
                            text: "Всего доброго",
                            type: 'success'
                        })
                .catch(err => {
                    this.$notify({
                        group: 'foo',
                        title: `Error ${err.response.status}`,
                        text: `${err.response.data.msg}`,
                        type: 'error'
                    })
                })
                }
            })
        }
    }

}
</script>

<style scoped>
.btn-delete{
    position: absolute;
    padding: 3px 10px;
    top: 0;
    right: 15px;
    cursor: pointer;
    opacity: 0.5;
    transition: 0.3s;
}

.btn-delete:hover{
    opacity: 1;
}
.input{
    border-radius: 0;
    border: 0;
    font-size: 14px;
    outline-style: none;
}

.player{
    position: fixed;
    top: 98px;
    left: 45px;
    width: 250px;
    transition: 0.5s;
    z-index: 2;
}

.hide {
    left: -300px;
    opacity: 0;
}
.bgItemAtive{
    background-color:  #e4a1a349;
    box-shadow: inset 0 0 5px 0 black;
}

.itemSlideMenu {
    text-align: left;
    padding: 5px 10px;
    cursor: pointer;
    color: white;
    border-bottom: solid 1px rgba(0, 0, 0, 0.137);
    transition: 0.3s;
    font-family: Calibri;
}

.itemSlideMenu:hover {
    background-color:  #e4a1a349;
}
.slideMenuHide {
    position: fixed;
    top: 0;
    left: -110px;
    height: 200vh;
    background-color: rgb(223, 223, 223);
    transition: 1s;
    opacity: 0;
    z-index: 98;
}
.slideMenuShow {
    position: fixed;
    top: 0;
    left: 40px;
    height: 200vh;
    background-color: rgb(92, 92, 92);
    transition: 0.5s;
    opacity: 0.9;
    box-shadow: 5px 0px 5px 5px #00000049;
    z-index: 98;
}
.userImg{
    border-radius: 50%;
    width: 40px;
    padding: 5px;
}

.vertical_text{
    writing-mode: tb-rl;
    transform:rotate(180deg);
    font-size:12px;
}

.vertical{
    margin: 0;
    padding: 10px;
    writing-mode: tb-rl;
    transform:rotate(180deg);
    cursor: pointer;
    transition: 0.3s;
}

.vertical:hover{
    opacity: 0.5;
}
.cLogo {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    width: 100%;
    color: #567;
    padding: 5px;
    font-weight: 700;
    border-top: 1px solid rgb(97, 95, 95);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.212);
}

.btmBlock {
    position: fixed;
    bottom: 0;
    left: 0;
}

.item {
    display: block;
    padding: 3px 0;
    cursor: pointer;
    color: aliceblue;
    transition: 0.3s;
}

.item:hover {
    color: #e5474b;
}
.content {
    position: fixed;
    text-align: center;
    left: 0;
    width: 40px;
    height: 200vh;
    z-index: 99;
    background-color: #999;
}
</style>
