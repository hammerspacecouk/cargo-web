import * as React from "react";
import styled from "styled-components";
import { PortInterface, ShipInterface } from "../../../Interfaces";
import { Link } from "react-router-dom";
import ChevronRightIcon from "../../Icons/ChevronRightIcon/ChevronRightIcon";
import routes from "../../../routes";
import PortName from "../../Molecules/PortName/PortName";

interface PropsInterface {
  ship: ShipInterface;
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

export default function FleetShipLocation({ ship }: PropsInterface) {
  return (
    <Styled>
      <Location>
        <PortName port={ship.location as PortInterface} />
      </Location>
      <Go to={routes.getPlayShip(ship.id)}>
        <ChevronRightIcon />
      </Go>
    </Styled>
  );
}
