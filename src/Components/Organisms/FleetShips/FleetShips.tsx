import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IFleetShip } from "../../../Interfaces";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { FleetShipItem } from "../FleetShipItem/FleetShipItem";

export interface IProps {
  ships: IFleetShip[];
}

const StyledShipsList = styled(ListUnstyled)`
  width: 100%;
`;

const MoreLink = styled.div`
  margin: ${GRID.DOUBLE} 0;
  display: flex;
  justify-content: center;
`;

export const FleetShips = ({ ships }: IProps) => {
  let shipRows;
  if (ships !== undefined) {
    shipRows = ships.map(ship => (
      <FleetShipItem key={ship.ship.id} fleetShip={ship} />
    ));
  } else {
    shipRows = [
      <FleetShipItem key="loading1" />,
      <FleetShipItem key="loading2" />,
    ];
  }

  return (
    <>
      <StyledShipsList>{shipRows}</StyledShipsList>
      <MoreLink>
        <Link to={`/play/inventory`}>Get more ships</Link>
      </MoreLink>
    </>
  );
};
