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
import { ListLined } from "../../../Atoms/List/ListLined";
import { ActionRow, ActionRowButton, ActionRowContent } from "../../../Molecules/ActionRow";
import { Distance } from "../../../Atoms/Distance";
import { useTutorial } from "../../../../hooks/useTutorial";
import { TravelTutorial } from "../../Tutorial/TravelTutorial";
import { TimeAgo } from "../../../Atoms/TimeAgo";
import { GridWrapper } from "../../../Atoms/GridWrapper";
import { COLOURS } from "../../../../styles/colours";

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

const SubLine = styled.div`
  margin-bottom: ${GRID.HALF};
`;

const Direction = ({ direction, children }: IDirectionProps) => {
  if (!direction) {
    return (
      <StyledDirection>
        <DirectionPanel disabled>
          <StyledArrow>{children}</StyledArrow>
        </DirectionPanel>
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
      <SubLine>
        <TextF as="div">
          <TextOk>
            Last Visit
            <br />
            <TimeAgo datetime={new Date(detail.lastVisitTime)} />
          </TextOk>
        </TextF>
      </SubLine>
    );
  }

  return (
    <StyledDirection>
      <DirectionPanel>
        <StyledArrow>{children}</StyledArrow>
        <SubLine>
          <H4 as="h3">
            <PortName port={detail.destination} isHome={detail.isHomePort} />
          </H4>
        </SubLine>
        <SubLine>{subLine}</SubLine>
        {lastVisit}
        <Distance value={detail.distanceUnit} />
        <ButtonRow>
          <GoButton direction={direction} journeyTime={detail.journeyTimeSeconds} />
        </ButtonRow>
      </DirectionPanel>
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

const ButtonRow = styled.div`
  margin-top: auto;
`;

const StyledScoreValue = styled(ScoreValue)`
  justify-content: center;
`;

// todo - de-dupe
const DirectionPanel = styled.div<{ disabled?: boolean }>`
  position: relative;
  padding: ${GRID.UNIT};
  border: solid 1px ${COLOURS.GREY.BLACK};
  background: ${COLOURS.GREY.DARKEST};
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  ${({ disabled }) =>
    disabled &&
    `
    justify-content: flex-start;
    opacity: 0.4;
  `}
`;
