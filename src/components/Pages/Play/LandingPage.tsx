import * as React from "react";
import { POSITION_NONE, TOOL_PAN, UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { BREAKPOINTS } from "../../../styles/media";
import { useElementDimensions } from "../../../hooks/useElementDimensions";
import { Progress } from "../../Organisms/PlayHome/Panels/Progress";
import { EventsList } from "../../Organisms/EventsList";
import { useGameSessionContext } from "../../../contexts/GameSessionContext/GameSessionContext";
import { GRID, Z_INDEX } from "../../../styles/variables";
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
import { IMapProps, MapSchematic } from "../../Organisms/MapSchematic";

const Page = styled.div`
  padding-bottom: 64px;
  ${BREAKPOINTS.XL`
    display: block;
    height: 100%;
    overflow: auto;
  `};
`;

const Map = styled(JumpLink)`
  height: calc(100vh - 64px);
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
            preventPanOutside={true}
            scaleFactorMax={4}
            scaleFactorMin={0.25}
            miniatureProps={{
              position: POSITION_NONE,
              background: "none",
              width: 0,
              height: 0,
            }}
            ref={viewer}
          >
            <svg viewBox={map.viewBox}>
              <MapSchematic svg={map.svg} />
            </svg>
          </UncontrolledReactSVGPanZoom>
        )}
      </Map>
      <JumpLink id="mission">
        <Section>
          <MissionPanel />
        </Section>
      </JumpLink>

      <JumpLink id="rank">
        <Section>
          <Progress />
        </Section>
      </JumpLink>
      <JumpLink id="log">
        <Section>
          <EventsList events={events} firstPerson />
        </Section>
      </JumpLink>

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
                <Label>Schematic</Label>
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
    min-height: 64px;
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
  padding: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
`;
