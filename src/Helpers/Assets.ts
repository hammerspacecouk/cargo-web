import {KeyValueInterface} from "../DomainInterfaces/KeyValueInterface";

export default class {
    private assets?: KeyValueInterface;
    private staticPrefix: string;

    constructor(assets: KeyValueInterface, staticPrefix: string) {
        this.assets = assets;
        this.staticPrefix = staticPrefix;
    }

    get(asset: string): string {
        if (this.assets && asset in this.assets) {
            return this.staticPrefix + this.assets[asset];
        }
        return '/' + asset;
    }

    getAll(): KeyValueInterface {
        return this.assets;
    };

    getJSON(): string {
        return JSON.stringify(this.assets);
    }
}
