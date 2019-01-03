import * as React from "react";
import { Fraction } from "../../../components/Atoms/Fraction/Fraction";
import { TextD, TextF, TextWarning } from "../../../components/Atoms/Text/Text";
import { PortName } from "../../../components/Molecules/PortName/PortName";
import { ScoreValue } from "../../../components/Molecules/ScoreValue/ScoreValue";
import { IDirection } from "../../../Interfaces";
import { GoButton } from "./GoButton";

interface IProps {
  direction: IDirection;
  children: any;
}

export const Direction = ({ direction, children }: IProps) => {
  const icon = children;
  const directionDisabled = direction.action === null;

  let minimumRank;
  let minimumStrength;
  if (directionDisabled && direction.minimumRank) {
    minimumRank = (
      <TextF as="div">
        <TextWarning>Minimum rank: {direction.minimumRank.title}</TextWarning>
      </TextF>
    );
  }
  if (directionDisabled && direction.minimumStrength) {
    minimumStrength = (
      <TextF as="div">
        <TextWarning>
          This ship is not strong enough for this journey. Minimum:
          {direction.minimumStrength}
        </TextWarning>
      </TextF>
    );
  }

  let distance = <TextD>{direction.distanceUnit}</TextD>;
  if (direction.distanceUnit === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  return (
    <tr className="destinations__row">
      <td className="destinations__destination d">
        <PortName port={direction.destination} />
        {minimumRank}
        {minimumStrength}
      </td>
      <td className="destinations__distance">
        {distance}
        <abbr title="light year">
          <TextF>ly</TextF>
        </abbr>
      </td>
      <td className="destinations__earnings">
        <ScoreValue score={direction.earnings} />
      </td>
      <td className="destinations__action">
        <GoButton
          direction={direction}
          journeyTime={direction.journeyTimeSeconds}
        >
          {icon}
        </GoButton>
      </td>
    </tr>
  );
};
