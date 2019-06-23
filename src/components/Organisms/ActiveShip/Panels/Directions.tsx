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
import { TextF, TextWarning } from "../../../Atoms/Text";
import { PortName } from "../../../Molecules/PortName";
import { ScoreValue } from "../../../Molecules/ScoreValue";
import { GoButton } from "../GoButton";
import styled from "styled-components";
import { GRID } from "../../../../styles/variables";
import { H4 } from "../../../Atoms/Heading";
import { ListLined } from "../../../Atoms/List/ListLined";
import { ActionRow, ActionRowButton, ActionRowContent } from "../../../Molecules/ActionRow";
import { Distance } from "../../../Atoms/Distance";

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
