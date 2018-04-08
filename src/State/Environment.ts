import { APIClientInterface } from "../Data/API";
import Assets from "../Helpers/Assets";
import { KeyValueInterface } from "../DomainInterfaces/KeyValueInterface";

export interface EnvironmentStateInterface {
  assetsManifest?: KeyValueInterface;
  assetPrefix?: string;
  apiHostname: string;
  appVersion: string;
  appEnv: string;
  host: string;
  nodeEnv: string;
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
