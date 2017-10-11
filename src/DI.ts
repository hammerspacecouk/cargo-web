import Assets, {AssetsObject} from './models/Assets';
import Play from './models/Play';
import Port from './models/Port';
import DataClient from './models/DataClient';
import User from "./models/User";

let logger: Console = console; // todo - vary on client vs server

let assets: Assets;
let apiHostname: string = 'http://api.dev.planetcargo.live'; // todo - base on environment

let init = (
    assetManifest: AssetsObject,
    // apiHostname: string todo
) => {
    logger.debug('DI Container init');

    assets = new Assets(assetManifest);
    // apiHostname = apiHostname; todo

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
