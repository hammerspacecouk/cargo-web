import * as React from "react";
import styled from "styled-components";
import { ILockedTransaction, IShipUpgrade } from "../../interfaces";
import { ListUnstyled } from "../Atoms/List/ListUnstyled";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";
import { ShipUpgrade } from "../Molecules/ShipUpgrade";

export const ShipUpgrades = ({ shipUpgrades, className }: IProps) => {
  return (
    <ListUnstyled className={className}>
      {shipUpgrades.map((ship, index) => (
        <ListItem key={`ship-upgrades-${index}`}>
          <ShipUpgrade ship={ship} />
        </ListItem>
      ))}
    </ListUnstyled>
  );
};

interface IProps {
  shipUpgrades: (IShipUpgrade | ILockedTransaction)[];
  className?: string;
}

const ListItem = styled.li`
  &:not(:last-child) {
    margin-bottom: ${GRID.UNIT};
    padding-bottom: ${GRID.UNIT};
    border-bottom: solid 1px ${COLOURS.PANEL_INNER_DIVIDER};
  }
`;
