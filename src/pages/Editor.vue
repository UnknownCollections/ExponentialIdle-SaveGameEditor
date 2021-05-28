<template>
    <importer v-model="encodedSaveGame" :rows="loaded ? 3 : 6" />

    <div class="btn-group mb-4 d-flex">
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100 text-center" @click="paste">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clipboard me-1 pb-1" viewBox="0 0 16 16">
                <path
                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path
                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
            Paste
        </button>
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100" v-if="loaded" @click="update">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-save me-1 pb-1" viewBox="0 0 16 16">
                <path
                    d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z" />
            </svg>
            Save
        </button>
        <button type="button" class="btn btn-lg btn-outline-secondary text-white border-top-0 w-100" v-if="loaded" @click="copy">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clipboard-plus me-1 pb-1" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z" />
                <path
                    d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                <path
                    d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
            Copy
        </button>
    </div>

    <div class="row mb-3" v-show="!firstTimeUser || loaded">
        <div class="col-12">
            <div class="card bg-dark text-white">
                <div class="card-header d-flex align-items-center">
                    Quick Actions
                    <button type="button" class="btn btn-link text-info p-0 ms-2 d-flex align-items-center" ref="quickActionsHelp">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path
                                d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                        </svg>
                    </button>
                    <div ref="quickActionsHelpTooltip" class="text-start">
                        Quick Actions will automatically:<br />
                        <ol>
                            <li>Load your save from the clipboard</li>
                            <li>Apply the action</li>
                            <li>Save the changes</li>
                            <li>Copy the save back to the clipboard</li>
                        </ol>
                        <strong>Make sure to keep a copy of your save somewhere, just in case!</strong>
                    </div>
                </div>
                <div class="card-body btn-group d-flex p-0">
                    <button type="button" class="btn btn-lg btn-outline-secondary text-white w-100 text-center" @click="auto($event, addWeek)">
                        +1 Offline Week
                    </button>
                    <button type="button" class="btn btn-lg btn-outline-secondary text-white w-100 text-center" @click="auto($event, optimizeStars)">
                        Auto Stars
                    </button>
                    <button type="button" class="btn btn-lg btn-outline-secondary text-white w-100 text-center"
                            @click="auto($event, optimizeStudents)">
                        Auto Students
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="row" v-if="loaded">
        <div class="col-12">
            <hr />
        </div>
    </div>

    <form ref="validationForm" novalidate @submit.prevent="() => false">
        <div class="row mt-3" v-if="loaded">

            <div class="col-12 mb-3">
                <expandable-card>
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-clock me-2" viewBox="0 0 16 16">
                            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                        </svg>
                        {{ i18n.get('AchievementTitle59') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star me-2" viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                        {{ i18n.get('StarPopupTitle') }}
                    </template>
                    <template #content>
                        <dynamic-input v-model="lastUnlockedVariable">
                            <template #label>{{ i18n.fmt('StarBonusVarTitle1', i18n.variableById(Math.min(lastUnlockedVariable + 4, 19))) }}</template>
                            <template #help>{{ i18n.get('StarBonusVarDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.BuyAllButton" @update:model-value="saveData.data.StarBonus.Level2000 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusBuyAllTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusBuyAllDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.VariablesEnable"
                                       @update:model-value="saveData.data.StarBonus.Level2001 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusAutoVarTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusAutoVarDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.UpgradesEnable"
                                       @update:model-value="saveData.data.StarBonus.Level2002 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusAutoUpTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusAutoUpDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.PrestigeEnable"
                                       @update:model-value="saveData.data.StarBonus.Level2003 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusAutoPrestTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusAutoPrestDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.SupremacyEnable"
                                       @update:model-value="saveData.data.StarBonus.Level2005 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusAutoSupTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusAutoSupDesc') }}</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Automation.Rate"
                                       @update:model-value="saveData.data.StarBonus.Level2004 = $event <= 625 ? 3 : $event <= 1250 ? 2 : $event <= 2500 ? 1 : 0">
                            <template #label>{{ i18n.fmt('StarBonusAutoRateTitle', '2x') }}</template>
                            <template #help>{{ i18n.get('StarBonusAutoRateDesc') }}. Length of time in milliseconds between upgrades.</template>
                        </dynamic-input>
                        <dynamic-input v-model="saveData.data.Time.AccelerationEnabled"
                                       @update:model-value="saveData.data.StarBonus.Level3000 = $event ? 1 : 0">
                            <template #label>{{ i18n.get('StarBonusAccButtonTitle') }}</template>
                            <template #help>{{ i18n.get('StarBonusAccButtonDesc') }}</template>
                        </dynamic-input>
                    </template>
                </expandable-card>
            </div>

            <div class="col-12 mb-3">
                <expandable-card>
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-star me-2" viewBox="0 0 16 16">
                            <path
                                d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                        {{ i18n.get('TheoryPanelPermanent') }} {{ i18n.get('InstructionsSectionTitle18') }}
                    </template>
                    <template #content>
                        <button class="btn btn-primary btn-lg w-100 mb-3" @click="optimizeStars">Optimize {{ i18n.get('AchievementCatStars') }}</button>
                        <div class="alert alert-dark d-flex align-items-center p-2 small">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-exclamation-triangle text-warning mx-2 mb-0" viewBox="0 0 16 16">
                                    <path
                                        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                    <path
                                        d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                </svg>
                            </div>
                            <div>
                                Changing the below values does not automatically update the amount of used stars. Use the <kbd>Optimize {{
                                    i18n.get('AchievementCatStars')
                                }}</kbd> button above instead.
                            </div>
                        </div>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-currency-dollar me-2"
                             viewBox="0 0 16 16">
                            <path
                                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                        </svg>
                        {{ i18n.get('StudentsName') }}
                    </template>
                    <template #content>
                        <button class="btn btn-primary btn-lg w-100 mb-3" @click="optimizeStudents">Optimize {{ i18n.get('StudentsName') }}</button>
                        <div class="alert alert-dark d-flex align-items-center p-2 small">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     class="bi bi-exclamation-triangle text-warning mx-2 mb-0" viewBox="0 0 16 16">
                                    <path
                                        d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                                    <path
                                        d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
                                </svg>
                            </div>
                            <div>
                                Changing the below values does not automatically update the amount of used students. Use the <kbd>Optimize {{
                                    i18n.get('StudentsName')
                                }}</kbd> button above instead.
                            </div>
                        </div>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-gift me-2" viewBox="0 0 16 16">
                            <path
                                d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 14.5V7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zM1 4v2h6V4H1zm8 0v2h6V4H9zm5 3H9v8h4.5a.5.5 0 0 0 .5-.5V7zm-7 8V7H2v7.5a.5.5 0 0 0 .5.5H7z" />
                        </svg>
                        {{ i18n.get('AchievementCatMinigames') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calculator me-2" viewBox="0 0 16 16">
                            <path
                                d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                            <path
                                d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z" />
                        </svg>
                        {{ i18n.get('MathExpFunction') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-currency-dollar me-2"
                             viewBox="0 0 16 16">
                            <path
                                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                        </svg>
                        {{ i18n.get('InstructionsSectionTitle23') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-circle-half me-2" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 0 8 1v14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
                        </svg>
                        {{ i18n.get('TheoryPopupTitle') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-stars me-2" viewBox="0 0 16 16">
                            <path
                                d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z" />
                        </svg>
                        {{ i18n.get('AchievementCatStars') }}
                    </template>
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
                    <template #title>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trophy me-2" viewBox="0 0 16 16">
                            <path
                                d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935zM3.504 1c.007.517.026 1.006.056 1.469.13 2.028.457 3.546.87 4.667C5.294 9.48 6.484 10 7 10a.5.5 0 0 1 .5.5v2.61a1 1 0 0 1-.757.97l-1.426.356a.5.5 0 0 0-.179.085L4.5 15h7l-.638-.479a.501.501 0 0 0-.18-.085l-1.425-.356a1 1 0 0 1-.757-.97V10.5A.5.5 0 0 1 9 10c.516 0 1.706-.52 2.57-2.864.413-1.12.74-2.64.87-4.667.03-.463.049-.952.056-1.469H3.504z" />
                        </svg>
                        {{ i18n.get('AchievementPage1') }}
                    </template>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             class="bi bi-exclamation-octagon-fill me-2 text-danger"
                             viewBox="0 0 16 16">
                            <path
                                d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        Raw Data
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
    </form>
</template>

<script>
    import { Parser } from '@/lib/parser';
    import DynamicInput from '@/components/DynamicInput';
    import { Case } from '@/lib/case';
    import ExpandableCard from '@/components/ExpandableCard';
    import TheoryInput from '@/components/TheoryInput';
    import Importer from '@/components/Importer';
    import { calculateStars, parseStarCalculation, SigmaResearch } from '@/lib/optimizers';
    import { Tooltip } from 'bootstrap';
    import { Clipboard } from '@/lib/clipboard';

    const preloadSaveGame = await (async () => {
        if (__DEBUG__) {
            const testSaveGames = await import(/* webpackChunkName: 'encrypted_save_games' */ '@/data/tests/encrypted_save_games.json');
            return Array.from(testSaveGames).pop();
        }
        return '';
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
                firstTimeUser: localStorage.getItem('RETURNING_USER') === null,
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
                        localStorage.setItem('RETURNING_USER', '1');
                    } catch (e) {
                        this.encodedSaveGame = '';
                        if (typeof e === 'string') {
                            console.error(e);
                        } else {
                            console.debug(e);
                            console.error(`Unable to load save game: ${e.name}`);
                        }
                        this.saveData.clear();
                    }
                }
            },
        },
        mounted() {
            if (this.encodedSaveGame) {
                try {
                    this.saveData.load(this.encodedSaveGame);
                    localStorage.setItem('RETURNING_USER', '1');
                } catch (e) {
                    this.encodedSaveGame = '';
                    if (typeof e === 'string') {
                        console.error(e);
                    } else {
                        console.debug(e);
                        console.error(`Unable to load save game: ${e.name}`);
                    }
                    this.saveData.clear();
                }
            }
            new Tooltip(this.$refs.quickActionsHelp, {
                title: this.$refs.quickActionsHelpTooltip.parentElement.removeChild(this.$refs.quickActionsHelpTooltip),
                html: true,
            });
        },
        methods: {
            updateUnlockedTheoryCount() {
                const currentlyUnlockedTheoryCount = Object.values(this.saveData.data.Theory).reduce((a, t) => a + t.includes('L1;'), 0);
                this.saveData.data.Researches.MaxUnlockedTheories = Math.max(this.saveData.data.Researches.MaxUnlockedTheories, currentlyUnlockedTheoryCount);
            },
            async paste() {
                const clipboardContents = await Clipboard.read();
                if (clipboardContents) {
                    this.encodedSaveGame = clipboardContents;
                    await this.$nextTick(() => {
                        if (this.loaded) {
                            console.info('Save game loaded from clipboard.');
                        }
                    });
                }
            },
            update() {
                let isValid = true;
                for (const input of this.$refs.validationForm.elements) {
                    if (input.type.startsWith('date') || input.type === 'time') {
                        if (input.required && !input.value) {
                            console.debug({
                                type: input.type || input.nodeType,
                                pattern: input.pattern,
                                err: input.validationMessage,
                                val: input.value,
                            });
                            input.classList.add('is-invalid');
                            isValid = false;
                        }
                    } else if (!input.checkValidity()) {
                        console.debug({
                            type: input.type || input.nodeType,
                            pattern: input.pattern,
                            err: input.validationMessage,
                            val: input.value,
                        });
                        input.classList.add('is-invalid');
                        isValid = false;
                    } else {
                        input.classList.remove('is-invalid');
                    }
                }
                if (!isValid) {
                    console.error('One or more inputs were not valid and have been marked.');
                    return;
                }
                this.encodedSaveGame = this.saveData.save();
            },
            async copy() {
                if (await Clipboard.write(this.encodedSaveGame)) {
                    console.info('Save game copied to clipboard.');
                }
            },
            async auto(e, fn) {
                const clipboardContents = await Clipboard.read();
                if (!clipboardContents) {
                    console.error('No save data found in clipboard');
                    return;
                }
                const previousData = this.loaded ? this.saveData.save() : false;
                try {
                    this.saveData.load(clipboardContents);
                    await fn.call(this, e);
                    const modifiedData = this.saveData.save();
                    if (await Clipboard.write(modifiedData)) {
                        console.log('Action applied, clipboard updated');
                    }
                } catch (e) {
                    console.debug(e);
                    console.error('Unable to automatically modify save game');
                } finally {
                    if (previousData) {
                        this.saveData.load(previousData);
                    } else {
                        this.saveData.clear();
                    }
                }
            },
            async addWeek(e) {
                e.target.disabled = true;
                try {
                    this.saveData.data.Session.SessionClosedTimeUtc = new Date(this.saveData.data.Session.SessionClosedTimeUtc.getTime() - (604_800_000));
                    console.info(`Game will now calculate offline progress since ${this.saveData.data.Session.SessionClosedTimeUtc.toLocaleString()}`);
                } finally {
                    e.target.disabled = false;
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

                    const parsedData = parseStarCalculation(data);

                    for (const [index, variableLevel] of parsedData.distribution.entries()) {
                        const level = parseInt(variableLevel.level);
                        this.saveData.data.Variable[`FreeLevel${index + 1}`] = level;
                        this.saveData.data.StarBonus[`Level${4000 + index + 1}`] = level;
                    }
                    this.saveData.data.Stars.UsedAmount2 = parsedData.used;
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
                    const purchasedTheoryCost = [
                        20, 5, 5, 5, 5, 5, 5, 5, 40,
                    ].slice(0, currentlyUnlockedTheoryCount).reduce((t, a) => t + a, 0);

                    const totalStudents = this.saveData.data.Students.Amount.toNumber() - purchasedTheoryCost;

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
                    let usedStudents = 0;
                    for (const research of Object.values(distribution)) {
                        usedStudents += research.totalCost;
                        this.saveData.data.Research[`BoughtLevel${research.id}`] = research.level;
                    }
                    this.saveData.data.Students.UsedAmount.parse((purchasedTheoryCost + usedStudents).toFixed(0));
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
