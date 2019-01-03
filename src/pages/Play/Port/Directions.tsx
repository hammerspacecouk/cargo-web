import * as React from "react";
import { H2 } from "../../../components/Atoms/Heading/Heading";
import { Loading } from "../../../components/Atoms/Loading/Loading";
import { DirectionE } from "../../../components/Icons/DirectionE/DirectionE";
import { DirectionNE } from "../../../components/Icons/DirectionNE/DirectionNE";
import { DirectionNW } from "../../../components/Icons/DirectionNW/DirectionNW";
import { DirectionSE } from "../../../components/Icons/DirectionSE/DirectionSE";
import { DirectionSW } from "../../../components/Icons/DirectionSW/DirectionSW";
import { DirectionW } from "../../../components/Icons/DirectionW/DirectionW";
import { Destinations } from "../../../components/Organisms/Destinations/Destinations";
import { useCurrentShipContext } from "../../../context/CurrentShipContext";
import { Direction } from "./Direction";

export const Directions = () => {
  const { directions } = useCurrentShipContext();

  if (!directions) {
    return <Loading />;
  } // todo - pretty loader

  const { NW, NE, W, E, SW, SE } = directions;

  return (
    <>
      <H2>Where next?</H2>
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
    </>
  );
};
