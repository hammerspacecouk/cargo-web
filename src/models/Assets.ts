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
        return this.getPrefix() + this.assets[key];
    }

    getJSON(): string {
        return JSON.stringify(this.assets);
    }
}