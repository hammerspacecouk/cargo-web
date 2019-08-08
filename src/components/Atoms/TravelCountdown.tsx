import { IntervalFormat } from "./IntervalFormat";
import * as React from "react";
import { AnimatedEllipsis } from "./AnimatedEllipsis";

export const TravelCountdown = React.memo(({ seconds }: IProps) => {
  if (seconds > 0) {
    return <IntervalFormat seconds={seconds} />;
  }

  return (
    <span>
      Arriving
      <AnimatedEllipsis />
    </span>
  );
});

interface IProps {
  seconds: number;
}
