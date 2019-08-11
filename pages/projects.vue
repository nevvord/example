<template>
    <div class="content">
        <b-container>
            <b-row>
                <b-col class="post" cols="12" v-for="proj in this.$store.state._Project" :key="proj.key">
                    <b-row>
                        <b-col cols="6" class="align-bottom text-uppercase">
                            {{proj.name}}
                        </b-col>
                        <b-col cols="6" class="text-right link">
                            <a v-if="proj.link" :href="proj.link">Сайт проекта</a>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row>
                        <b-col sm="12" lg="3">
                            <b-img v-bind="mainProps" rounded :src="'http://localhost:3012/' + proj.file" fluid :alt="proj.name"></b-img>
                        </b-col>
                        <b-col sm="12" lg="9" class="font-weight-lighter">
                            {{proj.description}}
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    created(store){
        this.$store.commit('getProject')
    }
}
</script>

<style scoped>
.content {
    padding: 75px;
}
.post{
    padding: 5px;
    background-color: rgb(241, 244, 247);
    margin-bottom: 10px;
    border-radius: 10px;
    box-shadow: 0 0 2px black;
}
hr{
    margin: 5px 0 10px;
}

.link {
    padding-right: 25px;
}

img{
}
</style>
