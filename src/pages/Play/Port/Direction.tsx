import * as React from "react";
import DirectionInterface from "../../../interfaces/DirectionInterface";
import Fraction from "../../../components/Formatting/Fraction";
import IntervalFormat from "../../../components/Formatting/IntervalFormat";
import ScoreValue from "../../../components/Molecules/ScoreValue/ScoreValue";
import GoButton from "./GoButton";
import { InlinePortName } from "../../../components/Labels";

interface PropsInterface {
  direction: DirectionInterface;
  children: any;
}

export default ({ direction, children }: PropsInterface) => {
  const icon = children;
  const directionDisabled = direction.action === null;

  let minimumRank, minimumStrength;
  if (directionDisabled && direction.minimumRank) {
    minimumRank = (
      <div className="f">Minimum rank: {direction.minimumRank.title}</div>
    );
  }
  if (directionDisabled && direction.minimumStrength) {
    minimumStrength = (
      <div className="f">
        This ship is not strong enough for this journey. Minimum:
        {direction.minimumStrength}
      </div>
    );
  }

  let distance = <span className="d">{direction.distanceUnit}</span>;
  if (direction.distanceUnit === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  return (
    <tr className="destinations__row">
      <td className="destinations__destination d">
        <InlinePortName port={direction.destination} />
        {minimumRank}
        {minimumStrength}
      </td>
      <td className="destinations__distance">
        {distance}
        <abbr className="f" title="light year">
          ly
        </abbr>
      </td>
      <td className="destinations__time">
        <IntervalFormat seconds={direction.journeyTimeSeconds} />
      </td>
      <td className="destinations__earnings">
        <ScoreValue score={direction.earnings.toString()} />
      </td>
      <td className="destinations__action">
        <GoButton direction={direction}>{icon}</GoButton>
      </td>
    </tr>
  );
};
