import * as React from "react";
import { getValue } from "../../../containers/Player/Score";
import { useSessionContext } from "../../../context/SessionContext";
import { IScore } from "../../../Interfaces";
import { ComplexButton } from "../ComplexButton/ComplexButton";
import { ScoreValue } from "../ScoreValue/ScoreValue";

interface IProps {
  readonly amount: number;
  readonly disabledOverride?: boolean;
  readonly children?: JSX.Element;
}

const isDisabled = (amount: number, playerScore: IScore): boolean => {
  if (amount === 0) {
    return false;
  }
  const scoreValue = getValue(playerScore, new Date());
  return scoreValue < amount;
};

export const CreditsButton = ({
  amount,
  disabledOverride,
  children,
}: IProps) => {
  const { score } = useSessionContext();
  const [disabled, setDisabled] = React.useState(isDisabled(amount, score));

  React.useEffect(() => {
    let timer: any; // todo - not any
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
      <ScoreValue score={amount} />
    </ComplexButton>
  );
};
