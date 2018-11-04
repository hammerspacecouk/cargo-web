import * as React from "react";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../util/ApiClient";

interface Props {
  readonly token: ActionTokenInterface;
  readonly children: any;
  readonly handler?: (token: ActionTokenInterface) => Promise<void> | null;
}

export default React.memo(({ token, children, handler }: Props) => {
  return (
    <form
      method="post"
      className="form form--inline"
      action={ApiClient.getUrl(token.path)}
      onSubmit={(e: Event) => {
        if (handler) {
          e.preventDefault();
          handler(token);
        }
      }}
    >
      <input type="hidden" name="token" value={token.token}/>
      {children}
    </form>
  );
});
