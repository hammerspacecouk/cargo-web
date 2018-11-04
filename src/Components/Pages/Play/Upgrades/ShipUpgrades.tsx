import { makeUpgradePurchase, ShipUpgradeInterface } from "../../../../Models/Player";
import Loading from "../../../Navigation/Loading";
import * as React from "react";
import { useUpgradesContext } from "../../../../context/UpgradesContext";
import TokenButton from "../../../../Containers/Button/TokenButton";
import CreditsButton from "../../../../Containers/Button/CreditsButton";
import ActionTokenInterface from "../../../../interfaces/ActionTokenInterface";
import { useSessionContext } from "../../../../context/SessionContext";

const makePurchase = async (token: ActionTokenInterface) => {
  const {
    enableButtons,
    disableButtons,
    updateShips,
    updateMessage
  } = useUpgradesContext();
  const {updateScore} = useSessionContext();

  disableButtons();

  //make the API call
  try {
    const data = await makeUpgradePurchase(token);
    updateShips(data.ships);
    updateMessage(data.message);

    // update the score
    updateScore(data.newScore);
  } catch (e) {
    // todo - error handling
  } finally {
    enableButtons();
  }
};

const renderShip = (ship?: ShipUpgradeInterface) => {
  const { buttonsDisabled } = useUpgradesContext();

  if (!ship) {
    return "LOCKED"; // todo - design this
  }

  // todo - show the ship strengths. show the svg
  return (
    <div className="text--center">
      <h3>
        {ship.detail.name} ({ship.currentCount})
      </h3>
      <p>{ship.detail.description}</p>
      <p>Capacity: {ship.detail.capacity}</p>
      <TokenButton
        token={ship.actionToken}
        handler={makePurchase}
      >
        <CreditsButton
          amount={ship.cost}
          disabled={buttonsDisabled}
        />
      </TokenButton>
    </div>
  );
};

export default (): JSX.Element => {
  const { ships } = useUpgradesContext();
  if (ships === undefined) {
    return <Loading/>; // todo - nice loading state
  }
  return (
    <ul>
      {ships.map((ship?: ShipUpgradeInterface) => (
        <li>{renderShip(ship)}</li>
      ))}
    </ul>
  );
}
