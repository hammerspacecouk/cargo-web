import { createElement, useState, useEffect, useRef } from "react";
import * as differenceInMilliseconds from "date-fns/difference_in_milliseconds";

import ScoreInterface from "../../interfaces/ScoreInterface";
import ScoreValue from "../../components/Molecules/ScoreValue/ScoreValue";
import { useFrameEffect } from "../../hooks/useFrameEffect";

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

export default (props: Props) => {
  const [score, setScore] = useState(scoreState(props.score));
  const mounted = useRef(false);

  function updateScore() {
    let frameHandler: number = null;
    if (!mounted.current) {
      return;
    }

    // @todo - special effects when it gets low
    // @todo - handle what happens when you hit zero to "kill" the player

    setScore(scoreState(props.score));
    window.requestAnimationFrame(updateScore);
  }

  // useFrameEffect(() => {
  //   setScore(scoreState(props.score));
  //   return true;
  // });

  useEffect(
    () => {
      mounted.current = true;
      // if the score rate is zero, no need to watch it as it won't change
      // if (props.score.rate !== 0) {
      //   console.log('updaint from effect');
        updateScore();
      // }
      return () => {
        mounted.current = false;
      };
    },
    [props.score]
  );

  return createElement(ScoreValue, {score});
}
