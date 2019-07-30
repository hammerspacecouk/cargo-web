import * as React from "react";
import { IClassNameProps, IShipClassStats } from "../../interfaces";
import styled from "styled-components";
import { GRID } from "../../styles/variables";
import { COLOURS } from "../../styles/colours";

export const ShipStats = ({ className, stats }: IShipStatsProps) => (
  <StyledTable className={className}>
    <tbody>
    <ShipStat
      label="Speed"
      value={stats.speed}
      max={stats.max}
      color={COLOURS.STATS.SPEED}
    />
    <ShipStat
      label="Strength"
      value={stats.strength}
      max={stats.max}
      color={COLOURS.STATS.STRENGTH}
    />
    <ShipStat
      label="Capacity"
      value={stats.capacity}
      max={stats.max}
      color={COLOURS.STATS.CAPACITY}
    />
    </tbody>
  </StyledTable>
);

interface IShipStatsProps extends IClassNameProps {
  stats: IShipClassStats;
}

interface IShipStatProps {
  label: string;
  max: number;
  value: number;
  color: string;
}

const ShipStat = ({ label, color, value, max }: IShipStatProps) => (
  <tr>
    <LabelCell>{label}</LabelCell>
    <ValueCell>
      <Fractions color={color} value={value} max={max}/>
    </ValueCell>
  </tr>
);

interface IFractionsProps {
  max: number;
  value: number;
  color: string;
}

const Fractions = ({ max, value, color }: IFractionsProps) => {
  let items = [];
  for (let i = 0; i < max; i++) {
    items.push(
      <Fraction color={color} key={i} isActive={i < value}/>
    );
  }

  return (
    <FractionsWrap title={`${value}/${max}`}>
      {items}
    </FractionsWrap>
  );
};

const FractionsWrap = styled.abbr`
    display: flex;
    justify-content: space-between;
`;

const Fraction = styled.span<{ color: string, isActive: boolean }>`
    display: block;
    height: ${GRID.UNIT};
    width: ${GRID.UNIT};
    background: ${({ color }) => color};
    ${({ isActive }) => !isActive && `opacity: 0.1;`}
`;

const StyledTable = styled.table`
    width: 100%;
`;

const LabelCell = styled.th`
  padding: 0 ${GRID.UNIT} ${GRID.UNIT} 0;
`;

const ValueCell = styled.td`
    width: 100%;
`;
