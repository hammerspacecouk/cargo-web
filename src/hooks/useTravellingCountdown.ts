import differenceInSeconds from "date-fns/difference_in_seconds";
import { IChannel } from "../interfaces";
import { useState } from "react";
import { useFrameEffect } from "./useFrameEffect";

const calculateSecondsRemaining = (arrival: Date) => {
  const now = new Date();
  return Math.max(0, differenceInSeconds(arrival, now));
};
export const useTravellingCountdown = (channel: IChannel) => {
  const start = new Date(channel.startTime);
  const arrival = new Date(channel.arrival);

  const [seconds, setSeconds] = useState(() => calculateSecondsRemaining(arrival));

  useFrameEffect(() => {
    setSeconds(calculateSecondsRemaining(arrival));
    return seconds > 0;
  });

  const totalSeconds = differenceInSeconds(arrival, start);
  const percent = Math.max(0, Math.min(100, ((totalSeconds - seconds) / totalSeconds) * 100));

  return {
    isArriving: seconds <= 0,
    percent,
    secondsRemaining: seconds
  };
};
