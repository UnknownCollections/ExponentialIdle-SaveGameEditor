<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto flex-grow-1">
            <input type="text" class="form-control bg-dark text-white" :id="id" :name="id" v-model.trim="value" />
        </div>
        <div class="col-auto" v-if="$slots.help">
            <span class="form-text"><slot name="help"></slot></span>
        </div>
    </div>
</template>

<script>
    import { v4 as uuid } from 'uuid';
    export default {
        props: {
            modelValue: String,
        },
        data() {
            return {
                id: uuid()
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    const type = typeof val;
                    if (type !== 'string') {
                        if (type === 'undefined' || val === null) {
                            val = '';
                        } else {
                            val = String(val).toString();
                        }
                    }
                    this.$emit('update:modelValue', val);
                }
            }
        },
        methods: {

        },
        mounted() {

        },
        created() {

        }
    }
</script>