import { Link } from "react-router-dom";
import {
  SessionContext,
  SessionContextInterface
} from "../../Context/SessionContext";
import * as React from "react";
import ScoreContainer from "../../Containers/Player/ScoreContainer";
import ProfileIcon from "../Icons/ProfileIcon";
import ActionLink from "../Link/ActionLink";
import routes from "../../routes";

const GuestActions = () => (
  <div className="masthead__play masthead__link-box">
    <ActionLink
      to={routes.getPlay()}
      rel="nofollow"
      className="masthead__link m-icon-suffix--animated">
      Play now
    </ActionLink>
  </div>
);

const PlayerActions = (props: SessionContextInterface) => (
  <React.Fragment>
    <div className="masthead__score">
      <Link to={routes.getPlay()} rel="nofollow" className="masthead__link">
        <ScoreContainer score={props.score} />
      </Link>
    </div>
    <div className="masthead__profile">
      <a href="/profile" rel="nofollow" title="My Profile" className="masthead__link">
        <span className="hidden">Profile</span>
        <ProfileIcon />
        {!props.hasProfileNotification ? (
          <abbr className="masthead__notify" title="Notification to view" />
        ) : (
          ""
        )}
      </a>
    </div>
  </React.Fragment>
);

export default () => (
  <header className="masthead-position">
    <div className="masthead">
      <div className="masthead__logo masthead__link-box">
        <a href="/" className="masthead__link">
          Planet Cargo
        </a>
      </div>
      <div className="masthead__actions">
        <SessionContext.Consumer>
          {sessionContext =>
            sessionContext.player ? (
              <PlayerActions {...sessionContext} />
            ) : (
              <GuestActions />
            )
          }
        </SessionContext.Consumer>
      </div>
    </div>
  </header>
);
