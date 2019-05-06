import * as React from "react";
import styled from "styled-components";
import {
  ACTION_CRATE_NEW,
  ACTION_CRATE_PICKUP,
  ACTION_EFFECT_OFFENCE,
  ACTION_EFFECT_USE,
  ACTION_PLAYER_NEW,
  ACTION_PLAYER_PROMOTION,
  ACTION_SHIP_ARRIVAL,
  ACTION_SHIP_DEPARTURE,
  ACTION_SHIP_NEW,
  ACTION_SHIP_RENAME,
  IEvent,
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
import { Offence } from "../../Molecules/Events/Offence";
import { useMounted } from "../../../hooks/useMounted";

interface IProps {
  readonly className?: string;
  readonly events: IEvent[];
  readonly firstPerson?: boolean;
}

const mapEvent = (
  event: IEvent,
  firstPerson: boolean,
  onAnimated?: () => void
) => {
  switch (event.action) {
    case ACTION_CRATE_NEW:
      return (
        <CrateNew
          event={event}
          onAnimated={onAnimated}
          firstPerson={firstPerson}
        />
      );
    case ACTION_CRATE_PICKUP:
      return <CratePickup event={event} onAnimated={onAnimated} />;
    case ACTION_EFFECT_USE:
      return (
        <EffectUse
          event={event}
          onAnimated={onAnimated}
          firstPerson={firstPerson}
        />
      );
    case ACTION_EFFECT_OFFENCE:
      return (
        <Offence
          event={event}
          onAnimated={onAnimated}
          firstPerson={firstPerson}
        />
      );
    case ACTION_PLAYER_NEW:
      return (
        <PlayerNew
          event={event}
          onAnimated={onAnimated}
          firstPerson={firstPerson}
        />
      );
    case ACTION_PLAYER_PROMOTION:
      return (
        <PlayerPromotion
          event={event}
          onAnimated={onAnimated}
          firstPerson={firstPerson}
        />
      );
    case ACTION_SHIP_NEW:
      return <ShipNew event={event} onAnimated={onAnimated} />;
    case ACTION_SHIP_ARRIVAL:
      return <ShipArrival event={event} onAnimated={onAnimated} />;
    case ACTION_SHIP_DEPARTURE:
      return <ShipDeparture event={event} onAnimated={onAnimated} />;
    case ACTION_SHIP_RENAME:
      return <ShipRename event={event} onAnimated={onAnimated} />;
    default:
      return `Unknown event: ${event.action}`;
  }
};

const StyledList = styled(ListUnstyled)`
  ${MONOSPACE_FONT};
  position: relative;
  overflow: hidden;
  line-height: 1.6;
  color: ${COLOURS.EVENTS.TEXT};
  height: 100%;
  min-height: 60px;
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
      ${hexToRGBa(COLOURS.EVENTS.BACKGROUND, 0)} 0%,
      ${COLOURS.EVENTS.BACKGROUND} 100%
    );
    pointer-events: none;
  }
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: flex-start;
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF};
  }
`;

export const EventsList = ({ className, events, firstPerson }: IProps) => {
  const [displayFrom, setDisplayFrom] = React.useState(undefined);
  const isMounted = useMounted();

  React.useEffect(() => {
    // todo - new events
    // also todo - store localstorage what you last saw and use that for displayFrom
  }, [events]);

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

  const renderedEvents = [];

  let hasPassed = false;
  let animatingItem = null;
  events.forEach((event, i) => {
    if (event.id === displayFrom) {
      hasPassed = true;
      // push the most recent animating item
      renderedEvents.push(animatingItem);
      animatingItem = null;
    }

    let onAnimated;
    if (!hasPassed) {
      onAnimated = () => {
        window.setTimeout(() => {
          if (isMounted()) {
            setDisplayFrom(event.id);
          }
        }, 1500);
      };
    }

    const item = (
      <StyledListItem key={`event-${event.id}`}>
        {mapEvent(event, firstPerson, onAnimated)}
      </StyledListItem>
    );
    if (!hasPassed) {
      // if not ready to be displayed, store it
      animatingItem = item;
    } else {
      // or push immediately
      renderedEvents.push(item);
    }
  });

  if (animatingItem) {
    // should only happen for the last item in the list (first to display)
    renderedEvents.push(animatingItem);
  }

  return (
    <StyledList as="ol" className={className}>
      {renderedEvents}
    </StyledList>
  );
};
