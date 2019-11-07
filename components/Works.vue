<template>
    <b-container class="pt-5">
        <b-row>
            <b-col class="mb-5" sm="12" md="6" lg="4" v-for="work in $store.state.works._Data" :key="work.key">
                <b-container class="bg-white p-0">   
                    <b-row>
                        <b-col class="pl-4">
                            <h3 class="text-uppercase">{{work.name}}</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-container>
                            <b-img class="imgSize" :src="$store.state._ServerHttp + work.file" fluid :alt="work.name"></b-img>
                        </b-container>
                    </b-row>
                    <b-row>
                        <b-container>
                            <p class="p-2">{{work.description}}</p>
                        </b-container>
                    </b-row>
                    <b-row>
                        <b-col cols="4" v-for="workTech in work.technology" :key="workTech.key" >
                            <div class="p-2" v-for="tech in $store.state.technologies._Technology" :key="tech.key" v-if="workTech === tech._id">
                                <span>
                                    <a :href="tech.link">
                                        <b-img :src="$store.state._ServerHttp + tech.file" :alt="tech.name" fluid></b-img>
                                    </a>
                                </span>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <div class="p-2">
                                <b-button squared variant="outline-danger" size="lg" :to="`/works/${work._id}`">Подробнее</b-button>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>
<style>
</style>
