<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto">
            <div class="form-check form-switch">
                <input class="form-check-input" required type="checkbox" :id="id" v-model="value">
            </div>
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
            modelValue: Boolean,
        },
        data() {
            return {
                id: uuid(),
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
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