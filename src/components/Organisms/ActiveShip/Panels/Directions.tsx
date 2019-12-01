import * as React from "react";
import { Loading } from "../../../Atoms/Loading";
import { DirectionE } from "../../../Icons/DirectionE";
import { DirectionNE } from "../../../Icons/DirectionNE";
import { DirectionNW } from "../../../Icons/DirectionNW";
import { DirectionSE } from "../../../Icons/DirectionSE";
import { DirectionSW } from "../../../Icons/DirectionSW";
import { DirectionW } from "../../../Icons/DirectionW";
import { useActiveShipContext } from "../../../../contexts/ActiveShipContext/ActiveShipContext";
import { IDirection } from "../../../../interfaces";
import { TextF, TextOk, TextWarning } from "../../../Atoms/Text";
import { PortName } from "../../../Molecules/PortName";
import { ScoreValue } from "../../../Molecules/ScoreValue";
import { GoButton } from "../GoButton";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { H4 } from "../../../Atoms/Heading";
import { Distance } from "../../../Atoms/Distance";
import { useTutorial } from "../../../../hooks/useTutorial";
import { TravelTutorial } from "../../Tutorial/TravelTutorial";
import { TimeAgo } from "../../../Atoms/TimeAgo";
import { GridWrapper } from "../../../Atoms/GridWrapper";
import { ActionPane, ActionPaneButton, ActionPaneDetail, ActionPaneLine } from "../../../Molecules/ActionPane";

export const Directions = () => {
  const { directions } = useActiveShipContext();
  const { showNavigationIntro } = useTutorial();
  let tutorial;
  if (showNavigationIntro) {
    tutorial = <TravelTutorial />;
  }

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      {tutorial}
      <GridWrapper as="ul">
        <Direction direction={NW}>
          <DirectionNW />
        </Direction>
        <Direction direction={NE}>
          <DirectionNE />
        </Direction>
        <Direction direction={W}>
          <DirectionW />
        </Direction>
        <Direction direction={E}>
          <DirectionE />
        </Direction>
        <Direction direction={SW}>
          <DirectionSW />
        </Direction>
        <Direction direction={SE}>
          <DirectionSE />
        </Direction>
      </GridWrapper>
    </>
  );
};

interface IDirectionProps {
  direction?: IDirection;
  children: any;
}

const Direction = ({ direction, children }: IDirectionProps) => {
  if (!direction) {
    return (
      <StyledDirection>
        <ActionPane disabled>
          <ActionPaneDetail>
            <StyledArrow>{children}</StyledArrow>
          </ActionPaneDetail>
        </ActionPane>
      </StyledDirection>
    );
  }

  const detail = direction.detail;

  let subLine = <StyledScoreValue score={detail.earnings} prefix="+" />;
  let lastVisit;
  if (detail.denialReason) {
    subLine = (
      <TextF as="div">
        <TextWarning>{detail.denialReason}</TextWarning>
      </TextF>
    );
  } else if (detail.lastVisitTime) {
    lastVisit = (
      <ActionPaneLine>
        <TextF as="div">
          <TextOk>
            Last Visit
            <br />
            <TimeAgo datetime={new Date(detail.lastVisitTime)} />
          </TextOk>
        </TextF>
      </ActionPaneLine>
    );
  }

  return (
    <StyledDirection>
      <ActionPane>
        <ActionPaneDetail>
          <StyledArrow>{children}</StyledArrow>
          <ActionPaneLine>
            <H4 as="h3">
              <PortName port={detail.destination} isHome={detail.isHomePort} />
            </H4>
          </ActionPaneLine>
          <ActionPaneLine>{subLine}</ActionPaneLine>
          {lastVisit}
        </ActionPaneDetail>
        <Distance value={detail.distanceUnit} />
        <ActionPaneButton>
          <GoButton direction={direction} journeyTime={detail.journeyTimeSeconds} />
        </ActionPaneButton>
      </ActionPane>
    </StyledDirection>
  );
};

const StyledArrow = styled.div`
  width: ${GRID.QUADRUPLE};
  margin: 0 auto;
`;

const StyledDirection = styled.li`
  width: 50%;
`;

const StyledScoreValue = styled(ScoreValue)`
  justify-content: center;
`;
