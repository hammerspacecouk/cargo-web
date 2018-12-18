import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { CrateOnShip, CrateOnShipPlaceholder } from "./CrateOnShip";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { H2 } from "../../../components/Atoms/Heading/Heading";
import styled from "styled-components";
import { ListInline } from "../../../components/Atoms/Lists/ListInline/ListInline";
import { Hidden } from "../../../components/Atoms/Hidden/Hidden";

interface PropsInterface {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const CratesOnShip = ({ className }: PropsInterface) => {
  const { ship, cratesOnShip } = useCurrentShipContext();

  if (cratesOnShip === undefined) {
    return <Loading />;
  } // todo - pretty loader

  const placeholderSlots = new Array(
    ship.shipClass.capacity - cratesOnShip.length
  ).fill(undefined);
  const keyStart = cratesOnShip.length;
  return (
    <div className={className}>
      <Hidden as="h2">Crates on Ship</Hidden>
      <List>
        {cratesOnShip.map(crate => (
          <li key={`cos-${crate.crate.id}`}>
            <CrateOnShip crateAction={crate} />
          </li>
        ))}
        {placeholderSlots.map((_, i) => (
          <li key={`p-${i + keyStart}`}>
            <CrateOnShipPlaceholder />
          </li>
        ))}
      </List>
    </div>
  );
};
