import * as React from "react";
import { FleetShipInterface } from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import FleetShipLocation from "../FleetShipLocation/FleetShipLocation";
import FleetShipHealth from "../FleetShipHealth/FleetShipHealth";
import EditShipName from "../EditShipName/EditShipName";
import { COLOURS } from "../../../styles/colours";
import { H3 } from "../../Atoms/Heading/Heading";
import { FlexInline } from "../../Atoms/Flex/Flex";

interface PropsInterface {
  fleetShip: FleetShipInterface;
}

// todo - responsive margins
const StyledDetail = styled.div`
  margin: ${GRID.UNIT} 0 ${GRID.DOUBLE} calc(48px + ${GRID.UNIT});
`;
const DetailRow = styled(FlexInline)`
  margin-bottom: ${GRID.UNIT};
  padding-bottom: ${GRID.UNIT};
  border-bottom: solid 1px ${COLOURS.BODY.FADED};
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;
const DetailRowLabel = styled(H3)`
  width: 240px;
  margin-right: ${GRID.UNIT};
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
          <FleetShipLocation ship={fleetShip.ship} />
        </DetailRowContent>
      </DetailRow>
      <DetailRow>
        <DetailRowLabel>Shield strength</DetailRowLabel>
        <DetailRowContent>
          <FleetShipHealth health={fleetShip.health} />
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
