<template>
    <b-container>
        <div v-html="$store.state._ProjInner" class="content"></div>
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
