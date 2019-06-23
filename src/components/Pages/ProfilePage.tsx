import * as React from "react";
import { H2 } from "../Atoms/Heading";
import { Icon, SMALL_ICON } from "../Atoms/Icon";
import { ErrorIcon } from "../Icons/ErrorIcon";
import { DeleteAccountButton } from "../Molecules/DeleteAccountButton";
import { MessageWarning } from "../Molecules/Message";
import { Table } from "../Molecules/Table";
import { LoginForm } from "../Organisms/LoginForm";
import { LogOutButton } from "../Organisms/LogOutButton";
import { ProfileLayout } from "../Templates/ProfileLayout";
import { IPort } from "../../interfaces";
import { routes } from "../../routes";
import { fullDate } from "../../utils/format";

export interface IProps {
  readonly session: any;
  readonly isAnonymous: boolean;
  readonly canDelete: boolean;
  readonly homePort: IPort;
}

const getAttachEmailForm = () => {
  return (
    <>
      <MessageWarning>
        You have not yet linked your game to an email address. <br />
        If you clear your cookies or switch browsers you will never be able to recover your game. <br />
        Link your game to an email address now to make sure it is saved
      </MessageWarning>
      <h2>Log in to save your game</h2>
      <LoginForm />
    </>
  );
};

export const ProfilePage = ({ session, isAnonymous, canDelete, homePort }: IProps) => {
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

        <>
          <LogOutButton isAnonymous={isAnonymous} />
          <DeleteAccountButton route={routes.getProfileDelete()} canDelete={canDelete} />
        </>
      </div>

      {isAnonymous && getAttachEmailForm()}
      <H2>
        Home port: <a href={routes.getPortShow(homePort.id)}>{homePort.name}</a>
      </H2>
    </ProfileLayout>
  );
};
