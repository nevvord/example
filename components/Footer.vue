<template>
    <div class="fContent">
        <b-container>
            <b-row class="text-white">
                <b-col>
                    <h1>СВЯЖИТЕСЬ С НАМИ</h1>
                </b-col>
            </b-row>
            <b-row class="text-white">
                <b-col cols="7">
                    <div id="map"></div>                
                </b-col>
                <b-col sm="12" lg="5">
                    <p>Украина</p>
                    <p>Одесская область</p>
                    <p>Одесса</p>
                    <p>Ул. Комитетская 4/6</p>
                    <p>65091</p>
                    <b-container>
                        <b-row><b-link class="text-white">+380 95 545 39 73</b-link></b-row> 
                        <b-row><b-link class="text-white">+380 96 273 43 43</b-link></b-row> 
                        <b-row><b-link class="text-white">info@ypa.com.ua</b-link></b-row>
                    </b-container>
                </b-col>
            </b-row>
            <b-row class="text-white fCopy">
                <b-col>© 2018 ЮЖПРОМАВТОМАТИКА, All Right Reserved</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>

function initMap() {
    var coordinates = {lat: 47.212325, lng: 38.933663},
    
        map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates
        });
}

export default {
    
}
</script>

<style scoped>
.fContent {
    background-color: #e5474b;
    padding: 50px 0;
}

.fCopy {
    padding: 35px 0 0 0;
}
</style>
