import routes from "../../../routes";
import * as React from "react";
import { LinkBox } from "./Masthead";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";

const StyledForm = styled.form`
  display: flex;
  align-items: stretch;
`;

export const GuestActions = () => {
  const { loginToken } = useSessionContext();

  if (!loginToken) {
    return null;
  }

  return (
    <LinkBox>
      <StyledForm action={routes.getLoginAnonymous()} method="post">
        <input type="hidden" name="loginToken" value={loginToken} />
        <HaloLink as="button" type="submit">
          Play now
        </HaloLink>
      </StyledForm>
    </LinkBox>
  );
};
