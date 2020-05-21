import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";
import { usePercent } from "@src/hooks/usePercent";
import { IClassNameProps } from "@src/interfaces";

interface IProps extends IClassNameProps {
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
  width: ${({ percentValue }) => percentValue}%;
  min-width: 2%;
  margin-left: -1%;
  margin-right: -1%;
  will-change: width;
  transition: width 1s linear;
  transform: skewX(-20deg);
  border-radius: 4px;
`;

export const ProgressBar = React.memo(({ className, percent, small = false }: IProps) => {
  const { label } = usePercent(percent);
  return (
    <Track small={small} className={className}>
      <Bar title={label} percentValue={percent} />
    </Track>
  );
});
