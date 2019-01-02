import { isClient, isServer } from "./Runtime";

export interface IEnvironment {
  apiHostname: string;
  appEnv: string;
  appVersion: string;
  host: string;
  nodeEnv: string;
  isClient: boolean;
  isServer: boolean;
}

let environment: IEnvironment;

if (isClient) {
  environment = {
    ...(window as any)._CONFIG_,
    isClient: true,
    isServer: false,
  };
} else if (isServer) {
  environment = {
    apiHostname: process.env.APP_API_HOSTNAME,
    appEnv: process.env.APP_ENV,
    appVersion: process.env.APP_VERSION,
    host: process.env.HOSTNAME,
    isClient: false,
    isServer: true,
    nodeEnv: process.env.NODE_ENV,
  };
}

if (!environment) {
  throw new Error("Unknown Runtime");
}

export const getForClient = (): object => ({
  apiHostname: environment.apiHostname,
  appEnv: environment.appEnv,
  appVersion: environment.appVersion,
  host: environment.host,
  nodeEnv: environment.nodeEnv,
});

export const Environment = environment;
