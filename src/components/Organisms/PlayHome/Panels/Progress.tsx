import * as React from "react";
import { useGameSessionContext } from "../../../../contexts/GameSessionContext/GameSessionContext";
import { WinRequirement } from "../../../Molecules/WinRequirement";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { Ranks } from "../Ranks";
import { H3 } from "../../../Atoms/Heading";

export const Progress = () => {
  const { rankStatus } = useGameSessionContext();

  return (
    <>
      <WinStatus>
        <WinItem>
          <WinRequirement achieved={rankStatus.portsVisited === 1000}>
            {rankStatus.portsVisited}/1000 planets visited
          </WinRequirement>
        </WinItem>
        <WinItem>
          <WinRequirement achieved={true /* todo */}>
            Available Reticulum Shuttle
          </WinRequirement>
        </WinItem>
        <WinItem>
          <WinRequirement achieved={false /* todo */}>
            Saxophone on board
          </WinRequirement>
        </WinItem>
      </WinStatus>
      <H3>Rank</H3>
      <Ranks />
    </>
  );
};

const WinStatus = styled.ul`
    margin-bottom: ${GRID.UNIT};
`;

const WinItem = styled.li`
    &:not(:last-child) {
        margin-bottom: ${GRID.HALF};
    }
`;

