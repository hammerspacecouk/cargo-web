import * as React from "react";
import styled from "styled-components";
import { IActionToken } from "../../../Interfaces";
import { ApiClient } from "../../../util/ApiClient";

interface IProps {
  readonly token: IActionToken;
  readonly children: any;
  readonly className?: string;
  readonly handler?: (token: IActionToken) => Promise<void> | null | void;
}

const StyledForm = styled.form`
  display: inline;
`;

export const TokenButton = ({
  token,
  className,
  children,
  handler,
}: IProps) => {
  return (
    <StyledForm
      className={className}
      method="post"
      action={ApiClient.getUrl(token.path)}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
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
