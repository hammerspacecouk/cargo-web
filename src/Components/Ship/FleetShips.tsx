import * as React from "react";
import ShipInterface from "../../DomainInterfaces/ShipInterface";
import { Link } from "react-router-dom";
import EditIcon from "../Icons/EditIcon";
import ActionLink from "../Link/ActionLink";
import ShieldIcon from "../Icons/ShieldIcon";
import ProgressBar from "../Element/ProgressBar";
import routes from "../../routes";

export interface Props {
  ships: ShipInterface[];
}

// todo - abstract this and use it lots (with the proper interface)
const inlinePortName = (ship: ShipInterface) => {
  let safe = null;
  if (ship.location.safeHaven) {
    safe = (
      <abbr title="Safe Haven" className="m-icon-suffix__icon">
        <ShieldIcon />
      </abbr>
    );
  }
  return (
    <span className="m-icon-suffix">
      <span className="m-icon-suffix__text">{ship.location.name}</span>
      {safe}
    </span>
  );
};

const tempIcon = (
  <svg viewBox="0 0 469.33 469.33">
    <circle cx="234.67" cy="234.67" r="234.67" fill="#000000" />
    <g>
      <path
        d="M209.14 116.51a145.48 145.48 0 0 0-35.64 10.43c-39 17.15-61.73 48.19-91.28 89.55-7.45 10.42-17.64 25.42-28.69 44.33l141.7-1.73c-5.7-7.68-21.95-31.61-21.29-65.64.85-44.4 29.82-71.99 35.2-76.94zm4.35-8.26L197 263.87c18.89-.2 38.62.05 59.12.87 25.62 1 50 2.84 73 5.21a331.76 331.76 0 0 1-34.77-34.77c-5.59-6.48-18.93-22.48-49.55-73-8.1-13.37-18.94-31.69-31.31-53.93z"
        fill="#fafafa"
      />
      <path
        d="M426.15 329.5c-9.89-14.35-11-22.17-20.32-23.69-1.86-.93-16-.94-15.1-1 6.19-.21-34.12-.24-70.75-1a52.38 52.38 0 0 1-16.51-2.9c-1.7-.61-2.84-1.14-3.14-1.28a50.57 50.57 0 0 1-13.49-9.73c-6.65-7.45-6.19-7.39-23.58-10.54-2.07-.38-59.15-10.64-96.71-11.63-7.43-.2-11.18.08-16.09 1.3-7.48 1.87-10 4.4-17.38 6.09a44.29 44.29 0 0 1-15.65.87l-84.76-9.13C44 278.54 56.9 290.67 71.35 302.99c12.41 10.54 24.52 19.92 36.08 28.25 108.67 4.93 222.44 10 331.11 14.89-3.8-4.56-10.7-14.18-12.39-16.63zm-243.52-43.9c-14.22-2.07-24.8-3.46-33-4.35-2-.22-4.94-.52-5.21-1.74-.46-2 6.61-6.26 13.91-6.95a23 23 0 0 1 4.34 0l21.74 1.74zm35.82 4l-32.13-3.47 1.74-11.3 31.3 3.3q-.45 5.71-.91 11.45zm30.47 3l-25.65-2.72 1.2-11.19 25.53 2.98z"
        fill="#fafafa"
      />
    </g>
    <path
      d="M249.59 487.33a235 235 0 0 0 208.74-126.85c-54.69-12.91-127.91-20.81-208.4-20.81-80.78 0-154.24 7.95-209 20.95a235 235 0 0 0 208.66 126.71z"
      transform="translate(-15 -14.33)"
      fill="#fafafa"
    />
  </svg>
);

const ship = (ship: ShipInterface) => (
  <tr key={ship.id} className="m-fleet-ship">
    <td className="m-fleet-ship__cell m-fleet-ship__cell--icon">
      {tempIcon}
    </td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--name">
      <Link to={routes.getPlayShip(ship.id)} className="m-fleet-ship__meta">
        <div className="m-fleet-ship__name">{ship.name}</div>
        <div className="m-fleet-ship__class">{ship.shipClass.name}</div>
      </Link>
    </td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--location">
      {ship.location.name ? inlinePortName(ship) : "Travelling..."}
    </td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--health">
      <ProgressBar percent={ship.strengthPercent} isHealth={true} />
    </td>
    <td className="m-fleet-ship__cell m-fleet-ship__cell--actions">
      <Link
        to={routes.getPlayShipEdit(ship.id)}
        title="Edit"
        className="m-fleet-ship__action"
      >
        <EditIcon />
      </Link>
    </td>
  </tr>
);

export default (props: Props) => {
  return (
    <div className="o-ships">
      <table className="o-ships__list">
        <thead className="hidden">
          <tr>
            <th>Class</th>
            <th>Ship Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{props.ships.map(ship)}</tbody>
      </table>
      <div className="o-ships__more">
        <ActionLink to={`/play/upgrades`}>Get more ships</ActionLink>
      </div>
    </div>
  );
};
