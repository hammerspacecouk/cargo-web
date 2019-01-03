import * as differenceInMilliseconds from "date-fns/difference_in_milliseconds";
import { createElement, useEffect, useRef, useState } from "react";

import { ScoreValue } from "../../components/Molecules/ScoreValue/ScoreValue";
import { IScore } from "../../Interfaces";

interface IProps {
  score: IScore;
}

export const getValue = (score: IScore, now: Date): number => {
  const calculationDate = new Date(score.datetime);
  const millisecondsDiff = differenceInMilliseconds(now, calculationDate);

  const earned = (millisecondsDiff / 1000) * score.rate;

  const current = score.value + earned;

  if (current < 0) {
    return 0;
  }

  return Math.floor(current);
};

const scoreState = (score: IScore): number => {
  return getValue(score, new Date());
};

export const Score = (props: IProps) => {
  const [score, setScore] = useState(scoreState(props.score));
  const mounted = useRef(false);
  let frameHandler: number = null;

  const frame = () => {
    if (!mounted.current || !props.score) {
      return;
    }
    setScore(scoreState(props.score));
    // if the score rate is zero, no need to watch it as it won't change
    if (props.score.rate !== 0) {
      frameHandler = window.requestAnimationFrame(frame);
    }
  };

  useEffect(
    () => {
      mounted.current = true;
      frameHandler = window.requestAnimationFrame(frame);
      return () => {
        mounted.current = false;
        window.cancelAnimationFrame(frameHandler);
      };
    },
    [props.score]
  );

  return createElement(ScoreValue, { score });
};
