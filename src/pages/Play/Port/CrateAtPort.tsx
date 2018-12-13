import * as React from "react";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import CreditsIcon from "../../../components/Icons/CreditsIcon/CreditsIcon";
import { Button } from "../../../components/Atoms/Button/Button";
import Icon, { SMALL_ICON } from "../../../components/Atoms/Icon/Icon";
import { TextC } from "../../../components/Atoms/Text/Text";
import { CrateContents } from "../../../components/Atoms/CrateContents/CrateContents";

interface CrateAtPortPropsInterface {
  crateAction: CrateActionInterface;
}

export const CrateAtPort = ({ crateAction }: CrateAtPortPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  let tokenButton = (
    <Button disabled={true}>
      Pickup
    </Button>
  );
  if (crateAction.token) {
    tokenButton = (
      <TokenButton token={crateAction.token} handler={moveCrate}>
        <Button type="submit" disabled={buttonsDisabled}>
          Pickup
        </Button>
      </TokenButton>
    );
  }

  return (
    <tr key={crateAction.crate.id}>
      <td>
        <CrateContents>
          {crateAction.crate.contents}
        </CrateContents>
      </td>
      <td>
        <TextC>+{crateAction.valuePerLY}</TextC>{" "}
        <Icon size={SMALL_ICON}>
          <CreditsIcon />
        </Icon>/ly
      </td>
      <td>{tokenButton}</td>
    </tr>
  );
};
