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
import { TextF, TextWarning } from "../../../../components/Atoms/Text/Text";
import { PortName } from "../../../../components/Molecules/PortName/PortName";
import { ScoreValue } from "../../../../components/Molecules/ScoreValue/ScoreValue";
import { GoButton } from "../Components/GoButton";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { H4 } from "../../../../components/Atoms/Heading/Heading";
import { ListLined } from "../../../../components/Atoms/Lists/ListLined/ListLined";
import { ActionRow, ActionRowButton, ActionRowContent } from "../../../../components/Molecules/ActionRow/ActionRow";
import { Distance } from "../../../../components/Atoms/Distance";

interface IProps {
  direction: IDirection;
  children: any;
}

const PortOverview = styled(ActionRowContent)`
  display: flex;
  align-items: center;
`;

const PortSummary = styled.div`
  flex: 1;
  margin-right: ${GRID.UNIT};
`;

const SubLine = styled.div`
  margin-top: ${GRID.HALF};
`;

export const Direction = ({ direction, children }: IProps) => {
  const icon = children;
  const detail = direction.detail;

  let subLine = <ScoreValue score={detail.earnings} prefix="+" />;
  if (detail.denialReason) {
    subLine = (
      <TextF as="div">
        <TextWarning>{detail.denialReason}</TextWarning>
      </TextF>
    );
  }

  return (
    <li>
      <ActionRow>
        <PortOverview>
          <PortSummary>
            <H4 as="h3">
              <PortName port={detail.destination} />
            </H4>
            <SubLine>{subLine}</SubLine>
          </PortSummary>
          <Distance value={detail.distanceUnit} />
        </PortOverview>
        <ActionRowButton>
          <GoButton direction={direction} journeyTime={detail.journeyTimeSeconds}>
            {icon}
          </GoButton>
        </ActionRowButton>
      </ActionRow>
    </li>
  );
};

export const Directions = () => {
  const { directions } = useActiveShipContext();

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <ListLined>
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
    </ListLined>
  );
};
