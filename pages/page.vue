<template>
    <b-container>
        <div v-html="this.$store.state._PageInner" class="content"></div>
    </b-container>
</template>
<script>
export default {
    data(){
        return{
            
        }
    }
}
</script>
<style scoped>
.content {
    padding: 75px 0px;
}
</style>
