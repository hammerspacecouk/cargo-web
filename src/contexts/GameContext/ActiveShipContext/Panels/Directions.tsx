import * as React from "react";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { DirectionE } from "../../../../components/Icons/DirectionE/DirectionE";
import { DirectionNE } from "../../../../components/Icons/DirectionNE/DirectionNE";
import { DirectionNW } from "../../../../components/Icons/DirectionNW/DirectionNW";
import { DirectionSE } from "../../../../components/Icons/DirectionSE/DirectionSE";
import { DirectionSW } from "../../../../components/Icons/DirectionSW/DirectionSW";
import { DirectionW } from "../../../../components/Icons/DirectionW/DirectionW";
import { useActiveShipContext } from "../ActiveShipContext";
import { IDirection } from "../../../../Interfaces";
import { TextD, TextF, TextWarning } from "../../../../components/Atoms/Text/Text";
import { Fraction } from "../../../../components/Atoms/Fraction/Fraction";
import { PortName } from "../../../../components/Molecules/PortName/PortName";
import { ScoreValue } from "../../../../components/Molecules/ScoreValue/ScoreValue";
import { GoButton } from "../Components/GoButton";
import styled from "styled-components";
import { COLOURS } from "../../../../styles/colours";
import { GRID } from "../../../../styles/variables";
import { ListUnstyled } from "../../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import { H4 } from "../../../../components/Atoms/Heading/Heading";
import { MONOSPACE_FONT } from "../../../../styles/typography";

interface IProps {
  direction: IDirection;
  children: any;
}

const StyledDirection = styled.li`
    &:not(:last-child) {
        border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
    }
    padding: ${GRID.UNIT};
    display: flex;
    align-items: center;
`;

const PortSummary = styled.div`
    flex: 1;
`;

const SubLine = styled.div`
    margin-top: ${GRID.HALF};
`;

const Distance = styled.div`
    margin: 0 ${GRID.UNIT};
    ${MONOSPACE_FONT};
`;

export const Direction = ({ direction, children }: IProps) => {
  const icon = children;
  const detail = direction.detail;

  let distance = <TextD>{detail.distanceUnit}</TextD>;
  if (detail.distanceUnit === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  let subLine = (<ScoreValue score={detail.earnings} />);
  if (detail.denialReason) {
    subLine = (
      <TextF as="div">
        <TextWarning>{detail.denialReason}</TextWarning>
      </TextF>
    );
  }

  return (
    <StyledDirection>
      <PortSummary>
        <H4 as="h3"><PortName port={detail.destination} /></H4>
        <SubLine>
          {subLine}
        </SubLine>
      </PortSummary>
      <Distance>
        {distance}
        <abbr title="light year">
          <TextF>ly</TextF>
        </abbr>
      </Distance>
      <div>
        <GoButton direction={direction} journeyTime={detail.journeyTimeSeconds}>
          {icon}
        </GoButton>
      </div>
    </StyledDirection>
  );
};


const StyledDirections = styled(ListUnstyled)`
    display: flex;
    flex-direction: column;
    width: 100%;
    > li {
        flex: 1;
    }
`;


export const Directions = () => {
  const { directions } = useActiveShipContext();

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
      <StyledDirections>
          {NW ? (
            <Direction direction={NW}>
              <DirectionNW />
            </Direction>
          ) : null}
          {NE ? (
            <Direction direction={NE}>
              <DirectionNE />
            </Direction>
          ) : null}
          {W ? (
            <Direction direction={W}>
              <DirectionW />
            </Direction>
          ) : null}
          {E ? (
            <Direction direction={E}>
              <DirectionE />
            </Direction>
          ) : null}
          {SW ? (
            <Direction direction={SW}>
              <DirectionSW />
            </Direction>
          ) : null}
          {SE ? (
            <Direction direction={SE}>
              <DirectionSE />
            </Direction>
          ) : null}
      </StyledDirections>
  );
};
