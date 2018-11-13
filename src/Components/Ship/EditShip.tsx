import * as React from "react";
import { useSessionContext } from "../../context/SessionContext";
import TokenButton from "../Button/TokenButton";
import CreditsButton from "../Button/CreditsButton";
import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import { ApiClient } from "../../util/ApiClient";
import ShipNameGenerator from "./ShipNameGenerator";
import FleetShipInterface from "../../interfaces/ShipInterface";
import { useFleetContext } from "../../context/Page/FleetContext";

interface PropsInterface {
  fleetShip: FleetShipInterface;
}

export default ({ fleetShip }: PropsInterface) => {
  const { updateScore } = useSessionContext();
  const { updateRenameToken } = useFleetContext();
  const [requestingShipName, setRequestingShipName] = React.useState(false);
  const [offeredShipName, setOfferedShipName] = React.useState(null);
  const [offeredShipNameToken, setOfferedShipNameToken] = React.useState(null);

  const requestShipName = async (
    token: ActionTokenInterface
  ) => {
    setRequestingShipName(true);
    setOfferedShipName(null);
    setOfferedShipNameToken(null);

    //make the API call
    const data = await ApiClient.tokenFetch(token);
    setRequestingShipName(false);
    setOfferedShipName(data.nameOffered);
    setOfferedShipNameToken(data.action);

    updateRenameToken(data.shipId, data.newRequestShipNameToken);
    updateScore(data.newScore);
  };

  let shipName = null;
  if (this.state.requestingShipName || this.state.offeredShipName) {
    shipName = (
      <ShipNameGenerator
        offeredShipName={offeredShipName}
        offeredShipNameToken={offeredShipNameToken}
        resetOffer={() => {
          setOfferedShipName(null);
          setOfferedShipNameToken(null);
        }}
      />
    );
  }

  return (
    <div>
      <h2>Request a new ship name</h2>
      <p>
        A new name will be selected at random. You don't have to take it,
        but no refunds
      </p>
      <TokenButton
        token={fleetShip.renameToken.actionToken}
        handler={requestShipName}
      >
        <CreditsButton
          amount={fleetShip.renameToken.cost}
          disabledOverride={requestingShipName}
        />
      </TokenButton>
      {shipName}
    </div>
  );
};

