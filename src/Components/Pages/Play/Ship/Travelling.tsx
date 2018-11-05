import * as React from "react";
import { useEffect, useRef } from "react";
import { useSessionContext } from "../../../../context/SessionContext";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";
import IntervalFormat from "../../../../components/Formatting/IntervalFormat";
import { getPlayDataByShipId } from "../../../../Models/Ship";
import ProgressBar from "../../../../components/Element/ProgressBar";
import { useTravellingState } from "../../../../hooks/useTravellingState";

export default () => {
  const { updateScore, updateRankStatus } = useSessionContext();
  const { ship, channel, updateFullResponse } = useCurrentShipContext();
  const {percent, secondsRemaining, isArriving} = useTravellingState();
  const allowArrivalCheck = useRef(true);

  const handleArrival = async () => {
    if (!allowArrivalCheck.current) {
      return;
    }
    try {
      const data = await getPlayDataByShipId(ship.id); // todo - shipContext.refresh()
      updateFullResponse(data);
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
    if (isArriving && allowArrivalCheck.current) {
      handleArrival();
    }
    return () => {
      allowArrivalCheck.current = false;
    };
  }, [isArriving]);


  let remaining: any = "Arriving...";
  if (secondsRemaining) {
    remaining = <IntervalFormat seconds={this.state.secondsRemaining} />;
  }

  return (
    <div>
      <h2>Destination: {channel.destination.name}</h2>
      <h3 className="text--center">{remaining}</h3>
      <ProgressBar percent={percent} />
    </div>
  );
};
