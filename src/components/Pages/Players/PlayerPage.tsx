import * as React from "react";
import { IPlayer, IPort, IShip, isInPort } from "../../../interfaces";
import { PlayerFlag } from "../../Molecules/PlayerFlag";
import { Score } from "../../Organisms/Score";
import { SimplePage } from "../../Templates/SimplePage";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import { H2, H3 } from "../../Atoms/Heading";
import { ShieldStrength } from "../../Molecules/ShieldStrength";

export interface IPlayerPageProps {
  player: IPlayer;
  fleet: IShip[];
}

export const PlayerPage = ({ player, fleet }: IPlayerPageProps) => (
  <SimplePage>
    <Panel>
      <FlagSpace>
        <PlayerFlag player={player} />
      </FlagSpace>
      <Detail>
        <H2 as="h1">{player.displayName}</H2>
        <H3 as="p">{player.rank.title}</H3>
        <StyledScore score={player.score} />
      </Detail>
    </Panel>
    <Panel>
      <H2>Fleet</H2>
      <ul>
        {fleet.map(ship => (
          <li key={ship.id}>
            <Ship>
              <Shield>
                <ShieldStrength percent={ship.strengthPercent} />
              </Shield>
              <Name>{ship.name}</Name>
              <span>{ship.shipClass.name}</span>
              <span>{isInPort(ship.location) ? (ship.location as IPort).name : "Travelling"}</span>
            </Ship>
          </li>
        ))}
      </ul>
    </Panel>
  </SimplePage>
);

const Panel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
  }
`;

const FlagSpace = styled.div`
  width: 128px;
  height: 128px;
  margin: 0 auto ${GRID.UNIT};
  border-radius: 128px;
  border: solid 4px ${COLOURS.BODY.TEXT};
`;

const Detail = styled.div`
  text-align: center;
`;

const StyledScore = styled(Score)`
  justify-content: center;
  margin-top: ${GRID.HALF};
`;

const Ship = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${GRID.UNIT};
  > *:not(:last-child) {
    margin-right: ${GRID.UNIT};
  }
`;
const Shield = styled.div`
  width: 36px;
`;
const Name = styled.span`
  flex: 1;
`;
