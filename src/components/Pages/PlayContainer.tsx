import * as React from "react";
import styled from "styled-components";
import { IChildrenProps } from "../../interfaces";
import { InGameMasthead } from "../Organisms/InGameMasthead";
import { PromotionModal } from "../Organisms/PromotionModal";
import { BREAKPOINTS } from "../../styles/media";
import { Navigation } from "../Organisms/Navigation";
import { MASTHEAD_HEIGHT } from "../../styles/variables";
import { scrollbarStyles } from "../../styles/colours";
import { useGameSession } from "../../contexts/GameSessionContext/useGameSession";
import { FlexAllCenter } from "../Atoms/Flex";
import { Loading } from "../Atoms/Loading";

export const PlayContainer = ({ children }: IChildrenProps) => {
  const gameSession = useGameSession();

  if (gameSession.player === undefined) {
    return (
      <FlexAllCenter>
        <Loading />
      </FlexAllCenter>
    ); // todo - skeleton
  }

  return (
    <>
      <InGameMasthead />
      <StyledPlayBoard>
        <StyledMain>{children}</StyledMain>
        <StyledNavigation />
      </StyledPlayBoard>
      <PromotionModal />
    </>
  );
};

const StyledPlayBoard = styled.div`
  ${BREAKPOINTS.XL`
  display: flex;
  `};
`;

const StyledNavigation = styled(Navigation)`
  min-height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
  display: flex;
  ${BREAKPOINTS.XL`
    width: 20%;
    max-width: 400px;
    min-width: 240px;
    height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
    order: 1;
  `}
`;

const StyledMain = styled.main`
  ${scrollbarStyles};
  ${BREAKPOINTS.XL`
    flex: 1;
    order: 2;
    padding: 0;
    height: calc(100vh - ${MASTHEAD_HEIGHT} - 1px);
    overflow-y: auto;
  `};
`;
