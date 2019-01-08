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
  const detail = direction.detail;

  let distance = <TextD>{detail.distanceUnit}</TextD>;
  if (detail.distanceUnit === 0) {
    distance = <Fraction num={1} den={100} />;
  }

  return (
    <tr className="destinations__row">
      <td className="destinations__destination d">
        <PortName port={detail.destination} />
        {detail.denialReason && (
          <TextF as="div">
            <TextWarning>{detail.denialReason}</TextWarning>
          </TextF>
        )}
      </td>
      <td className="destinations__distance">
        {distance}
        <abbr title="light year">
          <TextF>ly</TextF>
        </abbr>
      </td>
      <td className="destinations__earnings">
        <ScoreValue score={detail.earnings} />
      </td>
      <td className="destinations__action">
        <GoButton
          direction={direction}
          journeyTime={detail.journeyTimeSeconds}
        >
          {icon}
        </GoButton>
      </td>
    </tr>
  );
};
