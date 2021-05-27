<template>
    <div class="card" :class="`${bg ? bg : 'bg-dark'} ${fg ? fg : 'text-white'}`">
        <div class="card-header d-flex justify-content-between align-items-center c-pointer" @click="toggle">
            <h5 class="p-0 m-0 border-0">
                <slot name="title"></slot>
            </h5>
            <button type="button" class="btn btn-outline-light text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse"
                     viewBox="0 0 16 16" v-if="expanded">
                    <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793z" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand" viewBox="0 0 16 16" v-else>
                    <path fill-rule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8zM7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10z" />
                </svg>
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