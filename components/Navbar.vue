<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
            <b-navbar-brand to="/" text-variant="orange"><strong class="brand">ЮЖПРОМАВТОМАТИКА</strong></b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/projects">Проекты</b-nav-item>
                    <b-nav-item to="/contacts">Контакты</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>        
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.brand {
    color: #e5474b;
}
</style>
