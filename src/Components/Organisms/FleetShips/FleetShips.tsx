import * as React from "react";
import ActionLink from "../../Link/ActionLink";
import { FleetShipInterface } from "../../../interfaces/ShipInterface";
import styled from "styled-components";
import FleetShipItem from "../FleetShipItem/FleetShipItem";
import ListUnstyled from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";

export interface Props {
  ships: FleetShipInterface[];
}

const StyledShipsList = styled(ListUnstyled)`
  border-top: dashed 1px ${COLOURS.BODY.TEXT};
  width: 100%;
`;

const MoreLink = styled.div`
  margin: ${GRID.DOUBLE} 0;
  display: flex;
  justify-content: center;
`;

export default function FleetShips({ ships }: Props) {
  let shipRows;
  if (ships !== undefined) {
    shipRows = ships.map(ship => (
      <FleetShipItem key={ship.ship.id} fleetShip={ship} />
    ));
  } else {
    shipRows = [
      <FleetShipItem key="loading1" />,
      <FleetShipItem key="loading2" />
    ];
  }

  return (
    <>
      <StyledShipsList>{shipRows}</StyledShipsList>
      <MoreLink>
        <ActionLink to={`/play/upgrades`}>Get more ships</ActionLink>
      </MoreLink>
    </>
  );
}
