import * as React from "react";
import Loading from "../Navigation/Loading";
import Error from "../Error/Error";
import ErrorIcon from "../Icons/ErrorIcon";
import ProfileLayout from "../Layout/ProfileLayout";
import { fullDate } from "../../util/Format";
import LogOutButton from "../Login/LogOutButton";
import Delete from "../Profile/Delete";
import routes from "../../routes";
import PortInterface from "../../interfaces/PortInterface";
import { SessionResponseInterface } from "../../Models/Session";
import { MessageWarning } from "../Panel/Messages";
import LoginForm from "../Login/LoginForm";
import { useSessionContext } from "../../context/SessionContext";
import { useEffect } from "react";

export interface Props {
  readonly session: SessionResponseInterface;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: PortInterface;
}

const getAttachEmailForm = () => {
  return (
    <div className="panel">
      <MessageWarning>
        You have not yet linked your game to an e-mail address. <br />
        If you clear your cookies or switch browsers you will never be able to
        recover your game. <br />
        Link your game to an e-mail address now to make sure it is saved
      </MessageWarning>
      <h2>Log in to save your game</h2>
      <LoginForm />
    </div>
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
      setSession(session);
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
        <span className="icon icon--mini icon--prefix color-danger-text">
          <ErrorIcon />
        </span>
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
        <table className="table">
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
        </table>

        <div className="panel">
          <LogOutButton isAnonymous={isAnonymous} />
          <Delete route={routes.getProfileDelete()} canDelete={canDelete} />
        </div>
      </div>

      {isAnonymous && getAttachEmailForm()}
      <h2>
        Home port: <a href={routes.getPortShow(homePort.id)}>{homePort.name}</a>
      </h2>
    </ProfileLayout>
  );
}
