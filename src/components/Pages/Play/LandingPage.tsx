import * as React from "react";
import styled from "styled-components";
import { COLOURS, panelBackground } from "@src/styles/colours";
import { BREAKPOINTS } from "@src/styles/media";
import { Progress } from "@src/components/Organisms/PlayHome/Panels/Progress";
import { EventsList } from "@src/components/Organisms/EventsList";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { GRID, MASTHEAD_HEIGHT, Z_INDEX } from "@src/styles/variables";
import { DisguisedButton } from "@src/components/Atoms/Button";
import { Icon, NORMAL_ICON, SMALL_ICON } from "@src/components/Atoms/Icon";
import { LaunchIcon } from "@src/components/Icons/LaunchIcon";
import { MissionIcon } from "@src/components/Icons/MissionIcon";
import { RankIcon } from "@src/components/Icons/RankIcon";
import { MapIcon } from "@src/components/Icons/MapIcon";
import { LogIcon } from "@src/components/Icons/LogIcon";
import { JumpLink } from "@src/components/Atoms/JumpLink";
import { MissionPanel } from "@src/components/Organisms/LandingPage/MissionPanel";
import { H2 } from "@src/components/Atoms/Heading";
import { ChartBox, IChartBoxProps } from "@src/components/Organisms/ChartBox";

const subNavHeight = "64px";

const Page = styled.div`
  padding-bottom: ${subNavHeight};
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
    overflow: auto;
  `};
`;

const Map = styled(JumpLink)`
  height: calc(100vh - ${subNavHeight});
  width: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.5);
`;

export interface ILandingPageProps {
  map: IChartBoxProps["map"];
}

export const LandingPage = ({ map }: ILandingPageProps) => {
  const { events } = useGameSessionContext();
  return (
    <Page>
      <Map id="map">
        <ChartBox map={map} />
      </Map>
      <JumpLink id="mission">
        <Section>
          <MissionPanel />
        </Section>
      </JumpLink>

      <Secondary>
        <SolidJumpLink id="rank">
          <Section>
            <SectionHeading>Rank</SectionHeading>
            <Progress />
          </Section>
        </SolidJumpLink>
        <SolidJumpLink id="log">
          <Section>
            <SectionHeading>Log</SectionHeading>
            <EventsList events={events} firstPerson />
          </Section>
        </SolidJumpLink>
      </Secondary>

      <SubBar>
        <Nav>
          <List>
            <ShipsItem>
              <NavLink as="a" href="#fleet">
                <ButtonIcon>
                  <LaunchIcon />
                </ButtonIcon>
                <Label>Ships</Label>
              </NavLink>
            </ShipsItem>
            <Item>
              <NavLink as="a" href="#map">
                <ButtonIcon>
                  <MapIcon />
                </ButtonIcon>
                <Label>Chart</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#mission">
                <ButtonIcon>
                  <MissionIcon />
                </ButtonIcon>
                <Label>Mission</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#rank">
                <ButtonIcon>
                  <RankIcon />
                </ButtonIcon>
                <Label>Rank</Label>
              </NavLink>
            </Item>
            <Item>
              <NavLink as="a" href="#log">
                <ButtonIcon>
                  <LogIcon />
                </ButtonIcon>
                <Label>Log</Label>
              </NavLink>
            </Item>
          </List>
        </Nav>
      </SubBar>
    </Page>
  );
};

// todo - combine design with ShipNavigation
const SubBar = styled.div`
  z-index: ${Z_INDEX.PAGE_MIDDLE};
  position: fixed;
  width: 100%;
  bottom: 0;
  right: 0;
  ${BREAKPOINTS.XL`
      width: 80%;
    `}
  ${BREAKPOINTS.MAX`
      width: calc(100vw - 400px);
    `}
`;

const Nav = styled.nav`
    background: ${COLOURS.BLACK.STANDARD};
    padding-bottom: env(safe-area-inset-bottom);
}
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Item = styled.li`
  flex: 1;
  display: flex;
  min-width: 44px;
  position: relative;
`;

const ShipsItem = styled(Item)`
  ${BREAKPOINTS.XL`
      display: none;
  `}
`;

const NavLink = styled(DisguisedButton)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 44px;
  padding: 6px;
  color: ${COLOURS.WHITE.STANDARD};
  svg,
  label {
    opacity: 0.5;
  }
  &:hover:not(:focus):not([disabled]) {
    background: rgba(255, 255, 255, 0.3);
    color: ${COLOURS.WHITE.STANDARD};
    svg,
    label {
      opacity: 1;
    }
  }
  ${BREAKPOINTS.L`
    min-height: ${subNavHeight};
  `};
`;

const ButtonIcon = styled(Icon)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${SMALL_ICON};
  width: ${SMALL_ICON};
  position: relative;
  ${BREAKPOINTS.L`
    height: ${NORMAL_ICON};
    width: ${NORMAL_ICON};
  `};
`;

const Label = styled.label`
  margin-top: 2px;
  font-size: 10px;
  ${BREAKPOINTS.L`
    font-size: 13px;
  `};
`;

const Section = styled.section`
  min-height: calc(100vh - ${subNavHeight} - ${MASTHEAD_HEIGHT});
  padding: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.PANEL_BORDER};
`;

const SolidJumpLink = styled(JumpLink)`
  ${panelBackground};
`;

const SectionHeading = styled(H2)`
  margin-bottom: ${GRID.UNIT};
`;

const Secondary = styled.div`
  ${BREAKPOINTS.M`
    display: flex;
    align-items: stretch;
    > :first-child {
      min-width: 380px;
      border-right: solid 1px ${COLOURS.PANEL_BORDER};
    }
    > :last-child {
      flex: 1;
    }
  `}
`;
