import * as React from "react";
import ScoreInterface from "../../../interfaces/ScoreInterface";
import { useFrameEffect } from "../../../hooks/useFrameEffect";
import { useSessionContext } from "../../../context/SessionContext";
import ScoreValue from "../../Molecules/ScoreValue/ScoreValue";
import { getValue } from "../../../containers/Player/Score";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";

interface Props {
  readonly amount: number;
  readonly disabledOverride?: boolean;
  readonly children?: any;
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

const StyledScoreValue = styled(ScoreValue)`
    &:not(:first-child) {
        margin-top: ${grid.unit / 2}px;
    }
`;

export default ({ amount, disabledOverride, children }: Props) => {
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
      {children}
      <StyledScoreValue score={amount.toString(10)} />
    </button>
  );
};
