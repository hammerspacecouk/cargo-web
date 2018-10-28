import * as React from "react";

import { MessageWarning } from "../../components/Panel/Messages";
import withPlayer from "../../components/withPlayer";
import { match } from "react-router";
import { getProfileData, ProfileResponseInterface } from "../../Models/Session";
import { Request } from "express";
import routes from "../../routes";
import ProfileLayout from "../../components/Layout/ProfileLayout";
import Loading from "../../components/Navigation/Loading";
import Error from "../../components/Error/Error";
import { fullDate } from "../../util/Format";
import LoginForm from "../../components/Login/LoginForm";
import Delete from "../../components/Profile/Delete";
import LogOutButtonContainer from "../../Containers/Profile/LogOutButtonContainer";
import {
  SessionContext,
  SessionContextInterface
} from "../../context/SessionContext";
import ErrorIcon from "../../components/Icons/ErrorIcon";

interface PropsInterface extends ProfileResponseInterface {
  isLoading: boolean;
  sessionContext?: SessionContextInterface;
}

class Profile extends React.Component<PropsInterface, undefined> {
  static async getInitialData(_: match, request: Request) {
    try {
      return await getProfileData(request && request.cookies);
    } catch (e) {
      if (e.statusCode && e.statusCode === 403) {
        return { isLoggedOut: true };
      }
      throw e;
    }
  }

  componentWillReceiveProps(nextProps: PropsInterface) {
    if (this.props.session !== nextProps.session && nextProps.sessionContext) {
      nextProps.sessionContext.setSession(nextProps.session);
    }
  }

  getAttachEmailForm = () => {
    if (!this.props.isAnonymous) {
      return null;
    }

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

  render() {
    if (this.props.isLoading || !this.props.session) {
      return <Loading />;
    }
    if (!this.props.session) {
      return <Error />;
    }

    const playingSinceDate: Date = new Date(
      this.props.session.player.startedAt
    );

    let mode;
    if (this.props.isAnonymous) {
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
                <td>{this.props.session.player.id}</td>
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
            <LogOutButtonContainer isAnonymous={this.props.isAnonymous} />
            <Delete
              route={routes.getProfileDelete()}
              canDelete={this.props.canDelete}
            />
          </div>
        </div>

        {this.getAttachEmailForm()}
        <h2>
          Home port:{" "}
          <a href={routes.getPortShow(this.props.homePort.id)}>
            {this.props.homePort.name}
          </a>
        </h2>
      </ProfileLayout>
    );
  }
}

class SessionProfile extends Profile {
  render() {
    return (
      <SessionContext.Consumer>
        {context => <Profile {...this.props} sessionContext={context} />}
      </SessionContext.Consumer>
    );
  }
}

export default withPlayer(SessionProfile);
