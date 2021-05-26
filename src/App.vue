<template>
    <toaster :autohide="true" :delay="15000" />

    <main-nav />

    <div class="container flex-grow-1">
        <router-view />
    </div>

    <main-footer />
</template>

<script>
    import Editor from '@/pages/Editor';
    import Nav from '@/components/Nav';
    import Footer from '@/components/Footer';
    import Toaster from '@/components/Toaster';

    export default {
        components: {
            Editor,
            mainNav: Nav,
            mainFooter: Footer,
            Toaster,
        },
        mounted() {
            document.body.classList.add('loaded');
        }
    }
</script>