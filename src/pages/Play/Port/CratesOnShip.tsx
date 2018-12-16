import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateOnShip, CrateOnShipPlaceholder } from "./CrateOnShip";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { H2 } from "../../../components/Atoms/Heading/Heading";
import styled from "styled-components";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { GRID } from "../../../styles/variables";

const List = styled(ListInline)`
    margin-left: -${GRID.UNIT};
`;

const ListItem = styled.li`
    margin: 0 0 ${GRID.UNIT} ${GRID.UNIT};
`;

export default () => {
  const { ship, cratesOnShip } = useCurrentShipContext();

  if (cratesOnShip === undefined) {
    return <Loading/>;
  } // todo - pretty loader

  const placeholderSlots = new Array(
    ship.shipClass.capacity - cratesOnShip.length
  ).fill(undefined);
  const keyStart = cratesOnShip.length;
  return (
    <div className="t-port-ship">
      <H2>Crates on Ship</H2>
      <List>
        {cratesOnShip.map(crate => (
          <ListItem key={`cos-${crate.crate.id}`}>
            <CrateOnShip crateAction={crate}/>
          </ListItem>
        ))}
        {placeholderSlots.map((_, i) => (
          <ListItem key={`p-${i + keyStart}`}>
            <CrateOnShipPlaceholder/>
          </ListItem>
        ))}
      </List>
    </div>
  );
};
