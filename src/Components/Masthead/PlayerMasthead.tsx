import * as React from "react";
import ScoreContainer from "../../Containers/Common/ScoreContainer";
import { Link } from "react-router-dom";
import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import MenuIcon from "../Icons/MenuIcon";
import ShipInterface from "../../DomainInterfaces/ShipInterface";

interface Props {
  currentShip?: ShipInterface;
  score: ScoreInterface;
  menuButtonHandler: { (event: React.MouseEvent<HTMLAnchorElement>): void };
}

export default (props: Props) => {
  let shipLink = null;
  if (props.currentShip) {
    shipLink = (
      <div className="masthead__ship">
        <Link
          to={`/play/${props.currentShip.id}`}
          className="masthead__box-link masthead__box-link--ship"
        >
          {props.currentShip.name}
        </Link>
      </div>
    );
  }

  return (
    <div className="masthead">
      <div className="masthead__menu">
        <Link
          to="/profile"
          title="Menu: Profile and Ships"
          className="masthead__box-link masthead__box-link--menu"
          onClick={props.menuButtonHandler}
        >
          <MenuIcon />
        </Link>
      </div>
      {shipLink}
      <div className="masthead__score">
        <ScoreContainer score={props.score} />
      </div>
    </div>
  );
};
