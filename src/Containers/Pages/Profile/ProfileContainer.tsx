import * as React from "react";

import Environment from "../../../Data/Environment";
import { SessionContext } from "../../../Context/SessionContext";

import CrumbTitle from "../../../Components/CrumbTitle";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import { MessageWarning } from "../../../Components/Messages";

class ProfileContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <SessionContext.Consumer>
        {({ player, hasSetEmail }) => this.renderPage(player, hasSetEmail)}
      </SessionContext.Consumer>
    );
  }

  renderPage(player: PlayerInterface, hasSetEmail: boolean) {
    let noEmailWarning = null;
    if (!hasSetEmail) {
      noEmailWarning = (
        <MessageWarning>
          You have not yet linked your game to an e-mail address. <br />
          If you clear your cookies or switch browsers you will never be able
          to recover your game. <br />
          Link your game to an e-mail address now to make sure it is saved
        </MessageWarning>
      );
    }

    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle>Profile</CrumbTitle>
        </div>
        <div className="t-doc__main">
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
                  <td>{player.id}</td>
                </tr>
                <tr>
                  <th>PIN</th>
                  <td>abed5432</td>{/* todo */}
                </tr>
              </tbody>
            </table>
          </div>


          <ul>
            <li>
              <a className="button" href={`${Environment.apiHostname}/logout`}>
                Logout
              </a>
            </li>
            <li>
              <a className="button button--soft-danger" href="/profile/delete">
                Delete account
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default ProfileContainer;
