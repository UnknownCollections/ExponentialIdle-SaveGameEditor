import variables from '@/data/variables.json';
const data = (await import(/* webpackChunkName: 'i18n' */ '@/data/i18n.json')).default;

export class I18n {
    lang = 'en';
    languages = new Map();
    numberFormatter = new Intl.NumberFormat();

    constructor() {
        for (const lang of Object.keys(data)) {
            this.languages.set(lang, data[lang].Language);
        }
        for (let lang of navigator.languages) {
            if (data.hasOwnProperty(lang)) {
                this.lang = lang;
                this.numberFormatter = new Intl.NumberFormat(lang);
                return;
            }
            if (lang.includes('-')) {
                const rootLang = lang.split('-')[0];
                if (data.hasOwnProperty(lang)) {
                    this.lang = rootLang;
                    this.numberFormatter = new Intl.NumberFormat(lang);
                    return;
                }
            }
        }
        console.error(`Unable to support any of these languages: ${navigator.languages}`);
    }

    translators(lang) {
        return data[lang].Translators;
    }

    get(key, defaultStr) {
        if (data[this.lang].hasOwnProperty(key)) {
            return data[this.lang][key];
        }
        return typeof defaultStr === 'undefined' ? key : defaultStr;
    }

    fmt(key) {
        let text = this.get(key, null);
        if (text === null) {
            return key;
        }
        for (let i = 1; i < arguments.length; i++) {
            const argIdx = i - 1;
            text = text.replace(new RegExp(`{${argIdx}.*?}`), arguments[i]);
        }
        return text;
    }

    variableById(id) {
        if (typeof id === 'string') {
            id = parseInt(id);
        }
        return variables[id].symbol;
    }

    variableByName(name) {
        for (const variable of variables) {
            if (variable.name === name) {
                return variable.symbol;
            }
        }
    }

    formatNumber(num) {
        return this.numberFormatter.format(num);
    }
}