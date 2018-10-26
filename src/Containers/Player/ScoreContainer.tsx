import * as React from "react";
import * as differenceInMilliseconds from "date-fns/difference_in_milliseconds";

import ScoreInterface from "../../DomainInterfaces/ScoreInterface";
import ScoreValue from "../../Components/Player/ScoreValue";

interface Props {
  score: ScoreInterface;
}

export const getValue = (score: ScoreInterface, now: Date) => {
  const calculationDate = new Date(score.datetime);
  const millisecondsDiff = differenceInMilliseconds(now, calculationDate);

  const earned = millisecondsDiff / 1000 * score.rate;

  const current = score.value + earned;

  if (current < 0) {
    return 0;
  }

  return current;
};

const formatNumber = (input: number): string => {
  let output = input.toFixed(0);

  // minimum 5 digits
  return output.padStart(5, "0");
};

const scoreState = (score: ScoreInterface): string => {
  return formatNumber(getValue(score, new Date()));
};

export default function ScoreContainer(props: Props) {

  const [score, setScore] = React.useState(scoreState(props.score));

  let allowAnimationUpdate: boolean = true;

  function updateScore() {
    if (!allowAnimationUpdate) {
      return;
    }

    // @todo - special effects when it gets low
    // @todo - handle what happens when you hit zero to "kill" the player

    setScore(scoreState(props.score));
    window.requestAnimationFrame(updateScore);
  }

  React.useEffect(() => {
    allowAnimationUpdate = true;
    updateScore();
    return () => {
      allowAnimationUpdate = false;
    };
  }, [props.score]);

  return (
    <ScoreValue score={score}/>
  );
}
