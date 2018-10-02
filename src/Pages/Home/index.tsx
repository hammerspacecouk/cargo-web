import * as React from "react";
import { Link } from "react-router-dom";

import withInitialData from "../../Components/withInitialData";

import PlayerInterface from "../../DomainInterfaces/PlayerInterface";
import LoginForm from "../../Components/Login/LoginForm";
import { SessionContext } from "../../Context/SessionContext";
import ActionLink from "../../Components/Link/ActionLink";
import EventsContainer from "../../Containers/Play/EventsContainer";
import EventInterface from "../../DomainInterfaces/EventInterface";
import { getHomeData } from "../../Models/Home";
import routes from "../../routes";

interface Props {
  isLoading: boolean;
  events: EventInterface[];
}

class HomeIndexContainer extends React.Component<Props, undefined> {
  static getCrumb = () => ({
    link: routes.getHome(),
    title: "Home"
  });

  static async getInitialData() {
    return getHomeData();
  }

  renderPlayPanel = (playerFetched: boolean, player?: PlayerInterface) => {
    if (player) {
      return (
        <div className="text--center unit">
          <div className="align--inline">
            <ActionLink
              to={`/play`}
              className="button m-icon-suffix--animated"
            >
              To My Fleet
            </ActionLink>
          </div>
        </div>
      );
    }
    return (
      <>
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
        <LoginForm/>
      </>
    );
  };

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
              <a href={routes.getPlay()} rel="nofollow">Play</a>
            </li>
            <li>
              <a href={routes.getPortsList()}>Ports</a>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a href={routes.getAbout()}>About</a>
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

          <div>
            <h2>What's happening right now?</h2>
            <EventsContainer events={this.props.events}/>
          </div>
        </main>
        <aside className="t-home__aside">
          <p>More side stuff</p>
        </aside>
      </div>
    );
  }
}

export default withInitialData(HomeIndexContainer);
