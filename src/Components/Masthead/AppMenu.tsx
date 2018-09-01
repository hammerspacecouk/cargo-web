import * as React from "react";
import { Link } from "react-router-dom";
import RankStatusInterface from "../../DomainInterfaces/RankStatusInterface";
import ShipInterface, {
  PLAY_PATH_SHOW,
  PLAY_PATH_EDIT
} from "../../DomainInterfaces/ShipInterface";
import EditIcon from "../Icons/EditIcon";
import ProgressBar from "../ProgressBar";
import HomeIcon from "../Icons/HomeIcon";
import ProfileIcon from "../Icons/ProfileIcon";
import PlayerFlag from "../PlayerFlag";
import PlayerInterface from "../../DomainInterfaces/PlayerInterface";

interface Props {
  readonly isOpen: boolean;
  readonly player: PlayerInterface;
  readonly playerRankStatus: RankStatusInterface;
  readonly playerShips: ShipInterface[];
  readonly linkClicked: { (): void };
}

export default (props: Props) => {
  // todo - ships should show their location
  // todo - flags should be better
  return (
    <div className={`menu ${props.isOpen ? "menu--open" : ""}`}>
      <h2 className="menu__title menu__title--ships c">
        <div className="menu__flag">
          <PlayerFlag player={props.player} />
        </div>
        My fleet
      </h2>
      <ul className="menu__ships">
        {props.playerShips.map((ship: ShipInterface, i: number) => (
          <li className="menu__ship" key={i}>
            <Link
              className="menu__ship-link"
              onClick={props.linkClicked}
              to={PLAY_PATH_SHOW(ship.id)}
            >
              {ship.name}
            </Link>
            <Link
              className="menu__ship-edit"
              onClick={props.linkClicked}
              to={PLAY_PATH_EDIT(ship.id)}
              title="Edit"
            >
              <EditIcon />
            </Link>
          </li>
        ))}
      </ul>

      <div className="menu__rank">
        <h2 className="menu__title c">My rank</h2>
        <div className="menu__rank-row">
          <h3 className="e">{props.playerRankStatus.currentRank.title}</h3>
        </div>
        <div className="menu__rank-row">
          <ProgressBar percent={props.playerRankStatus.levelProgress} />
          <p className="f">{props.playerRankStatus.nextRank.title}</p>
        </div>
      </div>

      <div className="menu__footer">
        <Link to="/" className="menu__footer-link" onClick={props.linkClicked}>
          <span className="menu__footer-icon">
            <HomeIcon />
          </span>
          <span className="menu__footer-text">Home</span>
        </Link>
        <Link
          to="/profile"
          className="menu__footer-link"
          onClick={props.linkClicked}
        >
          <span className="menu__footer-icon">
            <ProfileIcon />
          </span>
          <span className="menu__footer-text">Profile</span>
        </Link>
      </div>
    </div>
  );
};
