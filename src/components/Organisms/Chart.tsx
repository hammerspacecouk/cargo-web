import * as React from "react";
import { ICoordinate } from "@src/interfaces";
import styled from "styled-components";

export interface IMapProps {
  svg: {
    grid: number;
    nearby: ILine[];
    planets: ICircle[];
    highlights: ICircle[];
    ships: IShipPosition[];
    history: {
      from: {
        angle?: number;
        coords: ICoordinate;
      };
      to: {
        angle?: number;
        coords: ICoordinate;
      };
      opacity: number;
    }[][];
  };
}

const JOURNEY_COLOURS = ["73,184,139", "171,134,208", "231,86,74", "255,195,20", "103,115,228", "223,134,75"];
const PORT_RADIUS = 16;
const SPACING = 8;
const SHIP_SIZE = 12;

export const Chart = ({ svg }: IMapProps) => {
  // layer order
  // - Nearby paths
  // - Highlight rings
  // - Ship history paths
  // - Ships and labels
  // - Planets and labels
  return (
    <g>
      {svg.nearby.map((near) => (
        <Nearby key={`nearby-${near.id}`} x1={near.from.x} y1={near.from.y} x2={near.to.x} y2={near.to.y} />
      ))}
      {svg.highlights.map((highlight) => (
        <Highlight key={`highlight-${highlight.id}`} cx={highlight.coords.x} cy={highlight.coords.y} r={svg.grid / 4} />
      ))}
      {svg.history.map((lines, index) => {
        const color = JOURNEY_COLOURS[index % JOURNEY_COLOURS.length];
        return lines.map((line, jndex) => {
          const fromCoords = line.from.angle
            ? orbitPosition(line.from.coords, svg.grid / 4, line.from.angle)
            : line.from.coords;
          const toCoords = line.to.angle ? orbitPosition(line.to.coords, svg.grid / 4, line.to.angle) : line.to.coords;
          return (
            <JourneyLine
              key={`line-${index}-${jndex}`}
              color={`rgba(${color},${line.opacity})}`}
              x1={fromCoords.x}
              y1={fromCoords.y}
              x2={toCoords.x}
              y2={toCoords.y}
            />
          );
        });
      })}
      {svg.planets.map((planet) => (
        <Planet key={`planet-${planet.id}`} cx={planet.coords.x} cy={planet.coords.y} r={PORT_RADIUS} />
      ))}
      {svg.planets.map((planet) => (
        <PlanetLabel
          key={`planetLabel-${planet.id}`}
          x={planet.coords.x + PORT_RADIUS + SPACING}
          y={planet.coords.y + PORT_RADIUS}
        >
          {planet.title}
        </PlanetLabel>
      ))}
      {svg.ships.map((ship) => {
        const coords = ship.angle !== undefined ? orbitPosition(ship.center, svg.grid / 4, ship.angle) : ship.center;
        return (
          <React.Fragment key={`ship-${ship.id}`}>
            <Ship href={ship.href} x={coords.x - SHIP_SIZE / 2} y={coords.y - SHIP_SIZE / 2} />
            <ShipLabel x={coords.x + SPACING} y={coords.y + SPACING / 2}>
              {ship.name}
            </ShipLabel>
          </React.Fragment>
        );
      })}
    </g>
  );
};

const orbitPosition = (initial: ICoordinate, radius: number, angle: number): ICoordinate => {
  return {
    x: initial.x + radius * Math.cos(angle),
    y: initial.y + radius * Math.sin(angle),
  };
};

interface ILine {
  id: string;
  from: ICoordinate;
  to: ICoordinate;
}

interface ICircle {
  id: string;
  title?: string;
  coords: ICoordinate;
}

interface IShipPosition {
  id: string;
  name: string;
  center: ICoordinate;
  angle?: number;
  href: string;
}

const Highlight = styled.circle`
  fill: none;
  stroke: rgba(255, 255, 255, 0.5);
  stroke-width: 2px;
`;
const Planet = styled.circle`
  fill: #ffb511;
`;
const PlanetLabel = styled.text`
  font-size: 15px;
  fill: #ffb511;
`;
const Nearby = styled.line`
  stroke: #999;
  stroke-dasharray: 4;
`;
const Ship = styled.image`
  width: ${SHIP_SIZE}px;
  height: ${SHIP_SIZE}px;
`;
const ShipLabel = styled.text`
  font-size: 8px;
  fill: white;
`;
const JourneyLine = styled.line<{ color: string }>`
  stroke: ${({ color }) => color};
  stroke-width: 4px;
`;
