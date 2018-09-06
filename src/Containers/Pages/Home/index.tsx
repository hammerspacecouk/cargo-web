import * as React from "react";
import { Link } from "react-router-dom";

import { PATH_LIST as portsPath } from "../../../DomainInterfaces/PortInterface";
import PlayerInterface from "../../../DomainInterfaces/PlayerInterface";
import LoginForm from "../../../Components/LoginForm";
import { SessionContext } from "../../../Context/SessionContext";
import ActionLink from "../../../Components/ActionLink";

interface Props {
  sessionPlayer?: PlayerInterface;
  sessionChecked: boolean;
}

class HomeIndexContainer extends React.Component<undefined, undefined> {
  renderPlayPanel(playerFetched: boolean, player?: PlayerInterface) {
    if (playerFetched && !player) {
      return (
        <React.Fragment>
          <p className="e unit">
            Start playing immediately without logging in:
          </p>
          <div className="text--center unit">
            <div className="align--inline">
              <ActionLink
                to={`/play`}
                className="button m-icon-suffix--animated"
              >
                New game
              </ActionLink>
            </div>
          </div>
          <h3 className="d unit">Or login to resume a previous game:</h3>
          <LoginForm />
        </React.Fragment>
      );
    }
    return (
      <div className="text--center unit">
        <div className="align--inline">
          <ActionLink
            to={`/play/fleet`}
            className="button m-icon-suffix--animated"
          >
            To My Fleet
          </ActionLink>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="t-home">
        <div className="t-home__hero">
          <div className="t-home__hero-contents home-hero">
            <h1>Planet Cargo</h1>
          </div>
        </div>
        <div className="t-home__play panel">
          <h2 className="panel__title">Play now</h2>
          <SessionContext.Consumer>
            {({ playerFetched, player }) =>
              this.renderPlayPanel(playerFetched, player)
            }
          </SessionContext.Consumer>
        </div>
        <main className="t-home__main">
          <h1>Welcome welcome welcome</h1>
          <ul>
            <li>
              <Link to="/play">Play</Link>
            </li>
            <li>
              <Link to={portsPath}>Ports</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/about/styleguide">Styleguide</Link>
            </li>
            <li>
              <Link to="/about/status">Status</Link>
            </li>
          </ul>
          <div className="text--prose">
            <p>
              There are <strong>1000</strong> ports to find. It will take some
              time to find them all. Find them by sending out ships. Explore
              faster by getting more ships. Get more ships by transporting cargo
              and owning ports.
            </p>
          </div>
        </main>
        <aside className="t-home__aside">
          <p>More side stuff</p>
        </aside>
      </div>
    );
  }
}

export default HomeIndexContainer;
