import * as differenceInSeconds from "date-fns/difference_in_seconds";
import { useEffect, useState } from "react";
import { useFrameEffect } from "./useFrameEffect";
import { useActiveShipContext } from "../contexts/ActiveShipContext/ActiveShipContext";
import { useGameSessionContext } from "../contexts/GameSessionContext/GameSessionContext";

const calculateSecondsRemaining = (arrival: Date) => {
  const now = new Date();
  return Math.max(0, differenceInSeconds(arrival, now));
};

const useTravellingCountdown = () => {
  const { channel } = useActiveShipContext();

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
    secondsRemaining: seconds,
  };
};

export const useTravellingState = () => {
  const { percent, secondsRemaining, isArriving } = useTravellingCountdown();
  const { refreshState } = useActiveShipContext();
  const { updateScore, updateRankStatus } = useGameSessionContext();
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

  useEffect(() => {
    if (isArriving && allowArrivalCheck) {
      handleArrival();
    }
    return () => {
      allowArrivalCheck = false;
    };
  }, [isArriving]);

  return {
    percent,
    secondsRemaining,
  };
};
