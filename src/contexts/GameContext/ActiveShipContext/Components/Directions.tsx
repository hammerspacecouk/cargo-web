import * as React from "react";
import { Loading } from "../../../../components/Atoms/Loading/Loading";
import { DirectionE } from "../../../../components/Icons/DirectionE/DirectionE";
import { DirectionNE } from "../../../../components/Icons/DirectionNE/DirectionNE";
import { DirectionNW } from "../../../../components/Icons/DirectionNW/DirectionNW";
import { DirectionSE } from "../../../../components/Icons/DirectionSE/DirectionSE";
import { DirectionSW } from "../../../../components/Icons/DirectionSW/DirectionSW";
import { DirectionW } from "../../../../components/Icons/DirectionW/DirectionW";
import { Destinations } from "../../../../components/Organisms/Destinations/Destinations";
import { useActiveShipContext } from "../ActiveShipContext";
import { IDirection } from "../../../../Interfaces";
import { TextD, TextF, TextWarning } from "../../../../components/Atoms/Text/Text";
import { Fraction } from "../../../../components/Atoms/Fraction/Fraction";
import { PortName } from "../../../../components/Molecules/PortName/PortName";
import { ScoreValue } from "../../../../components/Molecules/ScoreValue/ScoreValue";
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
        <GoButton direction={direction} journeyTime={detail.journeyTimeSeconds}>
          {icon}
        </GoButton>
      </td>
    </tr>
  );
};


export const Directions = () => {
  const { directions } = useActiveShipContext();

  if (!directions) {
    return <Loading />;
  }

  const { NW, NE, W, E, SW, SE } = directions;

  return (
      <Destinations>
        <thead>
          <tr>
            <th>Destination Port</th>
            <th>Distance</th>
            <th>Earnings</th>
            <th>Go?</th>
          </tr>
        </thead>
        <tbody>
          {NW ? (
            <Direction direction={NW}>
              <DirectionNW />
            </Direction>
          ) : null}
          {NE ? (
            <Direction direction={NE}>
              <DirectionNE />
            </Direction>
          ) : null}
          {W ? (
            <Direction direction={W}>
              <DirectionW />
            </Direction>
          ) : null}
          {E ? (
            <Direction direction={E}>
              <DirectionE />
            </Direction>
          ) : null}
          {SW ? (
            <Direction direction={SW}>
              <DirectionSW />
            </Direction>
          ) : null}
          {SE ? (
            <Direction direction={SE}>
              <DirectionSE />
            </Direction>
          ) : null}
        </tbody>
      </Destinations>
  );
};
