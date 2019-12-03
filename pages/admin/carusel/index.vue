<template>
    <div class="bg-light pb-5">
        <b-container class="p-0">
            <b-row class="">
                <b-col cols="12"> 
                    <h2 class="p-3 bg-dark text-light m-0">Карусель</h2>
                </b-col>
            </b-row>
            <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            v-if="$store.state.carousel._Data"
            >
                <b-carousel-slide v-for="element in $store.state.carousel._Data" :key="element.key" class="img" :img-alt="element.name" :img-src="$store.state._ServerHttp + element.file" fluid    >
                    <div v-html="element.inner"></div>
                </b-carousel-slide>
            </b-carousel>
        </b-container>
        <b-container class="border p-0 bg-white mt-5">
            <h2 class="bg-dark p-3 text-light">Добавить элемент карусели</h2>
            <b-form @submit="upload">
                <b-row>
                    <b-col cols="12" lg="6">
                            <b-form-group class="px-2">
                                <h5 class="py-2">Название эелемнта</h5>
                                <b-form-input type="text" required placeholder="Название элемента" v-model="$store.state.carousel.form.name"></b-form-input>
                            </b-form-group>
                    </b-col>
                    <b-col cols="12" lg="6">
                            <b-form-group class="px-2">
                                <h5 class="py-2">Картинка</h5>
                                <b-form-file 
                                v-model="$store.state.carousel.form.file" 
                                :state="Boolean($store.state.carousel.form.file)" 
                                required 
                                placeholder="Выберете картинку..."
                                drop-placeholder="Drop file here..."
                                ></b-form-file>
                                <div class="mt-3">Выбранная картинка: {{ $store.state.carousel.form.file ? $store.state.carousel.form.file.name : '' }}</div>
                            </b-form-group>
                    </b-col>
                </b-row>
                <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="$store.state.carousel.form.inner" :options="cmOption"></codemirror>
                </no-ssr>
                <div class="bg-light border border-top-0 border-dark" v-html="$store.state.carousel.form.inner"></div>
                <div class="p-3 text-right">
                    <b-button variant="success" squared type="submit">Добавить</b-button>
                </div>
            </b-form>
        </b-container>

        <b-container class="mt-4 bg-white">
            <b-row class="bg-dark text-light text-center">
                <b-col cols="1" class="border-right p-2">
                    IMG
                </b-col>
                <b-col cols="2" class="border-right p-2">
                    Название
                </b-col>
                <b-col cols="7" class="border-right p-2">
                    HTML
                </b-col>
                <b-col cols="2" class="p-2">
                    Действия
                </b-col>
            </b-row>
            <b-row class="text-center" align-v="center" v-for="carousel in $store.state.carousel._Data" :key="carousel.key">
                <b-col cols="1">
                    <b-img :src="$store.state._ServerHttp + carousel.file" fluid></b-img>
                </b-col>
                <b-col cols="2" class="bg-secondary border-bottom text-light p-3">
                    {{carousel.name}}
                </b-col>
                <b-col cols="7" class="text-truncate">
                    {{carousel.inner}}
                </b-col>
                <b-col cols="2" class="p-0 text-center">
                    <b-button-group class="">
                        <b-button variant="warning" v-b-modal.changeCarousel @click="$store.commit('carousel/updateChange', carousel)">Изменить</b-button>
                        <b-button variant="danger" @click="del(carousel._id, carousel.file)">Удалить</b-button>
                    </b-button-group>
                </b-col>
            </b-row>
        </b-container>
        <Change />
    </div>
</template>

<script>
    import Change from '~/components/crm/content/carousel/change'

    export default {
        components:{
            Change
        },
        layout: 'cp',
        data(){
            return {
            slide: 0,
            sliding: null,
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
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
        },
        async upload(evt){
            evt.preventDefault()

            const fd = new FormData()
            fd.append('name', this.$store.state.carousel.form.name)
            fd.append('inner', this.$store.state.carousel.form.inner)
            fd.append('image', this.$store.state.carousel.form.file, this.$store.state.carousel.form.file.name)


            await this.$axios
                .post(`${this.$store.state._ServerHttp}api/addcarousel`, fd)
                .then(res => {
                        this.$store.commit('carousel/push', res.data.resultat)
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
                        title: `ERROR ${err.response.status}`,
                        text: err.response.data.msg,
                        type: 'error'
                    })
                })
        },
        async del(_id, file){
            await this.$axios
                .delete(`${this.$store.state._ServerHttp}api/deletecarousel/${_id}`, {data: { file } })
                .then(res => {
                    this.$store.commit('carousel/delete', _id)
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