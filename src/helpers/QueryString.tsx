interface QueryObject {
    [key: string]: string;
}

export default class {
    private parsed: QueryObject;

    constructor(qstr: string) {
        const query: QueryObject = {};

        if (qstr && qstr.length > 0) {
            const a: string[] = (qstr[0] === '?' ? qstr.substr(1) : qstr).split('&');
            for (let i: number = 0; i < a.length; i++) {
                let b: string[] = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }
        }
        this.parsed = query;
    }

    getParam(key: string): string {
        return this.parsed[key] || null;
    }

    hasParam(key: string): boolean {
        return key in this.parsed;
    }
}
