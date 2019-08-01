<template>
  <div class="content">
    <b-container class="topContent">
        <h1>Добавить технологию</h1>
      <b-form @submit="upld" onsubmit="false" enctype="multipart/form-data">
        <b-form-group id="input-group-1" label="Название технологии:" label-for="input-1" description="">
          <b-form-input id="input-1" v-model="form.name" type="text" required placeholder="Введите название технологии">
          </b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Ссылка на технологию:" label-for="input-2">
          <b-form-input id="input-2" v-model="form.link" required placeholder="http://link.com"></b-form-input>
        </b-form-group>
 
        <b-form-group id="input-group-3" label="Лого технологии:" label-for="input-3">
          <b-form-file v-model="form.file" :state="Boolean(form.file)" placeholder="Выберете картинку..."
            drop-placeholder="Drop file here..."></b-form-file>
          <div class="mt-3">Выбранная картинка: {{ form.file ? form.file.name : '' }}</div>
        </b-form-group>

        <b-button type="submit" variant="primary">Добавить</b-button>
      </b-form>
    </b-container>
    <b-container class="techList">
        <b-row >
            <b-col cols="1" class="item" v-for="tech in techData" :key="tech.key">
                <b-row>
                    <b-col>
                        <b-link :href="tech.link">{{ tech.name }}</b-link>
                    </b-col>
                </b-row>
                <b-row class="img">
                    <b-col>
                        <b-img :src="'http://localhost:3012/' + tech.file" fluid></b-img>
                    </b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col>
                        <b-button variant="danger" @click="delTech(tech._id)">
                            Удалить
                        </b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
  </div>
</template>

<script>
    import { mapMutations } from 'vuex';
    import axios from 'axios'
    import { async } from 'q';


    export default  {
        data() {
            return {
                form: {
                    name: '',
                    link: '',
                    file: null,
                },
                techData: this.$store.state._Technology
            } 
        },
        methods: {
            // Загружаем технологию на сервер
            upld(evt) { 
                evt.preventDefault()
            
                const fd = new FormData();
                fd.append('image', this.form.file, this.form.file.name);
                fd.append('name', this.form.name);
                fd.append('link', this.form.link);
                console.log(fd);
                
                let bodyJson = {
                    name: this.form.name,
                    link: this.form.link
                }
                axios.post('http://localhost:3012/technology', fd).then(
                    res => {
                    this.$store.commit('pushToTechnology', res.data)
                });
            },
            delTech(id){
                this.$store.commit('deletTechnology', id);
                this.techData = this.techData.filter( u => u._id !== id);
            }
        }
  }
</script>

<style scoped>
.content {
    padding: 25px 0;
}

.img {
    height: 40px;
    padding: 5px;
}

.techList {
    margin-top: 25px;
}

.item {
    padding: 5px;
    border: 1px solid #e5474b;
    border-radius: 10px;
    text-align: center;
    margin-left: 5px;
}

.topContent{
    margin-bottom: 25px;
}
</style>
