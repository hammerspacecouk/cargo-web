import * as React from "react";
import DirectionNW from "../../../components/Icons/DirectionNW/DirectionNW";
import DirectionNE from "../../../components/Icons/DirectionNE/DirectionNE";
import DirectionW from "../../../components/Icons/DirectionW/DirectionW";
import DirectionE from "../../../components/Icons/DirectionE/DirectionE";
import DirectionSW from "../../../components/Icons/DirectionSW/DirectionSW";
import DirectionSE from "../../../components/Icons/DirectionSE/DirectionSE";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import Direction from "./Direction";
import {Loading} from "../../../components/Atoms/Loading/Loading";

export default () => {
  const { directions } = useCurrentShipContext();

  if (directions === undefined) {
    return <Loading />;
  } // todo - pretty loader

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      <h2 className="table-head">Where next?</h2>
      <table className="destinations">
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
      </table>
    </>
  );
};
