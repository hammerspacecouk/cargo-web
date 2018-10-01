import * as React from "react";

import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import { MessageWarning } from "../../Components/Panel/Messages";
import withPlayer from "../../Components/withPlayer";
import { match } from "react-router";
import { getSession } from "../../Models/Session";
import { Request } from "express";
import routes from "../../routes";
import ProfileLayout from "../../Components/Layout/ProfileLayout";
import Loading from "../../Components/Navigation/Loading";

interface PropsInterface {
  readonly hasProfileNotification: boolean;
  readonly player: PlayerInterface;
}

class Profile extends React.Component<PropsInterface, undefined> {

  static async getInitialData(_: match, request: Request) {
    // todo - fetch full profile information so hasSetEmail can be checked proper
    const sessionData = await getSession(request && request.cookies);
    return {
      player: sessionData.player,
      hasProfileNotification: sessionData.hasProfileNotification
    };
  }

  render() {
    if (!this.props.player) {
      return <Loading />;
    }

    let noEmailWarning = null;
    if (!this.props.hasProfileNotification) {
      noEmailWarning = (
        <MessageWarning>
          You have not yet linked your game to an e-mail address. <br />
          If you clear your cookies or switch browsers you will never be able to
          recover your game. <br />
          Link your game to an e-mail address now to make sure it is saved
        </MessageWarning>
      );
    }

    return (
      <ProfileLayout>
          {noEmailWarning}
          <h2>Home port: Galloping Stable</h2>
          <h3>Playing Since: Thursday</h3>
          <h3>ID: 12132224-1131-1313-293828348134</h3>
          <h3>Contact PIN: asasasvas</h3>
          <h3>Verified account: Yes</h3>
          <h3>Subscription Active until: never</h3>

          <div>
            <h2>Identification Information</h2>
            <p>
              Because we don't store any of your personal data, we need a way
              for you to verify you are the owner of this account if you contact
              us. Tell us the information below if you try to contact us:
            </p>
            <table className="table table--striped">
              <tbody>
              <tr>
                <th>ID</th>
                <td>{this.props.player.id}</td>
              </tr>
              <tr>
                <th>PIN</th>
                <td>abed5432</td>
                {/* todo */}
              </tr>
              </tbody>
            </table>
          </div>

          <ul>
            <li>
              <a className="button" href={routes.getLogout()}>
                Logout
              </a>
            </li>
            <li>
              <a className="button button--soft-danger" href={routes.getProfileDelete()}>
                Delete account
              </a>
            </li>
          </ul>
      </ProfileLayout>
    );
  }
}

export default withPlayer(Profile);
