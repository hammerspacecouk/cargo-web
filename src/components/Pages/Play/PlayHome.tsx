import * as React from "react";
import styled from "styled-components";
import { BREAKPOINTS } from "../../../styles/media";
import { COLOURS, panelBackground } from "../../../styles/colours";
import { Panel } from "../../Molecules/Panel";
import { EventsList } from "../../Organisms/EventsList";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { Progress } from "../../Organisms/PlayHome/Panels/Progress";
import { SocialAccounts } from "../../Organisms/SocialAccounts";
import { GRID } from "../../../styles/variables";
import { H3 } from "../../Atoms/Heading";
import { DangerButton } from "../../Atoms/Button";
import { Prose } from "../../Atoms/Prose";
import { fullDate } from "../../../utils/format";
import { TableSubtle } from "../../Molecules/Table";
import { TextDanger, TextWarning } from "../../Atoms/Text";
import { LogOutButton } from "../../Organisms/LogOutButton";
import { MessageError } from "../../Molecules/Message";
import { routes } from "../../../routes";

export const PlayHome = () => {
  const { events, player } = useGameSessionContext();

  let isAnonymous = false; // todo - get from session
  const playingSinceDate: Date = new Date(player.startedAt);

  let mode;
  if (isAnonymous) {
    mode = <TextDanger>Anonymous</TextDanger>;
  } else {
    mode = (
      <TextWarning>
        Trial (<a href="#">change</a>)
      </TextWarning>
    );
    // todo - other game modes
  }

  return (
    <StyledArea>
      <EventsPanel title="Captain's Log">
        <EventsList events={events} firstPerson />
      </EventsPanel>
      <ProgressPanel title="Progress">
        <Progress />
      </ProgressPanel>
      <AccountPanel title="Account">
        <SubPanel>
          <TableSubtle>
            <tbody>
              <tr>
                <th>Player ID:</th>
                <td>{player.id}</td>
              </tr>
              <tr>
                <th>Home port:</th>
                <td>NAME GOES HERE</td>
              </tr>
              <tr>
                <th>Game mode:</th>
                <td>{mode}</td>
              </tr>
              <tr>
                <th>Playing since:</th>
                <td>{fullDate(playingSinceDate)}</td>
              </tr>
            </tbody>
          </TableSubtle>
        </SubPanel>
        <SubPanel>
          <Heading>Linked Authentication Providers</Heading>
          <SocialAccounts />
        </SubPanel>
        <Heading>Logout</Heading>
        <AccountOption>
          <Prose>
            <p>Logout and clear your session on this browser.</p>
          </Prose>
          <LogOutButton isAnonymous={isAnonymous} />
        </AccountOption>
        <Heading>Delete Account</Heading>
        <DeleteAccount />
      </AccountPanel>
    </StyledArea>
  );
};

const DeleteAccount = () => {
  let button;
  let warning;

  let canDelete = true; // todo - real value
  if (canDelete) {
    button = (
      <DangerButton as="a" href={routes.getDeleteAccount()}>
        Delete (Step 0/3)
      </DangerButton>
    );
  } else {
    warning = (
      <MessageError>
        To protect against abuse, accounts cannot be deleted immediately after creation. Please try again later (won't
        be long).
      </MessageError>
    );
    button = <DangerButton disabled={true}>>Delete (Step 0/3)</DangerButton>;
  }

  return (
    <AccountOption>
      <Prose>
        {warning}
        <p>
          Completely remove your account and all associated information. Once complete the data{" "}
          <strong>CANNOT BE RECOVERED</strong> in any way, as indicated in the{" "}
          <a href={routes.getAboutPolicies()}>Privacy Policy</a>.
        </p>
      </Prose>
      {button}
    </AccountOption>
  );
};

const StyledArea = styled.div`
  ${BREAKPOINTS.XL`
    display: flex;
    flex-wrap: wrap;
    min-height: 100%;
    `};
`;

const EventsPanel = styled(Panel)`
  background: ${COLOURS.EVENTS.BACKGROUND};
  border-color: ${COLOURS.PANEL_BORDER};
  border-bottom-style: solid;
  border-bottom-width: 1px;
  ${BREAKPOINTS.XL`
    flex: 1;
    border-bottom: none;
    border-right-style: solid;
    border-right-width: 1px;
    `};
`;

const ProgressPanel = styled(Panel)`
  ${BREAKPOINTS.XL`
    width: 40%;
    min-width: 320px;
    `};
`;

const AccountPanel = styled(Panel)`
  width: 100%;
  border-top: solid 1px ${COLOURS.PANEL_BORDER};
  ${panelBackground}
`;

const SubPanel = styled.div`
  padding-bottom: ${GRID.UNIT};
  margin-bottom: ${GRID.UNIT};
  border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;

const Heading = styled(H3)`
  margin-bottom: ${GRID.UNIT};
`;

const AccountOption = styled.div`
  margin-bottom: ${GRID.UNIT};
  display: flex;
  align-items: flex-start;
  > :first-child {
    flex: 1;
    margin-right: ${GRID.UNIT};
  }
`;
