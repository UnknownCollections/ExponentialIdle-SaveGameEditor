<style lang="scss">
    .toast-container {
        z-index: 1000;

        & > .toast {
            opacity: 0.95;
        }
    }
</style>

<template>
    <div class="position-relative">
        <div class="toast-container position-fixed bottom-0 end-0 p-3" ref="toasts">
            <div class="toast d-flex px-3 align-items-center justify-content-between" :class="toast.classes" v-for="[id, toast] of toasts" :key="id" :data-id="id">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle h4 mb-0" viewBox="0 0 16 16" v-if="toast.icon === 'log' || toast.icon === 'info'">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16" v-else-if="toast.icon === 'warning' || toast.icon === 'error'">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16" v-else>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                </svg>
                <div class="toast-body flex-grow-1">
                    {{ toast.body }}
                </div>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<script>
    import { v4 as uuid } from 'uuid';
    import { Toast } from 'bootstrap';

    export default {
        props: {
            autohide: Boolean,
            delay: Number,
        },
        data() {
            return {
                toasts: new Map(),
                observer: null,
                oConsole: undefined,
                oLog: undefined,
                oInfo: undefined,
                oWarn: undefined,
                oError: undefined
            }
        },
        methods: {
            observerCallback(mutationsList) {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList') {
                        for (const addedNode of mutation.addedNodes) {
                            if (addedNode.classList.contains('toast')) {
                                this.toast(addedNode);
                            }
                        }
                    }
                }
            },
            add(body, classes, icon) {
                this.toasts.set(uuid(), {
                    classes, body, icon
                })
            },
            toast(node) {
                (new Toast(node, {
                    autohide: typeof this.autohide === 'undefined' ? true : this.autohide,
                    delay: typeof this.delay === 'undefined' ? 5000 : this.delay,
                })).show();
                node.addEventListener('hidden.bs.toast', () => this.remove(node.dataset.id));
            },
            remove(id) {
                this.toasts.delete(id);
            },
            log(message) {
                this.oLog.call(this.oConsole, ...arguments);
                this.add(message, 'bg-primary text-white', 'log');
            },
            info(message) {
                this.oInfo.call(this.oConsole, ...arguments);
                this.add(message, 'bg-info text-white', 'info');
            },
            warn(message) {
                this.oWarn.call(this.oConsole, ...arguments);
                this.add(message, 'bg-warning text-dark', 'warn');
            },
            error(message) {
                this.oError.call(this.oConsole, ...arguments);
                this.add(message, 'bg-danger text-white', 'error');
            }
        },
        mounted() {
            this.observer = new MutationObserver(this.observerCallback.bind(this));
            this.observer.observe(this.$refs.toasts, {
                childList: true
            });
            this.oConsole = window.console;
            this.oLog = window.console.log;
            this.oInfo = window.console.info;
            this.oWarn = window.console.warn;
            this.oError = window.console.error;
            window.console.log = this.log.bind(this);
            window.console.info = this.info.bind(this);
            window.console.warn = this.warn.bind(this);
            window.console.error = this.error.bind(this);
        }
    }
</script>