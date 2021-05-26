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
                <i class="h4 mb-0" :class="toast.icon" />
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
                this.add(message, 'bg-primary text-white', 'bi bi-info-circle');
            },
            info(message) {
                this.oInfo.call(this.oConsole, ...arguments);
                this.add(message, 'bg-info text-white', 'bi bi-info-circle');
            },
            warn(message) {
                this.oWarn.call(this.oConsole, ...arguments);
                this.add(message, 'bg-warning text-white', 'bi bi-exclamation-circle');
            },
            error(message) {
                this.oError.call(this.oConsole, ...arguments);
                this.add(message, 'bg-danger text-white', 'bi bi-exclamation-circle');
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