<template>
    <b-container>
        <div v-html="inner" class="content"></div>
    </b-container>
</template>
<script>
export default {
    head:{
        title: 'ЮЖПРОМАВТОМАТИКА | Проекты',
    },
    data(){
        return{
            inner: ''
        }
    },
    mounted(){    
        const curProject = this.$store.state.projects._Project.filter(proj => proj._id === this.$route.params.project)
        this.inner = curProject[0].inner 
    }
}
</script>
<style scoped>
.content {
    padding: 75px 0px;
}
</style>
    