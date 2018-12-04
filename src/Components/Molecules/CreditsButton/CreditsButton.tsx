import * as React from "react";
import ScoreInterface from "../../../interfaces/ScoreInterface";
import { useFrameEffect } from "../../../hooks/useFrameEffect";
import { useSessionContext } from "../../../context/SessionContext";
import ScoreValue from "../ScoreValue/ScoreValue";
import { getValue } from "../../../containers/Player/Score";
import ComplexButton from "../ComplexButton/ComplexButton";

interface Props {
  readonly amount: number;
  readonly disabledOverride?: boolean;
  readonly children?: JSX.Element;
}

const isDisabled = (
  amount: number,
  playerScore: ScoreInterface,
  disabledOverride: boolean
): boolean => {
  if (disabledOverride) {
    return true;
  }
  if (amount === 0) {
    return false;
  }
  const scoreValue = getValue(playerScore, new Date());
  return scoreValue < amount;
};

export default function CreditsButton(
  { amount, disabledOverride, children }: Props
) {
  const { score } = useSessionContext();
  const [disabled, setDisabled] = React.useState(
    isDisabled(amount, score, disabledOverride)
  );

  useFrameEffect(
    () => {
      setDisabled(isDisabled(amount, score, disabledOverride));
      return true;
    },
    [amount, disabledOverride]
  );

  return (
    <ComplexButton
      type="submit"
      disabled={disabled}
      leading={children}
    >
      <ScoreValue score={amount.toString(10)}/>
    </ComplexButton>
  );
};
