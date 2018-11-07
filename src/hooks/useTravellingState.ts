import { useEffect, useRef, useState } from "react";
import * as differenceInSeconds from "date-fns/difference_in_seconds";
import { useCurrentShipContext } from "../context/CurrentShipContext";
import { useFrameEffect } from "./useFrameEffect";
import { useSessionContext } from "../context/SessionContext";

const secondsRemaining = (arrival: Date) => {
  const now = new Date();
  return Math.max(0, differenceInSeconds(arrival, now));
};

const useTravellingCountdown = () => {
  const { channel } = useCurrentShipContext();

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

export const useTravellingState = () => {
  const { updateScore, updateRankStatus } = useSessionContext();
  const { refreshState } = useCurrentShipContext();
  const { percent, secondsRemaining, isArriving } = useTravellingCountdown();
  const allowArrivalCheck = useRef(true);

  const handleArrival = async () => {
    if (!allowArrivalCheck.current) {
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
      if (isArriving && allowArrivalCheck.current) {
        handleArrival();
      }
      return () => {
        allowArrivalCheck.current = false;
      };
    },
    [isArriving]
  );

  return {
    secondsRemaining,
    percent
  };
};
