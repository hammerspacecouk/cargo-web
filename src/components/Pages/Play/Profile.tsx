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
import { ConfirmButton, DangerButton } from "../../Atoms/Button";
import { Prose } from "../../Atoms/Prose";
import { TableSubtle } from "../../Molecules/Table";
import { TextDanger, TextWarning } from "../../Atoms/Text";
import { LogOutButton } from "../../Organisms/LogOutButton";
import { MessageError } from "../../Molecules/Message";
import { routes } from "../../../routes";
import { useDate } from "../../../hooks/useDate";
import { IProfileResponse } from "../../../data/profile";
import { PanelPage } from "../../Templates/PanelPage";
import Link from "next/link";
import { SIZES } from "../../../styles/typography";
import { Icon, SMALL_ICON, TINY_ICON } from "../../Atoms/Icon";
import { NewWindowIcon } from "../../Icons/NewWindowIcon";
import { PlayerFlag } from "../../Molecules/PlayerFlag";
import { ResetGameButton } from "../../Organisms/ResetGameButton";

export const Profile = ({ profile }: { profile: IProfileResponse }) => {
  const { player } = useGameSessionContext();
  const playingSinceDate = useDate(new Date(player.startedAt));

  let mode;
  if (profile.isAnonymous) {
    mode = <TextDanger>Anonymous</TextDanger>;
  } else if (profile.isTrial) {
    mode = (
      <TextWarning>
        Trial (<ComingSoonLink />)
      </TextWarning>
    );
  } else {
    mode = "Standard";
  }

  return (
    <PanelPage title="Profile">
      <SubPanel>
        <PublicLink>
          <a href={routes.getPlayer(player.id).as} target="_blank">
            View public profile{" "}
            <Icon size={TINY_ICON}>
              <NewWindowIcon />
            </Icon>
          </a>
        </PublicLink>
        <TableSubtle>
          <tbody>
            <tr>
              <th>Public Nickname:</th>
              <td>
                <H3 as="span">{player.displayName}</H3> (<ComingSoonLink />)
              </td>
            </tr>
            <tr>
              <th>Emblem:</th>
              <td>
                <FlagSpace>
                  <PlayerFlag player={player} />
                </FlagSpace>{" "}
                (<ComingSoonLink />)
              </td>
            </tr>
            <tr>
              <th>Home planet:</th>
              <td>
                <em>{profile.homePort.name}</em> (<ComingSoonLink />)
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
            <tr>
              <th>Player ID:</th>
              <td>{player.id}</td>
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
      {profile.resetToken && (
        <>
          <Heading>Reset game</Heading>
          <AccountOption>
            <Prose>
              <p>
                Reset your game back to the beginning. You will lose all progress, but your profile and purchases will
                remain intact.
              </p>
            </Prose>
            <ResetGameButton token={profile.resetToken} />
          </AccountOption>
        </>
      )}
      <Heading>Delete Account</Heading>
      <DeleteAccount canDelete={profile.canDelete} />
    </PanelPage>
  );
};

const ComingSoonLink = () => {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        window.alert("Coming soon");
      }}
    >
      change
    </a>
  );
};

const PublicLink = styled.p`
  ${SIZES.D};
  margin-bottom: ${GRID.UNIT};
`;

const FlagSpace = styled.div`
  display: inline-block;
  vertical-align: middle;
  width: 128px;
  height: 128px;
  border-radius: 128px;
  border: solid 4px ${COLOURS.BODY.TEXT};
`;

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
