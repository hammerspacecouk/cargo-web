import * as React from "react";
import { useFrameEffect } from "../../../hooks/useFrameEffect";
import { IntervalFormat } from "../../Atoms/IntervalFormat/IntervalFormat";
import { differenceInSeconds } from "date-fns";

interface IProps {
  readonly dateTime: string;
}

const calculateSeconds = (dateTime: string): number => {
  const calculationDate = new Date(dateTime);
  return Math.max(0, differenceInSeconds(
    calculationDate,
    new Date(),
  ));
};

export const CountdownToTime = ({ dateTime }: IProps) => {
  const [seconds, setSeconds] = React.useState(calculateSeconds(dateTime));

  useFrameEffect(() => {
    const secondsRemaining = calculateSeconds(dateTime);
    setSeconds(secondsRemaining);
    return secondsRemaining > 0;
  }, [dateTime], 500);

  return (
    <IntervalFormat seconds={seconds}/>
  );
};
