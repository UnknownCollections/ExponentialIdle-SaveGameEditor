<template>
    <importer v-model="encodedSaveGame" :rows="loaded ? 3 : 6" />

    <div class="btn-group mb-3 d-flex">
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100" @click="paste">Paste from clipboard</button>
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100" v-if="loaded" @click="update">Update save</button>
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100" v-if="loaded" @click="copy">Copy to clipboard</button>
    </div>

    <div class="row" v-if="loaded">
        <div class="col-12">
            <hr />
        </div>
    </div>

    <div class="row mt-3" v-if="loaded">

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-clock me-2"></i>{{ i18n.get('AchievementTitle59') }}</template>
                <template #content>
                    <dynamic-input v-model="saveData.data.Session.SessionClosedTimeUtc">
                        <template #label>{{ i18n.get('StatsPopupStatTimeOnline') }}</template>
                        <template #help>{{ i18n.get('ImportPopupImportOffProgTitle') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-star me-2"></i>{{ i18n.get('StarPopupTitle') }}</template>
                <template #content>
                    <dynamic-input v-model="lastUnlockedVariable">
                        <template #label>{{ i18n.fmt('StarBonusVarTitle1', i18n.variableById(Math.min(lastUnlockedVariable + 4, 19))) }}</template>
                        <template #help>{{ i18n.get('StarBonusVarDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.BuyAllButton" @update:model-value="saveData.data.StarBonus.Level2000 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusBuyAllTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusBuyAllDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.VariablesEnable" @update:model-value="saveData.data.StarBonus.Level2001 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusAutoVarTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusAutoVarDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.UpgradesEnable" @update:model-value="saveData.data.StarBonus.Level2002 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusAutoUpTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusAutoUpDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.PrestigeEnable" @update:model-value="saveData.data.StarBonus.Level2003 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusAutoPrestTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusAutoPrestDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.SupremacyEnable" @update:model-value="saveData.data.StarBonus.Level2005 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusAutoSupTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusAutoSupDesc') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Automation.Rate"
                                   @update:model-value="saveData.data.StarBonus.Level2004 = $event <= 625 ? 3 : $event <= 1250 ? 2 : $event <= 2500 ? 1 : 0">
                        <template #label>{{ i18n.fmt('StarBonusAutoRateTitle', '2x') }}</template>
                        <template #help>{{ i18n.get('StarBonusAutoRateDesc') }}. Length of time in milliseconds between upgrades.</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Time.AccelerationEnabled" @update:model-value="saveData.data.StarBonus.Level3000 = $event ? 1 : 0">
                        <template #label>{{ i18n.get('StarBonusAccButtonTitle') }}</template>
                        <template #help>{{ i18n.get('StarBonusAccButtonDesc') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-star me-2"></i>{{ i18n.get('TheoryPanelPermanent') }} {{ i18n.get('InstructionsSectionTitle18') }}</template>
                <template #content>
                    <button class="btn btn-primary btn-lg w-100 mb-3" @click="optimizeStars">Optimize {{ i18n.get('AchievementCatStars') }}</button>
                    <dynamic-input
                        v-for="key of Object.keys(saveData.data.Variable).filter(k => k.startsWith('FreeLevel')).sort(collator.compare).slice(1)"
                        v-model="saveData.data.Variable[key]"
                        @update:model-value="saveData.data.StarBonus[`Level${4000 + parseInt(key.replace(/^[a-zA-Z]+/, ''))}`] = $event"
                    >
                        <template #label>{{ i18n.fmt('StarBonusPermLevelTitle', i18n.variableById(key.replace(/^[a-zA-Z]+/, ''))) }}</template>
                        <template #help>{{ i18n.fmt('StarBonusPermLevelDesc', i18n.variableById(key.replace(/^[a-zA-Z]+/, ''))) }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-currency-dollar me-2"></i>{{ i18n.get('StudentsName') }}</template>
                <template #content>
                    <button class="btn btn-primary btn-lg w-100 mb-3" @click="optimizeStudents">Optimize {{ i18n.get('StudentsName') }}</button>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel0">
                        <template #label>φ<sub>1</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel1">
                        <template #label>φ<sub>2</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel2">
                        <template #label>φ<sub>3</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel3">
                        <template #label>φ<sub>4</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel4">
                        <template #label>φ<sub>5</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel5">
                        <template #label>φ<sub>6</sub></template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel101">
                        <template #label>{{ i18n.fmt('TheoryUpgrade12', '↑', 'φ', '0.1') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Research.BoughtLevel103">
                        <template #label>{{ i18n.fmt('ResearchTheoryMultiplierTitle', '⨉', 'σt') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-gift me-2"></i>{{ i18n.get('AchievementCatMinigames') }}</template>
                <template #content>
                    <dynamic-input v-model="saveData.data.Minigames.FifteenAvailable">
                        <template #label>{{ i18n.fmt('UpgradeXiUpDesc1', i18n.get('Minigame1')) }}</template>
                        <template #help>{{ i18n.get('Minigame3') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Minigames.TorusAvailable">
                        <template #label>{{ i18n.fmt('UpgradeXiUpDesc1', i18n.get('Minigame2')) }}</template>
                        <template #help>{{ i18n.get('Minigame4') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Minigames.ArrowAvailable">
                        <template #label>{{ i18n.fmt('UpgradeXiUpDesc1', i18n.get('MinigameArrowGameTitle')) }}</template>
                        <template #help>{{ i18n.get('MinigameArrowGameDescription') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-calculator me-2"></i>{{ i18n.get('MathExpFunction') }}</template>
                <template #content>
                    <dynamic-input v-model="saveData.data.Time.Delta">
                        <template #label>dt</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Time.DeltaMultiplier">
                        <template #label>{{ i18n.fmt('TheoryUpgrade10DescB', 'dt', '') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Time.Value">
                        <template #label>t</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Function.Value">
                        <template #label>f(t)</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Function.B">
                        <template #label>b</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-currency-dollar me-2"></i>{{ i18n.get('InstructionsSectionTitle23') }}</template>
                <template #content>
                    <dynamic-input v-model="saveData.data.PrestigeCurrency.Prestige">
                        <template #label>μ</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.PrestigeCurrency.Supremacy">
                        <template #label>ψ</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Students.Amount">
                        <template #label>σ</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-circle-half me-2"></i>{{ i18n.get('TheoryPopupTitle') }}</template>
                <template #content>
                    <theory-input
                        v-for="key of Object.keys(saveData.data.Theory)"
                        v-model="saveData.data.Theory[key]"
                        @update:model-value="updateUnlockedTheoryCount"
                        :theory-id="parseInt(key)" class="mb-2"
                    />
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-stars me-2"></i>{{ i18n.get('AchievementCatStars') }}</template>
                <template #content>
                    <dynamic-input v-model="saveData.data.Stars.TapAmount2">
                        <template #label>{{ i18n.get('StatsPopupStatTapStars') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Stars.TickAmount2">
                        <template #label>{{ i18n.get('StatsPopupStatTickStars') }}</template>
                    </dynamic-input>
                    <dynamic-input v-model="saveData.data.Stars.MinigameAmount2">
                        <template #label>{{ i18n.get('StatsPopupStatGameStars') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12 mb-3">
            <expandable-card>
                <template #title><i class="bi bi-trophy me-2"></i>{{ i18n.get('AchievementPage1') }}</template>
                <template #content>
                    <dynamic-input v-for="key of Object.keys(saveData.data.Achievement).filter(k => k.startsWith('Unlocked')).sort(collator.compare)"
                                   v-model="saveData.data['Achievement'][key]">
                        <template #label>{{ i18n.get(`AchievementTitle${key.replace(/^[a-zA-Z]+/, '')}`) }}</template>
                        <template #help>{{ i18n.get(`AchievementDesc${key.replace(/^[a-zA-Z]+/, '')}`, '') }}</template>
                    </dynamic-input>
                </template>
            </expandable-card>
        </div>

        <div class="col-12">
            <expandable-card>
                <template #title>
                    <i class="bi bi-exclamation-octagon-fill me-2 text-danger"></i>Raw Data
                </template>
                <template #content>
                    <div class="col-12" v-for="(data, section) of saveData.data">
                        <div v-if="typeof data === 'object' && Object.keys(data).length > 0">
                            <expandable-card>
                                <template #title>{{ Case.pascalCase2Words(section) }}</template>
                                <template #content>
                                    <dynamic-input v-for="key of Object.keys(data)" v-model="saveData.data[section][key]">
                                        <template #label>{{ Case.pascalCase2Words(key) }}</template>
                                    </dynamic-input>
                                </template>
                            </expandable-card>
                            <hr />
                        </div>
                        <div v-else>
                            <expandable-card>
                                <template #title>{{ Case.pascalCase2Words(section) }}</template>
                                <template #content>
                                    <dynamic-input v-model="saveData.data[section]" />
                                </template>
                            </expandable-card>
                            <hr />
                        </div>
                    </div>
                </template>
            </expandable-card>
        </div>
    </div>
