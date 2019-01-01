import * as React from "react";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
    50% {
        opacity: 0;
    }
`;

const Cursor = styled.span`
  font-weight: bold;
  animation: ${blink} 1s step-start infinite;
`;

export const TextCursor = () => {
  return <Cursor>_</Cursor>;
};
