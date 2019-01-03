import * as React from "react";
import styled from "styled-components";
import { IFleetShip } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { FlexInline } from "../../Atoms/Flex/Flex";
import { H3 } from "../../Atoms/Heading/Heading";
import { EditShipName } from "../EditShipName/EditShipName";
import { FleetShipHealth } from "../FleetShipHealth/FleetShipHealth";
import { FleetShipLocation } from "../FleetShipLocation/FleetShipLocation";

interface IProps {
  fleetShip: IFleetShip;
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

export const FleetShipDetail = ({ fleetShip }: IProps) => (
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
