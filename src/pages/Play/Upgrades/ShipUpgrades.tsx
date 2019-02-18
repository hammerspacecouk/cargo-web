import * as React from "react";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { useUpgradesContext } from "../../../context/Page/UpgradesContext";
import { ShipUpgrade } from "./ShipUpgrade";
import { ListUnstyled } from "../../../components/Atoms/Lists/ListUnstyled/ListUnstyled";
import styled from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";

const ListItem = styled.li`
    &:not(:last-child) {
        margin-bottom: ${GRID.UNIT};
        padding-bottom: ${GRID.UNIT};
        border-bottom: solid 1px ${COLOURS.GREY.DARK};
    }
`;

export const ShipUpgrades = (): JSX.Element => {
  const { ships } = useUpgradesContext();
  if (ships === undefined) {
    return <Loading />;
  }
  return (
    <ListUnstyled>
      {ships.map((ship, index) => (
        <ListItem key={`ship-upgrades-${index}`}>
          <ShipUpgrade ship={ship} />
        </ListItem>
      ))}
    </ListUnstyled>
  );
};
