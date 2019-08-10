<template>
    <div v-if="avtorization">
        <NavBar />
        <nuxt />   
    </div>
    <div v-else>
        <b-container>
            <h3 class="text-center">Вы не автаризованы</h3>
            <b-row>
                <b-col v-if="!send" class="text-center">
                    <b-row>
                        <b-col sm="12" lg="4"></b-col>
                        <b-col sm="12" lg="4">
                            <b-form-group label="Введите почтовый адрес:">
                                <b-form-input v-model="mail" placeholder="Почтовый адрес"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12" lg="4"></b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-button @click="avtorizStart">Авторизироваця</b-button>
                        </b-col>
                    </b-row>
                    {{oops}}
                </b-col>
            </b-row>
            <b-container>
                <b-form-group v-if="send" label="На ваш почтовый адрес был отправлен ключ введите его пожалуйста." description="Если ключ не приходит проверте спам">
                    <b-row>
                        <b-col sm="12" lg="8">
                            <b-form-input placeholder="Ключ..." v-model="key"></b-form-input>
                        </b-col>
                        <b-col sm="12" lg="4" class="text-center">
                            <b-button variant="success" @click="keyProof">Подтвердить</b-button>
                        </b-col>
                    </b-row>
                </b-form-group>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios';
import NavBar from '~/components/crm/NavBar.vue'
export default {
    data() {
        return{
            avtorization: false,
            send: false,
            trueMail: 'nevvord@gmail.com',
            mail: '',
            oops: '',
            key:'',
            keyCookie: ''
        }
    },
    mounted(){
        this.keyCookie = document.cookie.replace(/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.get('http://localhost:3012/login').then(res => {
            if(res.data.key !== false && this.keyCookie === res.data.key){
                this.avtorization = true;
            }
        });
    },
    methods:{
        avtorizStart(){
            if (this.trueMail === this.mail){
                axios.post('http://localhost:3012/login').then(res => {
                    this.send = !this.send;
                });
            }else{
                this.oops = 'Вы ввели неверный почтовый адрес'
            }
        },
        keyProof(){
            axios.post('http://localhost:3012/loginKey', {key: this.key}).then(res =>{
                if (res.data.avtorize === true){
                    document.cookie = `login = ${key}`;
                    this.avtorization = true
                }else{
                    this.avtorization = false
                }
            });
        }
    },
    components:{
        NavBar
    }
    
}
</script>

<style scoped>

</style>
