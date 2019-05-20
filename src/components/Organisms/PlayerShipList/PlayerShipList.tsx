import * as React from "react";
import styled from "styled-components";
import { IOtherShip } from "../../../Interfaces";
import { GRID } from "../../../styles/variables";
import { ListUnstyled } from "../../Atoms/Lists/ListUnstyled/ListUnstyled";
import { Loading } from "../../Atoms/Loading/Loading";
import { PlayerShip } from "../../Molecules/PlayerShip/PlayerShip";
import { COLOURS } from "../../../styles/colours";

interface IProps {
  ships: IOtherShip[];
}

const Item = styled.li`
  padding-top: ${GRID.UNIT};
  padding-right: ${GRID.UNIT};
  border-top: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  margin-bottom: ${GRID.UNIT};
`;

export const PlayerShipList = ({ ships }: IProps) => {
  if (ships === undefined) {
    return <Loading />;
  }

  if (ships.length === 0) {
    return null;
  }

  // todo - no tactical options on own ships
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
