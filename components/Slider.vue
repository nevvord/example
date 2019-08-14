<template>
    <div class="slider">
        <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333;"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
        >
            <b-carousel-slide class="img" img-src="~/static/image/banner-2.jpg">
                <b-row>
                    <b-col>
                        <h3>ИНФОРМАЦИОННЫЕ ТЕХНОЛОГИИ И АВТОМАТИЗАЦИЯ</h3>
                        <p>ПОСТАВКИ ОБОРУДОВАНИЯ И РАЗРАБОТКА ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ</p>
                        <b-button variant="outline-light"  to="/contacts">Связаться</b-button>
                    </b-col>
                </b-row>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slide: 0,
            sliding: null
        }
    },
    methods: {
        onSlideStart(slide) {
            this.sliding = true
        },
        onSlideEnd(slide) {
            this.sliding = false
      }
    }
    
}
</script>

<style scoped>
.slider {
    margin-top: 56px;
    background-color: #000;
    transition: 1s;
    padding: 0px;
}

.img {
    max-height: 95vh;
}


</style>
