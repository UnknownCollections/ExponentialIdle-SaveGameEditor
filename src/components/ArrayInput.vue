<template>
    <div>
        <div class="d-flex align-items-center">
            <slot name="label"></slot> <button type="button" class="btn btn-sm btn-link text-success" @click="addNew"><i class="bi bi-plus-lg"></i></button>
        </div>
        <div class="ms-4">
            <component :is="inputType(val)" v-for="(val, idx) in value" :modelValue="value[idx]" @input="value[idx] = $event.target.value" class="mb-1">
                <template #label>
                    #{{ idx + 1 }}
                </template>
                <template #help>
                    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-link text-warning dropdown-toggle" data-bs-toggle="dropdown">
                                <i class="bi bi-gear"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><button type="button" class="dropdown-item" v-if="type(val) !== BigNumber" @click="changeType(idx, new BigNumber)">Make big number</button></li>
                                <li><button type="button" class="dropdown-item" v-if="type(val) !== Boolean" @click="changeType(idx, false)">Make boolean</button></li>
                                <li><button type="button" class="dropdown-item" v-if="type(val) !== Date" @click="changeType(idx, new Date)">Make date</button></li>
                                <li><button type="button" class="dropdown-item" v-if="type(val) !== Number" @click="changeType(idx, 0)">Make number</button></li>
                                <li><button type="button" class="dropdown-item" v-if="type(val) !== String" @click="changeType(idx, '')">Make string</button></li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-link text-danger" @click="value.splice(idx, 1)"><i class="bi bi-x-lg"></i></button>
                    </div>
                </template>
            </component>
        </div>
    </div>
</template>

<script>
    import BigNumberInput from '@/components/BigNumberInput';
    import BooleanInput from '@/components/BooleanInput';
    import DateInput from '@/components/DateInput';
    import NumberInput from '@/components/NumberInput';
    import StringInput from '@/components/StringInput';
    import { BigNumber } from '@/lib/bignumber';

    export default {
        name: 'ArrayInput',
        props: {
            modelValue: Array,
        },
        data() {
            return {
                items: [],
                BigNumber
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    debugger;
                    this.$emit('update:modelValue', val);
                }
            }
        },
        methods: {
            type(val) {
                const type = typeof val;
                if (type === 'boolean') {
                    return Boolean;
                }
                if (type === 'number') {
                    return Number;
                }
                if (type === 'string') {
                    return String;
                }
                if (val instanceof BigNumber) {
                    return BigNumber;
                }
                if (val instanceof Date) {
                    return Date;
                }
                return false;
            },
            newType(val) {
                const type = typeof val;
                if (type === 'boolean') {
                    return false;
                }
                if (type === 'number') {
                    return 0;
                }
                if (type === 'string') {
                    return '';
                }
                if (val instanceof BigNumber) {
                    return new BigNumber;
                }
                if (val instanceof Date) {
                    return new Date;
                }
                throw 'Unknown type';
            },
            inputType(val) {
                const type = typeof val;
                if (type === 'boolean') {
                    return BooleanInput;
                }
                if (type === 'number') {
                    return NumberInput;
                }
                if (type === 'string') {
                    return StringInput;
                }
                if (val instanceof BigNumber) {
                    return BigNumberInput;
                }
                if (val instanceof Date) {
                    return DateInput;
                }
                return false;
            },
            changeType(idx, type) {
                this.value[idx] = type;
            },
            addNew() {
                this.value.push(this.newType(this.value[this.value.length - 1]));
            }
        },
    }
</script>