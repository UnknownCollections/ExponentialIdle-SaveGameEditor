export class BigNumber {
    constructor(sign, exponent, depth) {
        this.update(sign, exponent, depth);
    }

    static from(str) {
        const newInstance = new BigNumber();
        newInstance.parse(str);
        return newInstance;
    }

    update(sign, exponent, depth) {
        this.sign = typeof sign === 'undefined' ? 0 : sign;
        this.exponent = typeof exponent === 'undefined' ? 0 : exponent;
        this.depth = typeof depth === 'undefined' ? 0 : depth;
        return this;
    }

    export() {
        this.normalize();
        return {
            Sign: this.sign,
            Exponent: this.exponent,
            Depth: this.depth
        };
    }

    parse(str) {
        if (!str) {
            return false;
        }
        let sign = 0;
        let exponent = 0;
        let depth = 0;
        try {
            if (str.includes('ee')) {
                const parts = str.split('ee');
                exponent = parseFloat(parts[1]) - 6;
                depth = [...str].reduce((t, c) => t + (c === 'e'), 0);
                sign = Math.sign(parseFloat(parts[0]) || 1);
            } else if (str.includes('e')) {
                const parts = str.split('e');
                const integral = parseFloat(parts[0]);
                const pow10 = parseFloat(parts[1]);
                sign = Math.sign(integral);
                if (integral !== 0) {
                    if (pow10 >= 0) {
                        exponent = pow10 + Math.log10(Math.abs(integral)) - 6;
                        depth = 1;
                    } else {
                        exponent = Math.pow(10, pow10) * Math.abs(integral);
                    }
                }
            } else {
                const val = parseFloat(str);
                sign = Math.sign(val);
                exponent = Math.abs(val);
            }
        } catch (e) {
            console.debug(e);
            console.error(`Unable to parse BigNumber: ${e.name}`);
            this.sign = 0;
            this.exponent = 0;
            this.depth = 0;
            return false;
        }
        if (isFinite(sign) && isFinite(exponent) && isFinite(depth)) {
            this.sign = sign;
            this.exponent = exponent;
            this.depth = depth;
            return true;
        }
        return false;
    }

    toNumber() {
        return Number(this.toString());
    }

    toString(decimals) {
        const parts = [
            false, // sign
            0, // integral
            false, // depth
            false, // pow
        ];

        let exponent = this.exponent;
        let depth = this.depth;
        let sign = this.sign;

        if (exponent !== 0 || depth !== 0) {
            if (sign < 0) {
                parts[0] = '-';
            }
            if (depth === 0) {
                parts[1] = exponent;
            } else {
                const val = exponent + 6;
                let pow10 = Math.trunc(val);

                if (pow10 > 1e4 && depth === 1) {
                    depth++;
                    pow10 = Math.log10(pow10);
                }

                if (depth === 1) {
                    parts[1] = Math.pow(10, val - pow10);
                } else {
                    parts[1] = false;
                }

                parts[2] = 'e'.repeat(depth);
                parts[3] = pow10;
            }
        }

        if (typeof decimals === 'number') {
            return parts.filter(v => v !== false)
                        .map(v => {
                            if (typeof v === 'number' && !Number.isSafeInteger(v)) {
                                return v.toFixed(decimals);
                            }
                            return v;
                        })
                        .join('');
        }
        return parts.filter(v => v !== false).join('');
    }

    normalize() {
        if (!isFinite(this.exponent)) {
            this.exponent = 0;
        }

        while (this.exponent >= 1e6) {
            this.depth++;
            this.exponent = Math.log10(this.exponent / 1e6);
        }

        if (this.exponent >= 0) {
            return;
        }

        this.exponent = Math.pow(10, this.exponent);

        if (this.depth >= 1) {
            this.depth--;
            this.exponent *= 1e6;
            if (this.depth > 0) {
                this.exponent -= 6;
            }
            if (this.exponent !== 0) {
                return;
            }
            this.sign = 0;
        }
    }
}