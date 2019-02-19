import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IFleetShip } from "../../../Interfaces";
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

const LOCAL_STORAGE_KEY = 'FLEET_SHIP_PLACEHOLDER_COUNT'

export const FleetShips = ({ ships }: IProps) => {
  const [placeholderCount, setPlaceHolderCount] = React.useState(1);

  React.useEffect(() => {
    let count = 1;
    if (ships) {
      count = ships.length;
      window.localStorage.setItem(LOCAL_STORAGE_KEY, count);
    } else {
      const lsValue = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (lsValue) {
        count = parseInt(lsValue, 10);
      }
    }
    if (placeholderCount !== count) {
      setPlaceHolderCount(count);
    }
  }, [ships]);

  let shipRows;
  if (ships !== undefined) {
    shipRows = ships.map(ship => (
      <FleetShipItem key={ship.ship.id} fleetShip={ship} />
    ));
  } else {
    shipRows = Array.from(Array(placeholderCount).keys())
      .map(a => (<FleetShipItem key={`placeholder-${a}`} />));
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
