<template>
    <b-container>
        <div v-html="inner"></div>
    </b-container>
</template>
<script>
export default {
    head:{
        title: 'ЮЖПРОМАВТОМАТИКА | Страницы',
    },
    data(){
        return{
            inner: ''
        }
    },
    mounted(){    
        const curPage = this.$store.state.pages._Page.filter(page => page._id === this.$route.params.page)
        this.inner = curPage[0].inner
    }
}
</script>

