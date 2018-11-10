import * as React from "react";

import ActionTokenInterface from "../../interfaces/ActionTokenInterface";
import TokenButton from "../../components/Button/TokenButton";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import { ApiClient } from "../../util/ApiClient";
import { useAllowUpdate } from "../../hooks/useAllowUpdate";
import { useShipNameGenerator } from "../../hooks/useShipNameGenerator";

interface PropsInterface {
  offeredShipName?: string;
  offeredShipNameToken?: ActionTokenInterface;
  resetOffer: () => void;
}

export default ({offeredShipName, offeredShipNameToken, resetOffer}: PropsInterface) => {

  const {updateCurrentShip} = useCurrentShipContext();
  const {matched, nameGuess} = useShipNameGenerator(offeredShipName);
  const [acceptingShipName, setAcceptingShipName] = React.useState(false);
  const allowUpdate = useAllowUpdate();

  const acceptShipName = async (
    token: ActionTokenInterface
) => {
    setAcceptingShipName(true);
    const data = await ApiClient.tokenFetch(token);
    if (allowUpdate) {
      setAcceptingShipName(false);
      updateCurrentShip(data.ship);
      resetOffer();
    }
  };

  if (acceptingShipName) {
    return <h3>Updating</h3>;
  }
  let acceptanceButtons = null;
  if (offeredShipNameToken && matched) {
    acceptanceButtons = (
      <React.Fragment>
        <a
          href="."
          className="button button--soft-danger"
          onClick={(e) => {
            e.preventDefault();
            resetOffer();
          }}
        >
          Reject
        </a>
          <TokenButton
            token={offeredShipNameToken}
            handler={acceptShipName}
          >
            <button className="button button--confirm" type="submit">
              Accept
            </button>
          </TokenButton>
      </React.Fragment>
    );
  }
  return (
    <table className="table">
      <tbody>
      <tr>
        <td>
          <h3 className="d">Name offered</h3>
          <p className="b monospace">{nameGuess}</p>
        </td>
        <td className="text--right">{acceptanceButtons}</td>
      </tr>
      </tbody>
    </table>
  );
};
