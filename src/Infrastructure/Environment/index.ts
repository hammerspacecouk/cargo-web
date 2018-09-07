import { UserCookieInterface } from "../API";
import { isClient, isServer } from "../../Utils/Runtime";

export interface EnvironmentInterface {
  apiHostname: string;
  appVersion: string;
  appEnv: string;
  host: string;
  nodeEnv: string;
  isClient: boolean;
  isServer: boolean;
  cookies: UserCookieInterface[];
}

let environment: EnvironmentInterface;

if (isClient) {
  environment = {
    ...(window as any).__CONFIG,
    isClient: true,
    isServer: false,
    cookies: []
  };
} else if (isServer) {
  environment = {
    apiHostname: process.env.APP_API_HOSTNAME,
    appVersion: process.env.APP_VERSION,
    appEnv: process.env.APP_ENV,
    host: process.env.HOSTNAME,
    nodeEnv: process.env.NODE_ENV,
    isClient: false,
    isServer: true,
    cookies: []
  };
}

if (!environment) {
  throw "Unknown Runtime";
}

export const injectUserCookiesFromRequest = (input: any) => {
  const cookies = [];
  for (let property in input) {
    if (input.hasOwnProperty(property)) {
      const userCookie: UserCookieInterface = {
        name: property,
        value: input[property]
      };

      cookies.push(userCookie);
    }
  }
  return cookies;
};

export const getForClient = (): object => ({
  apiHostname: environment.apiHostname,
  appVersion: environment.appVersion,
  appEnv: environment.appEnv,
  host: environment.host,
  nodeEnv: environment.nodeEnv
});

export default environment;
