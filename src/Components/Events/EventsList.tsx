import * as React from "react";
import EventInterface, {
  ACTION_CRATE_NEW,
  ACTION_CRATE_PICKUP,
  ACTION_PLAYER_NEW,
  ACTION_PLAYER_PROMOTION,
  ACTION_SHIP_ARRIVAL,
  ACTION_SHIP_DEPARTURE,
  ACTION_SHIP_NEW,
  ACTION_SHIP_RENAME
} from "../../interfaces/EventInterface";
import PlayerNew from "./PlayerNew";
import ShipNew from "./ShipNew";
import ShipArrival from "./ShipArrival";
import ShipDeparture from "./ShipDeparture";
import ShipRename from "./ShipRename";
import PlayerPromotion from "./PlayerPromotion";
import CrateNew from "./CrateNew";
import CratePickup from "./CratePickup";

interface Props {
  readonly events: EventInterface[];
  readonly firstPerson?: boolean;
}

const mapEvent = (event: EventInterface, firstPerson: boolean) => {
  switch (event.action) {
    case ACTION_CRATE_NEW:
      return (
        <CrateNew event={event} firstPerson={firstPerson}/>
      );
    case ACTION_CRATE_PICKUP:
      return <CratePickup event={event}/>;
    case ACTION_PLAYER_NEW:
      return (
        <PlayerNew event={event} firstPerson={firstPerson}/>
      );
    case ACTION_PLAYER_PROMOTION:
      return <PlayerPromotion event={event} firstPerson={firstPerson}/>;
    case ACTION_SHIP_NEW:
      return <ShipNew event={event}/>;
    case ACTION_SHIP_ARRIVAL:
      return <ShipArrival event={event}/>;
    case ACTION_SHIP_DEPARTURE:
      return <ShipDeparture event={event}/>;
    case ACTION_SHIP_RENAME:
      return <ShipRename event={event}/>;
    default:
      return `Unknown event: ${event.action}`;
  }
};

export default function EventsList({ events, firstPerson }: Props) {
  if (!events || events.length < 1) {
    return null;
  }

  return (
    <div className="panel">
      <h2 className="panel__title">Captain's log</h2>
      <ul className="events">{events.map((event) => (
        <li key={`event-${event.id}`}>{mapEvent(event, firstPerson)}</li>
      ))}</ul>
    </div>
  );
}
