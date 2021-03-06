import { useEffect } from "react";
import { useActiveShipContext } from "@src/contexts/ActiveShipContext/ActiveShipContext";
import { useGameSessionContext } from "@src/contexts/GameSessionContext/GameSessionContext";
import { useTravellingCountdown } from "./useTravellingCountdown";

export const useTravellingState = () => {
  const { refreshState, channel } = useActiveShipContext();
  const { percent, secondsRemaining, secondsTravelled, isArriving } = useTravellingCountdown(channel);
  const { updateScore, updateRankStatus, refreshSession } = useGameSessionContext();
  let allowArrivalCheck = true;

  const handleArrival = async () => {
    if (!allowArrivalCheck) {
      return;
    }
    try {
      const data = await refreshState();
      if (data.port) {
        updateScore(data.playerScore);
        updateRankStatus(data.playerRankStatus);
        refreshSession();
      }
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
    secondsTravelled,
  };
};
