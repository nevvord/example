<template>
    <div class="content">
        <b-container v-html="this.$store.state._WorkInner"></b-container>
    </div>
</template>

<style scoped>
.content {
    padding: 75px 75px;
}
</style>