</template>

<script>
    import { Parser } from '@/lib/parser';
    import DynamicInput from '@/components/DynamicInput';
    import { Case } from '@/lib/case';
    import ExpandableCard from '@/components/ExpandableCard';
    import TheoryInput from '@/components/TheoryInput';
    import Importer from '@/components/Importer';
    import { calculateStars, parseStarCalculation, SigmaResearch } from '@/lib/optimizers';

    const LOCAL_STORAGE_SAVE_KEY = 'STORED_SAVE_GAME';
    const preloadSaveGame = await (async () => {
        if (__DEBUG__) {
            const testSaveGames = await import(/* webpackChunkName: 'encrypted_save_games' */ '@/data/tests/encrypted_save_games.json');
            return Array.from(testSaveGames).pop();
        }
        return window.localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);
    })();

    export default {
        data() {
            return {
                encodedSaveGame: preloadSaveGame ?? '',
                saveData: new Parser(),
                Case,
                collator: new Intl.Collator(undefined, {
                    numeric: true,
                    sensitivity: 'base',
                }),
            };
        },
        computed: {
            loaded() {
                return this.saveData && this.saveData.data && Object.keys(this.saveData.data).length;
            },
            lastUnlockedVariable: {
                get() {
                    return Object.keys(this.saveData.data.Variable) // List of save data keys for Variables
                                 .filter(k => k.startsWith('IsAvailable')) // Looking at only if they are available
                                 .sort(this.collator.compare) // Sort list from 0 ->
                                 .slice(4) // Remove default variables (x, y, z, s)
                                 .map(k => this.saveData.data.Variable[k])  // Get the unlock status for the unlockable variables
                                 .filter(Boolean).length; // Count the number of enabled unlocks
                },
                set(val) {
                    if (typeof val !== 'number' || val < 0 || val > 16) {
                        return;
                    }
                    const variableUpgrades = Object.keys(this.saveData.data.Variable) // List of save data keys for Variables
                                                   .filter(k => k.startsWith('IsAvailable')) // Looking at only if they are available
                                                   .sort(this.collator.compare) // Sort list from 0 ->
                                                   .slice(4);  // Remove default variables (x, y, z, s)
                    for (const idx in variableUpgrades) {
                        this.saveData.data.Variable[variableUpgrades[idx]] = idx < val;
                    }
                    this.saveData.data.StarBonus.Level1000 = val;
                },
            },
        },
        watch: {
            encodedSaveGame(b64Data) {
                if (!b64Data) {
                    this.saveData.clear();
                } else {
                    try {
                        this.saveData.load(this.encodedSaveGame);
                        window.localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, this.encodedSaveGame);
                    } catch (e) {
                        window.localStorage.removeItem(LOCAL_STORAGE_SAVE_KEY);
                        console.error(e);
                        this.saveData.clear();
                    }
                }
            },
        },
        mounted() {
            if (this.encodedSaveGame) {
                try {
                    this.saveData.load(this.encodedSaveGame);
                } catch (e) {
                    this.encodedSaveGame = '';
                    window.localStorage.removeItem(LOCAL_STORAGE_SAVE_KEY);
                    console.error(e);
                    this.saveData.clear();
                }
            }
        },
        methods: {
            async acquirePermission(permission) {
                if (!navigator.permissions) {
                    return true;
                }
                const result = await navigator.permissions.query({
                    name: permission,
                });
                return result.state !== 'denied';
            },
            updateUnlockedTheoryCount() {
                const currentlyUnlockedTheoryCount = Object.values(this.saveData.data.Theory).reduce((a, t) => a + t.includes('L1;'), 0);
                this.saveData.data.Researches.MaxUnlockedTheories = Math.max(this.saveData.data.Researches.MaxUnlockedTheories, currentlyUnlockedTheoryCount);
            },
            async paste() {
                if (!navigator.clipboard || !(await this.acquirePermission('clipboard-read'))) {
                    console.error('Automatic paste functionality is not enabled in your browser.');
                    return;
                }
                try {
                    this.encodedSaveGame = await navigator.clipboard.readText();
                    console.info('Save game loaded from clipboard.');
                } catch (e) {
                    console.error(`Automatic paste failed: ${e}`);
                }
            },
            update() {
                this.encodedSaveGame = this.saveData.save();
            },
            async copy() {
                if (!navigator.clipboard || !(await this.acquirePermission('clipboard-write'))) {
                    console.error('Automatic copy functionality is not enabled in your browser.');
                    return;
                }
                try {
                    await navigator.clipboard.writeText(this.encodedSaveGame);
                    console.info('Save game copied to clipboard.');
                } catch (e) {
                    console.error(`Automatic copy failed: ${e}`);
                }
            },
            async optimizeStars(e) {
                e.target.disabled = true;
                try {
                    if (this.lastUnlockedVariable !== 16) {
                        console.error('Unable to calculate optimal stars, all variables must be unlocked');
                        return;
                    }

                    const ft = this.saveData.data.Function.Value.toString();
                    if (!ft.includes('ee')) {
                        console.error('Unable to calculate optimal stars, f(t) too small. Must be greater than ee10');
                        return;
                    }
                    const ftSize = parseInt(ft.split('ee').pop());
                    if (ftSize < 10) {
                        console.error('Unable to calculate optimal stars, f(t) too small. Must be greater than ee10');
                        return;
                    }

                    const availableStars = this.saveData.data.Stars.TapAmount2.toNumber() + this.saveData.data.Stars.TickAmount2.toNumber() +
                                           this.saveData.data.Stars.MinigameAmount2.toNumber() - this.saveData.data.Stars.PermanentUsedAmount2.toNumber();

                    if (availableStars <= 50) {
                        console.error('Unable to calculate optimal stars, available stars too small. Must have more than 50 free');
                        return;
                    }

                    const supremacyUpgradeLevel = this.saveData.data.Upgrade.Level3002;

                    const data = await calculateStars(ft.split('ee').pop(), availableStars.toFixed(0), supremacyUpgradeLevel);
                    if (!data) {
                        console.error('Unable to calculate optimal stars, empty calculation result');
                        return;
                    }

                    for (const [index, variableLevel] of parseStarCalculation(data).entries()) {
                        const level = parseInt(variableLevel.level);
                        this.saveData.data.Variable[`FreeLevel${index + 1}`] = level;
                        this.saveData.data.StarBonus[`Level${4000 + index + 1}`] = level;
                    }
                    console.info('Successfully updated all permenant variable levels');
                } finally {
                    e.target.disabled = false;
                }
            },
            async optimizeStudents(e) {
                e.target.disabled = true;
                try {
                    const ft = this.saveData.data.Function.Value.toString();
                    if (!ft.includes('ee')) {
                        console.error('Unable to calculate optimal students, f(t) too small. Must be greater than ee1');
                        return;
                    }
                    const ftSize = parseInt(ft.split('ee').pop());

                    const totalStars = this.saveData.data.Stars.TapAmount2.toNumber() + this.saveData.data.Stars.TickAmount2.toNumber() +
                                       this.saveData.data.Stars.MinigameAmount2.toNumber();

                    const currentlyUnlockedTheoryCount = Object.values(this.saveData.data.Theory).reduce((a, t) => a + t.includes('L1;'), 0);
                    const totalStudents = this.saveData.data.Students.Amount.toNumber() - [
                        20, 5, 5, 5, 5, 5, 5, 5, 40,
                    ].slice(0, currentlyUnlockedTheoryCount).reduce((t, a) => t + a, 0);

                    if (totalStudents === 0) {
                        console.error('Unable to calculate optimal students, you have no free students.');
                        return;
                    }

                    // t, ftEE, dt, stars, dtBonus, isAccelerating, accelerationBonus
                    const optimizer = new SigmaResearch(
                        this.saveData.data.Time.Value.toString(),
                        ftSize,
                        this.saveData.data.Time.Delta.toString(),
                        totalStars,
                        this.saveData.data.Time.DeltaMultiplier.toString(),
                        false,
                        1.0,
                    );
                    const distribution = optimizer.distributeSigma(totalStudents);
                    for (const research of Object.values(distribution)) {
                        this.saveData.data.Research[`BoughtLevel${research.id}`] = research.level;
                    }
                    console.info('Successfully optimized students.');
                } finally {
                    e.target.disabled = false;
                }
            },
        },
        components: {
            Importer,
            TheoryInput,
            DynamicInput,
            ExpandableCard,
        },
    };
</script>
