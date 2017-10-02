import Assets, {AssetsObject} from "./models/Assets";
import Port from "./models/Port";
import DataClient from "./models/DataClient";

let assets: Assets;
let port: Port;
let dataClient: DataClient;

let init = (
    assetManifest: AssetsObject
) => {
    // todo - hostname
    assets = new Assets(assetManifest);
    init = () => {
        throw 'Already setup';
    }
};

const getAssets = (): Assets => {
    return assets;
};

const getDataClient = (): DataClient => {
    if (!dataClient) {
        dataClient = new DataClient('http://api.dev.planetcargo.live'); // todo - base on environment
    }
    return dataClient;
};

const getPorts = (): Port => {
    if (!port) {
        port = new Port(getDataClient());
    }
    return port;
};

export default {
    init,
    getAssets,
    models : {
        getPorts
    }
};
