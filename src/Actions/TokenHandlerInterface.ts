import { Dispatch } from "redux";

import ActionTokenInterface from "../DomainInterfaces/ActionTokenInterface";
import { APIClientInterface } from "../Data/API";

export interface TokenHandlerInterface {
  (
    token: ActionTokenInterface,
    apiClient: APIClientInterface,
    dispatch: Dispatch<any>
  ): Promise<void>;
}
