import { differenceInSeconds } from "date-fns";
import { IChannel } from "@src/interfaces";
import { useState } from "react";
import { useFrameEffect } from "./useFrameEffect";

export const calculateSeconds = (start: Date, arrival: Date) => {
  const now = new Date();
  return {
    travelled: Math.max(0, differenceInSeconds(now, start)),
    remaining: Math.max(0, differenceInSeconds(arrival, now)),
  };
};
export const useTravellingCountdown = (channel: IChannel) => {
  const start = new Date(channel.startTime);
  const arrival = new Date(channel.arrival);

  const [seconds, setSeconds] = useState(() => calculateSeconds(start, arrival));

  useFrameEffect(() => {
    setSeconds(calculateSeconds(start, arrival));
    return seconds.remaining > 0;
  });

  const totalSeconds = differenceInSeconds(arrival, start);
  const percent = Math.max(0, Math.min(1, seconds.travelled / totalSeconds)) * 100;

  return {
    isArriving: seconds.remaining <= 0,
    percent,
    secondsTravelled: seconds.travelled,
    secondsRemaining: seconds.remaining,
  };
};
