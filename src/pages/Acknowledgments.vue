<style lang="scss">
    @import "~@/styles/variables";

    ul.i18n {
        column-count: 1;
        column-gap: 20px;
        @include media-breakpoint-between(md, lg) {
            column-count: 2;
        }
        @include media-breakpoint-between(lg, xl) {
            column-count: 3;
        }
        @include media-breakpoint-up(xl) {
            column-count: 4;
        }

        > li {
            display: inline-block;
            width: 100%;
        }
    }

    ul.oss {
        column-count: 1;
        column-gap: 20px;
        @include media-breakpoint-up(lg) {
            column-count: 2;
        }

        > li {
            display: inline-block;
            width: 100%;
        }
    }
</style>

<template>
    <div class="row justify-content-center">
        <div class="col-12">
            <div class="card mb-3">
                <h4 class="card-header text-white bg-primary">{{ i18n.get('InstructionsSectionTitle16') }}</h4>
                <div class="card-body">
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <h5>Exponential Idle game by <kbd>Gilles-Philippe Paillé @ Conic Games</kbd></h5>
                            <p>
                                Download and play the game at:<br />
                                <a rel="noopener" href="https://conicgames.github.io/exponentialidle/index.html">https://conicgames.github.io/exponentialidle/index.html</a>
                            </p>
                            <p>Reddit Community: <a rel="noopener" href="https://www.reddit.com/r/ExponentialIdle" target="_blank">https://www.reddit.com/r/ExponentialIdle</a>
                            </p>
                            <p>Discord Community: <a rel="noopener" href="https://discord.gg/S9UheTC" target="_blank">https://discord.gg/S9UheTC</a></p>
                            <hr />
                            <h5>Permanent level star optimizer by <kbd>Eaux Tacous#1021</kbd></h5>
                            <p>
                                Another implementation of the optimizer here:<br />
                                <a rel="noopener" href="https://conicgames.github.io/exponentialidle/stars.html" target="_blank">https://conicgames.github.io/exponentialidle/stars.html</a>
                            </p>
                            <p>
                                Optimizer code repository here:<br />
                                <a rel="noopener" href="https://github.com/1ekf/ExidleStars" target="_blank">https://github.com/1ekf/ExidleStars</a>
                            </p>
                            <p>
                                Optimizer code license here:<br />
                                <a rel="noopener" href="https://github.com/1ekf/ExidleStars/blob/main/LICENSE" target="_blank">https://github.com/1ekf/ExidleStars/blob/main/LICENSE</a>
                            </p>
                            <hr />
                            <h5>Referenced the student optimizer by <kbd>Niedzielan</kbd></h5>
                            <p>
                                Another implementation of the optimizer here:<br />
                                <a rel="noopener" href="https://conicgames.github.io/exponentialidle/students.html" target="_blank">https://conicgames.github.io/exponentialidle/students.html</a>
                            </p>
                            <p>
                                Optimizer code repository here:<br />
                                <a rel="noopener" href="https://github.com/Niedzielan/ExponentialIdleStudentOptimiser" target="_blank">https://github.com/Niedzielan/ExponentialIdleStudentOptimiser</a>
                            </p>
                            <p>
                                Optimizer code license here:<br />
                                <a rel="noopener" href="https://github.com/Niedzielan/ExponentialIdleStudentOptimiser/blob/main/LICENSE" target="_blank">https://github.com/Niedzielan/ExponentialIdleStudentOptimiser/blob/main/LICENSE</a>
                            </p>
                            <hr />
                            <p>
                                Favicon made by <a rel="noopener" href="https://www.freepik.com" title="Freepik">Freepik</a> from
                                <a rel="noopener" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
                            </p>
                            <hr />
                            <h5>Use the donate features in-game to support the game developer!</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card mb-3">
                <h4 class="card-header text-white bg-primary">{{ i18n.get('InstructionsSectionDesc16a') }}</h4>
                <div class="card-body">
                    <ul class="i18n">
                        <li v-for="[lang, name] in languages">
                            <strong><u>{{ name }}</u></strong>
                            <ul>
                                <li v-for="translator of i18n.translators(lang).split(',')">{{ translator.trim() }}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="card">
                <h4 class="card-header text-white bg-primary">OSS Attributions</h4>
                <div class="card-body">
                    <ul class="oss">
                        <li v-for="[name, details] in oss">
                            <strong><u>{{ name }}</u></strong>
                            <ul>
                                <li v-if="details.publisher"><strong>Author:</strong> {{ details.publisher }}</li>
                                <li><strong>License:</strong> {{ details.licenses }}</li>
                                <li v-if="details.repository"><strong>Repository:</strong> <a rel="noopener" :href="details.repository" target="_blank">{{ details.repository }}</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    const oss = (await import(/* webpackChunkName: 'oss' */ '@/data/oss.json')).default;

    export default {
        computed: {
            languages() {
                return Array.from(this.i18n.languages.entries());
            },
            oss() {
                return Object.entries(oss);
            },
        },
    };
</script>