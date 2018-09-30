import { isClient, isServer } from "../../Utils/Runtime";

export interface EnvironmentInterface {
  apiHostname: string;
  appVersion: string;
  appEnv: string;
  host: string;
  nodeEnv: string;
  isClient: boolean;
  isServer: boolean;
}

let environment: EnvironmentInterface;

if (isClient) {
  environment = {
    ...(window as any)._CONFIG_,
    isClient: true,
    isServer: false
  };
} else if (isServer) {
  environment = {
    apiHostname: process.env.APP_API_HOSTNAME,
    appVersion: process.env.APP_VERSION,
    appEnv: process.env.APP_ENV,
    host: process.env.HOSTNAME,
    nodeEnv: process.env.NODE_ENV,
    isClient: false,
    isServer: true
  };
}

if (!environment) {
  throw "Unknown Runtime";
}

export const getForClient = (): object => ({
  apiHostname: environment.apiHostname,
  appVersion: environment.appVersion,
  appEnv: environment.appEnv,
  host: environment.host,
  nodeEnv: environment.nodeEnv
});

export default environment;
