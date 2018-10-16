import * as React from "react";

import { MessageWarning } from "../../Components/Panel/Messages";
import withPlayer from "../../Components/withPlayer";
import { match } from "react-router";
import { getProfileData, ProfileResponseInterface } from "../../Models/Session";
import { Request } from "express";
import routes from "../../routes";
import ProfileLayout from "../../Components/Layout/ProfileLayout";
import Loading from "../../Components/Navigation/Loading";
import Error from "../../Components/Error/Error";
import { fullDate } from "../../Utils/Format";
import LoginForm from "../../Components/Login/LoginForm";
import Delete from "../../Components/Profile/Delete";
import LogOutButtonContainer from "../../Containers/Profile/LogOutButtonContainer";
import {
  SessionContext,
  SessionContextInterface
} from "../../Context/SessionContext";

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
      <div>
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

    return (
      <ProfileLayout>
        {this.getAttachEmailForm()}
        <h2>
          Home port:{" "}
          <a href={routes.getPortShow(this.props.homePort.id)}>
            {this.props.homePort.name}
          </a>
        </h2>

        <LogOutButtonContainer isAnonymous={this.props.isAnonymous} />

        <Delete
          route={routes.getProfileDelete()}
          canDelete={this.props.canDelete}
        />

        <h2>Data</h2>
        <table className="table table--striped">
          <tbody>
            <tr>
              <th>Player ID:</th>
              <td>{this.props.session.player.id}</td>
            </tr>
            <tr>
              <th>Playing since:</th>
              <td>{fullDate(playingSinceDate)}</td>
            </tr>
          </tbody>
        </table>
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
