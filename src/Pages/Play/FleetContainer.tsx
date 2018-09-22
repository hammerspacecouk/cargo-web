import * as React from "react";
import {
  SessionContext,
  SessionContextInterface
} from "../../Context/SessionContext";
import PlayerFlag from "../../Components/Player/PlayerFlag";
import ProgressBar from "../../Components/Element/ProgressBar";
import FleetShips from "../../Components/Ship/FleetShips";
import ShipInterface from "../../DomainInterfaces/ShipInterface";
import { getFleetData } from "../../Models/Player";
import EventInterface from "../../DomainInterfaces/EventInterface";
import EventsContainer from "../../Containers/Play/EventsContainer";

interface Props {
  sessionCallback: SessionContextInterface["setSession"];
}

interface State {
  ships: ShipInterface[];
  events: EventInterface[];
}

class FleetContainer extends React.Component<Props, State> {

  constructor(props: undefined) {
    super(props);
    this.state = {
      ships: [],
      events: [],
    };
  }

  // todo - calculate if this is your first visit, and pop a welcome modal

  async componentDidMount() {
    try {
      const data = await getFleetData();
      this.setState({ ships: data.ships, events: data.events });
      this.props.sessionCallback(data.session);
    } catch (e) {
      // todo - error handling
    }
  }


  render() {
    return (
      <SessionContext.Consumer>
        {this.renderPage.bind(this)}
      </SessionContext.Consumer>
    );
  }

  // todo - loading state for list of ships

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
              <FleetShips ships={this.state.ships}/>
            </div>
            <div className="t-fleet__aside">
              <EventsContainer events={this.state.events} firstPerson />
              <div className="panel">
                <h2>{sessionContext.rankStatus.currentRank.title}</h2>
                <div>
                  <ProgressBar
                    percent={sessionContext.rankStatus.levelProgress}
                  />
                  <p className="f">{sessionContext.rankStatus.nextRank.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


export default () => (
  <SessionContext.Consumer>
    {({ setSession }) => (
      <FleetContainer sessionCallback={setSession}/>
    )}
  </SessionContext.Consumer>
);

