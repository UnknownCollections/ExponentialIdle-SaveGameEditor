<template>
    <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8 col-xl-10">
            <expandable-card v-for="[question, answer] of faqs">
                <template #title><span v-html="question" /></template>
                <template #content><div v-html="answer" /></template>
            </expandable-card>
        </div>
    </div>
</template>

<script>
    import ExpandableCard from '@/components/ExpandableCard';
    const faqs = (await import(/* webpackChunkName: 'faq' */ '@/data/faq.json')).default;

    export default {
        data() {
            return {
                faqs
            };
        },
        computed: {
        },
        components: {
            ExpandableCard
        },
    };
</script>