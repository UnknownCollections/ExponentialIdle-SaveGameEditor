<style lang="scss">
    #savegame-input {
        resize: none;
        overflow: hidden;
    }
</style>

<template>
    <div class="row">
        <div class="col-12">
            <div class="alert alert-dark d-flex align-items-center p-1">
                <h3 class="text-danger mx-2 mb-0"><i class="bi bi-exclamation-triangle" /></h3>
                <div>
                    This editor requires that you have purchased either the <kbd>{{ i18n.get('RewardsPopupPermTitle') }}</kbd> or one of the <kbd>{{ i18n.get('DonateTitle') }}</kbd> options. <strong>Support the game developer!</strong>
                </div>
            </div>
            <div class="alert alert-dark d-flex align-items-center p-1">
                <h3 class="text-warning mx-2 mb-0"><i class="bi bi-exclamation-triangle" /></h3>
                <div>
                    There is <strong><u>NO</u></strong> warranty or support for any broken or missing save games as a result of using this app. <strong>Back up your original save game somewhere else!</strong>
                </div>
            </div>

            <div>
                <label for="savegame-input" class="text-white d-flex align-items-center">
                    {{ i18n.get('ImpExpPopupImpClip') }}
                    <button type="button" class="btn btn-link text-info" ref="saveGameHelp">
                        <i class="bi bi-question-circle"></i>
                    </button>
                </label>
                <textarea class="form-control bg-dark text-white" id="savegame-input" v-model="value" @click="$event.target.select()" :rows="rows"></textarea>

                <div ref="saveGameHelpTooltip" class="text-start">
                    {{ i18n.get('SettingsPopupInstrB') }}<br/>
                    <ol class="text-start ps-3 mt-1 mb-1">
                        <li>{{ i18n.get('SettingsPopupTitle') }} (<i class="bi bi-gear"></i>)</li>
                        <li>{{ i18n.get('ImpExpPopupTitle') }}</li>
                        <li>{{ i18n.get('ImpExpPopupExpClip') }}</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Tooltip } from 'bootstrap';

    export default {
        props: {
            modelValue: String,
            rows: Number
        },
        data() {
            return {
                inputDebounceTimer: null,
            }
        },
        mounted() {
            new Tooltip(this.$refs.saveGameHelp, {
                title: this.$refs.saveGameHelpTooltip.parentElement.removeChild(this.$refs.saveGameHelpTooltip),
                html: true,
            });
        },
        computed: {
            value: {
                get() {
                    return this.modelValue;
                },
                set(val) {
                    if (this.inputDebounceTimer) {
                        clearTimeout(this.inputDebounceTimer);
                    }
                    this.inputDebounceTimer = setTimeout(() => {
                        this.$emit('update:modelValue', val);
                        this.inputDebounceTimer = null;
                    }, 1000);
                }
            }
        }
    }
</script>