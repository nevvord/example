<template>
    <div class="fContent">
        <b-container>
            <b-row class="text-white">
                <b-col>
                    <h1>СВЯЖИТЕСЬ С НАМИ</h1>
                </b-col>
            </b-row>
            <b-row class="text-white">
                <b-col sm="12" lg="7">
                    <no-ssr>
                        <iframe 
                        width="100%" 
                        height="100%" 
                        frameborder="0" 
                        scrolling="no" 
                        marginheight="0" 
                        marginwidth="0" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=30.71683466434479%2C46.47135105506826%2C30.72033226490021%2C46.47300804310445&amp;layer=mapnik" 
                        class="border border-dark"
                        ></iframe>
                        <br/>
                        <!--
                        <small>
                            <a href="https://www.openstreetmap.org/#map=19/46.47218/30.71858">View Larger Map</a>
                        </small>
                        -->
                    </no-ssr>
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
export default {
    data() {
    return {
      center: { lat: 46.472182, lng: 30.718992 },
      mapTypeId: "roadmap",
      markers: [
        { position: { lat: 46.472182, lng: 30.718992 } },
        { position: { lat: 46.472182, lng: 30.718992 } }
      ]
    };
  }
    
}   
</script>

<style scoped>
.vue-map-container {
  height: 280px;
  max-width: 992px;
  width: 100%;
  border: 3px solid white;
  border-radius: 5px;   
}
.fContent {
    background-color: #e5474b;
    padding: 50px 0;
}

.fCopy {
    padding: 35px 0 0 0;
}
</style>
