import http from "http";
import { ApiClient } from "@src/utils/ApiClient";
import { IActionToken, IPort } from "@src/interfaces";

export const getProfile = (
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<IProfileResponse> => ApiClient.fetch("/profile", undefined, incomingRequest, outGoingResponse);

export interface IProfileResponse {
  isAnonymous: boolean;
  isTrial: boolean;
  status: string;
  canDelete: boolean;
  homePort: IPort;
  authProviders: IAuthProvider[];
  distanceTravelled: number;
  purchases: {
    id: string;
    product: string;
    datetime: string;
    total: string;
  }[];
}

export interface IAuthProvider {
  provider: string;
  removalToken?: IActionToken;
  addUrl: string;
}
