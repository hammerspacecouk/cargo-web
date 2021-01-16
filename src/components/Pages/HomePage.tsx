import * as React from "react";
import styled, { css } from "styled-components";
import { H1, H2 } from "@src/components/Atoms/Heading";
import { EventsList } from "@src/components/Organisms/EventsList";
import { IEvent, IPlayer, IPort } from "@src/interfaces";
import { routes } from "@src/routes";
import { GRID } from "@src/styles/variables";
import { COLOURS } from "@src/styles/colours";
import { ChevronRightIcon } from "@src/components/Icons/ChevronRightIcon";
import { ComplexButton } from "@src/components/Molecules/ComplexButton";
import { AnimatedEllipsis } from "@src/components/Atoms/AnimatedEllipsis";
import { SimplePage } from "@src/components/Templates/SimplePage";
import { BREAKPOINTS } from "@src/styles/media";
import { SIZES } from "@src/styles/typography";
import { PlayerLink, Winner } from "@src/components/Pages/PlayersPage";

export const HomePage = ({ events, goalCrateLocation, topPlayer, topWinner }: IHomePageProps) => (
  <SimplePage isHome={true}>
    <IntroPanel>
      <IntroQuote>It's a massively multiplayer online idle game?</IntroQuote>
      <p>
        <IntroImage
          $right
          src="/_static/img/intro-1.jpg"
          alt="A screenshot of gameplay, showing a ship in orbit around a planet"
        />
        The citizens of Saxopholis need your help. Colonisation of space has begun, and interstellar shipping is big
        business. You've got to get in on this. Who else is going to transport those vital supplies of saxophones 🎷 to
        the other side of the galaxy?
      </p>

      <p>
        <IntroImage src="/_static/img/intro-2.jpg" alt="A screenshot of gameplay, showing a schematic of planets" />
        <strong>1,000</strong> planets. It's a race to the finish. But it's a wild west out there. Can you survive,
        thrive and deliver that saxophone before someone else does.
        <form method="GET" action={routes.getPlay()}>
          <StyledStartButton icon={<ChevronRightIcon />} suffixed>
            Start your journey
          </StyledStartButton>
        </form>
      </p>
    </IntroPanel>
    <Summaries>
      {goalCrateLocation && (
        <SaxophonePanel>
          <H2 as="p">🎷</H2>
          <p>
            A Saxophone was spotted in the vicinity of <br />
            <H1 as="span">{goalCrateLocation.name}</H1>
          </p>
        </SaxophonePanel>
      )}
      <LeaderPanel>
        <H2>Top Player</H2>
        {topWinner ? <Winner winner={topWinner} /> : <PlayerLink player={topPlayer} />}
        <p>
          <a href="/players">Full leaderboard</a>
        </p>
      </LeaderPanel>
    </Summaries>
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
  topPlayer?: IPlayer;
  topWinner?: {
    completionTime: number;
    player: IPlayer;
  };
}

const IntroPanel = styled.section`
  ${SIZES.D};
  line-height: 1.4;
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  margin-bottom: ${GRID.UNIT};
  > p {
    margin-bottom: ${GRID.UNIT};
    + * {
      clear: both;
    }
  }
`;

const IntroQuote = styled.blockquote`
  ${SIZES.C};
  text-align: center;
  margin-bottom: ${GRID.DOUBLE};
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BLACK.STANDARD};
  position: relative;
  &:before {
    content: "“";
    position: absolute;
    top: 4px;
    left: 4px;
    ${SIZES.A};
    opacity: 0.4;
  }
  &:after {
    content: "”";
    position: absolute;
    bottom: 4px;
    right: 4px;
    ${SIZES.A};
    opacity: 0.4;
    line-height: 0;
  }
`;

const IntroImage = styled.img<{ $right?: boolean }>`
  box-shadow: 4px 4px 12px #000;
  margin-bottom: ${GRID.DOUBLE};
  ${({ $right }) => css`
    ${BREAKPOINTS.S`
        max-width: 280px;
        width: 40%;
        float: ${$right ? "right" : "left"};
        margin-${$right ? "left" : "right"}: ${GRID.DOUBLE};
      `}
  `}
`;

const SaxophonePanel = styled.section`
  text-align: center;
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
`;

const LeaderPanel = styled.section`
  text-align: center;
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BODY.BACKGROUND};
  > *:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
  }
`;

const EventsPanel = styled.section`
  padding: ${GRID.DOUBLE};
  background: ${COLOURS.BLACK.STANDARD};
`;

const PanelHeading = styled(H2)`
  margin-bottom: ${GRID.UNIT};
`;

const StyledStartButton = styled(ComplexButton)`
  margin: ${GRID.DOUBLE} auto 0 auto;

  ${BREAKPOINTS.S`
    margin: ${GRID.DOUBLE} 0 0 auto;
  `};
`;

const Summaries = styled.div`
  > * {
    margin: 0 0 ${GRID.UNIT} 0;
  }
  ${BREAKPOINTS.M`
    margin-bottom: ${GRID.UNIT};
    display: flex;
    justify-content: space-between;
    > * {
      margin: 0;
      width: calc(50% - ${GRID.HALF});
    }
  `}
`;
