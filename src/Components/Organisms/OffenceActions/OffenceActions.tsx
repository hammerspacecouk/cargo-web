import * as React from "react";
import { IActionToken, IOffenceOption } from "../../../Interfaces";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { ApiClient } from "../../../util/ApiClient";
import { EffectActionButton } from "../../Molecules/EffectActionButton/EffectActionButton";
import { Button } from "../../Atoms/Button/Button";

interface IProps {
  actions?: IOffenceOption[];
}

interface IOffenceEffectProps {
  option: IOffenceOption;
}

const OffenceEffect = ({ option }: IOffenceEffectProps) => {
  const { updateFullResponse, setWarningModalText } = useCurrentShipContext();
  const {
    buttonsDisabled,
    enableButtons,
    disableButtons,
  } = usePlayPortContext();
  const applyAction = async (token: IActionToken) => {
    disableButtons();
    const response = await ApiClient.tokenFetch(token);
    if (response.error) {
      setWarningModalText(response.error);
    }
    updateFullResponse(response.data);
    enableButtons();
  };

  if (option.actionToken) {
    return (
      <EffectActionButton
        key={option.effect.name}
        effect={option.effect}
        token={option.actionToken}
        disabled={buttonsDisabled}
        handler={applyAction}
      />
    );
  }

  return (
    <Button disabled key={option.effect.name}>
      {option.effect.name}
    </Button>
  );
};

export const OffenceActions = ({ actions }: IProps) => {
  if (!actions) {
    return null;
  }

  return (
    <div>
      {actions.map(option => (
        <OffenceEffect key={option.effect.name} option={option} />
      ))}
    </div>
  );
};