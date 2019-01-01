import * as React from "react";
import styled from "styled-components";
import routes from "../routes";
import { Link } from "react-router-dom";
import { EventsList } from "../components/Organisms/EventsList/EventsList";
import { EventInterface } from "../Interfaces";
import { PlayPanel } from "../components/Organisms/PlayPanel/PlayPanel";
import { GRID } from "../styles/variables";
import { BREAKPOINTS } from "../styles/media";
import { H1 } from "../components/Atoms/Heading/Heading";
import { Prose } from "../components/Atoms/Prose/Prose";

interface Props {
  events: EventInterface[];
}

const TemplateHome = styled.div`
  display: grid;
  grid-template-columns: [edge-left] 0 [main] calc(100% - (${
    GRID.UNIT
  } * 2)) 0 [edge-right];
  grid-gap: ${GRID.UNIT};
  ${BREAKPOINTS.M`
    grid-template-columns: [edge-left] 1fr [main] calc(50% - (${
      GRID.UNIT
    } * 2)) [aside] calc(50% - (${GRID.UNIT} * 2)) 1fr [edge-right];
    grid-template-rows: [hero] auto [content-start] auto [aside-start] auto [end];
  `}
  ${BREAKPOINTS.L`
    grid-template-columns: [edge-left] 1fr [main] calc(60% - (${
      GRID.UNIT
    } * 2)) [aside] calc(40% - (${GRID.UNIT} * 2)) 1fr [edge-right];
  `}
  ${BREAKPOINTS.XXL`
   grid-template-columns: [edge-left] 1fr [main] 736px [aside] 480px 1fr [edge-right];
  `}
`;

const TemplateHero = styled.div`
  grid-column: main / edge-right;
  grid-row: 1;
`;

const Hero = styled.div`
  padding: ${GRID.UNIT} 0;
`;

const TemplatePlay = styled.div`
  grid-column: main;
  grid-row: 2;
  ${BREAKPOINTS.M`
    grid-column: aside;
    grid-row: content-start;
  `};
`;

const TemplateMain = styled.section`
  grid-column: main;
  ${BREAKPOINTS.M`
    grid-column: main;
    grid-row: content-start / end;
  `};
`;

const TemplateAside = styled.aside`
  grid-column: main;
  ${BREAKPOINTS.M`
    grid-column: aside;
    grid-row: aside-start;
  `};
`;

export default ({ events }: Props) => {
  return (
    <TemplateHome>
      <TemplateHero>
        <Hero>
          <H1>Planet Cargo</H1>
        </Hero>
      </TemplateHero>
      <TemplatePlay>
        <PlayPanel />
      </TemplatePlay>
      <TemplateMain>
        <Prose>
          <p>
            Colonisation of space has begun, and interstellar shipping is big
            business. You've got to get in on this. Who else is going to
            transport those vital supplies of saxophones 🎷 to the other side of
            the galaxy?
          </p>
          <p>
            But it's a wild west out there. Can you survive, thrive and exploit
            all <strong>1,000</strong> known planets before someone else does.
          </p>

          <ul>
            <li>
              <a href={routes.getPlay()} rel="nofollow">
                Play
              </a>
            </li>
            <li>
              <a href={routes.getPortsList()}>Ports</a>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a href={routes.getAbout()}>About</a>
            </li>
          </ul>
        </Prose>

        <div>
          <h2>What's happening right now?</h2>
          <EventsList events={events} />
        </div>
      </TemplateMain>
      <TemplateAside>
        {/* todo - how many saxophones */}
        <p>More side stuff</p>
      </TemplateAside>
    </TemplateHome>
  );
};
