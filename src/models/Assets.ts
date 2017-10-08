export interface AssetsObject {
    [key: string]: string;
}

export default class {

    private assets: AssetsObject;
    private staticPrefix: string;

    constructor(
        assets: AssetsObject,
        staticPrefix = '/static/'
    ) {
        this.assets = assets;
        this.staticPrefix = staticPrefix;
    }

    getPrefix(): string {
        return this.staticPrefix;
    }

    get(key: string): string {
        if (this.assets && key in this.assets) {
            return this.getPrefix() + this.assets[key];
        }
        return '/' + key;
    }

    getJSON(): string {
        return JSON.stringify(this.assets);
    }
}