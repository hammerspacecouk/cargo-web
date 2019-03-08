import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import { routes } from "../../../routes";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import { LinkBox } from "./Masthead";

const StyledForm = styled.form`
  display: flex;
  align-items: stretch;
`;

export const GuestActions = () => {
  const { loginOptions } = useSessionContext();

  if (!loginOptions) {
    return null;
  }

  if (!loginOptions.anon) {
    return (
      <LinkBox>
        <StyledForm as="div">
          <HaloLink href="/play">Play now</HaloLink>
        </StyledForm>
      </LinkBox>
    );
  }

  return (
    <LinkBox>
      <StyledForm action={routes.getLoginAnonymous()} method="post">
        <input type="hidden" name="loginToken" value={loginOptions.anon} />
        <HaloLink as="button" type="submit">
          Play now
        </HaloLink>
      </StyledForm>
    </LinkBox>
  );
};
