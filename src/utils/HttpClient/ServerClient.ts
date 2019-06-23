import http from "http";
import { IActionToken } from "../../interfaces";
import { IAPIClient } from "../ApiClient";
import { Environment } from "../environment";
import { Logger } from "../Logger";
import {UnauthenticatedError} from "./Error";

const fetch = require('node-fetch');

export class ServerClient implements IAPIClient {

  public tokenFetch(token: IActionToken): Promise<any> {
    return this.fetch(token.path, { token: token.token });
  }

  public async fetch(path: string, payload?: object, incomingHttpHeaders?: http.IncomingHttpHeaders): Promise<any> {
    const url = this.getUrl(path);
    try {
      const start = Date.now();

      const headers = {
        cookie: incomingHttpHeaders && incomingHttpHeaders.cookie
      };

      const response = await fetch(url, { headers });

      const time = Date.now() - start;
      Logger.info(`[DATACLIENT] [FETCH] [${response.status}] [${time}ms] ${url}`);

      if (response.status === 401) {
        throw UnauthenticatedError('Not authenticated');
      }
      if (response.status === 403) {
        // you don't have access to this. might need to login or not allowed
        return null;
      }
      if (response.status === 404) {
        // didn't exist - todo - differentiate from 403
        return null;
      }
      if (response.status === 409) {
        // didn't exist - todo - cheating
        return null;
      }
      if (response.status !== 200) {
        // todo - all other errors (perhaps split by 4xx/5xx)
        return null;
      }

      return response.json();
    } catch (e) {
      Logger.info(`[DATACLIENT] [FETCH ERROR] ${url}`);
      throw e;
    }
  }

  private getUrl(path: string): string {
    return Environment.serverApiHostname + path;
  }
}
