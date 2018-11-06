import TokenButton from "../../Containers/Button/TokenButton";
import CreditsIcon from "../Icons/CreditsIcon";
import * as React from "react";
import { useCurrentShipContext } from "../../context/CurrentShipContext";

export default () => {
  const {cratesInPort} = useCurrentShipContext();

  return (
    <div className="t-port-crates">
      <h2 className="table-head">Crates at Port</h2>
      <table className="table">
        <thead>
        <tr>
          <th>Contents</th>
          <th>Value</th>
          <th>Pickup</th>
        </tr>
        </thead>
        <tbody>
        {cratesInPort.map(crateAction => {
          let tokenButton = (
            <button className="button" disabled={true}>
              Pickup
            </button>
          );
          if (crateAction.token) {
            tokenButton = (
              <TokenButton
                token={crateAction.token}
                handler={this.moveCrate}
              >
                <button
                  className="button"
                  type="submit"
                  disabled={this.state.buttonsDisabled}
                >
                  Pickup
                </button>
              </TokenButton>
            );
          }

          return (
            <tr key={crateAction.crate.id}>
              <td>{crateAction.crate.contents}</td>
              <td>
                <span className="c">+{crateAction.valuePerLY}</span>{" "}
                <span className="icon icon--mini">
                          <CreditsIcon />
                        </span>/ly
              </td>
              <td>{tokenButton}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};
