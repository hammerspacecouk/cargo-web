import * as React from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { IChannel, IChildrenProps, IFleetShip } from "@src/interfaces";
import { InGameMasthead } from "@src/components/Organisms/InGameMasthead";
import { PromotionModal } from "@src/components/Organisms/PromotionModal";
import { BREAKPOINTS } from "@src/styles/media";
import { Navigation } from "@src/components/Organisms/Navigation";
import { MASTHEAD_HEIGHT, Z_INDEX } from "@src/styles/variables";
import { FlexAllCenter } from "@src/components/Atoms/Flex";
import { Loading } from "@src/components/Atoms/Loading";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { Router } from "next/router";
import { GameOverModal } from "@src/components/Organisms/GameOverModal";
import { WinModal } from "@src/components/Organisms/WinModal";

export const PlayContainer = ({ children }: IChildrenProps) => {
  const { player, isAtHome, isGameOver, refreshSession, ships } = useGameSessionContext();
  const [isLoadingRoute, setIsLoadingRoute] = React.useState(false);

  React.useEffect(() => {
    // see if any ships are due to arrive and set a session refresh timer
    let refreshTimer: number;

    let shortestTime: number;
    ships.forEach((ship: IFleetShip) => {
      const arrivalTime = (ship.ship?.location as IChannel)?.arrival;
      if (arrivalTime) {
        const diff = Math.max(0, Date.parse(arrivalTime) - Date.now()) + 2000;
        if (!shortestTime || diff < shortestTime) {
          shortestTime = diff;
        }
      }
    });

    if (shortestTime) {
      refreshTimer = window.setTimeout(() => {
        refreshSession();
      }, shortestTime);
    }
    return () => {
      window.clearTimeout(refreshTimer);
    };
  }, [ships]);

  React.useEffect(() => {
    let refreshTimer: number;

    const handleRouteChange = (url: string) => {
      setIsLoadingRoute(true);
      refreshTimer = window.setTimeout(() => {
        console.warn("Client side routing took too long. Performing full reload", { url });
        window.location.href = url;
      }, 15000);
    };
    const handleRouteEnd = () => {
      window.clearTimeout(refreshTimer);
      setIsLoadingRoute(false);
    };
    Router.events.on("routeChangeStart", handleRouteChange);
    Router.events.on("routeChangeComplete", handleRouteEnd);
    return () => {
      window.clearTimeout(refreshTimer);
      Router.events.off("routeChangeStart", handleRouteChange);
      Router.events.off("routeChangeComplete", handleRouteEnd);
    };
  }, []);

  if (player === undefined) {
    return (
      <FlexAllCenter>
        <Loading />
      </FlexAllCenter>
    );
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
      <WinModal />
      {isLoadingRoute && (
        <RouteLoadingIndicator>
          <Loading />
        </RouteLoadingIndicator>
      )}
      {isGameOver && <GameOverModal />}
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

const fadeIn = keyframes`
  0%, 50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const RouteLoadingIndicator = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: ${Z_INDEX.MENU};
  background: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 1000ms linear 0s 1 normal forwards;
`;
