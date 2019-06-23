import { isClient, isServer } from "./runtime";
import getConfig from "next/config";

export interface IEnvironment {
  serverApiHostname?: string;
  clientApiHostname?: string;
  appEnv?: string;
  appVersion?: string;
  host?: string;
  nodeEnv?: string;
  isClient: boolean;
  isServer: boolean;
}

let environment: IEnvironment;

if (isClient) {
  const { publicRuntimeConfig } = getConfig();
  environment = {
    ...publicRuntimeConfig,
    isClient: true,
    isServer: false,
  };
} else if (isServer) {
  environment = {
    serverApiHostname: process.env.SERVER_API_HOSTNAME,
    clientApiHostname: process.env.CLIENT_API_HOSTNAME,
    appEnv: process.env.APP_ENV,
    appVersion: process.env.APP_VERSION,
    host: process.env.HOSTNAME,
    nodeEnv: process.env.NODE_ENV,
    isClient: false,
    isServer: true,
  };
} else {
  throw new Error("Unknown Runtime");
}

export const Environment = environment;
