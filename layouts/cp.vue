<template>
<div v-if="ready">
    <div v-if="this.$store.state._Auth">
        <NavBar />
        <nuxt />   
    </div>
    <div v-else>
        <b-container>
            <h3 class="text-center">Вы не автаризованы</h3>
            <br>
            <br>
            <b-row>
                <b-col class="text-center">
                    <b-row>
                        <b-col sm="12" lg="4"></b-col>
                        <b-col sm="12" lg="4">
                            <b-form>
                                <b-form-group label="Электронная почта:">
                                    <b-form-input type="email" v-model="form.mail" placeholder="mail@gmail.com"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Введите пароль:">
                                    <b-form-input type="password" v-model="form.password" placeholder="••••••"></b-form-input>
                                </b-form-group>
                                <b-button @click="authSend" variant="success">Вход</b-button>
                            </b-form>
                        </b-col>
                        <b-col sm="12" lg="4"></b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
    <notifications group="foo" position="bottom right" />
</div>
<div v-else class="container text-center padding-top">
    <b-spinner variant="success" type="grow" label="Spinning"></b-spinner>
</div>
</template>

<script>
import axios from 'axios';
axios.defaults.withCredentials = true;
import NavBar from '~/components/crm/NavBar.vue'
export default {
    middleware: 'getApi',
    head:{
        title: 'Админ панель'
    },
    data() {
        return{
            form:{
                mail: '',
                password: ''
            },
            ready: false,
        }
    },
    async mounted(){
        await axios
            .post(this.$store.state._ServerHttp + 'user/authentication', {
                token: localStorage.getItem('token')
            })
            .then(res => {
                this.$notify({
                    group: 'foo',
                    title: 'Success',
                    text: res.data.msg,
                    type: 'Success'
                })
                this.$store.commit('setAuth', true)
                this.ready = true
            })
            .catch(err => {
                this.$store.commit('setAuth', false)
                this.ready = true
                console.log(err.response.data);
                
                this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: err.response.data.msg,
                        type: 'error'
                    })
            })
    },
    methods:{
        authSend(){
            axios
                .post(this.$store.state._ServerHttp + 'user/login', this.form)
                .then( res => {
                    console.log(res.data);
                    
                    localStorage.setItem('token', res.data.token)
                    this.$store.commit('setAuth', true)
                    this.$notify({
                        group: 'foo',
                        title: 'Success',
                        text: res.data.msg,
                        type: 'Success'
                    })
                })
                .catch( err => {
                    this.$notify({
                        group: 'foo',
                        title: 'ERROR',
                        text: err.response.data.msg,
                        type: 'error'
                    })
                    //console.error(err)
                })
        },
        keyProof(key){
            axios.post(this.$store.state._ServerHttp + 'loginKey', {key}).then(res =>{
                if (res.data.avtorize === true){
                    this.$store.commit('setAuth', res.data.avtorize)
                    
                    this.send = !this.send;
                }else{
                    this.$store.commit('setAuth', res.data.avtorize)
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
.padding-top{
    padding-top: 50vh;
}

</style>
