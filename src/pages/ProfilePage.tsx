import * as React from "react";
import { H2 } from "../components/Atoms/Heading/Heading";
import { Icon, SMALL_ICON } from "../components/Atoms/Icon/Icon";
import { Loading } from "../components/Atoms/Loading/Loading";
import { ErrorIcon } from "../components/Icons/ErrorIcon/ErrorIcon";
import { DeleteAccountButton } from "../components/Molecules/DeleteAccountButton/DeleteAccountButton";
import { MessageWarning } from "../components/Molecules/Message/Message";
import { Panel } from "../components/Molecules/Panel/Panel";
import { Table } from "../components/Molecules/Table/Table";
import { Error } from "../components/Organisms/Error/Error";
import { LoginForm } from "../contexts/GameContext/Components/LoginForm";
import { LogOutButton } from "../components/Organisms/LogoutButton/LogOutButton";
import { ProfileLayout } from "../components/Templates/ProfileLayout/ProfileLayout";
import { ISessionResponse, useSessionContext } from "../context/SessionContext";
import { IPort } from "../Interfaces";
import { routes } from "../routes";
import { fullDate } from "../util/Format";

export interface IProps {
  readonly session: ISessionResponse;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: IPort;
}

const getAttachEmailForm = () => {
  return (
    <Panel>
      <MessageWarning>
        You have not yet linked your game to an email address. <br />
        If you clear your cookies or switch browsers you will never be able to
        recover your game. <br />
        Link your game to an email address now to make sure it is saved
      </MessageWarning>
      <h2>Log in to save your game</h2>
      <LoginForm />
    </Panel>
  );
};

export const ProfilePage = ({
  session,
  isAnonymous,
  canDelete,
  homePort,
}: IProps) => {
  const { setSession } = useSessionContext();

  React.useEffect(() => {
    if (session) {
      setSession(session);
    }
  }, [session]);

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
};
