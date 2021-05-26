import { Tio } from '@/lib/tio';
import Decimal from 'decimal.js';

// https://github.com/1ekf/ExidleStars
// https://conicgames.github.io/exponentialidle/stars.html
// Eaux Tacous#1021
// https://github.com/1ekf/ExidleStars/blob/main/LICENSE
import { default as CALCULATOR_CODE } from 'raw-loader!@/lib/third-party/1ekf/ExidleStars/Calculator.wls';

const tio = new Tio('mathematica', 'https://tio.run/cgi-bin/static/fb67788fd3d1ebf92e66b295525335af-run/');

const RE_FIND_NUMBERFORM = new RegExp(/^ {(?<variable>.+?), NumberForm\[(?<level>\d+),/);

export function parseStarCalculation(data) {
    const grid = data.split('\n').filter(l => l.startsWith('Grid'))[0];
    return grid.split('},').slice(1, -1).map(v => v.match(RE_FIND_NUMBERFORM).groups);
}

export async function calculateStars(ft, stars, finalUpgradeLevel) {
    tio.reset();
    tio.addCode(CALCULATOR_CODE);
    if (finalUpgradeLevel) {
        tio.addFooter(`MemoryConstrained[TimeConstrained[EvaluationData[Catch[calcoptBLP[${ft},${stars},${finalUpgradeLevel}]]], 10], 100*^6]`);
    } else {
        tio.addFooter(`MemoryConstrained[TimeConstrained[EvaluationData[Catch[calcoptBLP[${ft},${stars}]]], 10], 100*^6]`);
    }
    return await tio.execute();
}

export class SigmaResearch {
    static D0 = new Decimal(0);
    static D2 = new Decimal(2);
    static D10 = new Decimal(10);
    static MAKE_DECIMAL = d => Decimal.isDecimal(d) ? d : new Decimal(d);
    static LINEAR_COST_MODEL = (i, p) => l => Math.floor(i + l * p);
    static DEFAULT_COST_MODEL = SigmaResearch.LINEAR_COST_MODEL(1, 0.5);
    RESEARCHES = {
        0: {
            level: 0,
            max: Infinity,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            multiplier: (dt, lhs, lvl) => lhs.times(dt.pow(lvl)),
        },
        1: {
            level: 0,
            max: Infinity,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            apply: (t, lhs, lvl) => lhs.times(t.plus(1).pow(lvl * 0.7)),
        },
        2: {
            level: 0,
            max: Infinity,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            apply: (stars, lhs, lvl) => lhs.times(stars.plus(1).pow(lvl)),
        },
        3: {
            level: 0,
            max: 8,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            apply: (db, lhs, lvl) => lhs.times(db.plus(1).pow(new Decimal(lvl).dividedBy(Decimal.sqrt(Decimal.log10(db.plus(10)).times(100))))),
        },
        4: {
            level: 0,
            max: 8,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            apply: (ftE, lhs, lvl) => lhs.times(ftE.plus(1).pow(lvl / 1300)),
        },
        5: {
            level: 0,
            max: 8,
            costFn: SigmaResearch.DEFAULT_COST_MODEL,
            apply: (dpsi, lhs, lvl) => lhs.times(dpsi.plus(1).pow(Decimal.sqrt(Decimal.log10(dpsi.plus(10))).times(lvl / 225))),
        },
        101: {
            level: 0,
            max: 6,
            costFn: () => 2,
            apply: (lhs, lvl) => lhs.pow((lvl / 10) + 1),
        },
    };

    constructor(t, ftEE, dt, stars, dtBonus, isAccelerating, accelerationBonus) {
        accelerationBonus = isAccelerating ? accelerationBonus ?? 2.85383 : 1.0;
        this.t = SigmaResearch.MAKE_DECIMAL(t);
        this.ftEE = SigmaResearch.MAKE_DECIMAL(ftEE);
        this.dt = SigmaResearch.MAKE_DECIMAL(dt).times(accelerationBonus * dtBonus);
        this.stars = SigmaResearch.MAKE_DECIMAL(stars);

        this.ftE = SigmaResearch.D10.pow(this.ftEE);
        this.db = this.ftE.pow(0.8).dividedBy(4e6);
        this.dpsi = SigmaResearch.D2.pow(this.ftEE.dividedBy(25).minus(1)).minus(0.5);

        this.RESEARCHES[0].apply = this.RESEARCHES[0].apply.bind(undefined, this.dt);
        this.RESEARCHES[1].apply = this.RESEARCHES[1].apply.bind(undefined, this.t);
        this.RESEARCHES[2].apply = this.RESEARCHES[2].apply.bind(undefined, this.stars);
        this.RESEARCHES[3].apply = this.RESEARCHES[3].apply.bind(undefined, this.db);
        this.RESEARCHES[4].apply = this.RESEARCHES[4].apply.bind(undefined, this.ftE);
        this.RESEARCHES[5].apply = this.RESEARCHES[5].apply.bind(undefined, this.dpsi);
    }

    calculateTotalMultiplier(modifyResearchId) {
        let multiplier = new Decimal(1);
        for (const [researchId, research] of Object.entries(this.RESEARCHES)) {
            const level = research.level + (modifyResearchId === researchId);
            if (level > 0) {
                multiplier = research.apply(multiplier, level);
            }
        }
        return multiplier;
    }

    distributeSigma(availableSigma) {
        Object.values(this.RESEARCHES).forEach(r => r.level = 0);

        let sigmaUsed = 0;
        while (availableSigma - sigmaUsed > 0) {
            let nextBestUpgrade = {
                researchId: null,
                cost: 0,
                phiPerSigma: SigmaResearch.D0,
            };

            const thisPhiValue = Decimal.log10(this.calculateTotalMultiplier());

            for (const [researchId, research] of Object.entries(this.RESEARCHES)) {
                if (research.level === research.max) {
                    // This research is max rank, can't upgrade
                    continue;
                }

                const currentLevelCost = research.costFn(research.level);
                if (availableSigma - sigmaUsed < currentLevelCost) {
                    // This research level costs too much, can't upgrade
                    continue;
                }

                const nextPhiValue = Decimal.log10(this.calculateTotalMultiplier(researchId));
                const phiPerSigma = nextPhiValue.minus(thisPhiValue).dividedBy(currentLevelCost);

                console.debug(JSON.stringify({
                    levels: Object.entries(this.RESEARCHES).map(([id, r]) => r.level + (id === researchId)),
                    phi: phiPerSigma.toExponential(4)
                }));

                if (phiPerSigma.greaterThan(nextBestUpgrade.phiPerSigma)) {
                    nextBestUpgrade.researchId = researchId;
                    nextBestUpgrade.phiPerSigma = phiPerSigma;
                    nextBestUpgrade.cost = currentLevelCost;
                }
            }

            console.debug('');

            if (!nextBestUpgrade.researchId) {
                // No upgrade available
                break;
            }

            sigmaUsed += nextBestUpgrade.cost;
            this.RESEARCHES[nextBestUpgrade.researchId].level++;
        }

        if (availableSigma - sigmaUsed > 0) {
            console.warn(`Did not use ${availableSigma - sigmaUsed} sigma`);
        }

        return Object.entries(this.RESEARCHES).map(([id, r]) => ({id, level: r.level}));
    }
}