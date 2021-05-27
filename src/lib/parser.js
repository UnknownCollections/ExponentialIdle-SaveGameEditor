import { BigNumber } from '@/lib/bignumber';
import { reactive, toRaw } from 'vue';
import { Crypto } from '@/lib/crypto.obfuscate';

export class Parser {
    static isIsoDateRegex = new RegExp(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/);
    static isIsoDate = s => Parser.isIsoDateRegex.test(s);
    static VALID_SAVE_VERSIONS = new Set([120]);
    static KNOWN_KEYS = new Set([
        'Achievements',
        'Achievement',
        'Automation',
        'BuyAmounts',
        'Function',
        'Minigames',
        'Options',
        'PrestigeCurrency',
        'Prestige',
        'Researches',
        'Research',
        'Rewards',
        'Session',
        'Stars',
        'StarBonus',
        'Statistics',
        'Story',
        'Students',
        'Theories',
        'Theory',
        'Time',
        'Upgrade',
        'Variable',
    ]);

    raw_data = null;
    json_data = null;
    parsed_data = null;

    /** @type {ISaveGame} **/
    data = null;

    load(b64Data) {
        this.raw_data = Crypto.decrypt(b64Data);
        this.json_data = JSON.parse(this.raw_data);
        this.parsed_data = this.decodeObj(this.json_data);
        if (!Parser.VALID_SAVE_VERSIONS.has(this.parsed_data.SaveVersion)) {
            throw `Save version ${this.parsed_data.SaveVersion} is not supported! Supported versions are [${Array.from(Parser.VALID_SAVE_VERSIONS)}].`;
        }
        this.deserializeObjects();
    }

    save() {
        const parsed_data = this.serializeObjects();
        const json_data = this.encodeObj(parsed_data);
        const raw_data = JSON.stringify(json_data);
        return Crypto.encrypt(raw_data, true);
    }

    clear() {
        this.raw_data = null;
        this.json_data = null;
        this.parsed_data = null;
        this.data = null;
    }

    deserializeObjects() {
        this.data = {};
        raw_data_loop:
            for (const [key, val] of Object.entries(this.parsed_data)) {
                for (const rootKey of Parser.KNOWN_KEYS.keys()) {
                    if (key.startsWith(rootKey)) {
                        if (!this.data.hasOwnProperty(rootKey)) {
                            this.data[rootKey] = {};
                        }
                        this.data[rootKey][key.slice(rootKey.length)] = val;
                        continue raw_data_loop;
                    }
                }
                this.data[key] = val;
            }
    }

    serializeObjects() {
        const json_data = {};
        for (const category of Object.keys(this.data)) {
            if (Parser.KNOWN_KEYS.has(category)) {
                for (const [key, val] of Object.entries(this.data[category])) {
                    json_data[`${category}${key}`] = toRaw(val);
                }
            } else {
                json_data[category] = this.data[category];
            }
        }
        return json_data;
    }

    decodeObj(obj) {
        const result = {};
        for (const key of Object.keys(obj)) {
            result[key] = this.decodeVal(obj[key]);
        }
        return result;
    }

    encodeObj(obj) {
        const result = {};
        for (const key of Object.keys(obj)) {
            result[key] = this.encodeVal(obj[key]);
        }
        return result;
    }

    decodeVal(val) {
        try {
            if (typeof val === 'object') {
                return val;
            }
            let parsedVal = JSON.parse(val);
            if (parsedVal === null) {
                return parsedVal;
            }
            if (Parser.isIsoDate(val)) {
                parsedVal = new Date(parsedVal);
            } else if (typeof parsedVal === 'object') {
                if (parsedVal.hasOwnProperty('Sign') && parsedVal.hasOwnProperty('Exponent') && parsedVal.hasOwnProperty('Depth')) {
                    parsedVal = new BigNumber(parsedVal.Sign, parsedVal.Exponent, parsedVal.Depth);
                } else if (!Array.isArray(parsedVal)) {
                    parsedVal = this.decodeObj(parsedVal);
                }
            }
            return parsedVal;
        } catch (e) {
            console.debug(e);
            return val;
        }
    }

    encodeVal(val) {
        try {
            if (val === null) {
                return JSON.stringify(val);
            }
            if (val instanceof Date) {
                return JSON.stringify(val.toISOString());
            }
            if (val instanceof BigNumber) {
                return JSON.stringify(val.export());
            }
            if (Array.isArray(val)) {
                return JSON.stringify(val);
            }
            if (typeof val === 'object') {
                if (val.hasOwnProperty('Time') && val.hasOwnProperty('Moves')) {
                    return val;
                }
                return JSON.stringify(this.encodeObj(val));
            }
            return JSON.stringify(val);
        } catch (e) {
            console.debug(e);
            return JSON.stringify(val);
        }
    }
}