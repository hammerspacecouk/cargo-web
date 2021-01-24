import * as React from "react";
import { IMission, IPlayer, IPort, IShip, isInPort } from "@src/interfaces";
import { PlayerFlag } from "@src/components/Molecules/PlayerFlag";
import { Score } from "@src/components/Organisms/Score";
import { SimplePage } from "@src/components/Templates/SimplePage";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { H2, H3 } from "@src/components/Atoms/Heading";
import { ShieldStrength } from "@src/components/Molecules/ShieldStrength";
import { Icon, TEXT_ICON } from "@src/components/Atoms/Icon";
import { PlagueIcon } from "@src/components/Icons/PlagueIcon";
import { CheckboxChecked } from "@src/components/Icons/CheckboxCheckedIcon";
import { CheckboxEmpty } from "@src/components/Icons/CheckboxEmptyIcon";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import { BREAKPOINTS } from "@src/styles/media";
import { Mission } from "@src/components/Molecules/Mission";

export interface IPlayerPageProps {
  player: IPlayer;
  fleet: IShip[];
  missions: IMission[];
}

export const PlayerPage = ({ player, fleet, missions }: IPlayerPageProps) => {
  return (
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
        <H2>Completed Missions</H2>
        <GridWrapper as="ul">
          {missions.map((mission, idx) => (
            <MissionItem key={`allMissions-${idx}`}>
              <Mission mission={mission} />
            </MissionItem>
          ))}
        </GridWrapper>
      </Panel>
      <Panel>
        <H2>Fleet</H2>
        <ul>
          {fleet.map((ship) => (
            <li key={ship.id}>
              <Ship>
                <Shield>
                  <ShieldStrength percent={ship.strengthPercent} />
                </Shield>
                <Name>
                  {ship.name}{" "}
                  {ship.hasPlague && (
                    <Icon size={TEXT_ICON} title="Infected">
                      <PlagueIcon />
                    </Icon>
                  )}
                </Name>
                <span>{ship.shipClass.name}</span>
                <span>{isInPort(ship.location) ? (ship.location as IPort).name : "Travelling"}</span>
              </Ship>
            </li>
          ))}
        </ul>
      </Panel>
    </SimplePage>
  );
};

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

const MissionItem = styled.li`
  display: flex;
  width: 100%;
  ${BREAKPOINTS.S`
    width: 50%;
  `}
  ${BREAKPOINTS.XL`
    width: 25%;
  `}
`;
