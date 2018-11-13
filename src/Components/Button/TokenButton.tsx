import * as React from "react";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../util/ApiClient";
import { FormEvent } from "react";

interface Props {
  readonly token: ActionTokenInterface;
  readonly children: any;
  readonly handler?: (token: ActionTokenInterface) => Promise<void> | null | void;
}

export default ({ token, children, handler }: Props) => {
  return (
    <form
      method="post"
      className="form form--inline"
      action={ApiClient.getUrl(token.path)}
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        if (handler) {
          e.preventDefault();
          handler(token);
        }
      }}
    >
      <input type="hidden" name="token" value={token.token} />
      {children}
    </form>
  );
};
