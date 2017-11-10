export interface AssetsObject {
    [key: string]: string;
}

let staticPrefixStore: string;
let assetsStore: AssetsObject;

export let init = (assets: AssetsObject, staticPrefix: string) => {
    assetsStore = assets;
    staticPrefixStore = staticPrefix;
    // destroy this so it can't be called again
    init = () => {};
};

export const getPrefix = (): string => staticPrefixStore;

export const getAsset = (key: string): string => {
    if (assetsStore && key in assetsStore) {
        return getPrefix() + assetsStore[key];
    }
    return '/' + key;
};

export const getJSON = (): string => JSON.stringify(assetsStore);
