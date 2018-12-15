import CreditsIcon from "../../../components/Icons/CreditsIcon/CreditsIcon";
import TokenButton from "../../../components/Molecules/TokenButton/TokenButton";
import * as React from "react";
import { CrateActionInterface } from "../../../interfaces/CrateInterface";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import Icon, { SMALL_ICON } from "../../../components/Atoms/Icon/Icon";
import { TextC, TextCenter, TextF } from "../../../components/Atoms/Text/Text";
import { Button } from "../../../components/Atoms/Button/Button";
import { CrateWithContents } from "../../../components/Atoms/CrateContents/CrateContents";

interface CrateOnShipPropsInterface {
  crateAction: CrateActionInterface;
}
export const CrateOnShip = ({ crateAction }: CrateOnShipPropsInterface) => {
  const { buttonsDisabled, moveCrate } = usePlayPortContext();

  return (
    <tr key={crateAction.crate.id}>
      <td>
        <CrateWithContents crate={crateAction.crate} />
      </td>
      <td>
        <TextC>+{crateAction.valuePerLY}</TextC>{" "}
        <Icon size={SMALL_ICON}>
          <CreditsIcon />
        </Icon>/ly
      </td>
      <td>
        <TokenButton token={crateAction.token} handler={moveCrate}>
          <Button type="submit" disabled={buttonsDisabled}>
            Drop
          </Button>
        </TokenButton>
      </td>
    </tr>
  );
};

export const CrateOnShipPlaceholder = () => {
  return (
    <tr>
      <td colSpan={3}>
        <TextCenter><TextF>
          Empty Slot
        </TextF></TextCenter>
      </td>
    </tr>
  );
};
