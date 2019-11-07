<template>
    <div class="jobContent">
        <b-container>
            <b-row>
                <b-col sm="12" md="6" lg="4" v-for="spec in $store.state.specializations._Specialization" :key="spec.key">
                    <b-row>
                        <b-col class="text-center">
                            <b-img class="imgSize" :alt="spec.name" :src="$store.state._ServerHttp + spec.file" fluid></b-img>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <h3>{{spec.name}}</h3>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <p>
                                {{spec.description}}
                            </p>
                        </b-col>
                    </b-row>
                    <b-row class="contAImg">
                        <b-col cols="4" v-for="specTech in spec.technology" :key="specTech.key" class="text-center">
                            <div v-for="stateTech in $store.state.technologies._Technology" :key="stateTech.key">
                                <b-link :href="stateTech.link">
                                    <b-img class="p-3" :alt="stateTech.name" v-if="specTech === stateTech._id" :src="$store.state._ServerHttp + stateTech.file" fluid></b-img>
                                </b-link>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col class="contButt">
                            <b-container>
                                <b-button squared variant="outline-danger" size="lg" :to="`/specializations/${spec._id}`">Подробнее</b-button>
                            </b-container>
                        </b-col>
                    </b-row>
                    <hr>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<style>
.jobContent {
    background-color: #f3f3f3;
    padding: 50px 0;
}
h3 {
    color: #e5474b;
}

.contButt, .contAImg, h3 {
    padding: 15px 0px;

}
p {
    font-size: 18px;
}

.imgSize {
    height: 225px;
    width: 350px;
}
</style>
