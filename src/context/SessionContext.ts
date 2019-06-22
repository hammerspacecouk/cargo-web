import { createContext, createElement, useContext } from "react";

import { IChildrenProps, ILoginOptions, IPlayer, IRankStatus } from "../Interfaces";

export interface ISessionResponse {
  readonly isLoggedIn: boolean;
  readonly hasProfileNotification: boolean;
  readonly player?: IPlayer;
  readonly rankStatus?: IRankStatus;
  readonly loginOptions?: ILoginOptions;
}

const SessionContext = createContext({});

/** @deprecated */
export const SessionContextComponent = ({ children }: IChildrenProps) => {
  return createElement(
    SessionContext.Provider,
    {
      value: {},
    },
    children
  );
};

export const useSessionContext = (): any => {
  return useContext(SessionContext) as any;
};
