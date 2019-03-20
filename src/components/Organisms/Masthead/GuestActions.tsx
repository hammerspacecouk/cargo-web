import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import { routes } from "../../../routes";
import { HaloLink } from "../../Atoms/HaloLink/HaloLink";
import { FlexStretch } from "../../Atoms/Flex/Flex";
import { SIZES } from "../../../styles/typography";
import { GRID } from "../../../styles/variables";

const StyledForm = styled.form`
  display: flex;
  align-items: stretch;
`;

const Logo = styled(HaloLink)`
  padding: ${GRID.UNIT};
  display: flex;
  align-items: center;
  ${SIZES.D};
`;

const LinkBox = styled.div`
  display: flex;
  height: 100%;
  a,
  button {
    display: flex;
    align-items: center;
    padding: ${GRID.UNIT};
  }
`;

export const GuestActions = () => {
  const { loginOptions } = useSessionContext();

  if (!loginOptions) {
    return null;
  }

  let playButton = (
    <StyledForm as="div">
      <HaloLink href="/play">Play now</HaloLink>
    </StyledForm>
  );

  if (loginOptions.anon) {
    playButton = (
      <StyledForm action={routes.getLoginAnonymous()} method="post">
        <input type="hidden" name="loginToken" value={loginOptions.anon} />
        <HaloLink as="button" type="submit">
          Play now
        </HaloLink>
      </StyledForm>
    );
  }

  return (
    <>
      <Logo href="/">Shippin' [space]</Logo>
      <FlexStretch>
        <LinkBox>
          {playButton}
        </LinkBox>
      </FlexStretch>
    </>
  );
};
