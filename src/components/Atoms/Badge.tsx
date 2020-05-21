import { css, keyframes } from "styled-components";
import styled from "styled-components";
import { COLOURS } from "@src/styles/colours";
import { GRID } from "@src/styles/variables";

const frames = keyframes`
    0% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
    50% {
        transform: scale(1.25);
        box-shadow: 1px 1px 24px black;
    }
    100% {
        transform: scale(1);
        box-shadow: 1px 1px 8px black;
    }
`;

export const Badge = styled.span<{ animate?: boolean; color?: string }>`
  display: inline-block;
  background: ${({ color }) => color || COLOURS.SEMANTIC.OK.BACKGROUND};
  color: ${COLOURS.WHITE.STANDARD};
  border-radius: ${GRID.DOUBLE};
  line-height: ${GRID.UNIT};
  font-size: 12px;
  font-weight: bold;
  padding: 0 ${GRID.QUARTER};
  min-width: calc(${GRID.UNIT} + 2px + 2px); // to cater for borders no being included in line-height
  border: solid 2px ${COLOURS.WHITE.STANDARD};
  text-align: center;
  box-shadow: 1px 1px 8px black;
  ${({ animate }) =>
    animate
      ? css`
          animation: ${frames} 0.6s ease-out 1;
        `
      : ""}
`;
