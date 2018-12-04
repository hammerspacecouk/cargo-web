import * as React from "react";
import ShipInterface from "../../../interfaces/ShipInterface";
import Loading from "../../Navigation/Loading";
import ListUnstyled from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import PlayerShip from "../../Molecules/PlayerShip/PlayerShip";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";

interface Props {
  ships: ShipInterface[];
}

const Item = styled.li`
    margin-bottom: ${grid.unit}px;
`;

export default function PlayerShipList({ships}: Props) {
  if (ships === undefined) {
    return <Loading />
  } // todo - pretty loader

  if (ships.length === 0) {
    return null;
  }

  return (
    <ListUnstyled>
      {ships.map(ship => (
        <Item key={ship.id}>
          <PlayerShip ship={ship} />
        </Item>
      ))}
    </ListUnstyled>
  );
};
