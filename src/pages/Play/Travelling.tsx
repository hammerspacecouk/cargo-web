import * as React from "react";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import { IntervalFormat } from "../../components/Atoms/IntervalFormat/IntervalFormat";
import { ProgressBar } from "../../components/Atoms/ProgressBar/ProgressBar";
import { useTravellingState } from "../../hooks/useTravellingState";
import { TextCenter } from "../../components/Atoms/Text/Text";
import { H2 } from "../../components/Atoms/Heading/Heading";

export default () => {
  const { channel } = useCurrentShipContext();
  const { secondsRemaining, percent } = useTravellingState();

  let remaining: any = "Arriving...";
  if (secondsRemaining) {
    remaining = <IntervalFormat seconds={secondsRemaining} />;
  }

  return (
    <div>
      <H2>Destination: {channel.destination.name}</H2>
      <TextCenter as="h3">{remaining}</TextCenter>
      <ProgressBar percent={percent} />
    </div>
  );
};
