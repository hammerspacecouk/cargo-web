import * as React from "react";
import Head from "next/head";
import { pageTitle } from "../../../utils/pageTitle";
import styled, { keyframes } from "styled-components";
import { IntroStars } from "../../../animation/scene/IntroStars";
import { useAnimationScene } from "../../../hooks/useAnimationScene";
import { AnimatedEllipsis } from "../../Atoms/AnimatedEllipsis";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { IPort, IShip } from "../../../interfaces";
import { PortName } from "../../Molecules/PortName";
import { GRID, MASTHEAD_HEIGHT } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import { routes } from "../../../routes";
import { ActionButton } from "../../Atoms/Button";
import { Prose } from "../../Atoms/Prose";
import { H2 } from "../../Atoms/Heading";
import { SanctuaryIcon } from "../../Icons/SanctuaryIcon";
import { Icon, TEXT_ICON } from "../../Atoms/Icon";
import { CreditsIcon } from "../../Icons/CreditsIcon";
import { ShipDisplay } from "../../../animation/scene/ShipDisplay";
import { IntroPlanet } from "../../../animation/scene/IntroPlanet";

export const IntroPage = () => {
  const { ships, player } = useGameSessionContext();
  const initialShip = ships[0];
  const introScene = React.useMemo(() => new IntroStars(), []);
  const canvasRef = useAnimationScene<HTMLDivElement>(introScene, [introScene]);

  const [visibleStep, setVisibleStep] = React.useState(1);
  const introRef = React.useRef(null);

  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (introRef.current && !introRef.current.contains(event.target)) {
        event.preventDefault();
        alert(`Please direct your attention to the Hammerspace Shipping Incorporated introductory presentation.

We care for personal your development.`);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [introRef]);

  let section = (
    <Pane key="sec-1">
      <H2>Welcome {player.displayName}</H2>
      <p>
        You are the newest member of Hammerspace Shipping Incorporated.
        <br />
        We care about you™
      </p>
      <ActionButton onClick={() => setVisibleStep(2)}>Hello</ActionButton>
    </Pane>
  );
  switch (visibleStep) {
    case 2:
      section = (
        <Pane key="sec-2">
          <H2>The citizens of Saxopholis need our help</H2>
          <p>
            A distress call has been heard.
            <br />
            They are in need of a Saxophone 🎷.
          </p>
          <ActionButton onClick={() => setVisibleStep(visibleStep + 1)}>I'm ready</ActionButton>
        </Pane>
      );
      break;
    case 3:
      section = (
        <Pane key="sec-3">
          <H2>Patience, young recruit</H2>
          <p>
            We need to source a Saxophone 🎷 first, and you have no experience.
            <br />
            Besides, we don't know where Saxopholis is.
          </p>
          <ActionButton onClick={() => setVisibleStep(visibleStep + 1)}>What do I need?</ActionButton>
        </Pane>
      );
      break;
    case 4:
      section = (
        <Pane key="sec-4">
          <H2>You've been assigned the role of Explorer Scout</H2>
          <p>
            The galaxy is a big and dangerous place. Saxopholis will need to be found among the 1000 known worlds.
            <br />
            You will need a ship.
          </p>
          <ActionButton
            onClick={() => {
              setVisibleStep(visibleStep + 1);
              introScene.stopStars();
            }}
          >
            I can't wait
          </ActionButton>
        </Pane>
      );
      break;
    case 5:
      section = (
        <Pane key="sec-5">
          <H2>{initialShip.ship.name}</H2>
          <Ship ship={initialShip.ship} />
          <p>
            We are gifting you a rare <em>Reticulum Shuttle</em> ({initialShip.ship.name}). <br />
            Keep it safe.
            <br />
            It is the only ship capable of completing the mission.
          </p>
          <ActionButton onClick={() => setVisibleStep(visibleStep + 1)}>I love it</ActionButton>
        </Pane>
      );
      break;
    case 6:
    case 7:
      section = (
        <Pane key="sec-6">
          <H2>
            Welcome to <PortName port={initialShip.ship.location as IPort} />
          </H2>
          <Planet location={initialShip.ship.location as IPort} />
          <p>
            We're starting you off in one of our Safe Zones{" "}
            <Icon size={TEXT_ICON}>
              <SanctuaryIcon />
            </Icon>
            . <br />
            Ship some crates, earn some{" "}
            <Icon size={TEXT_ICON}>
              <CreditsIcon />
            </Icon>
            , and build up your fleet.
            <br />
            If you do well here you will find yourself progressing up the ranks.
          </p>
          {visibleStep === 6 && (
            <ActionButton
              as="a"
              onClick={() => setVisibleStep(visibleStep + 1)}
              href={routes.getPlayShip(initialShip.ship.id).as}
            >
              I won't let you down
            </ActionButton>
          )}
          {visibleStep === 7 && (
            <H2>
              Loading ShipComp™ 3.1 SE
              <AnimatedEllipsis />
            </H2>
          )}
        </Pane>
      );
      break;
  }

  return (
    <>
      <Head>
        <title>{pageTitle("It begins...")}</title>
      </Head>
      <Container>
        <Container ref={canvasRef} />
        <TextContainer ref={introRef}>
          <Section>
            <Prose>{section}</Prose>
          </Section>
        </TextContainer>
      </Container>
    </>
  );
};

const Planet = ({ location }: { location: IPort }) => {
  const shipCanvasRef = useAnimationScene<HTMLDivElement>(new IntroPlanet(location.id), [location.id]);
  return <AnimateBox ref={shipCanvasRef} />;
};

const Ship = ({ ship }: { ship: IShip }) => {
  const shipCanvasRef = useAnimationScene<HTMLDivElement>(new ShipDisplay(ship.shipClass), [ship.id]);
  return <AnimateBox ref={shipCanvasRef} />;
};

const Container = styled.div`
  height: calc(100vh - ${MASTHEAD_HEIGHT});
  width: 100%;
  position: relative;
  overflow: hidden;
`;
const AnimateBox = styled.div`
  display: block;
  margin: 0 auto ${GRID.UNIT};
  width: 200px;
  height: 200px;
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
  text-shadow: 0 0 2px ${COLOURS.BLACK.FULL};
  padding: ${GRID.UNIT};
`;
const Section = styled.div`
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
const Pane = styled.div`
  > * {
    opacity: 0;
    animation: forwards 500ms ease-in-out ${fadeIn};
    &:nth-child(2) {
      animation-delay: 750ms;
    }
    &:nth-child(3) {
      animation-delay: 1500ms;
    }
    &:nth-child(4) {
      animation-delay: 2250ms;
    }
  }
`;
