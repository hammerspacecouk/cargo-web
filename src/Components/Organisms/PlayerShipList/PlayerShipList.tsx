import * as React from "react";
import styled from "styled-components";
import { IOtherShip } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { Loading } from "../../Atoms/Loading/Loading";
import { PlayerShip } from "../../Molecules/PlayerShip/PlayerShip";

interface IProps {
  ships: IOtherShip[];
}

const Item = styled.li`
  margin-bottom: ${GRID.UNIT};
`;

export const PlayerShipList = ({ ships }: IProps) => {
  if (ships === undefined) {
    return <Loading />;
  } // todo - pretty loader

  if (ships.length === 0) {
    return null;
  }

  return (
    <ListUnstyled>
      {ships.map(shipItem => (
        <Item key={shipItem.ship.id}>
          <PlayerShip ship={shipItem.ship} offence={shipItem.offence} />
        </Item>
      ))}
    </ListUnstyled>
  );
};
