import * as React from "react";
import styled from "styled-components";
import { H1, H2 } from "@src/components/Atoms/Heading";
import { Prose } from "@src/components/Atoms/Prose";
import { EventsList } from "@src/components/Organisms/EventsList";
import { IEvent, IPort } from "@src/interfaces";
import { routes } from "@src/routes";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { ChevronRightIcon } from "@src/components/Icons/ChevronRightIcon";
import { ComplexButton } from "@src/components/Molecules/ComplexButton";
import { AnimatedEllipsis } from "@src/components/Atoms/AnimatedEllipsis";
import { SimplePage } from "@src/components/Templates/SimplePage";

export const HomePage = ({ events, goalCrateLocation }: IHomePageProps) => (
  <SimplePage isHome={true}>
    <IntroPanel>
      <Prose>
        <p>
          The citizens of Saxopholis need your help. Colonisation of space has begun, and interstellar shipping is big
          business. You've got to get in on this. Who else is going to transport those vital supplies of saxophones 🎷
          to the other side of the galaxy?
        </p>
        <p>
          But it's a wild west out there. Can you survive, thrive and exploit all <strong>1,000</strong> known planets
          before someone else does.
        </p>
        <form method="GET" action={routes.getPlay()}>
          <StyledStartButton icon={<ChevronRightIcon />} suffixed>
            Start your journey
          </StyledStartButton>
        </form>
      </Prose>
    </IntroPanel>
    {goalCrateLocation && (
      <SaxophonePanel>
        <H2 as="p">🎷</H2>
        <p>
          A Saxophone was spotted in the vicinity of <br />
          <H1 as="span">{goalCrateLocation.name}</H1>
        </p>
      </SaxophonePanel>
    )}
    <EventsPanel>
      <PanelHeading>
        What's happening now
        <AnimatedEllipsis />
      </PanelHeading>
      <EventsList events={events} />
    </EventsPanel>
  </SimplePage>
);

export interface IHomePageProps {
  events: IEvent[];
  goalCrateLocation?: IPort;
}

const IntroPanel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  margin-bottom: ${GRID.UNIT};
`;

const SaxophonePanel = styled.section`
  text-align: center;
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  margin-bottom: ${GRID.UNIT};
`;

const EventsPanel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BLACK.STANDARD};
`;

const PanelHeading = styled(H2)`
  margin-bottom: ${GRID.UNIT};
`;

const StyledStartButton = styled(ComplexButton)`
  margin-left: auto;
`;
