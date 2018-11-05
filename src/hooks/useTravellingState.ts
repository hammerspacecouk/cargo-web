import { useState } from "react";
import * as differenceInSeconds from "date-fns/difference_in_seconds";
import { useCurrentShipContext } from "../context/CurrentShipContext";
import { useFrameEffect } from "./useFrameEffect";

const secondsRemaining = (arrival: Date) => {
  const now = new Date();
  return Math.max(0, differenceInSeconds(arrival, now));
};

export const useTravellingState = () => {
  const {channel} = useCurrentShipContext();

  const start = new Date(channel.startTime);
  const arrival = new Date(channel.arrival);

  const [seconds, setSeconds] = useState(secondsRemaining(arrival));

  useFrameEffect(() => {
    setSeconds(secondsRemaining(arrival));
    return seconds > 0;
  });

  const totalSeconds = differenceInSeconds(arrival, start);
  const percent = Math.max(
    0,
    Math.min(100, (totalSeconds - seconds) / totalSeconds * 100)
  );

  return {
    secondsRemaining: seconds,
    percent,
    isArriving: seconds <= 0
  };
};
