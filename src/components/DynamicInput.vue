<template>
    <component v-if="type" :is="type" v-model="value" class="mb-1">
        <template v-for="(_, slot) of $slots" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
        </template>
    </component>
    <div v-else-if="value instanceof Object && Object.getPrototypeOf(value) === Object.prototype">
        <dynamic-input v-for="(val, key) of value" v-model="value[key]">
            <template #label>
                <slot name="label"></slot> > {{ key }}
            </template>
        </dynamic-input>
    </div>
    <div v-else-if="typeof value !== 'undefined' && value !== null">
        <div class="alert-danger">
            Unknown type {{ typeof value }} for {{ value }}
        </div>
    </div>
</template>

<script>
    import ArrayInput from '@/components/ArrayInput';
    import BigNumberInput from '@/components/BigNumberInput';
    import BooleanInput from '@/components/BooleanInput';
    import DateInput from '@/components/DateInput';
    import NumberInput from '@/components/NumberInput';
    import StringInput from '@/components/StringInput';
    import { BigNumber } from '@/lib/bignumber';
    import { markRaw } from 'vue';

    export default {
        name: 'DynamicInput',
        props: ['modelValue'],
        data() {
            return {
                type: this.getComponentFor(this.modelValue),
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    this.$emit('update:modelValue', val);
                },
            },
        },
        methods: {
            getComponentFor(val) {
                const type = typeof val;
                if (type === 'boolean') {
                    return markRaw(BooleanInput);
                }
                if (type === 'number') {
                    return markRaw(NumberInput);
                }
                if (type === 'string') {
                    return markRaw(StringInput);
                }
                if (Array.isArray(val)) {
                    return markRaw(ArrayInput);
                }
                if (val instanceof BigNumber) {
                    return markRaw(BigNumberInput);
                }
                if (val instanceof Date) {
                    return markRaw(DateInput);
                }
                return false;
            }
        }
    };
</script>