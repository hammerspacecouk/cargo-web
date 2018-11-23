import * as React from "react";
import { useUpgradesContext } from "../../../../context/Page/UpgradesContext";
import TokenButton from "../../../Button/TokenButton";
import CreditsButton from "../../../Atoms/CreditsButton/CreditsButton";
import { ShipUpgradeInterface } from "../../../../interfaces/TransactionInterface";

interface PropsInterface {
  ship?: ShipUpgradeInterface;
}
export default ({ship}: PropsInterface) => {
  const { buttonsDisabled, makePurchase } = useUpgradesContext();

  if (!ship) {
    return <div>LOCKED</div>; // todo - design this
  }

  // todo - show the ship strengths. show the svg
  return (
    <div className="text--center">
      <h3>
        {ship.detail.name} ({ship.currentCount})
      </h3>
      <p>{ship.detail.description}</p>
      <p>Capacity: {ship.detail.capacity}</p>
      <TokenButton token={ship.actionToken} handler={makePurchase}>
        <CreditsButton amount={ship.cost} disabledOverride={buttonsDisabled} />
      </TokenButton>
    </div>
  );
};
