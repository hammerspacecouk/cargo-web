import styled, { keyframes } from "styled-components";
import * as React from "react";

export const AnimatedEllipsis = () => (
  <Ellipsis>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </Ellipsis>
);

const animate = keyframes`
  0% {
    opacity: 0;
  }
  90% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Ellipsis = styled.span`
  > * {
    opacity: 0;
    animation: ${animate} 1s linear infinite;
  }
  > *:nth-child(2) {
    animation-delay: 0.3s;
  }
  > *:nth-child(3) {
    animation-delay: 0.6s;
  }
`;
