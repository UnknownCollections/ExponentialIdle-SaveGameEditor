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

    export default {
        name: 'DynamicInput',
        props: ['modelValue'],
        computed: {
            type() {
                const type = typeof this.value;
                if (type === 'boolean') {
                    return BooleanInput;
                }
                if (type === 'number') {
                    return NumberInput;
                }
                if (type === 'string') {
                    return StringInput;
                }
                if (Array.isArray(this.value)) {
                    return ArrayInput;
                }
                if (this.value instanceof BigNumber) {
                    return BigNumberInput;
                }
                if (this.value instanceof Date) {
                    return DateInput;
                }
                return false;
            },
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    this.$emit('update:modelValue', val);
                },
            },
        },
    };
</script>