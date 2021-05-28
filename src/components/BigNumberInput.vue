<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto flex-grow-1">
            <input type="text" class="form-control bg-dark text-white" required pattern="^(-|ee)?\d+\.?\d*(e\d+)?$" :id="id" :name="id" v-model.trim="value" @blur="normalize" />
        </div>
        <div class="col-auto" v-if="$slots.help">
            <span class="form-text"><slot name="help"></slot></span>
        </div>
    </div>
</template>

<script>
    import { v4 as uuid } from 'uuid';
    import { BigNumber } from '@/lib/bignumber';

    export default {
        props: {
            modelValue: BigNumber,
            decimals: Number
        },
        data() {
            return {
                id: uuid()
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue.toString(this.decimals || 4);
                },
                set(val) {
                    if (this.modelValue.parse(val)) {
                        this.$emit('update:modelValue', this.modelValue);
                    }
                }
            }
        },
        methods: {
            normalize() {
                this.modelValue.normalize();
                this.$emit('update:modelValue', this.modelValue);
            }
        },
        mounted() {

        },
        created() {

        }
    }
</script>