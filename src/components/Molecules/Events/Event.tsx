import * as React from "react";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { TimeAgo } from "@src/components/Atoms/TimeAgo";
import { COLOURS } from "@src/styles/colours";
import { IEvent, IPlayer, IShip } from "@src/interfaces";
import { SIZES } from "@src/styles/typography";
import { PlayerFlag } from "@src/components/Molecules/PlayerFlag";

export interface IEventProps {
  readonly event: IEvent;
  readonly firstPerson?: boolean;
}

export const Event = ({ children, time }: IProps) => {
  return (
    <StyledEvent>
      <Content>{children}</Content>
      <Time datetime={new Date(time)} />
    </StyledEvent>
  );
};

export const EventShipName = ({ ship }: { ship?: IShip }) => {
  if (!ship) {
    return <>[deleted]</>;
  }

  if (ship?.owner) {
    return (
      <a href={`/players/${ship.owner.id}`} target="_blank">
        <EventFlag>
          <PlayerFlag player={ship.owner} />
        </EventFlag>{" "}
        {ship.name}
      </a>
    );
  }

  return <>{ship.name}</>;
};

export const EventPlayerName = ({ player }: { player?: IPlayer }) => {
  if (!player) {
    return <>[deleted]</>;
  }

  return (
    <a href={`/players/${player.id}`} target="_blank">
      <EventFlag>
        <PlayerFlag player={player} />
      </EventFlag>{" "}
      {player.displayName}
    </a>
  );
};

interface IProps {
  readonly time: string;
  readonly children: any;
}

const StyledEvent = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  min-height: ${GRID.UNIT};
  flex-wrap: wrap;
  ${SIZES.F}
`;

export const EventFlag = styled.span`
  display: inline-block;
  width: 32px;
  height: 32px;
  vertical-align: middle;
  line-height: 0;
  position: relative;
  top: -1px;
  border-radius: 50%;
  border: solid 2px ${COLOURS.WHITE.STANDARD};
`;

const Content = styled.span`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

const Time = styled(TimeAgo)`
  opacity: 0.6;
  ${SIZES.F};
`;
