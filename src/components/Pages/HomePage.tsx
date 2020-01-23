import * as React from "react";
import styled from "styled-components";
import {H1, H2} from "../Atoms/Heading";
import {Prose} from "../Atoms/Prose";
import {EventsList} from "../Organisms/EventsList";
import {IEvent, IPort} from "../../interfaces";
import {routes} from "../../routes";
import {GRID} from "../../styles/variables";
import {COLOURS} from "../../styles/colours";
import {ChevronRightIcon} from "../Icons/ChevronRightIcon";
import {ComplexButton} from "../Molecules/ComplexButton";
import {AnimatedEllipsis} from "../Atoms/AnimatedEllipsis";
import {SimplePage} from "../Templates/SimplePage";

export const HomePage = ({events, goalCrateLocation}: IHomePageProps) => (
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
          <StyledStartButton icon={<ChevronRightIcon/>} suffixed>
            Start your journey
          </StyledStartButton>
        </form>
      </Prose>
    </IntroPanel>
    {goalCrateLocation && (
      <SaxophonePanel>
        <H2 as="p">🎷</H2>
        <p>A Saxophone was spotted in the vicinity of <br/>
          <H1 as="span">
            {goalCrateLocation.name}
          </H1>
        </p>
      </SaxophonePanel>
    )}
    <EventsPanel>
      <PanelHeading>
        What's happening now
        <AnimatedEllipsis/>
      </PanelHeading>
      <EventsList events={events}/>
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
