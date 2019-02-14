import * as React from "react";
import styled from "styled-components";
import { useSessionContext } from "../../../context/SessionContext";
import { routes } from "../../../routes";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { ActionButton, Button } from "../../Atoms/Button/Button";
import { H4 } from "../../Atoms/Heading/Heading";
import { P } from "../../Atoms/Text/Text";
import { Panel, PanelTitle } from "../../Molecules/Panel/Panel";
import { LoginForm } from "../LoginForm/LoginForm";
import { Loading } from "../../Atoms/Loading/Loading";

const ButtonArea = styled.div`
  text-align: center;
  margin: ${GRID.UNIT} 0;
`;

const SubHeading = styled(H4)`
  margin-bottom: ${GRID.UNIT};
`;

const StyledPanel = styled(Panel)`
  background: ${COLOURS.BLACK.STANDARD};
`;

export const PlayPanel = () => {
  const { player, loginOptions } = useSessionContext();

  if (player) {
    return (
      <ButtonArea>
        <Button as="a" href="/play">
          To My Fleet
        </Button>
      </ButtonArea>
    );
  }

  if (!loginOptions) {
    return <Loading />;
  }

  let top = null;
  if (loginOptions.anon) {
    top = (
      <>
        <P>Start playing an anonymous game immediately without logging in:</P>
        <ButtonArea>
          <form action={routes.getLoginAnonymous()} method="post">
            <input type="hidden" name="loginToken" value={loginOptions.anon}/>
            <ActionButton>New game</ActionButton>
          </form>
        </ButtonArea>
        <SubHeading as="h3">Or create/resume a logged in game:</SubHeading>
      </>
    );
  }

  return (
    <StyledPanel>
      <PanelTitle>Play now</PanelTitle>
      {top}
      <LoginForm/>
    </StyledPanel>
  );
};
