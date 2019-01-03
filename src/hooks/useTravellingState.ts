import * as differenceInSeconds from "date-fns/difference_in_seconds";
import { useEffect, useState } from "react";
import { useCurrentShipContext } from "../context/CurrentShipContext";
import { useSessionContext } from "../context/SessionContext";
import { useFrameEffect } from "./useFrameEffect";

const calculateSecondsRemaining = (arrival: Date) => {
  const now = new Date();
  return Math.max(0, differenceInSeconds(arrival, now));
};

const useTravellingCountdown = () => {
  const { channel } = useCurrentShipContext();

  const start = new Date(channel.startTime);
  const arrival = new Date(channel.arrival);

  const [seconds, setSeconds] = useState(calculateSecondsRemaining(arrival));

  useFrameEffect(() => {
    setSeconds(calculateSecondsRemaining(arrival));
    return seconds > 0;
  });

  const totalSeconds = differenceInSeconds(arrival, start);
  const percent = Math.max(
    0,
    Math.min(100, ((totalSeconds - seconds) / totalSeconds) * 100)
  );

  return {
    isArriving: seconds <= 0,
    percent,
    secondsRemaining: seconds,
  };
};

export const useTravellingState = () => {
  const { updateScore, updateRankStatus } = useSessionContext();
  const { refreshState } = useCurrentShipContext();
  const { percent, secondsRemaining, isArriving } = useTravellingCountdown();
  let allowArrivalCheck = true;

  const handleArrival = async () => {
    if (!allowArrivalCheck) {
      return;
    }
    try {
      const data = await refreshState();
      updateScore(data.playerScore);
      updateRankStatus(data.playerRankStatus);
      return;
    } catch (e) {
      // do nothing. we'll try again in a moment
    } finally {
      window.setTimeout(handleArrival, 3500);
    }
  };

  useEffect(
    () => {
      if (isArriving && allowArrivalCheck) {
        handleArrival();
      }
      return () => {
        allowArrivalCheck = false;
      };
    },
    [isArriving]
  );

  return {
    percent,
    secondsRemaining,
  };
};
