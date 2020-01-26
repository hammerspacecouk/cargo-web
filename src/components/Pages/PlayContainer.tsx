import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { IChildrenProps } from "../../interfaces";
import { InGameMasthead } from "../Organisms/InGameMasthead";
import { PromotionModal } from "../Organisms/PromotionModal";
import { BREAKPOINTS } from "../../styles/media";
import { Navigation } from "../Organisms/Navigation";
import { MASTHEAD_HEIGHT } from "../../styles/variables";
import { FlexAllCenter } from "../Atoms/Flex";
import { Loading } from "../Atoms/Loading";
import { useGameSessionContext } from "../../contexts/GameSessionContext/GameSessionContext";

export const PlayContainer = ({ children }: IChildrenProps) => {
  const { player, isAtHome } = useGameSessionContext();

  if (player === undefined) {
    return (
      <FlexAllCenter>
        <Loading />
      </FlexAllCenter>
    ); // todo - skeleton
  }

  return (
    <>
      <GlobalStyle />
      <InGameMasthead />
      <StyledPlayBoard>
        <StyledMain>{children}</StyledMain>
        <StyledNavigation isAtHome={isAtHome} />
      </StyledPlayBoard>
      <PromotionModal />
    </>
  );
};

const GlobalStyle = createGlobalStyle`
  html {
    ${BREAKPOINTS.XL`
       overflow-y: hidden;
    `}
  }
`;

const StyledPlayBoard = styled.div`
  ${BREAKPOINTS.XL`
  display: flex;
  `};
`;

const StyledNavigation = styled(Navigation)<{ isAtHome: boolean }>`
  min-height: calc(100vh - ${MASTHEAD_HEIGHT});
  display: ${({ isAtHome }) => (isAtHome ? "flex" : "none")};
  ${BREAKPOINTS.XL`
    display: flex;
    width: 20%;
    min-width: 240px;
    height: calc(100vh - ${MASTHEAD_HEIGHT});
    order: 1;
  `}
  ${BREAKPOINTS.MAX`
    width: 400px;
  `}
`;

const StyledMain = styled.main`
  ${BREAKPOINTS.XL`
    overflow-y: auto;
    height: calc(100vh - ${MASTHEAD_HEIGHT});
    flex: 1;
    order: 2;
    padding: 0;
  `};
`;
