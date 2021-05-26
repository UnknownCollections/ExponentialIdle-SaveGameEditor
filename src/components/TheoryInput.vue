<template>
    <expandable-card>
        <template #title>
            #{{ theoryId + 1 }}. {{ this.name }}
        </template>
        <template #content>
            <dynamic-input v-model="unlocked">
                <template #label>{{ i18n.fmt('UpgradeXiUpDesc1', this.name) }}</template>
            </dynamic-input>
            <dynamic-input v-model="currencies">
                <template #label>{{ i18n.get('InstructionsSectionTitle23') }}</template>
            </dynamic-input>
            <dynamic-input v-for="(_, idx) of upgrades" v-model="upgrades[idx].level">
                <template #label>{{ i18n.get('MainPageUpgrades') }} #{{ idx + 1 }}</template>
            </dynamic-input>
            <dynamic-input v-for="(_, idx) of permanentUpgrades" v-model="permanentUpgrades[idx].level">
                <template #label>{{ i18n.get('TheoryPanelPermanent') }} {{ i18n.get('MainPageUpgrades') }} #{{ idx + 1 }}</template>
            </dynamic-input>
            <dynamic-input v-for="(_, idx) of milestoneUpgrades" v-model="milestoneUpgrades[idx].level">
                <template #label>{{ i18n.get('PublicationPopupMilestones') }} {{ i18n.get('MainPageUpgrades') }} #{{ idx + 1 }}</template>
            </dynamic-input>
            <dynamic-input v-model="totalMilestones">
                <template #label>{{ i18n.get('PublicationPopupMilestones') }}</template>
            </dynamic-input>
            <dynamic-input v-model="lastPublication">
                <template #label>{{ i18n.fmt('MathExpPrevValueOf', i18n.get('PublicationPopupPublish')) }}</template>
            </dynamic-input>
            <dynamic-input v-model="state">
                <template #label>{{ i18n.get('SettingsPopupTitle') }}</template>
            </dynamic-input>
        </template>
    </expandable-card>
</template>

<script>
    import DynamicInput from '@/components/DynamicInput';
    import { BigNumber } from '@/lib/bignumber';
    import ExpandableCard from '@/components/ExpandableCard';

    export default {
        props: {
            modelValue: String,
            theoryId: Number
        },
        data() {
            return {
                unlocked: false,
                currencies: [],
                upgrades: [],
                permanentUpgrades: [],
                milestoneUpgrades: [],
                tau: new BigNumber(),
                autobuyerActive: false,
                totalMilestones: 0,
                lastPublication: new BigNumber(),
                state: '',
                lastUpdateStr: '',
            }
        },
        watch: {
            unlocked() {
                this.update();
            },
            currencies() {
                this.update();
            },
            upgrades() {
                this.update();
            },
            permanentUpgrades() {
                this.update();
            },
            milestoneUpgrades() {
                this.update();
            },
            tau() {
                this.update();
            },
            autobuyerActive() {
                this.update();
            },
            totalMilestones() {
                this.update();
            },
            lastPublication() {
                this.update();
            },
            state() {
                this.update();
            },
        },
        mounted() {
            this.parse(this.modelValue);
            this.lastUpdateStr = this.build();
        },
        computed: {
            name() {
                switch (this.theoryId) {
                    case 0:
                        return this.i18n.get('TheoryRecurrenceRelationsName');
                    case 1:
                        return this.i18n.get('TheoryDifferentialCalculusName');
                    case 2:
                        return this.i18n.get('TheoryLinearAlgebraName');
                    case 3:
                        return this.i18n.get('TheoryPolynomialsName');
                    case 4:
                        return this.i18n.get('TheoryLogisticFunctionName');
                    case 5:
                        return this.i18n.get('TheoryIntegralCalculusName');
                    case 6:
                        return this.i18n.get('TheoryNumericalMethodsName');
                    case 7:
                        return this.i18n.get('TheoryChaosTheoryName');
                    case 8:
                        return this.i18n.get('TheoryConvergenceTestName');
                    default:
                        return this.i18n.fmt('StudentsResearchTheoriesTitle', this.theoryId);
                }
            }
        },
        methods: {
            update() {
                const val = this.build();
                if (this.lastUpdateStr !== val) {
                    this.lastUpdateStr = val;
                    this.$emit('update:modelValue', val);
                }
            },
            build() {
                const parts = [];
                parts.push(`L${this.unlocked ? '1': '0'}`);

                const currencies = [];
                for (const currency of this.currencies) {
                    currencies.push(currency.toString(3));
                }
                parts.push('C' + currencies.join('|'));

                const upgrades = [];
                for (const upgrade of this.upgrades) {
                    upgrades.push(`${upgrade.id} ${upgrade.level} ${upgrade.autoBuyable ? '1': '0'}`);
                }
                parts.push('U' + upgrades.join('|'));

                const permanentUpgrades = [];
                for (const upgrade of this.permanentUpgrades) {
                    permanentUpgrades.push(`${upgrade.id} ${upgrade.level}`);
                }
                parts.push('P' + permanentUpgrades.join('|'));

                const milestoneUpgrades = [];
                for (const upgrade of this.milestoneUpgrades) {
                    milestoneUpgrades.push(`${upgrade.id} ${upgrade.level}`);
                }
                parts.push('I' + milestoneUpgrades.join('|'));

                parts.push('T' + this.tau.toString(2));

                parts.push(`A${this.autobuyerActive ? '1': '0'}`);

                parts.push(`M${this.totalMilestones}`);

                parts.push(`B${this.lastPublication.toString(2)}`);

                parts.push(`S${this.state}`);

                return parts.join(';');
            },
            parse(str) {
                for (const part of str.split(';').filter(Boolean)) {
                    const id = part[0];
                    const data = part.slice(1);

                    if (id === 'L') {
                        this.unlocked = data === '1';
                    } else if (id === 'C') {
                        this.currencies = [];
                        for (const currency of data.split('|').filter(Boolean)) {
                            this.currencies.push(BigNumber.from(currency));
                        }
                    } else if (id === 'U') {
                        this.upgrades = [];
                        for (const upgrade of data.split('|').filter(Boolean)) {
                            const upgradeParts = upgrade.split(' ');
                            this.upgrades.push({
                                id: parseInt(upgradeParts[0]),
                                level: parseInt(upgradeParts[1]),
                                autoBuyable: upgradeParts[2] === '1'
                            });
                        }
                    } else if (id === 'P') {
                        this.permanentUpgrades = [];
                        for (const upgrade of data.split('|').filter(Boolean)) {
                            const upgradeParts = upgrade.split(' ');
                            this.permanentUpgrades.push({
                                id: parseInt(upgradeParts[0]),
                                level: parseInt(upgradeParts[1]),
                            });
                        }
                    } else if (id === 'I') {
                        this.milestoneUpgrades = [];
                        for (const upgrade of data.split('|').filter(Boolean)) {
                            const upgradeParts = upgrade.split(' ');
                            this.milestoneUpgrades.push({
                                id: parseInt(upgradeParts[0]),
                                level: parseInt(upgradeParts[1]),
                            });
                        }
                    } else if (id === 'T') {
                        this.tau.parse(data)
                    } else if (id === 'A') {
                        this.autobuyerActive = data === '1';
                    } else if (id === 'M') {
                        this.totalMilestones = parseInt(data);
                    } else if (id === 'B') {
                        this.lastPublication.parse(data);
                    } else {
                        this.state = data;
                    }
                }
            }
        },
        components: {
            DynamicInput,
            ExpandableCard
        }
    }
</script>