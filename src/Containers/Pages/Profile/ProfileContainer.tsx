import * as React from "react";

import Environment from "../../../Data/Environment";
import { SessionContext } from "../../../Context/SessionContext";

import PlayerFlag from "../../../Components/PlayerFlag";
import CrumbTitle from "../../../Components/CrumbTitle";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import RankStatusInterface from "../../../DomainInterfaces/RankStatusInterface";

class ProfileContainer extends React.Component<undefined, undefined> {
  render() {
    return (
      <SessionContext.Consumer>
        {({ player, rankStatus }) => this.renderPage(player, rankStatus)}
      </SessionContext.Consumer>
    );
  }

  renderPage(player: PlayerInterface, rankStatus: RankStatusInterface) {
    return (
      <div className="t-doc">
        <div className="t-doc__title">
          <CrumbTitle>Profile</CrumbTitle>
        </div>
        <div className="t-doc__main">
          <PlayerFlag player={player} />

          <h2>Rank</h2>
          <h3>{rankStatus.currentRank.title}</h3>

          <table>
            <tbody>
              <tr>
                <td>{rankStatus.currentRank.title}</td>
                <td style={{ minWidth: "400px" }}>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "600px",
                      margin: "16px auto",
                      background: "#666",
                      height: "16px",
                      borderRadius: "64px",
                      overflow: "hidden"
                    }}
                  >
                    <div
                      style={{
                        height: "32px",
                        background: "#6c6",
                        width: `${rankStatus.levelProgress}%`
                      }}
                    />
                  </div>
                </td>
                <td>{rankStatus.nextRank.title}</td>
              </tr>
            </tbody>
          </table>

          <h2>Home port</h2>
          <h3>todo</h3>

          <ul>
            <li>
              <a className="btn" href={`${Environment.apiHostname}/logout`}>
                Logout
              </a>
            </li>
            <li>
              <a className="btn btn--soft-danger" href="/profile/delete">
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
