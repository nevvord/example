<template>
<div>
    <div :class="{slideMenuShow: sShow, slideMenuHide: sHide  }">
        <b-row>
            <b-col>
                <div class="itemSlideMenu" @click="setContent('projects')">
                    Проекты
                </div>
                <div class="itemSlideMenu" @click="setContent('works')">
                    Работы
                </div>
                <div class="itemSlideMenu" @click="setContent('specialization')">
                    Специализация
                </div>
                <div class="itemSlideMenu" @click="setContent('technology')">
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
                <b-link to="/" class="item"><i class="fas fa-home"></i></b-link>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-link  class="item" @click="openSlider()"><i class="fas fa-plus"></i></b-link>
            </b-col>
        </b-row>

        <b-row class="btmBlock">
            <b-col cols="12">
                    <b-img 
                    src="~/static/image/14026904592519.jpg"
                    class="userImg" 
                    v-b-popover.hover="'Admin'" 
                    title="Nevvord">
                    </b-img>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    data(){
        return{
            // Переменые для выплывающего меню
            sShow : false,
            sHide : true
        }
    },
    methods: {
        // Метод для открытия выплывающего меню
        openSlider() {
            this.sShow = !this.sShow;
            this.sHide = !this.sHide;
        },
        setContent(change) {
            this.$store.commit('admin/setContent', change);
            this.openSlider();
        }
    }

}
</script>

<style scoped>
.itemSlideMenu {
    text-align: left;
    padding: 5px 10px;
}
.slideMenuHide {
    position: fixed;
    top: 0;
    left: -110px;
    height: 100vh;
    background-color: rgb(223, 223, 223);
    transition: 1s;
    opacity: 0;
}
.slideMenuShow {
    position: fixed;
    top: 0;
    left: 40px;
    height: 100vh;
    background-color: rgb(223, 223, 223);
    transition: 0.5s;
    opacity: 1;
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
    height: 100vh;
    z-index: 99;
    background-color: #999;
}
</style>
