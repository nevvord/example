<template>
    <b-container class="content">
        <b-row>
            <b-col sm="12" md="6" lg="4" class=" " v-for="work in this.$store.state._Works" :key="work.key">
                <b-container class="bg-white">   
                    <b-row>
                        <b-col class="headWorks">
                            <h3 class="text-uppercase">{{work.name}}</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-container>
                            <b-img :src="'http://localhost:3012/' + work.file" fluid :alt="work.name"></b-img>
                        </b-container>
                    </b-row>
                    <b-row>
                        <b-container>
                            <p class="fontMidBlock">{{work.description}}</p>
                        </b-container>
                    </b-row>
                    <b-row>
                        <b-col cols="4" v-for="workTech in work.technology" :key="workTech.key" >
                            <div class="asd" v-for="tech in $store.state._Technology" :key="tech.key" v-if="workTech === tech._id">
                                <span class="align-middle">
                                    <a :href="tech.link" class="align-middle">
                                        <b-img class="opImg align-middle" :src="'http://localhost:3012/' + tech.file" fluid></b-img>
                                    </a>
                                </span>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="contButt"  >
                            <b-button squared variant="outline-danger" size="lg" to="work" @click="workInner(work.inner)">Подробнее</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    data(){
        return {
            techData: this.$store.state._Technologe
        }
    },
    methods: {
        workInner(inner){
            this.$store.commit('changeWorkInner', inner)
        }
    }
}
</script>

<style scoped>
.fontMidBlock {
    line-height: 200%;
    font-weight: 600;
    font-size: 1.1rem;
}

.asd {
    height: 100%;
}

.workBlock {
    padding: 15px;
    margin: 0px;
}

.headWorks {
    color: #e5474b;
}

.content {
    padding-top: 50px;
    padding-bottom: 50px;
}

h3, p {
    padding: 15px 0;
}

.contButt {
    padding: 25px 15px;
}
.opImg {
    transition: 0.3s;
    max-height: 40px;
}

.opImg:hover {
    opacity: 0.85;
}
</style>
