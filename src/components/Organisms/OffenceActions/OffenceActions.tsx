import * as React from "react";
import { IActionToken, IOffenceOption } from "../../../Interfaces";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { usePlayPortContext } from "../../../context/Page/PlayPortContext";
import { ApiClient } from "../../../util/ApiClient";
import { EffectActionButton } from "../../Molecules/EffectActionButton/EffectActionButton";
import { EffectsRow } from "../EffectsRow/EffectsRow";
import { Effect } from "../../Molecules/Effect/Effect";
import { AttackIcon } from "../../Icons/AttackIcon/AttackIcon";

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

  return <Effect disabled={true} effect={option.effect} />;
};

export const OffenceActions = ({ actions }: IProps) => {
  return <AttackIcon />;

  // todo
  if (!actions) {
    return null;
  }

  return (
    <EffectsRow>
      {actions.map(option => (
        <OffenceEffect key={option.effect.name} option={option} />
      ))}
    </EffectsRow>
  );
};
