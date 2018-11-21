import * as React from "react";
import styled from "styled-components";
import FleetShipInterface from "../../../interfaces/ShipInterface";
import { Link } from "react-router-dom";
import ChevronRightIcon from "../../Icons/ChevronRightIcon/ChevronRightIcon";
import routes from "../../../routes";
import PortName from "../../Molecules/PortName/PortName";

interface PropsInterface {
  ship: FleetShipInterface;
}

const Styled = styled.div`
    display: flex;
    align-items: center;
`;
const Location = styled.div`
    font-size: 1.4rem;
    flex: 1;
`;

const Go = styled(Link)`
    width: 48px;
`;

export default function FleetShipLocation({ship}: PropsInterface) {
  return (
    <Styled>
      <Location>
        <PortName name={ship.location.name} safe={ship.location.safeHaven} />
      </Location>
      <Go to={routes.getPlayShip(ship.id)}>
        <ChevronRightIcon/>
      </Go>
    </Styled>
  );
}
