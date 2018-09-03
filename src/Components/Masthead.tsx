import { Link } from "react-router-dom";
import { SessionContext } from "../Context/SessionContext";
import * as React from "react";
import ScoreInterface from "../DomainInterfaces/ScoreInterface";
import ScoreContainer from "../Containers/Common/ScoreContainer";
import ProfileIcon from "./Icons/ProfileIcon";
import ChevronRightIcon from "./Icons/ChevronRightIcon";

interface Props {
  score: ScoreInterface;
}

const GuestActions = () => (
  <div className="masthead__play masthead__link-box">
    <Link to="/play" className="masthead__link">
        <span className="masthead__play-text">Play now</span>
        <span className="masthead__play-icon"><ChevronRightIcon /></span>
    </Link>
  </div>
);

const PlayerActions = (props: Props) => (
  <React.Fragment>
    <div className="masthead__score">
      <Link to="/play" className="masthead__link">
        <ScoreContainer score={props.score}/>
      </Link>
    </div>
    <div className="masthead__profile">
      <Link to="/profile" title="My Profile" className="masthead__link">
        <span className="hidden">Profile</span>
        <ProfileIcon />
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
              <PlayerActions score={sessionContext.score}/> :
              <GuestActions/>
          )}
        </SessionContext.Consumer>
      </div>
    </div>
  </header>
);
