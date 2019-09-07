import { isClient, isServer } from "./runtime";

export interface IEnvironment {
  assetPrefix: string;
  serverApiHostname?: string;
  clientApiHostname?: string;
  appVersion?: string;
  isClient: boolean;
  isServer: boolean;
}

let environment: IEnvironment;

if (isClient) {
  environment = {
    assetPrefix: process.env.APP_ASSET_PREFIX,
    serverApiHostname: process.env.SERVER_API_HOSTNAME,
    clientApiHostname: process.env.CLIENT_API_HOSTNAME,
    appVersion: process.env.APP_VERSION,
    isClient: true,
    isServer: false,
  };
} else if (isServer) {
  environment = {
    assetPrefix: process.env.APP_ASSET_PREFIX,
    serverApiHostname: process.env.SERVER_API_HOSTNAME,
    clientApiHostname: process.env.CLIENT_API_HOSTNAME,
    appVersion: process.env.APP_VERSION,
    isClient: false,
    isServer: true,
  };
} else {
  throw new Error("Unknown Runtime");
}

export const Environment = environment;
