import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "../../styles/colours";
import { GRID } from "../../styles/variables";
import { usePercent } from "../../hooks/usePercent";

interface IProps {
  readonly percent: number;
  readonly small?: boolean;
}

const Track = styled.div<{ small: boolean }>`
  display: block;
  width: 100%;
  height: ${({ small }) => (small ? GRID.HALF : GRID.UNIT)};
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Bar = styled.div<{ percentValue: number }>`
  display: block;
  height: 102%;
  background: ${COLOURS.BASE};
  // displays minimum of 2% to show that it is a bar that will fill up
  width: ${({ percentValue }) => percentValue + 2}%;
  min-width: 2%;
  margin-left: -1%;
  margin-right: -1%;
  will-change: width;
  transition: width 1s linear;
  transform: skewX(-20deg);
  border-radius: 4px;
`;

export const ProgressBar = React.memo(({ percent, small = false }: IProps) => {
  const percentString = usePercent(percent);
  return (
    <Track small={small}>
      <Bar title={percentString} percentValue={percent * 100} />
    </Track>
  );
});
