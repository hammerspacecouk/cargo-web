import * as React from "react";
import ScoreInterface from "../../interfaces/ScoreInterface";
import { useFrameEffect } from "../../hooks/useFrameEffect";
import { getValue } from "../Player/ScoreContainer";
import { useSessionContext } from "../../context/SessionContext";
import ScoreValue from "../../components/Player/ScoreValue";

interface Props {
  readonly amount: number;
  readonly disabled?: boolean;
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
  const [disabled, setDisabled] = useState(
    isDisabled(amount, score, disabledOverride)
  );

  useFrameEffect(() => {
    setDisabled(isDisabled(amount, score, disabledOverride));
  }, [amount, disabledOverride]);

  return (
    <button className="button" type="submit" disabled={disabled}>
      <ScoreValue score={amount.toString(10)}/>
    </button>
  );
};
