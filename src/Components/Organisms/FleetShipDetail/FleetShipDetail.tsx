import * as React from "react";
import {FleetShipInterface} from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";
import FleetShipLocation from "../FleetShipLocation/FleetShipLocation";
import FleetShipHealth from "../FleetShipHealth/FleetShipHealth";
import EditShipName from "../EditShipName/EditShipName";

interface PropsInterface {
  ship: FleetShipInterface;
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

// todo - load the data here
export default function FleetShipDetail({ship}: PropsInterface) {
  return (
    <StyledDetail>
      <DetailRow>
        <DetailRowLabel>Location</DetailRowLabel>
        <DetailRowContent>
          <FleetShipLocation ship={ship} />
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Health</DetailRowLabel>
        <DetailRowContent>
          <FleetShipHealth ship={ship}/>
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Crates</DetailRowLabel>
        <DetailRowContent>Stuff</DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Ship name</DetailRowLabel>
        <DetailRowContent>
          <EditShipName fleetShip={ship}/>
        </DetailRowContent>
      </DetailRow>

    </StyledDetail>
  );
}
