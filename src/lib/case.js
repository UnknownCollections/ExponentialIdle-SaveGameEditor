export class Case {
    static DEFAULT_UPPER = new Set(['id', 'ids', 'utc', 'ui', 'dt']);

    static pascalCase2Words(val) {
        if (!val) {
            return '';
        }
        return val.split(/([A-Z][a-z]+)/).filter(Boolean).map(v => Case.DEFAULT_UPPER.has(v.toLowerCase()) ? v.toUpperCase() : v).join(' ');
    }
}