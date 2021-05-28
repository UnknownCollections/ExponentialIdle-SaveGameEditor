<template>
    <div>
        <div class="d-flex align-items-center">
            <slot name="label"></slot>
            <button type="button" class="btn btn-sm btn-link text-success" @click="addNew">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z" />
                </svg>
            </button>
        </div>
        <div class="ms-4">
            <component :is="inputType(val)" v-for="(val, idx) in value" :modelValue="value[idx]" @input="value[idx] = $event.target.value" class="mb-1">
                <template #label>
                    #{{ idx + 1 }}
                </template>
                <template #help>
                    <div class="btn-group">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-link text-warning dropdown-toggle" data-bs-toggle="dropdown">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                                    <path
                                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                                    <path
                                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                                </svg>
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <button type="button" class="dropdown-item" v-if="type(val) !== BigNumber" @click="changeType(idx, new BigNumber)">Make big
                                        number
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item" v-if="type(val) !== Boolean" @click="changeType(idx, false)">Make boolean
                                    </button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item" v-if="type(val) !== Date" @click="changeType(idx, new Date)">Make date</button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item" v-if="type(val) !== Number" @click="changeType(idx, 0)">Make number</button>
                                </li>
                                <li>
                                    <button type="button" class="dropdown-item" v-if="type(val) !== String" @click="changeType(idx, '')">Make string</button>
                                </li>
                            </ul>
                        </div>
                        <button type="button" class="btn btn-link text-danger" @click="value.splice(idx, 1)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                                <path
                                    d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z" />
                            </svg>
                        </button>
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
                BigNumber,
            };
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
            },
        },
    };
</script>