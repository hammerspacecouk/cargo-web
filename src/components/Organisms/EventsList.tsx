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
import { useMounted } from "../../hooks/useMounted";
import { getStoredItem, storeItem } from "../../utils/storage";

interface IProps {
  readonly className?: string;
  readonly events: IEvent[];
  readonly firstPerson?: boolean;
}

const mapEvent = (event: IEvent, firstPerson: boolean, onAnimated?: () => void) => {
  switch (event.action) {
    case ACTION_CRATE_NEW:
      return <CrateNew event={event} onAnimated={onAnimated} firstPerson={firstPerson} />;
    case ACTION_CRATE_PICKUP:
      return <CratePickup event={event} onAnimated={onAnimated} />;
    case ACTION_EFFECT_USE:
      return <EffectUse event={event} onAnimated={onAnimated} firstPerson={firstPerson} />;
    case ACTION_EFFECT_OFFENCE:
      return <Offence event={event} onAnimated={onAnimated} firstPerson={firstPerson} />;
    case ACTION_PLAYER_NEW:
      return <PlayerNew event={event} onAnimated={onAnimated} firstPerson={firstPerson} />;
    case ACTION_PLAYER_PROMOTION:
      return <PlayerPromotion event={event} onAnimated={onAnimated} firstPerson={firstPerson} />;
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
  line-height: 1.6;
  color: ${COLOURS.EVENTS.TEXT};
  height: 100%;
  min-height: 60px;
  overflow: hidden;
`;

interface IRenderedEvent {
  id: string;
  element: React.ReactNode;
}

const calculateOpacity = (position: number, total: number) => {
  const index = position + 1;
  if (index <= 3) {
    return 1;
  }

  const thresholdToFade = Math.max(4, total - 2);

  if (index === thresholdToFade) {
    return 0.7;
  }
  if (index === thresholdToFade + 1) {
    return 0.4;
  }
  if (index === thresholdToFade + 2) {
    return 0.1;
  }

  return 1;
};

const StyledListItem = styled.li<{ opacity: number }>`
  display: flex;
  align-items: flex-start;
  opacity: ${({ opacity }) => opacity};
  &:not(:last-child) {
    margin-bottom: ${GRID.HALF};
  }
`;

const LAST_SEEN_EVENT_TIME_KEY = "LAST_SEEN_EVENT_TIME";

const getLastSeenTime = (): Date => {
  const iso = getStoredItem(LAST_SEEN_EVENT_TIME_KEY);
  if (iso) {
    return new Date(iso);
  }
  return null;
};

export const EventsList = ({ className, events, firstPerson }: IProps) => {
  const [animateFrom, setAnimateFrom] = React.useState(undefined);
  const isMounted = useMounted();

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

  const lastSeenTime = isMounted() && getLastSeenTime();
  const renderedEvents: IRenderedEvent[] = [];

  // loop from oldest to newest
  // items should only be added to the rendered list
  // if they are before "animateFrom" or they've already been seen
  let showNoMore: boolean;
  let willAnimate: boolean;
  // copy events array to reverse it
  [...events].reverse().forEach(event => {
    if (showNoMore) {
      return; // item is after the animating line. ignore it
    }

    const hasSeen = lastSeenTime && new Date(event.time) <= lastSeenTime;

    let onAnimationComplete; // leave as undefined to disable animation
    if (!hasSeen && (willAnimate || !animateFrom)) {
      onAnimationComplete = () => {
        window.setTimeout(() => {
          if (isMounted()) {
            setAnimateFrom(event.id);
            storeItem(LAST_SEEN_EVENT_TIME_KEY, event.time);
          }
        }, 1500);
      };
      showNoMore = true; // the last one should be the animating one
    } else if (event.id === animateFrom) {
      // animate the next item
      willAnimate = true;
    }

    renderedEvents.push({
      id: event.id,
      element: mapEvent(event, firstPerson, onAnimationComplete),
    });
  });

  // put them back into reverse chronological order (most recent first)
  renderedEvents.reverse();

  const total = renderedEvents.length;
  return (
    <StyledList as="ol" className={className}>
      {renderedEvents.map((event, i) => (
        <StyledListItem key={`event-${event.id}`} data-event-id={event.id} opacity={calculateOpacity(i, total)}>
          {event.element}
        </StyledListItem>
      ))}
    </StyledList>
  );
};
