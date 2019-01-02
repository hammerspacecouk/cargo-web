import * as React from "react";
import styled from "styled-components";
import { COLOURS } from "../../../styles/colours";
import { GRID } from "../../../styles/variables";

interface IProps {
  readonly percent: number;
  readonly isHealth?: boolean;
}

const Track = styled.div`
  display: block;
  width: 100%;
  height: ${GRID.UNIT};
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const Bar = styled.div<{ percentValue: number }>`
  display: block;
  height: 102%;
  background: ${COLOURS.SEMANTIC.INFO.KEY};
  width: ${({ percentValue }) => percentValue + 2}%;
  margin-left: -1%;
  margin-right: -1%;
  will-change: width;
  transition: width 1s linear;
  transform: skewX(-20deg);
  border-radius: 4px;
`;

export const ProgressBar = ({ percent }: IProps) => {
  const percentValue = Math.max(percent, 2); // to show that it is a bar that will fill up
  return (
    <Track>
      <Bar title={`${percent}%`} percentValue={percentValue} />
    </Track>
  );
};
