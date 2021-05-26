<template>
    <div class="card" :class="`${bg ? bg : 'bg-dark'} ${fg ? fg : 'text-white'}`">
        <div class="card-header d-flex justify-content-between align-items-center c-pointer" @click="toggle">
            <h5 class="p-0 m-0 border-0"><slot name="title"></slot></h5>
            <button type="button" class="btn btn-outline-light">
                <i class="bi bi-arrows-collapse" v-if="expanded"></i>
                <i class="bi bi-arrows-expand" v-else></i>
            </button>
        </div>
        <div class="card-body" v-show="expanded">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            defaultExpanded: Boolean,
            bg: String,
            fg: String,
        },
        data() {
            return {
                expanded: this.defaultExpanded,
            };
        },
        methods: {
            toggle() {
                this.expanded = !this.expanded;
            },
        },
    };
</script>