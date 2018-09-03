import * as React from "react";
import { SessionContext, SessionContextInterface } from "../../../Context/SessionContext";
import PlayerFlag from "../../../Components/PlayerFlag";
import ShipInterface, { PLAY_PATH_EDIT, PLAY_PATH_SHOW } from "../../../DomainInterfaces/ShipInterface";
import { Link } from "react-router-dom";
import EditIcon from "../../../Components/Icons/EditIcon";
import ProgressBar from "../../../Components/ProgressBar";

class FleetContainer extends React.Component<undefined, undefined> {

  render() {
    return (
      <SessionContext.Consumer>
        {this.renderPage.bind(this)}
      </SessionContext.Consumer>
    );
  }

  renderPage(sessionContext: SessionContextInterface) {
    return (
      <main className="t-play__content-contain">
        <div className="t-fleet">
          <div className="t-fleet__title-bar">
            <h1 className="t-fleet__title">My Fleet</h1>
            <div className="t-fleet__flag">
              <PlayerFlag player={sessionContext.player}/>
            </div>
          </div>
          <div className="t-fleet__main">
            <div className="t-fleet__ships">
              <ul>
                {sessionContext.ships.map((ship: ShipInterface) => (
                  <li key={ship.id}>
                    <Link to={PLAY_PATH_SHOW(ship.id)}>
                      {ship.name} <br />
                      ship class <br />
                      current location
                    </Link>
                    <div className="icon--standard">
                    <Link
                      to={PLAY_PATH_EDIT(ship.id)}
                      title="Edit"
                    >
                      <EditIcon/>
                    </Link></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="t-fleet__rank">
              <h2>My rank</h2>
              <div className="menu__rank-row">
                <h3 className="e">{sessionContext.rankStatus.currentRank.title}</h3>
              </div>
              <div className="menu__rank-row">
                <ProgressBar percent={sessionContext.rankStatus.levelProgress} />
                <p className="f">{sessionContext.rankStatus.nextRank.title}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default FleetContainer;
