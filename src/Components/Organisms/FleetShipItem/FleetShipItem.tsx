import * as React from "react";
import { FleetShipInterface } from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import ChevronDownIcon from "../../Icons/ChevronDownIcon/ChevronDownIcon";
import HaloButton from "../../Atoms/HaloButton/HaloButton";
import ChevronUpIcon from "../../Icons/ChevronUpIcon/ChevronUpIcon";
import FleetShipName from "../FleetShipName/FleetShipName";
import FleetShipDetail from "../FleetShipDetail/FleetShipDetail";
import WarningIcon from "../../Icons/WarningIcon/WarningIcon";

interface PropsInterface {
  ship?: FleetShipInterface;
}

const StyledItem = styled.li<{destroyed: boolean}>`
  border-bottom: dashed 1px ${colours.white};
  min-height: ${grid.unit * 6}px;
  ${props => props.destroyed ? `opacity: 0.6;`: ``}
`;

const ShipIntro = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonArea = styled.div`
  margin: ${grid.unit}px 0 ${grid.unit}px ${grid.unit}px;
  width: ${grid.unit * 4}px;
  height: ${grid.unit * 4}px;
`;

const ShipName = styled.div`
  flex: 1;
  padding: ${grid.unit} 0;
`;

const Attention = styled.div`
    margin-left: ${grid.unit}px;
    width: ${grid.unit * 2}px;
    color: ${colours.yellow[6]};
`;

const Destroyed = styled.div`
    margin-top: ${grid.unit}px;
`;

export default function FleetShipItem({ ship }: PropsInterface) {
  const [showDetail, setShowDetail] = React.useState(false);

  let attention = null;
  let moreButton = null;
  let detail = null;
  if (ship) {
    if (ship.ship.isDestroyed) {
      detail = <Destroyed>Destroyed at {ship.ship.location.name}</Destroyed>
    } else {
      const icon = showDetail ? <ChevronUpIcon/> : <ChevronDownIcon/>;
      moreButton = (
        <ButtonArea>
          <HaloButton onClick={() => setShowDetail((prev: boolean) => !prev)}>
            {icon}
          </HaloButton>
        </ButtonArea>
      );
      if (showDetail) {
        detail = <FleetShipDetail ship={ship.ship}/>;
      }
      if (ship.needsAttention) {
        attention = <Attention><WarningIcon/></Attention>;
      }
    }
  }

  // todo - ship icon and mini health bar
  // todo - optional chaining - babel
  return (
    <StyledItem destroyed={ship ? ship.ship.isDestroyed : false}>
      <ShipIntro>
        <ShipName>
          <FleetShipName ship={ship ? ship.ship : null}/>
        </ShipName>
        {attention}
        {moreButton}
      </ShipIntro>
      {detail}
    </StyledItem>
  );
}
