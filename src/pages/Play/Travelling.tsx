import * as React from "react";
import { H2 } from "../../components/Atoms/Heading/Heading";
import { IntervalFormat } from "../../components/Atoms/IntervalFormat/IntervalFormat";
import { ProgressBar } from "../../components/Atoms/ProgressBar/ProgressBar";
import { TextCenter } from "../../components/Atoms/Text/Text";
import { useCurrentShipContext } from "../../context/CurrentShipContext";
import { useTravellingState } from "../../hooks/useTravellingState";

export const Travelling = () => {
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
