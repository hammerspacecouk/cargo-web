import * as React from "react";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../../util/ApiClient";
import { FormEvent } from "react";
import styled from "styled-components";

interface Props {
  readonly token: ActionTokenInterface;
  readonly children: any;
  readonly handler?: (
    token: ActionTokenInterface
  ) => Promise<void> | null | void;
}

const StyledForm = styled.form`
    display: inline;
`;

export default ({ token, children, handler }: Props) => {
  return (
    <StyledForm
      method="post"
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
    </StyledForm>
  );
};
