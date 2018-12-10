import * as React from "react";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import CreditsIcon from "../../../components/Icons/CreditsIcon/CreditsIcon";

interface CrateAtPortPropsInterface {
  crateAction: CrateActionInterface;
}

export const CrateAtPort = ({ crateAction }: CrateAtPortPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  let tokenButton = (
    <button className="button" disabled={true}>
      Pickup
    </button>
  );
  if (crateAction.token) {
    tokenButton = (
      <TokenButton token={crateAction.token} handler={moveCrate}>
        <button className="button" type="submit" disabled={buttonsDisabled}>
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
};
