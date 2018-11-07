import * as React from "react";
import DirectionNW from "../../../Icons/DirectionNW";
import DirectionNE from "../../../Icons/DirectionNE";
import DirectionW from "../../../Icons/DirectionW";
import DirectionE from "../../../Icons/DirectionE";
import DirectionSW from "../../../Icons/DirectionSW";
import DirectionSE from "../../../Icons/DirectionSE";
import { useCurrentShipContext } from "../../../../context/CurrentShipContext";
import Direction from "./Direction";

export default () => {
  const { directions } = useCurrentShipContext();
  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      <h2 className="table-head">Where next?</h2>
      <table className="destinations">
        <thead>
          <tr>
            <th>Direction</th>
            <th>Destination Port</th>
            <th>Distance</th>
            <th>Travel Time</th>
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
      </table>
    </>
  );
};
