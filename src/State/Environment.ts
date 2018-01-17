import {APIClientInterface} from "../Data/API/index";
import Assets from "../Helpers/Assets";
import {KeyValueInterface} from "../DomainInterfaces/KeyValueInterface";

// todo - docs explaining why this is different

export interface EnvironmentStateInterface {
    assetsManifest?: KeyValueInterface,
    assetPrefix?: string,
    apiHostname: string,
    appVersion: string,
    appEnv: string,
    host: string,
    isClient: boolean;
    isServer: boolean;

    // environmental objects
    apiClient: APIClientInterface;
    assets: Assets;
}

export default (state: EnvironmentStateInterface) => {
    if (state) {
        return state;
    }
    return null;
};
