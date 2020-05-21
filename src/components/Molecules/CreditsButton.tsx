import * as React from "react";
import { getValue } from "@src/components/Organisms/Score";
import { IScore } from "@src/interfaces";
import { ComplexButton } from "./ComplexButton";
import { ScoreValue } from "./ScoreValue";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";

interface IProps {
  readonly amount: number;
  readonly disabledOverride?: boolean;
}

const isDisabled = (amount: number, playerScore: IScore): boolean => {
  if (amount === 0) {
    return false;
  }
  const scoreValue = getValue(playerScore, new Date());
  return scoreValue < amount;
};

export const CreditsButton = ({ amount, disabledOverride }: IProps) => {
  const { score } = useGameSessionContext();
  const [disabled, setDisabled] = React.useState(() => isDisabled(amount, score));

  React.useEffect(() => {
    let timer: any;
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

    if ((isRateNegative && currentScoreValue <= amount) || (!isRateNegative && currentScoreValue > amount)) {
      // already passed it. state won't change
      return unmount;
    }

    // when going down, things don't deactivate until they are *under* amount,
    // so we'll reduce the threshold by 1
    const threshold = isRateNegative ? amount - 1 : amount;

    const scoreDiff = threshold - currentScoreValue;
    const millisecondsUntilThreshold = Math.abs(scoreDiff / score.rate) * 1000;

    timer = setTimeout(() => {
      setDisabled(isDisabled(amount, score));
    }, millisecondsUntilThreshold);

    return unmount;
  });

  let disabledState = disabled || disabledOverride;
  if (!disabledState) {
    // check again in case the context score changed
    disabledState = isDisabled(amount, score);
  }

  const title = disabledState && !disabledOverride ? "Not enough credit" : null;

  return (
    <ComplexButton type="submit" disabled={disabledState} title={title}>
      <ScoreValue score={amount} />
    </ComplexButton>
  );
};
