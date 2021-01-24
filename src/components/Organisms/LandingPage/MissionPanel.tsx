import * as React from "react";
import { H2 } from "@src/components/Atoms/Heading";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { BREAKPOINTS } from "@src/styles/media";
import { COLOURS } from "@src/styles/colours";
import { CurrentMissions } from "@src/components/Molecules/CurrentMissions";
import { GridWrapper } from "@src/components/Atoms/GridWrapper";
import {Mission, StyledMission} from "@src/components/Molecules/Mission";

export const MissionPanel = () => {
  const { allMissions } = useGameSessionContext();
  return (
    <div>
      <Current>
        <H2>Current Mission</H2>
        <CurrentMissions />
      </Current>

      <H2>Full mission log</H2>

      <GridWrapper as="ul">
        {allMissions.map((mission, idx) => (
          <MissionItem key={`allMissions-${idx}`}>
            {mission ? <Mission mission={mission} /> : <LockedMission>Locked</LockedMission>}
          </MissionItem>
        ))}
      </GridWrapper>
    </div>
  );
};

const Current = styled.div`
  margin-bottom: ${GRID.DOUBLE};
  > *:first-child {
    margin-bottom: ${GRID.UNIT};
  }
  ${BREAKPOINTS.S`
    display: flex;
    align-items: flex-start;
    > *:first-child {
      margin: ${GRID.HALF} ${GRID.DOUBLE} 0 0;
    }
    > *:last-child {
      flex: 1;
    }
  `}
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
  ${BREAKPOINTS.XXL`
    width: 20%;
  `}
`;

const LockedMission = styled(StyledMission)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${COLOURS.SEMANTIC.WARNING.KEY};
`;
