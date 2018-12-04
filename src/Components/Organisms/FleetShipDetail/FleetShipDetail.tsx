import * as React from "react";
import { FleetShipInterface } from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import FleetShipLocation from "../FleetShipLocation/FleetShipLocation";
import FleetShipHealth from "../FleetShipHealth/FleetShipHealth";
import EditShipName from "../EditShipName/EditShipName";

interface PropsInterface {
  fleetShip: FleetShipInterface;
}

// todo - responsive margins
const StyledDetail = styled.div`
    margin: ${grid.unit}px 0 ${grid.unit * 4}px ${48 + grid.unit}px;
`;
const DetailRow = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: ${grid.unit}px;
    padding-bottom: ${grid.unit}px;
    border-bottom: solid 1px ${colours.gray[9]};
    &:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
`;
const DetailRowLabel = styled.div`
    width: 240px;
    font-size: 1.4rem;
    margin-right: ${grid.unit}px;  
`;
const DetailRowContent = styled.div`
    flex: 1;
`;

export default function FleetShipDetail({ fleetShip }: PropsInterface) {
  return (
    <StyledDetail>
      <DetailRow>
        <DetailRowLabel>Location</DetailRowLabel>
        <DetailRowContent>
          <FleetShipLocation ship={fleetShip.ship}/>
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Shield strength</DetailRowLabel>
        <DetailRowContent>
          <FleetShipHealth health={fleetShip.health}/>
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Ship name</DetailRowLabel>
        <DetailRowContent>
          <EditShipName
            ship={fleetShip.ship}
            renameToken={fleetShip.renameToken}
          />
        </DetailRowContent>
      </DetailRow>

    </StyledDetail>
  );
}
