import http from "http";
import { ApiClient } from "../utils/ApiClient";
import { IActionToken, IPort } from "../interfaces";

export const getProfile = (
  incomingRequest?: http.IncomingMessage,
  outGoingResponse?: http.ServerResponse
): Promise<IProfileResponse> => {
  return ApiClient.fetch("/profile", undefined, incomingRequest, outGoingResponse);
};

export interface IProfileResponse {
  isAnonymous: boolean;
  isTrial: boolean;
  canDelete: boolean;
  homePort: IPort;
  authProviders: IAuthProvider[];
}

export interface IAuthProvider {
  provider: string;
  removalToken?: IActionToken;
  addUrl: string;
}
