import React from "react";
import { CheckboxChecked } from "@src/components/Icons/CheckboxCheckedIcon";
import { CheckboxEmpty } from "@src/components/Icons/CheckboxEmptyIcon";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { COLOURS } from "@src/styles/colours";

export const CurrentMissions = () => {
  const { currentMissions } = useGameSessionContext();
  return (
    <ul>
      {currentMissions.map((mission, idx) => (
        <MissionItem key={`current-${idx}`}>
          <Check>{mission.collectedAt ? <CheckboxChecked /> : <CheckboxEmpty />}</Check>
          <Description>{mission.description}</Description>
        </MissionItem>
      ))}
    </ul>
  );
};

const Check = styled.span`
  display: inline-block;
  width: 32px;
  margin-right: ${GRID.UNIT};
  line-height: 0;
`;

const MissionItem = styled.li`
  background: ${COLOURS.BLACK.FULL};
  padding: ${GRID.UNIT};
  display: flex;
  align-items: center;
  border: solid 1px ${COLOURS.GREY.DARK};
  border-top-right-radius: ${GRID.UNIT};
  border-bottom-left-radius: ${GRID.UNIT};
  &:not(:last-child) {
    margin-bottom: ${GRID.QUARTER};
  }
`;

const Description = styled.div`
  flex: 1;
`;
