import * as React from "react";
import ActionLink from "../Link/ActionLink";
import ProgressBar from "../Element/ProgressBar";
import EditShip from "./EditShip";
import FleetShipInterface from "../../interfaces/ShipInterface";
import styled from "styled-components";
import { colours, grid } from "../../GlobalStyle";
import FleetShipItem from "../Organisms/FleetShipItem/FleetShipItem";
import ListUnstyled from "../Atoms/Lists/ListUnstyled/ListUnstyled";

export interface Props {
  ships: FleetShipInterface[];
}


const ship = (fleetShip: FleetShipInterface) => {
  const ship = fleetShip.ship;
  return (
  <React.Fragment key={ship.id}>
  <tr className="m-fleet-ship">
    <td className="m-fleet-ship__cell m-fleet-ship__cell--health">
      <ProgressBar percent={ship.strengthPercent} isHealth={true} />
    </td>
  </tr>
    <tr>
      <td colSpan={5}>
        <EditShip fleetShip={fleetShip} />
      </td>
    </tr>
  </React.Fragment>
);
};


const StyledShipsList = styled(ListUnstyled)`
  border-top: dashed 1px ${colours.white};
  width: 100%;
`;

const MoreLink = styled.div`
  margin: ${grid.unit * 2}px 0;
  display: flex;
  justify-content: center;
`;

export default function FleetShips({ ships }: Props) {
  let shipRows;
  if (ships !== undefined) {
    shipRows = ships.map(({ship}) => <FleetShipItem key={ship.id} ship={ship} />);
  }

  return (
    <>
      <StyledShipsList>
        {shipRows || <FleetShipItem key="loading" />}
      </StyledShipsList>
      <MoreLink>
        <ActionLink to={`/play/upgrades`}>Get more ships</ActionLink>
      </MoreLink>
    </>
  );
};
