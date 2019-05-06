import * as React from "react";
import { Crate, CratePlaceholder } from "./Crate";
import { useActiveShipContext } from "../ActiveShipContext";
import {
  CratesList,
  TITLE_POSITION,
} from "../../../../components/Molecules/CratesList/CratesList";

export const CratesOnShip = () => {
  const { ship, cratesOnShip } = useActiveShipContext();

  let availableCrates = [];
  let loadedCount = "-";

  if (cratesOnShip) {
    availableCrates = cratesOnShip;
    loadedCount = cratesOnShip.length;
  }

  const placeholderSlots = new Array(
    ship.shipClass.capacity - availableCrates.length
  ).fill(undefined);

  return (
    <CratesList
      title={`Loaded ${loadedCount}/${ship.shipClass.capacity}`}
      titlePosition={TITLE_POSITION.BOTTOM}
    >
      {availableCrates.map(crate => (
        <Crate crateAction={crate} key={`cos-${crate.crate.id}`} />
      ))}
      {placeholderSlots.map((_, i) => (
        <CratePlaceholder key={`p-${i}`} loading={cratesOnShip === undefined} />
      ))}
    </CratesList>
  );
};
