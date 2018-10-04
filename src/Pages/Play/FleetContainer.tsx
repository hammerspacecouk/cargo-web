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
import Loading from "../../Components/Navigation/Loading";
import Error from "../../Components/Error/Error";
import { ErrorResponseInterface } from "../../Infrastructure/API";
import LoginForm from "../../Components/Login/LoginForm";

interface Props {
  sessionCallback: SessionContextInterface["setSession"];
}

interface State {
  error?: ErrorResponseInterface;
  ships: ShipInterface[];
  events: EventInterface[];
}

class FleetContainer extends React.Component<Props, State> {
  constructor(props: undefined) {
    super(props);
    this.state = {
      error: null,
      ships: [],
      events: []
    };
  }

  // todo - calculate if this is your first visit, and pop a welcome modal

  async componentDidMount() {
    try {
      const data = await getFleetData();
      this.setState({ ships: data.ships, events: data.events });
      this.props.sessionCallback(data.sessionState);
    } catch (e) {
      console.error(e);
      this.setState({ error: e });
    }
  }

  render() {
    if (this.state.error) {
      let loginForm = null;
      if (this.state.error.statusCode === 429) {
        loginForm = (
          <div>
            <h2>Login</h2>
            <LoginForm />
          </div>
        );
      }
      return (
        <>
          <Error
            code={this.state.error.statusCode}
            message={this.state.error.message}
          />
          {loginForm}
        </>
      );
    }

    return (
      <SessionContext.Consumer>
        {this.renderPage.bind(this)}
      </SessionContext.Consumer>
    );
  }

  // todo - loading state for list of ships

  renderPage(sessionContext: SessionContextInterface) {
    if (!sessionContext.player) {
      return <Loading />;
    }

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
              <FleetShips ships={this.state.ships} />
            </div>
            <div className="t-fleet__aside">
              <EventsContainer events={this.state.events} firstPerson />
              <div className="panel">
                <h2>{sessionContext.rankStatus.currentRank.title}</h2>
                <div>
                  <ProgressBar
                    percent={sessionContext.rankStatus.levelProgress}
                  />
                  <p className="f">
                    {sessionContext.rankStatus.nextRank.title}
                  </p>
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
    {({ setSession }) => <FleetContainer sessionCallback={setSession} />}
  </SessionContext.Consumer>
);
