import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IPort, IShip } from "../../../Interfaces";
import { routes } from "../../../routes";
import { ChevronRightIcon } from "../../Icons/ChevronRightIcon/ChevronRightIcon";
import { PortName } from "../../Molecules/PortName/PortName";

interface IProps {
  ship: IShip;
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

export const FleetShipLocation = ({ ship }: IProps) => {
  return (
    <Styled>
      <Location>
        <PortName port={ship.location as IPort} />
      </Location>
      <Go to={routes.getPlayShip(ship.id)}>
        <ChevronRightIcon />
      </Go>
    </Styled>
  );
};
