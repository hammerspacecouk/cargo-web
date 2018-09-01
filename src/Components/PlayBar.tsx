import * as React from "react";
import ShipInterface from "../DomainInterfaces/ShipInterface";
import { Link } from "react-router-dom";

export interface Props {
  ship?: ShipInterface;
}

const iconLocation = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
  </svg>
);

const iconMap = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M15,19L9,16.89V5L15,7.11M20.5,3C20.44,3 20.39,3 20.34,3L15,5.1L9,3L3.36,4.9C3.15,4.97 3,5.15 3,5.38V20.5A0.5,0.5 0 0,0 3.5,21C3.55,21 3.61,21 3.66,20.97L9,18.9L15,21L20.64,19.1C20.85,19 21,18.85 21,18.62V3.5A0.5,0.5 0 0,0 20.5,3Z" />
  </svg>
);

const iconCargo = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M20,6C20.58,6 21.05,6.2 21.42,6.59C21.8,7 22,7.45 22,8V19C22,19.55 21.8,20 21.42,20.41C21.05,20.8 20.58,21 20,21H4C3.42,21 2.95,20.8 2.58,20.41C2.2,20 2,19.55 2,19V8C2,7.45 2.2,7 2.58,6.59C2.95,6.2 3.42,6 4,6H8V4C8,3.42 8.2,2.95 8.58,2.58C8.95,2.2 9.42,2 10,2H14C14.58,2 15.05,2.2 15.42,2.58C15.8,2.95 16,3.42 16,4V6H20M4,8V19H20V8H4M14,6V4H10V6H14Z" />
  </svg>
);

const iconPortfolio = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M5,6H23V18H5V6M14,9A3,3 0 0,1 17,12A3,3 0 0,1 14,15A3,3 0 0,1 11,12A3,3 0 0,1 14,9M9,8A2,2 0 0,1 7,10V14A2,2 0 0,1 9,16H19A2,2 0 0,1 21,14V10A2,2 0 0,1 19,8H9M1,10H3V20H19V22H1V10Z" />
  </svg>
);

const iconTools = (
  <svg className="play-bar__icon" viewBox="0 0 24 24">
    <path d="M12,11A1,1 0 0,1 13,12A1,1 0 0,1 12,13A1,1 0 0,1 11,12A1,1 0 0,1 12,11M4.22,4.22C5.65,2.79 8.75,3.43 12,5.56C15.25,3.43 18.35,2.79 19.78,4.22C21.21,5.65 20.57,8.75 18.44,12C20.57,15.25 21.21,18.35 19.78,19.78C18.35,21.21 15.25,20.57 12,18.44C8.75,20.57 5.65,21.21 4.22,19.78C2.79,18.35 3.43,15.25 5.56,12C3.43,8.75 2.79,5.65 4.22,4.22M15.54,8.46C16.15,9.08 16.71,9.71 17.23,10.34C18.61,8.21 19.11,6.38 18.36,5.64C17.62,4.89 15.79,5.39 13.66,6.77C14.29,7.29 14.92,7.85 15.54,8.46M8.46,15.54C7.85,14.92 7.29,14.29 6.77,13.66C5.39,15.79 4.89,17.62 5.64,18.36C6.38,19.11 8.21,18.61 10.34,17.23C9.71,16.71 9.08,16.15 8.46,15.54M5.64,5.64C4.89,6.38 5.39,8.21 6.77,10.34C7.29,9.71 7.85,9.08 8.46,8.46C9.08,7.85 9.71,7.29 10.34,6.77C8.21,5.39 6.38,4.89 5.64,5.64M9.88,14.12C10.58,14.82 11.3,15.46 12,16.03C12.7,15.46 13.42,14.82 14.12,14.12C14.82,13.42 15.46,12.7 16.03,12C15.46,11.3 14.82,10.58 14.12,9.88C13.42,9.18 12.7,8.54 12,7.97C11.3,8.54 10.58,9.18 9.88,9.88C9.18,10.58 8.54,11.3 7.97,12C8.54,12.7 9.18,13.42 9.88,14.12M18.36,18.36C19.11,17.62 18.61,15.79 17.23,13.66C16.71,14.29 16.15,14.92 15.54,15.54C14.92,16.15 14.29,16.71 13.66,17.23C15.79,18.61 17.62,19.11 18.36,18.36Z" />
  </svg>
);

export default (props: Props) => {
  let items = [];
  if (props.ship) {
    items.push(
      <li className="play-bar__item" key="location">
        <Link to={`/play/${props.ship.id}`} className="play-bar__link">
          {iconLocation}
          Location
        </Link>
      </li>,
      <li className="play-bar__item" key="map">
        <Link to={`/play/${props.ship.id}/map`} className="play-bar__link">
          {iconMap}
          Map
        </Link>
      </li>,
      <li className="play-bar__item" key="cargo">
        <Link to={`/play/${props.ship.id}/cargo`} className="play-bar__link">
          {iconCargo}
          Cargo
        </Link>
      </li>
    );
  } else {
    items.push(
      <li className="play-bar__item" key="location">
        <span className="play-bar__link play-bar__link--disabled">
          {iconLocation}
          Location
        </span>
      </li>,
      <li className="play-bar__item" key="map">
        <span className="play-bar__link play-bar__link--disabled">
          {iconMap}
          Map
        </span>
      </li>,
      <li className="play-bar__item" key="cargo">
        <span className="play-bar__link play-bar__link--disabled">
          {iconCargo}
          Cargo
        </span>
      </li>
    );
  }

  items.push(
    <li className="play-bar__item" key="portfolio">
      <Link to="/play/portfolio" className="play-bar__link">
        {iconPortfolio}
        Portfolio
      </Link>
    </li>,
    <li className="play-bar__item" key="tools">
      <Link to="/play/tools" className="play-bar__link">
        {iconTools}
        Tools
      </Link>
    </li>
  );

  return (
    <nav className="play-bar">
      <ul className="play-bar__list">{items}</ul>
    </nav>
  );
};
