<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto flex-grow-1">
            <input type="datetime-local" required class="form-control bg-dark text-white" :id="id" :valueAsNumber="value" @input="value = $event.target.value" />
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
            modelValue: Date,
        },
        data() {
            return {
                id: uuid()
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue.getTime();
                },
                set(val) {
                    this.$emit('update:modelValue', new Date(val));
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