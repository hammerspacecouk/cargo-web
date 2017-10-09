import Assets, {AssetsObject} from "./models/Assets";
import Port from "./models/Port";
import DataClient from "./models/DataClient";

let assets: Assets;
let port: Port;
let dataClient: DataClient;
let apiHostname: string = 'http://api.dev.planetcargo.live'; // todo - base on environment

let isPlayer: boolean = false;

let init = (
    assetManifest: AssetsObject,
    foundPlayer: boolean,
    // apiHostname: string
) => {
    // todo - hostname
    assets = new Assets(assetManifest);
    isPlayer = foundPlayer;
    // apiHostname = apiHostname;
    init = () => {
        throw 'Already setup';
    }
};

const isLoggedIn = (): boolean => isPlayer;

const getAssets = (): Assets => {
    return assets;
};

const getDataClient = (): DataClient => {
    if (!dataClient) {
        dataClient = new DataClient(apiHostname);
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
    apiHostname,
    isLoggedIn,
    getAssets,
    models : {
        getPorts
    }
};
