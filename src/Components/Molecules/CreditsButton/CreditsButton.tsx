import * as React from "react";
import ScoreInterface from "../../../interfaces/ScoreInterface";
import { useFrameEffect } from "../../../hooks/useFrameEffect";
import { useSessionContext } from "../../../context/SessionContext";
import ScoreValue from "../ScoreValue/ScoreValue";
import { getValue } from "../../../containers/Player/Score";
import ComplexButton from "../ComplexButton/ComplexButton";
import Timeout = NodeJS.Timeout;

interface Props {
  readonly amount: number;
  readonly disabledOverride?: boolean;
  readonly children?: JSX.Element;
}

const isDisabled = (
  amount: number,
  playerScore: ScoreInterface
): boolean => {
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
    isDisabled(amount, score)
  );

  React.useEffect(() => {
    let timer: Timeout;
    const unmount = () => {
      if (timer) {
        clearTimeout(timer);
      }
    };

    // if the button is force disabled the state will never update
    if (disabledOverride) {
      return unmount;
    }

    // if the score isn't changing the state will never update
    if (score.rate === 0) {
      return unmount;
    }

    const currentScoreValue = getValue(score, new Date());
    const isRateNegative = score.rate < 0;

    if (
      (isRateNegative && currentScoreValue <= amount) ||
      (!isRateNegative && currentScoreValue > amount)
    ) {
        // already passed it. state won't change
        return unmount;
    }

    const scoreDiff = amount - currentScoreValue;
    const millisecondsUntilThreshold = Math.abs(scoreDiff / score.rate) * 1000;

    timer = setInterval(() => {
      setDisabled(isDisabled(amount, score));
    }, millisecondsUntilThreshold);

    return unmount;
  });

  return (
    <ComplexButton
      type="submit"
      disabled={disabled || disabledOverride}
      leading={children}
    >
      <ScoreValue score={amount.toString(10)}/>
    </ComplexButton>
  );
};
