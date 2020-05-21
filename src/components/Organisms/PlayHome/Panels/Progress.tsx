import * as React from "react";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import styled from "styled-components";
import { GRID } from "@src/styles/variables";
import { Ranks } from "@src/components/Organisms/PlayHome/Ranks";
import { H1, H3 } from "@src/components/Atoms/Heading";

export const Progress = () => {
  const { rankStatus } = useGameSessionContext();

  return (
    <>
      <Current>
        <H1 as="p">{rankStatus.currentRank.title}</H1>
        <PlanetCount as="p">{rankStatus.portsVisited}/1000 planets visited</PlanetCount>
      </Current>
      <RanksArea>
        <Ranks />
      </RanksArea>
    </>
  );
};

const Current = styled.div`
  text-align: center;
  margin-bottom: ${GRID.DOUBLE};
`;
const PlanetCount = styled(H3)`
  margin-top: ${GRID.HALF};
`;
const RanksArea = styled.div`
  display: flex;
  justify-content: center;
`;
