export interface AssetsObject {
    [key: string]: string;
}

export default class {
    private assets?: AssetsObject;
    private staticPrefix: string;

    constructor(assets: AssetsObject, staticPrefix: string) {
        this.assets = assets;
        this.staticPrefix = staticPrefix;
    }

    get(asset: string): string {
        if (this.assets && asset in this.assets) {
            return this.staticPrefix + this.assets[asset];
        }
        return '/' + asset;
    }

    getAll(): AssetsObject {
        return this.assets;
    };

    getJSON(): string {
        return JSON.stringify(this.assets);
    }
}
