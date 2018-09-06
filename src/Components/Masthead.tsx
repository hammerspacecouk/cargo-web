import { Link } from "react-router-dom";
import { SessionContext, SessionContextInterface } from "../Context/SessionContext";
import * as React from "react";
import ScoreContainer from "../Containers/Common/ScoreContainer";
import ProfileIcon from "./Icons/ProfileIcon";
import ActionLink from "./ActionLink";

const GuestActions = () => (
  <div className="masthead__play masthead__link-box">
    <ActionLink to="/play" className="masthead__link m-icon-suffix--animated">
      Play now
    </ActionLink>
  </div>
);

const PlayerActions = (props: SessionContextInterface) => (
  <React.Fragment>
    <div className="masthead__score">
      <Link to="/play" className="masthead__link">
        <ScoreContainer score={props.score}/>
      </Link>
    </div>
    <div className="masthead__profile">
      <Link
        to="/profile"
        title="My Profile"
        className="masthead__link"
      >
        <span className="hidden">Profile</span>
        <ProfileIcon/>
        {!props.hasSetEmail ? <abbr
          className="masthead__notify"
          title="Notification to view" /> : ''}
      </Link>
    </div>
  </React.Fragment>
);

export default () => (
  <header className="masthead-position">
    <div className="masthead">
      <div className="masthead__logo masthead__link-box">
        <Link to="/" className="masthead__link">Planet Cargo</Link>
      </div>
      <div className="masthead__actions">
        <SessionContext.Consumer>
          {sessionContext => (
            sessionContext.player ?
              <PlayerActions {...sessionContext} /> :
              <GuestActions/>
          )}
        </SessionContext.Consumer>
      </div>
    </div>
  </header>
);
