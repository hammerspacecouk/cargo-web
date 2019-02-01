import * as React from "react";
import styled from "styled-components";
import {
  ACTION_CRATE_NEW,
  ACTION_CRATE_PICKUP,
  ACTION_EFFECT_USE,
  ACTION_PLAYER_NEW,
  ACTION_PLAYER_PROMOTION,
  ACTION_SHIP_ARRIVAL,
  ACTION_SHIP_DEPARTURE,
  ACTION_SHIP_NEW,
  ACTION_SHIP_RENAME,
  IEvent
} from "../../../Interfaces";
import { COLOURS, hexToRGBa } from "../../../styles/colours";
import { MONOSPACE_FONT } from "../../../styles/typography";
import { GRID } from "../../../styles/variables";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { TextCursor } from "../../Atoms/TextCursor/TextCursor";
import { CrateNew } from "../../Molecules/Events/CrateNew";
import { CratePickup } from "../../Molecules/Events/CratePickup";
import { PlayerNew } from "../../Molecules/Events/PlayerNew";
import { PlayerPromotion } from "../../Molecules/Events/PlayerPromotion";
import { ShipArrival } from "../../Molecules/Events/ShipArrival";
import { ShipDeparture } from "../../Molecules/Events/ShipDeparture";
import { ShipNew } from "../../Molecules/Events/ShipNew";
import { ShipRename } from "../../Molecules/Events/ShipRename";
import { EffectUse } from "../../Molecules/Events/EffectUse";

interface IProps {
  readonly events: IEvent[];
  readonly firstPerson?: boolean;
}

const mapEvent = (event: IEvent, firstPerson: boolean) => {
  switch (event.action) {
    case ACTION_CRATE_NEW:
      return <CrateNew event={event} firstPerson={firstPerson}/>;
    case ACTION_CRATE_PICKUP:
      return <CratePickup event={event}/>;
    case ACTION_EFFECT_USE:
      return <EffectUse event={event} firstPerson={firstPerson}/>;
    case ACTION_PLAYER_NEW:
      return <PlayerNew event={event} firstPerson={firstPerson}/>;
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

const StyledList = styled(ListUnstyled)`
  ${MONOSPACE_FONT};
  padding: ${GRID.UNIT};
  background: ${COLOURS.BLACK.STANDARD};
  position: relative;
  overflow: hidden;
  line-height: 1.6;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    height: ${GRID.DOUBLE};
    background: linear-gradient(
      to bottom,
      ${hexToRGBa(COLOURS.BLACK.STANDARD, 0)} 0%,
      ${COLOURS.BLACK.STANDARD} 100%
    );
    pointer-events: none;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF}px;
  }
`;

export const EventsList = ({ events, firstPerson }: IProps) => {
  if (!events || events.length < 1) {
    return (
      <StyledList as="ol">
        <li>
          <TextCursor/>
        </li>
      </StyledList>
    );
  }

  return (
    <StyledList as="ol">
      {events.map(event => (
        <StyledListItem key={`event-${event.id}`}>
          {mapEvent(event, firstPerson)}
        </StyledListItem>
      ))}
    </StyledList>
  );
};
