<template>
    <div class="row g-3 align-items-center">
        <div class="col-auto" v-if="$slots.label">
            <label :for="id" class="col-form-label">
                <slot name="label"></slot>
            </label>
        </div>
        <div class="col-auto flex-grow-1">
            <input v-if="isLocalDateTimeSupported" type="datetime-local" required class="form-control bg-dark text-white" :id="id" :name="id" :valueAsNumber="value.getTime()" @input="value = $event.target.value" />
            <div v-else-if="isDateSupported && isTimeSupported">
                <input type="date" required class="form-control bg-dark text-white" :id="id" :name="id" :valueAsNumber="value.getTime()" @input="updateDate($event.target.valueAsDate)">
                <input type="time" required class="form-control bg-dark text-white" :id="`${id}_time`" :name="`${id}_time`" :valueAsNumber="value.getTime()" @input="updateTime($event.target.valueAsDate)">
            </div>
            <input v-else type="text" required class="form-control bg-dark text-white" :id="id" :name="id" :value="value.toISOString()" @input="value = $event.target.value" pattern="\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)" />
        </div>
        <div class="col-auto" v-if="$slots.help">
            <span class="form-text"><slot name="help"></slot></span>
        </div>
    </div>
</template>

<script>
    import { v4 as uuid } from 'uuid';

    function checkDateInput(type) {
        const input = document.createElement('input');
        input.setAttribute('type', type);
        if (input.type !== type) {
            return false;
        }
        const notADateValue = 'not-a-date';
        input.setAttribute('value', notADateValue);
        return (input.value !== notADateValue);
    }

    const isLocalDateTimeSupported = checkDateInput('datetime-local');
    const isDateTimeSupported = checkDateInput('datetime');
    const isDateSupported = checkDateInput('date');
    const isTimeSupported = checkDateInput('time');

    export default {
        props: {
            modelValue: Date,
        },
        data() {
            return {
                id: uuid(),
                isLocalDateTimeSupported,
                isDateTimeSupported,
                isDateSupported,
                isTimeSupported
            }
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    if (val instanceof Date) {
                        this.$emit('update:modelValue', val);
                    } else if (typeof val === 'string') {
                        if (val !== '') {
                            this.$emit('update:modelValue', new Date(val));
                        }
                    } else {
                        console.error(`Cannot process date|time value: ${val}`);
                    }
                }
            }
        },
        methods: {
            updateDate(date) {
                const updatedDate = new Date(this.modelValue);
                updatedDate.setUTCMonth(date.getUTCMonth());
                updatedDate.setUTCDate(date.getUTCDate());
                updatedDate.setUTCFullYear(date.getUTCFullYear());
                this.$emit('update:modelValue', updatedDate);
            },
            updateTime(time) {
                const updatedDate = new Date(this.modelValue);
                updatedDate.setUTCHours(time.getUTCHours());
                updatedDate.setUTCMinutes(time.getUTCMinutes());
                updatedDate.setUTCSeconds(time.getUTCSeconds(), time.getUTCMilliseconds());
                this.$emit('update:modelValue', updatedDate);
            },
        },
        mounted() {

        },
        created() {

        }
    }
</script>