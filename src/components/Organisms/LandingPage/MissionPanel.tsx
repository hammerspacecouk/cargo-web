import * as React from "react";
import { H2, H3 } from "../../Atoms/Heading";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { BREAKPOINTS } from "../../../styles/media";
import { COLOURS } from "../../../styles/colours";
import { CurrentMissions } from "../../Molecules/CurrentMissions";
import { GridWrapper } from "../../Atoms/GridWrapper";
import { CheckboxChecked } from "../../Icons/CheckboxCheckedIcon";
import { CheckboxEmpty } from "../../Icons/CheckboxEmptyIcon";
import { SIZES } from "../../../styles/typography";

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
            {mission ? (
              <Mission achieved={!!mission.collectedAt}>
                <Check>{mission.collectedAt ? <CheckboxChecked /> : <CheckboxEmpty />}</Check>
                <Name>{mission.name}</Name>
                <Description>{mission.description}</Description>
              </Mission>
            ) : (
              <LockedMission>Locked</LockedMission>
            )}
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

const Mission = styled.div<{ achieved?: boolean }>`
  width: 100%;
  min-height: 112px;
  border-radius: ${GRID.UNIT};
  background: ${COLOURS.GREY.DARKEST};
  padding: ${GRID.UNIT};
  border: solid 1px ${({ achieved }) => (achieved ? COLOURS.SEMANTIC.OK.KEY : COLOURS.GREY.MID)};
  ${({ achieved }) => !achieved && `opacity: 0.6`};
`;

const LockedMission = styled(Mission)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  color: ${COLOURS.SEMANTIC.WARNING.KEY};
`;

const Check = styled.span`
  display: inline-block;
  width: 32px;
  margin: 0 0 ${GRID.UNIT} ${GRID.UNIT};
  float: right;
`;

const Name = styled(H3)`
  margin-bottom: ${GRID.HALF};
`;

const Description = styled.p`
  ${SIZES.F};
`;
