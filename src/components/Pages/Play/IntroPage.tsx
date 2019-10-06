import * as React from "react";
import { pageTitle } from "../../../utils/pageTitle";
import Head from "next-server/head";
import styled, { keyframes } from "styled-components";
import { Intro } from "../../../animation/Intro";
import { useAnimationScene } from "../../../hooks/useAnimationScene";
import { SIZES } from "../../../styles/typography";
import { AnimatedEllipsis } from "../../Atoms/AnimatedEllipsis";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { IPort } from "../../../interfaces";
import { PortName } from "../../Molecules/PortName";
import { GRID } from "../../../styles/variables";
import { useEffect } from "react";
import { COLOURS } from "../../../styles/colours";
// import { routes } from "../../../routes";

export const IntroPage = () => {
  const { ships } = useGameSessionContext();
  const canvasRef = useAnimationScene<HTMLDivElement>(Intro);
  const initialShip = ships[0];

  useEffect(() => {
    window.setTimeout(() => {
      // window.location.href = routes.getPlayShip(initialShip.ship.id).as;
    }, 20 * 1000);
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle("It begins...")}</title>
      </Head>
      <Container>
        <Container ref={canvasRef}/>
        <TextContainer>
          <Mission>
            <IntroLine1>Your mission:</IntroLine1>
            <IntroLine1>- Find a Saxophone 🎷</IntroLine1>
            <IntroLine1>- Deliver it to Saxopholis</IntroLine1>
          </Mission>
          <IntroLine2>Launching ship <Name>{initialShip.ship.name}</Name><AnimatedEllipsis /></IntroLine2>
          <IntroLine3>Arriving at <Name><StyledPortName port={initialShip.ship.location as IPort} /></Name><AnimatedEllipsis /></IntroLine3>
          <IntroLine4>Starting navigation computer<AnimatedEllipsis /></IntroLine4>
        </TextContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const TextContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  ${SIZES.B};
  text-shadow: 0 0 2px ${COLOURS.BLACK.FULL};
  line-height: 1.4;
  > * {
    position: absolute;
  }
`;


const slideAndFade = keyframes`
    0% {
      transform: translateX(100vw) skewX(-30deg);
      opacity: 1;
    }
    20% {
      transform: translateX(100vw) skewX(-30deg);
    }
    40% {
      transform: translateX(0vw) skewX(0deg);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translateX(0vw) skewX(0deg);
    }
`;

const slideIn = keyframes`
    0%, 20% {
      transform: translateX(100vw) skewX(-30deg);
    }
    40%, 100% {
      transform: translateX(0vw) skewX(0deg);
    }
`;

const fadeMission = keyframes`
  0%, 90% { opacity: 1; }
  100% { opacity: 0; }
`;

const StyledPortName = styled(PortName)`
  justify-content: center;
`;

const Mission = styled.div`
   animation: ${fadeMission} 10s ease-out forwards;
`;

const Name = styled.span`
  display: block;
  font-style: italic;
`;

const IntroLine = styled.div`
   width: 100%;
   padding: ${GRID.UNIT};
   text-align: center;
   transform: translateX(100vw) skewX(-30deg);
   animation: ${slideIn} 3s ease-out forwards;
`;

const IntroLine1 = styled(IntroLine)`
   &:nth-child(2) {
    animation-delay: 3s;
   }
   &:nth-child(3) {
    animation-delay: 6s;
   }
`;
const IntroLine2 = styled(IntroLine)`
    animation: ${slideAndFade} 5s ease-out forwards;
    animation-delay: 10s;
`;

const IntroLine3 = styled(IntroLine)`
    animation: ${slideAndFade} 5s ease-out forwards;
    animation-delay: 15s;
`;

const IntroLine4 = styled(IntroLine)`
    animation: ${slideAndFade} 5s ease-out forwards;
    animation-delay: 20s;
    top: ${GRID.UNIT};
`;
