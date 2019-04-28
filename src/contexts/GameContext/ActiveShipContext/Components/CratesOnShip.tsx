import * as React from "react";
import styled from "styled-components";
import { Hidden } from "../../../../components/Atoms/Hidden/Hidden";
import { ListInline } from "../../../../components/Atoms/Lists/ListInline/ListInline";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { Square } from "../../../../components/Atoms/Ratio/Ratio";
import { GRID } from "../../../../styles/variables";
import { Environment } from "../../../../util/Environment";
import { CrateOnShip, CrateOnShipPlaceholder } from "../../../../pages/Play/Port/CrateOnShip";
import { useActiveShipContext } from "../ActiveShipContext";

interface IProps {
  className?: string;
}

const List = styled(ListInline)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ShipImage = styled.div`
    width: 176px;
    margin ${GRID.UNIT} auto;
`;

export const CratesOnShip = ({ className }: IProps) => {
  const { ship, cratesOnShip } = useActiveShipContext();

  if (cratesOnShip === undefined) {
    return <Loading />;
  } // todo - pretty loader

  const placeholderSlots = new Array(
    ship.shipClass.capacity - cratesOnShip.length
  ).fill(undefined);
  const keyStart = cratesOnShip.length;
  return (
    <div className={className}>
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
