import * as React from "react";
import styled from "styled-components";
import {
  ACTION_CRATE_NEW,
  ACTION_CRATE_PICKUP,
  ACTION_EFFECT_DESTROYED,
  ACTION_EFFECT_OFFENCE,
  ACTION_EFFECT_USE,
  ACTION_PLAYER_NEW,
  ACTION_PLAYER_PROMOTION,
  ACTION_SHIP_ARRIVAL,
  ACTION_SHIP_CURED,
  ACTION_SHIP_DEPARTURE,
  ACTION_SHIP_INFECTED,
  ACTION_SHIP_NEW,
  ACTION_SHIP_RENAME,
  IEvent,
} from "../../interfaces";
import { COLOURS } from "../../styles/colours";
import { MONOSPACE_FONT } from "../../styles/typography";
import { GRID } from "../../styles/variables";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { TextCursor } from "../Atoms/TextCursor";
import { CrateNew } from "../Molecules/Events/CrateNew";
import { CratePickup } from "../Molecules/Events/CratePickup";
import { PlayerNew } from "../Molecules/Events/PlayerNew";
import { PlayerPromotion } from "../Molecules/Events/PlayerPromotion";
import { ShipArrival } from "../Molecules/Events/ShipArrival";
import { ShipDeparture } from "../Molecules/Events/ShipDeparture";
import { ShipNew } from "../Molecules/Events/ShipNew";
import { ShipRename } from "../Molecules/Events/ShipRename";
import { EffectUse } from "../Molecules/Events/EffectUse";
import { Offence } from "../Molecules/Events/Offence";
import { ShipInfected } from "../Molecules/Events/ShipInfected";
import { ShipCured } from "../Molecules/Events/ShipCured";

export const EventsList = ({ className, events, firstPerson }: IProps) => {
  const len = events && events.length;
  if (!events || len < 1) {
    return (
      <StyledList as="ol" className={className}>
        <li>
          <TextCursor />
        </li>
      </StyledList>
    );
  }

  return (
    <StyledList as="ol" className={className}>
      {events.map((event, i) => (
        <StyledListItem key={`event-${event.id}`} data-event-id={event.id}>
          {mapEvent(event, firstPerson)}
        </StyledListItem>
      ))}
    </StyledList>
  );
};

interface IProps {
  readonly className?: string;
  readonly events: IEvent[];
  readonly firstPerson?: boolean;
}

const mapEvent = (event: IEvent, firstPerson: boolean) => {
  switch (event.action) {
    case ACTION_CRATE_NEW:
      return <CrateNew event={event} firstPerson={firstPerson} />;
    case ACTION_CRATE_PICKUP:
      return <CratePickup event={event} />;
    case ACTION_EFFECT_USE:
      return <EffectUse event={event} firstPerson={firstPerson} />;
    case ACTION_EFFECT_OFFENCE:
      return <Offence event={event} firstPerson={firstPerson} />;
    case ACTION_EFFECT_DESTROYED:
      return <Offence event={event} firstPerson={firstPerson} destroyed={true} />;
    case ACTION_PLAYER_NEW:
      return <PlayerNew event={event} firstPerson={firstPerson} />;
    case ACTION_PLAYER_PROMOTION:
      return <PlayerPromotion event={event} firstPerson={firstPerson} />;
    case ACTION_SHIP_NEW:
      return <ShipNew event={event} />;
    case ACTION_SHIP_ARRIVAL:
      return <ShipArrival event={event} />;
    case ACTION_SHIP_DEPARTURE:
      return <ShipDeparture event={event} />;
    case ACTION_SHIP_RENAME:
      return <ShipRename event={event} />;
    case ACTION_SHIP_INFECTED:
      return <ShipInfected event={event} />;
    case ACTION_SHIP_CURED:
      return <ShipCured event={event} />;
    default:
      return `Unknown event: ${event.action}`;
  }
};

const StyledList = styled(ListUnstyled)`
  ${MONOSPACE_FONT};
  color: ${COLOURS.EVENTS.TEXT};
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF};
    padding-bottom: ${GRID.HALF};
    border-bottom: solid 1px rgba(255, 255, 255, 0.1);
  }
`;
