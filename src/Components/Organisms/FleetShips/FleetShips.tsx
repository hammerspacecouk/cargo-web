import * as React from "react";
import { FleetShipInterface } from "../../../Interfaces";
import styled from "styled-components";
import FleetShipItem from "../FleetShipItem/FleetShipItem";
import ListUnstyled from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";
import { Link } from "react-router-dom";

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
        <Link to={`/play/upgrades`}>Get more ships</Link>
      </MoreLink>
    </>
  );
}
