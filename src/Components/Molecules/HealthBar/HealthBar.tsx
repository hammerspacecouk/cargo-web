import * as React from "react";
import styled from "styled-components";
import { grid } from "../../../GlobalStyle";

interface PropsInterface {
  percent: number;
}

const Container = styled.div`
    display: block;
    width: 100%;
    height: ${grid.unit}px;
    border-radius: ${grid.unit * 2}px;
    background: rgba(0,0,0,0.3);
    overflow: hidden;
`;
const Bar = styled.div`
    display: block;
    height: 100%;
    background: #2ca7cc;
    will-change: width;
    transition: width 1s linear;
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
