import * as React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { useSessionContext } from "../../context/SessionContext";
import ProfileIcon from "../Icons/ProfileIcon/ProfileIcon";
import Score from "../../containers/Player/Score";

const GuestActions = () => (
  <div className="masthead__play masthead__link-box">
    <form action={routes.getLoginAnonymous()} method="post">
      <button className="masthead__link m-icon-suffix--animated">
        Play now
      </button>
    </form>
  </div>
);

const PlayerActions = () => {
  const { score, hasProfileNotification } = useSessionContext();

  return (
    <>
      <div className="masthead__score">
        <Link to={routes.getPlay()} rel="nofollow" className="masthead__link">
          <Score score={score} />
        </Link>
      </div>
      <div className="masthead__profile">
        <a
          href="/profile"
          rel="nofollow"
          title="My Profile"
          className="masthead__link"
        >
          <span className="hidden">Profile</span>
          <ProfileIcon />
          {hasProfileNotification && (
            <abbr className="masthead__notify" title="Notification to view" />
          )}
        </a>
      </div>
    </>
  );
};

export default () => {
  const { player } = useSessionContext();

  return (
    <header className="masthead-position">
      <div className="masthead">
        <div className="masthead__logo masthead__link-box">
          <a href="/" className="masthead__link">
            Planet Cargo
          </a>
        </div>
        <div className="masthead__actions">
          {player ? <PlayerActions /> : <GuestActions />}
        </div>
      </div>
    </header>
  );
};
