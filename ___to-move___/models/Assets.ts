export interface AssetsObject {
    [key: string]: string;
}

export default class {

    private assets: AssetsObject;
    private staticPrefix: string;

    constructor(
        assets: AssetsObject,
        appEnv: string
    ) {
        this.assets = assets;

        if (appEnv === 'dev') {
            this.staticPrefix = '/static/';
        } else {
            this.staticPrefix = 'https://static.planetcargo.live/';
        }
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