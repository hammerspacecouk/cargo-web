import * as React from "react";
import {
  SessionContext,
  SessionContextInterface
} from "../../Context/SessionContext";
import PlayerFlag from "../../Components/Player/PlayerFlag";
import ProgressBar from "../../Components/Element/ProgressBar";
import FleetShips from "../../Components/Ship/FleetShips";

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
              <PlayerFlag player={sessionContext.player} />
            </div>
          </div>
          <div className="t-fleet__main">
            <div className="t-fleet__ships">
              <FleetShips ships={sessionContext.ships} />
            </div>
            <div className="t-fleet__rank panel">
              <p>todo - above this - activity log</p>

              <h2>{sessionContext.rankStatus.currentRank.title}</h2>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div>
                <ProgressBar
                  percent={sessionContext.rankStatus.levelProgress}
                />
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
