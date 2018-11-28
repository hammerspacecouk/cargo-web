import CreditsIcon from "../../../components/Icons/CreditsIcon/CreditsIcon";
import TokenButton from "../../../components/Button/TokenButton";
import * as React from "react";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";

interface CrateOnShipPropsInterface {
  crateAction: CrateActionInterface;
}
export const CrateOnShip = ({ crateAction }: CrateOnShipPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  return (
    <tr key={crateAction.crate.id}>
      <td>{crateAction.crate.contents}</td>
      <td>
        <span className="c">+{crateAction.valuePerLY}</span>{" "}
        <span className="icon icon--mini">
          <CreditsIcon />
        </span>/ly
      </td>
      <td>
        <TokenButton token={crateAction.token} handler={moveCrate}>
          <button className="button" type="submit" disabled={buttonsDisabled}>
            Drop
          </button>
        </TokenButton>
      </td>
    </tr>
  );
};

export const CrateOnShipPlaceholder = () => {
  return (
    <tr>
      <td colSpan={3}>
        <p className="text--center f">Empty Slot</p>
      </td>
    </tr>
  );
};
