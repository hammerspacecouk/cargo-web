import * as React from "react";
import { Message } from "../../Panel/Messages";
import { makeUpgradePurchase, ShipUpgradeInterface } from "../../../Models/Player";
import Loading from "../../Navigation/Loading";
import TokenButton from "../../../Containers/Button/TokenButton";
import ActionTokenInterface from "../../../interfaces/ActionTokenInterface";
import CreditsButton from "../../../Containers/Button/CreditsButton";
import { useApi } from "../../../hooks/useAPI";
import { UpgradesContextComponent, useUpgradesContext } from "../../../context/UpgradesContext";

const UpgradesPage = () => {
  const { data } = useApi("/play/upgrades");
  const { ships, message, newScore } = data;

  const messageItem = message && (
    <Message message={message}/>
  );

  return (
    <main className="t-play__content-contain">
      <h1>The Yard</h1>

      {messageItem}
      <h2>Ships</h2>
      {shipsList(ships)}
    </main>
  );
};

async function makePurchase(token: ActionTokenInterface) {
  const {enableButtons, disableButtons} = useUpgradesContext();

  disableButtons();

  //make the API call
  try {
    const data = await makeUpgradePurchase(token);

    // update the state
    this.setState({
      data,
      message: data.message
    });

    // update the score
    this.props.updateScoreHandler(data.newScore);
  } catch (e) {
    // todo - error handling
  } finally {
    enableButtons();
  }
};

function shipsList(ships?: ShipUpgradeInterface[]): JSX.Element {
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

function renderShip(ship?: ShipUpgradeInterface) {
  const {buttonsDisabled} = useUpgradesContext();

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
}

export default (
  <UpgradesContextComponent>
    <UpgradesPage />
  </UpgradesContextComponent>
);
