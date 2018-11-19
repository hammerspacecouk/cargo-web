import * as React from "react";
import ScoreInterface from "../../interfaces/ScoreInterface";
import { useFrameEffect } from "../../hooks/useFrameEffect";
import { useSessionContext } from "../../context/SessionContext";
import ScoreValue from "../Molecules/ScoreValue/ScoreValue";
import { getValue } from "../../containers/Player/Score";

interface Props {
  readonly amount: number;
  readonly disabledOverride?: boolean;
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

export default ({ amount, disabledOverride }: Props) => {
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
    <button className="button" type="submit" disabled={disabled}>
      <ScoreValue score={amount.toString(10)} />
    </button>
  );
};
