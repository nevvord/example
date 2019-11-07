<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand to="/" text-variant="orange"><strong class="brand">ЮЖПРОМАВТОМАТИКА</strong></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/projects">Проекты</b-nav-item>
                    <b-nav-item v-for="page in $store.state.pages._Page" :key="page.key" :to="`/pages/${page._id}`" v-if="page.display">{{page.name}}</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>        
    </div>
</template>
<style scoped>
.brand {
    color: #e5474b;
}
</style>
