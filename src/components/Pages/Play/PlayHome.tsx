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
import { TableSubtle } from "../../Molecules/Table";
import { TextDanger, TextWarning } from "../../Atoms/Text";
import { LogOutButton } from "../../Organisms/LogOutButton";
import { MessageError } from "../../Molecules/Message";
import { routes } from "../../../routes";
import { useDate } from "../../../hooks/useDate";
import { IProfileResponse } from "../../../data/profile";

export const PlayHome = ({ profile }: { profile: IProfileResponse }) => {
  const { events, player } = useGameSessionContext();
  const playingSinceDate = useDate(new Date(player.startedAt));

  let mode;
  if (profile.isAnonymous) {
    mode = <TextDanger>Anonymous</TextDanger>;
  } else if (profile.isTrial) {
    mode = (
      <TextWarning>
        Trial (<a href="#">change</a>)
      </TextWarning>
    );
  } else {
    mode = "Standard";
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
                <th>Home planet:</th>
                <td>
                  <em>{profile.homePort.name}</em> (<a href="#">change</a>)
                </td>
              </tr>
              <tr>
                <th>Game mode:</th>
                <td>{mode}</td>
              </tr>
              <tr>
                <th>Playing since:</th>
                <td>{playingSinceDate}</td>
              </tr>
            </tbody>
          </TableSubtle>
        </SubPanel>
        <SubPanel>
          <Heading>Linked Authentication Providers</Heading>
          <SocialAccounts isAnonymous={profile.isAnonymous} authProviders={profile.authProviders} />
        </SubPanel>
        <Heading>Logout</Heading>
        <AccountOption>
          <Prose>
            <p>Logout and clear your session on this browser.</p>
          </Prose>
          <LogOutButton isAnonymous={profile.isAnonymous} />
        </AccountOption>
        <Heading>Delete Account</Heading>
        <DeleteAccount canDelete={profile.canDelete} />
      </AccountPanel>
    </StyledArea>
  );
};

const DeleteAccount = ({ canDelete }: { canDelete: boolean }) => {
  let button;
  let warning;

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
    button = <DangerButton disabled={true}>Delete (Step 0/3)</DangerButton>;
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
