//noinspection JSUnusedGlobalSymbols

import { constants, deflateRaw, ungzip } from 'pako';
import { Utils } from '@/lib/crypto.obfuscate';

export class Tio {
    static RETRY_TIMEOUT_IN_MS = 1000;

    constructor(language, runUrl) {
        this.textDecoder = new TextDecoder();
        this.language = language;
        this.runUrl = runUrl[runUrl.length - 1] === '/' ? runUrl : runUrl + '/';
        this.reset();
    }

    reset() {
        this.header = '';
        this.code = '';
        this.footer = '';
        this.input = '';
        this.args = [];
        this.extra = [];
    }

    addHeader(header) {
        this.header = header;
        return this;
    }

    addCode(code) {
        this.code = code;
        return this;
    }

    addFooter(footer) {
        this.footer = footer;
        return this;
    }

    addInput(input) {
        this.input = input;
        return this;
    }

    addArg(arg) {
        this.args.push(arg);
        return this;
    }

    addArgs(args) {
        this.args.push(...args);
        return this;
    }

    clearArs() {
        this.args = [];
    }

    addExtraField(name, value) {
        this.extra.push(['F', name, value]);
        return this;
    }

    addExtraArray(name, values) {
        this.extra.push(['V', name, Array.isArray(values) ? values : [values]]);
        return this;
    }

    clearExtra() {
        this.extra = [];
    }

    buildRequest(header, code, footer, input, args, extra) {
        extra = typeof extra === 'undefined' ? [] : extra;

        const parts = [
            ['V', 'lang', [this.language]],
            ...extra,
            ['F', '.code.tio', [header, code, footer].filter(Boolean).join('\n')],
            ['F', '.input.tio', input],
            ['V', 'args', Array.isArray(args) ? args : [args]],
        ];

        const requestData = parts.map(part => {
            const type = part[0];
            const name = part[1];
            const args = part[2];

            if (type === 'V') {
                return `${type}${name}\0${args.length}\0${[...args, ''].join('\0')}`;
            }
            if (type === 'F') {
                return `${type}${name}\0${args.length}\0${args}`;
            }
        }).join('') + 'R';

        return deflateRaw(Utils.stringToU8arr(requestData), {level: constants.Z_BEST_COMPRESSION});
    }

    async execute(request, retry) {
        if (typeof request === 'undefined') {
            request = this.buildRequest(this.header, this.code, this.footer, this.input, this.args, this.extra);
        }
        retry = typeof retry === 'undefined' ? true : retry;

        const token = Utils.u8Arr2Hex(window.crypto.getRandomValues(new Uint8Array(16))).toLowerCase();
        const resp = await fetch(this.runUrl + token, {
            method: 'POST',
            body: request,
        });

        if (resp.status === 204) {
            if (retry) {
                await new Promise(resolve => setTimeout(resolve, Tio.RETRY_TIMEOUT_IN_MS));
                return await this.execute(request, false);
            } else {
                throw 'Error! Tio code run fail: cache miss, failed retry';
            }
        }

        if (resp.status >= 400) {
            const message = resp.status >= 500 ? resp.statusText : await resp.text();
            if (message) {
                throw `Error! Tio code run fail: ${message}`;
            }
            throw 'Error! Tio code run fail: unknown server error';
        }

        const decompressed = this.textDecoder.decode(ungzip(await resp.arrayBuffer()));
        if (decompressed.length <= 32) {
            throw `Error! Tio code run fail: response too short`;
        }

        const resultKey = decompressed.slice(0, 16);
        const [resultData, , warnings] = decompressed.slice(16, -16).split(resultKey, 3);

        if (warnings) {
            console.warn(`Warning! Tio code: ${warnings.split('\n').join(', ')}`);
        }

        return resultData;
    }

}