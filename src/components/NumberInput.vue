<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto flex-grow-1">
            <input type="text" required pattern="-?\d*\.{0,1}\d+" class="form-control bg-dark text-white" :id="id" :name="id" v-model.number="value" />
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
            modelValue: Number,
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
                    if (val === '') {
                        return;
                    }
                    if (typeof val !== 'number') {
                        val = parseInt(val);
                    }
                    if (isNaN(val)) {
                        return;
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