<template>
    <div>
        <b-container v-html="$store.state.inner.inner"></b-container>
        <b-container class="pb-4">
            <b-button size="lg" to="/projects" variant="outline-danger" squared>Подробнее</b-button>
        </b-container>
    </div>
</template>