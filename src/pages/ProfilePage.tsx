import * as React from "react";
import { Loading } from "../components/Atoms/Loading/Loading";
import { Error } from "../components/Organisms/Error/Error";
import ErrorIcon from "../components/Icons/ErrorIcon/ErrorIcon";
import { ProfileLayout } from "../components/Templates/ProfileLayout/ProfileLayout";
import { fullDate } from "../util/Format";
import { LogOutButton } from "../components/Organisms/LogoutButton/LogOutButton";
import { DeleteAccountButton } from "../components/Molecules/DeleteAccountButton/DeleteAccountButton";
import routes from "../routes";
import { PortInterface } from "../Interfaces";
import { LoginForm } from "../components/Organisms/LoginForm/LoginForm";
import {
  SessionResponseInterface,
  useSessionContext
} from "../context/SessionContext";
import { useEffect } from "react";
import { MessageWarning } from "../components/Molecules/Message/Message";
import { Icon, SMALL_ICON } from "../components/Atoms/Icon/Icon";
import { H2 } from "../components/Atoms/Heading/Heading";
import { Panel } from "../components/Molecules/Panel/Panel";
import { Table } from "../components/Molecules/Table/Table";

export interface Props {
  readonly session: SessionResponseInterface;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: PortInterface;
}

const getAttachEmailForm = () => {
  return (
    <Panel>
      <MessageWarning>
        You have not yet linked your game to an e-mail address. <br />
        If you clear your cookies or switch browsers you will never be able to
        recover your game. <br />
        Link your game to an e-mail address now to make sure it is saved
      </MessageWarning>
      <h2>Log in to save your game</h2>
      <LoginForm />
    </Panel>
  );
};

export default function ProfilePage({
  session,
  isAnonymous,
  canDelete,
  homePort
}: Props) {
  const { setSession } = useSessionContext();

  useEffect(
    () => {
      if (session) {
        setSession(session);
      }
    },
    [session]
  );

  if (session === undefined) {
    return <Loading />;
  }
  if (session === null) {
    return <Error />;
  }

  const playingSinceDate: Date = new Date(session.player.startedAt);

  let mode;
  if (isAnonymous) {
    mode = (
      <>
        <Icon size={SMALL_ICON}>
          <ErrorIcon />
        </Icon>
        Anonymous
      </>
    );
  } else {
    mode = (
      <>
        Trial (<a href="#">change</a>)
      </>
    );
    // todo - other game modes
  }

  return (
    <ProfileLayout>
      <div>
        <Table>
          <tbody>
            <tr>
              <th>Player ID:</th>
              <td>{session.player.id}</td>
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
        </Table>

        <Panel>
          <LogOutButton isAnonymous={isAnonymous} />
          <DeleteAccountButton
            route={routes.getProfileDelete()}
            canDelete={canDelete}
          />
        </Panel>
      </div>

      {isAnonymous && getAttachEmailForm()}
      <H2>
        Home port: <a href={routes.getPortShow(homePort.id)}>{homePort.name}</a>
      </H2>
    </ProfileLayout>
  );
}
