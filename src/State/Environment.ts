import {ActionInterface} from "../Actions/ActionInterface";
import {APIClientInterface} from "../Data/API/index";
import Assets, {AssetsObject} from "../Domain/Assets";

// todo - docs explaining why this is different

export interface EnvironmentStateInterface {
    assetsManifest?: AssetsObject,
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

export default (state: EnvironmentStateInterface, action: ActionInterface) => {
    if (state) {
        return state;
    }
    return null;
};
