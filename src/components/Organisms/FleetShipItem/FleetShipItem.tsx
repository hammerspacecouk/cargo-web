import * as React from "react";
import styled from "styled-components";
import { IFleetShip } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { HaloButton } from "../../Atoms/HaloButton/HaloButton";
import { ChevronDownIcon } from "../../Icons/ChevronDownIcon/ChevronDownIcon";
import { ChevronUpIcon } from "../../Icons/ChevronUpIcon/ChevronUpIcon";
import { WarningIcon } from "../../Icons/WarningIcon/WarningIcon";
import { FleetShipDetail } from "../FleetShipDetail/FleetShipDetail";
import { FleetShipName } from "../FleetShipName/FleetShipName";

interface IProps {
  fleetShip?: IFleetShip;
}

const StyledItem = styled.li<{ destroyed: boolean }>`
  border-bottom: dashed 1px ${COLOURS.BODY.TEXT};
  min-height: 96px;
  ${props =>
    props.destroyed
      ? `
    opacity: 0.6;
    font-style: italic;
  `
      : ``}
`;

const ShipIntro = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonArea = styled.div`
  margin: ${GRID.UNIT} 0 ${GRID.UNIT} ${GRID.UNIT};
  width: 64px;
  height: 64px;
`; // todo - abstract button size

const ShipName = styled.div`
  flex: 1;
  padding: ${GRID.UNIT} 0;
`;

const Attention = styled.div`
  margin-left: ${GRID.UNIT};
  width: ${GRID.DOUBLE};
  color: ${COLOURS.SEMANTIC.WARNING.KEY};
`;

const Destroyed = styled.div`
  margin-bottom: ${GRID.UNIT};
  text-align: right;
`;

export const FleetShipItem = ({ fleetShip }: IProps) => {
  const [showDetail, setShowDetail] = React.useState(false);

  let attention = null;
  let moreButton = null;
  let detail = null;
  if (fleetShip) {
    if (fleetShip.ship.isDestroyed) {
      detail = (
        <Destroyed>Destroyed at {fleetShip.ship.location.name}</Destroyed>
      );
    } else {
      const icon = showDetail ? <ChevronUpIcon /> : <ChevronDownIcon />;
      moreButton = (
        <ButtonArea>
          <HaloButton onClick={() => setShowDetail((prev: boolean) => !prev)}>
            {icon}
          </HaloButton>
        </ButtonArea>
      );
      if (showDetail) {
        detail = <FleetShipDetail fleetShip={fleetShip} />;
      }
      if (fleetShip.needsAttention) {
        attention = (
          <Attention>
            <WarningIcon />
          </Attention>
        );
      }
    }
  }

  // todo - optional chaining - babel
  return (
    <StyledItem destroyed={fleetShip ? fleetShip.ship.isDestroyed : false}>
      <ShipIntro>
        <ShipName>
          <FleetShipName ship={fleetShip ? fleetShip.ship : null} />
        </ShipName>
        {attention}
        {moreButton}
      </ShipIntro>
      {detail}
    </StyledItem>
  );
};