import Assets, {AssetsObject} from './models/Assets';
import Play from './models/Play';
import Port from './models/Port';
import DataClient from './models/DataClient';
import User from "./models/User";

let logger: Console = console; // todo - vary on client vs server

let assets: Assets;

// todo - a better way to abstract this environment fetcher?
let apiHostname: string;
let appEnv: string = 'dev';
if (process.env.APP_ENV) {
    appEnv = process.env.APP_ENV;
} else if (typeof window !== 'undefined') {
    appEnv = (window as any).__CONFIG.appEnv;
}

switch (appEnv) {
    case 'prod':
        apiHostname = 'https://api.www.planetcargo.live';
        break;
    case 'beta':
        apiHostname = 'https://api.beta.planetcargo.live';
        break;
    case 'alpha':
        apiHostname = 'https://api.alpha.planetcargo.live';
        break;
    case 'dev':
    default:
        apiHostname = 'http://api.dev.planetcargo.live:8080';
}



let init = (
    assetManifest: AssetsObject
) => {
    logger.debug('DI Container init');

    assets = new Assets(assetManifest, appEnv);

    // todo - is this needed in redux world?


    // wipe out the init function so it can't be called again
    init = () => {
        throw 'Already setup';
    }
};


const getAssets = (): Assets => {
    return assets;
};

const dataClient = new DataClient(apiHostname, logger);

export default {
    init,
    apiHostname,
    logger,
    getAssets,
};

export const Services = {
    ports : new Port(dataClient, logger),
    play : new Play(dataClient, logger),
    user : new User(dataClient, logger),
};
