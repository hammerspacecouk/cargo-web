import * as React from "react";
import EventInterface, {
  ACTION_CRATE_NEW, ACTION_CRATE_PICKUP,
  ACTION_PLAYER_NEW,
  ACTION_PLAYER_PROMOTION,
  ACTION_SHIP_ARRIVAL,
  ACTION_SHIP_DEPARTURE,
  ACTION_SHIP_NEW,
  ACTION_SHIP_RENAME
} from "../../DomainInterfaces/EventInterface";
import PlayerNew from "../../Components/Events/PlayerNew";
import ShipNew from "../../Components/Events/ShipNew";
import ShipArrival from "../../Components/Events/ShipArrival";
import ShipDeparture from "../../Components/Events/ShipDeparture";
import ShipRename from "../../Components/Events/ShipRename";
import PlayerPromotion from "../../Components/Events/PlayerPromotion";
import CrateNew from "../../Components/Events/CrateNew";
import CratePickup from "../../Components/Events/CratePickup";

interface Props {
  readonly events: EventInterface[];
  readonly firstPerson?: boolean;
}

export default class EventsContainer extends React.Component<Props, undefined> {
  mapEvent = (event: EventInterface) => {
    let eventComponent;
    switch (event.action) {
      case ACTION_CRATE_NEW:
        eventComponent = (
          <CrateNew event={event} firstPerson={this.props.firstPerson}/>
        );
        break;
      case ACTION_CRATE_PICKUP:
        eventComponent = (
          <CratePickup event={event}/>
        );
        break;
      case ACTION_PLAYER_NEW:
        eventComponent = (
          <PlayerNew event={event} firstPerson={this.props.firstPerson}/>
        );
        break;
      case ACTION_PLAYER_PROMOTION:
        eventComponent = (
          <PlayerPromotion event={event} firstPerson={this.props.firstPerson}/>
        );
        break;
      case ACTION_SHIP_NEW:
        eventComponent = <ShipNew event={event}/>;
        break;
      case ACTION_SHIP_ARRIVAL:
        eventComponent = <ShipArrival event={event}/>;
        break;
      case ACTION_SHIP_DEPARTURE:
        eventComponent = <ShipDeparture event={event}/>;
        break;
      case ACTION_SHIP_RENAME:
        eventComponent = <ShipRename event={event}/>;
        break;
      default:
        eventComponent = `Unknown event: ${event.action}`;
        break;
    }

    return <li key={`event-${event.id}`}>{eventComponent}</li>;
  };

  render = () => {
    let events = null;
    if (this.props.events && this.props.events.length) {
      events = (
        <ul className="events">{this.props.events.map(this.mapEvent)}</ul>
      );
    }

    return (
      <div className="panel">
        <h2 className="panel__title">Captain's log</h2>
        {events}
      </div>
    );
  };
}
