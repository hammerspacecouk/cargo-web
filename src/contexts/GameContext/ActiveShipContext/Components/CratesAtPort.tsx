import * as React from "react";
import { useActiveShipContext } from "../ActiveShipContext";
import { CratesList, TITLE_POSITION } from "../../../../components/Molecules/CratesList/CratesList";
import { Crate, CratePlaceholder } from "./Crate";

export const CratesAtPort = () => {
  const { cratesInPort } = useActiveShipContext();
  let crates;
  let totalAvailable = "-";

  if (cratesInPort) {
    crates = cratesInPort.map(crateAction => <Crate key={`cap-${crateAction.crate.id}`} crateAction={crateAction} />);
    totalAvailable = cratesInPort.length.toString();
  } else {
    const placeholderSlots = new Array(3).fill(undefined);
    crates = placeholderSlots.map((_, i) => <CratePlaceholder key={`p-${i}`} loading={true} />);
  }

  return (
    <CratesList title={`Available (${totalAvailable})`} titlePosition={TITLE_POSITION.TOP}>
      {crates}
    </CratesList>
  );
};
