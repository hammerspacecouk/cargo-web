import * as React from "react";
import styled from "styled-components";
import { colours, grid } from "../../../GlobalStyle";

interface PropsInterface {
  percent: number;
}

const Container = styled.div`
    display: block;
    width: 100%;
    height: ${grid.unit}px;
    border-radius: ${grid.unit * 2}px;
    background: rgba(128,128,128,0.3);
    overflow: hidden;
`;
const Bar = styled.div`
    display: block;
    height: 100%;
    background: ${colours.green[8]};
    will-change: width;
    transition: width 1s linear;
    transform: skew(-10deg);
    box-shadow: rgba(0,0,0,0.7) 2px 0 24px;
`;

// todo - change colours based on value. reuse progress bar
export default function HealthBar({ percent }: PropsInterface) {
  return (
    <Container>
      <Bar
        style={{
          width: `${percent}%`
        }}
      />
    </Container>
  );
}
