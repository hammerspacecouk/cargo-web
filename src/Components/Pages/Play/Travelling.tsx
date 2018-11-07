import * as React from "react";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import IntervalFormat from "../../Formatting/IntervalFormat";
import ProgressBar from "../../Element/ProgressBar";
import { useTravellingState } from "../../../hooks/useTravellingState";

export default () => {
  const { channel } = useCurrentShipContext();
  const { secondsRemaining, percent } = useTravellingState();

  let remaining: any = "Arriving...";
  if (secondsRemaining) {
    remaining = <IntervalFormat seconds={secondsRemaining} />;
  }

  return (
    <div>
      <h2>Destination: {channel.destination.name}</h2>
      <h3 className="text--center">{remaining}</h3>
      <ProgressBar percent={percent} />
    </div>
  );
};
