import * as React from "react";
import CreditsIcon from "../Icons/CreditsIcon";
import TokenButton from "../../Containers/Button/TokenButton";
import { CurrentShipContextInterface, useCurrentShipContext } from "../../context/CurrentShipContext";
import ShipInterface from "../../interfaces/ShipInterface";

const listOfCrates = (crates: CurrentShipContextInterface["cratesOnShip"], ship: ShipInterface) => {
  const cratesOnShip = crates.map(
    crateAction => (
      <tr key={crateAction.crate.id}>
        <td>{crateAction.crate.contents}</td>
        <td>
          <span className="c">+{crateAction.valuePerLY}</span>{" "}
          <span className="icon icon--mini">
              <CreditsIcon/>
            </span>/ly
        </td>
        <td>
          <TokenButton token={crateAction.token} handler={this.moveCrate}>
            <button
              className="button"
              type="submit"
              disabled={this.state.buttonsDisabled}
            >
              Drop
            </button>
          </TokenButton>
        </td>
      </tr>
    )
  );
  let remaining = ship.shipClass.capacity - cratesOnShip.length;
  while (remaining > 0) {
    cratesOnShip.push(
      <tr key={`remaining-${remaining}`}>
        <td colSpan={3}>
          <p className="text--center f">Empty Slot</p>
        </td>
      </tr>
    );
    remaining--;
  }
  return cratesOnShip;
}

export default () => {
  const {ship, cratesOnShip} = useCurrentShipContext();

  return (
    <div className="t-port-ship">
      <h2 className="table-head">Crates on Ship</h2>
      <table className="table">
        <thead>
        <tr>
          <th>Contents</th>
          <th>Value</th>
          <th>Drop</th>
        </tr>
        </thead>
        <tbody>{listOfCrates(cratesOnShip, ship)}</tbody>
      </table>
    </div>
  );
};
