<template>
    <no-ssr>
        <div class="slider">
            <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="4000"
            controls
            indicators
            img-width="1024"
            img-height="480"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
            >
            <!-- Слайды -->
                <b-carousel-slide v-for="element in $store.state.carousel._Data" :key="element.key" class="img" :img-alt="element.name" :img-src="$store.state._ServerHttp + element.file" fluid    >
                    <div v-html="element.inner"></div>
                </b-carousel-slide>
            </b-carousel>
        </div>
    </no-ssr>
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
}

.img {
    max-height: 95vh;
}
</style>
