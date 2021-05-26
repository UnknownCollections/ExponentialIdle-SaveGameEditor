<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div class="container">
            <span class="navbar-brand mb-0 h1">Exponential Idle<br />Save Game Editor v{{ version }}</span>
            <button class="navbar-toggler" type="button" @click.prevent="mobileNav.show()">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse mt-3 mt-md-0">
                <div class="navbar-nav ms-auto">
                    <router-link v-for="route of routes" :to="route.path" class="nav-link">{{ i18n.get(route.name) }}</router-link>
                    <a :href="repo" target="_blank" class="nav-link">Source Code</a>
                </div>
            </div>
            <div class="offcanvas offcanvas-end" tabindex="-1" ref="mobileNav">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Exponential Idle<br />Save Game Editor v{{ version }}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
                </div>
                <div class="offcanvas-body">
                    <hr class="mt-0" />
                    <div class="navbar-nav ms-auto">
                        <router-link v-for="route of routes" :to="route.path" class="nav-link" @click="this.mobileNav.hide()">{{ i18n.get(route.name) }}</router-link>
                        <a :href="repo" target="_blank" class="nav-link" @click="this.mobileNav.hide()">Source Code</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

</template>

<script>
    import { routes } from '@/lib/router';
    import { Offcanvas } from 'bootstrap';

    export default {
        data() {
            return {
                routes,
                version: __VERSION__,
                repo: __REPO__,
                mobileNav: undefined,
            };
        },
        mounted() {
            this.mobileNav = new Offcanvas(this.$refs.mobileNav);
        },
        methods: {
        }
    };
</script>