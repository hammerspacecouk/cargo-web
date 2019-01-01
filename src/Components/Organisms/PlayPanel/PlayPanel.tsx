import * as React from "react";
import styled from "styled-components";
import routes from "../../../routes";
import { useSessionContext } from "../../../context/SessionContext";
import { ActionButton, Button } from "../../Atoms/Button/Button";
import { LoginForm } from "../LoginForm/LoginForm";
import { GRID } from "../../../styles/variables";
import { P } from "../../Atoms/Text/Text";
import { H4 } from "../../Atoms/Heading/Heading";
import { Panel, PanelTitle } from "../../Molecules/Panel/Panel";
import { COLOURS } from "../../../styles/colours";

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
  const { player, loginToken } = useSessionContext();

  if (player) {
    return (
      <ButtonArea>
        <Button as="a" href="/play">
          To My Fleet
        </Button>
      </ButtonArea>
    );
  }

  return (
    <StyledPanel>
      <PanelTitle>Play now</PanelTitle>
      <P>Start playing an anonymous game immediately without logging in:</P>
      <ButtonArea>
        <form action={routes.getLoginAnonymous()} method="post">
          {loginToken && (
            <input type="hidden" name="loginToken" value={loginToken} />
          )}
          <ActionButton disabled={!loginToken}>
            New game
          </ActionButton>
        </form>
      </ButtonArea>
      <SubHeading as="h3">Or create/resume a logged in game:</SubHeading>
      <LoginForm />
    </StyledPanel>
  );
};
