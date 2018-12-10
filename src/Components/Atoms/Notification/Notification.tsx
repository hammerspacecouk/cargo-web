import * as React from "react";
import styled, { keyframes } from "styled-components";
import { GRID } from "../../../styles/variables";
import { COLOURS } from "../../../styles/colours";

const frames = keyframes`
    0% {
        background-color: ${COLOURS.SEMANTIC.DANGER.KEY};
    }
      70% {
        background-color: ${COLOURS.SEMANTIC.DANGER.KEY};
    }
      100% {
        background-color: ${COLOURS.BODY.TEXT};
    }
`;

export const Notification = styled.abbr`
  display: block;
  width: ${GRID.HALF};
  height: ${GRID.HALF};
  position: absolute;
  top: ${GRID.HALF};
  right: ${GRID.HALF};
  border-radius: 100%;
  background-color: ${COLOURS.SEMANTIC.DANGER.KEY};
  animation: ${frames} 1s infinite alternate ease-in;
`;
