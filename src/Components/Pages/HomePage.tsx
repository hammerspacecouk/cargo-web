import * as React from "react";
import PlayerInterface from "../../interfaces/PlayerInterface";
import ActionLink from "../Link/ActionLink";
import LoginForm from "../Login/LoginForm";
import { SessionContext } from "../../context/SessionContext";
import routes from "../../routes";
import { Link } from "react-router-dom";
import EventsList from "../Events/EventsList";
import EventInterface from "../../interfaces/EventInterface";

interface Props {
  events: EventInterface[];
}

const renderPlayPanel = (player?: PlayerInterface) => {
  if (player) {
    return (
      <div className="text--center unit">
        <div className="align--inline">
          <ActionLink to={`/play`} className="button m-icon-suffix--animated">
            To My Fleet
          </ActionLink>
        </div>
      </div>
    );
  }

  // todo - session needs a CSRF token, and the anon login form should use it
  return (
    <>
      <p className="e unit">
        Start playing an anonymous game immediately without logging in:
      </p>
      <div className="text--center unit">
        <div className="align--inline">
          <form action={routes.getLoginAnonymous()} method="post">
          <button className="button m-icon-suffix--animated">
            New game
          </button>
          </form>
        </div>
      </div>
      <h3 className="d unit">Or create/resume a logged in game:</h3>
      <LoginForm/>
    </>
  );
};


export default function HomePage({ events }: Props) {
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
          {({ player }) =>
            renderPlayPanel(player)
          }
        </SessionContext.Consumer>
      </div>
      <main className="t-home__main">
        <div className="text--prose">
          <p>
            Colonisation of space has begun, and interstellar shipping is big
            business. You've got to get in on this. Who else is going to
            transport those vital supplies of saxophones 🎷 to the other side
            of the galaxy?
          </p>
          <p>
            But it's a wild west out there. Can you survive, thrive and
            exploit all <strong>1,000</strong> known planets before someone
            else does.
          </p>

          <ul>
            <li>
              <a href={routes.getPlay()} rel="nofollow">
                Play
              </a>
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
        </div>

        <div>
          <h2>What's happening right now?</h2>
          <EventsList events={events}/>
        </div>
      </main>
      <aside className="t-home__aside">
        <p>More side stuff</p>
      </aside>
    </div>
  );
};
