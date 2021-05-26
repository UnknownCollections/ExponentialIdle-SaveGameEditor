<template>
    <footer class="flex-shrink-0 mt-5 py-3 bg-dark">
        <div class="container">
            <div class="row flex-column flex-md-row align-items-center justify-content-between">
                <div class="col-auto mb-2 mb-md-0 text-start">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-translate"></i></span>
                        <select class="form-select bg-dark text-white" id="language-select" v-model="i18n.lang">
                            <option v-for="[lang, name] in i18n.languages" :value="lang">{{ name }}</option>
                        </select>
                    </div>
                </div>
                <div class="col-auto mb-2 mb-md-0 text-center">
                    This website is not affiliated with the game developer. <br /> No information you enter is collected or saved.
                </div>
                <div class="col-auto mb-2 mb-md-0 text-end">
                    Website revision: r{{ i18n.formatNumber(buildNumber) }} <small><em>({{ buildDate.toLocaleString() }})</em></small>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                buildNumber: __BUILD_NUMBER__,
                buildDate: new Date(__BUILD_DATE__),
            }
        }
    }
</script>