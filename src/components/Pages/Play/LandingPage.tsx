import * as React from "react";
import { POSITION_NONE, POSITION_TOP, TOOL_PAN, UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import styled from "styled-components";
import { COLOURS, panelBackground } from "../../../styles/colours";
import { BREAKPOINTS } from "../../../styles/media";
import { useElementDimensions } from "../../../hooks/useElementDimensions";
import { Progress } from "../../Organisms/PlayHome/Panels/Progress";
import { EventsList } from "../../Organisms/EventsList";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { GRID, MASTHEAD_HEIGHT, Z_INDEX } from "../../../styles/variables";
import { DisguisedButton } from "../../Atoms/Button";
import { Icon, NORMAL_ICON, SMALL_ICON } from "../../Atoms/Icon";
import { LaunchIcon } from "../../Icons/LaunchIcon";
import { MissionIcon } from "../../Icons/MissionIcon";
import { RankIcon } from "../../Icons/RankIcon";
import { MapIcon } from "../../Icons/MapIcon";
import { LogIcon } from "../../Icons/LogIcon";
import { useRef } from "react";
import { JumpLink } from "../../Atoms/JumpLink";
import { MissionPanel } from "../../Organisms/LandingPage/MissionPanel";
import { IMapProps, Chart } from "../../Organisms/Chart";
import { H2 } from "../../Atoms/Heading";

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
  map: {
    svg: IMapProps["svg"];
    viewBox: string;
    center: {
      x: number;
      y: number;
    };
  };
}

export const LandingPage = ({ map }: ILandingPageProps) => {
  const { ref, sizeIsKnown, width, height } = useElementDimensions();
  const { events } = useGameSessionContext();
  const viewer = useRef<UncontrolledReactSVGPanZoom>();

  React.useEffect(() => {
    if (viewer.current) {
      viewer.current.setPointOnViewerCenter(map.center.x, map.center.y, 1);
    }
  }, [viewer.current]);

  return (
    <Page>
      <Map ref={ref} id="map">
        {sizeIsKnown && (
          <UncontrolledReactSVGPanZoom
            width={width}
            height={height}
            background="rgba(0,0,0,0.3)"
            SVGBackground="transparent"
            tool={TOOL_PAN}
            preventPanOutside={false}
            scaleFactorMax={4}
            scaleFactorMin={0.1}
            customMiniature={() => null}
            customToolbar={() => null}
            ref={viewer}
          >
            <svg viewBox={map.viewBox}>
              <Chart svg={map.svg} />
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
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
